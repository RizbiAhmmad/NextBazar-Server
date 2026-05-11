import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { OrderStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";

const COMMISSION_RATE = 0.1; // 10% commission

const createOrder = async (
  userId: string,
  payload: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    notes?: string;
    items?: { productId: string; quantity: number }[];
  },
) => {
  let orderItemsToProcess: { productId: string; quantity: number; product: any }[] = [];
  let isFromCart = false;

  // 1. Determine items to process
  if (payload.items && payload.items.length > 0) {
    // Direct items (Buy Now)
    for (const item of payload.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) throw new AppError(status.NOT_FOUND, `Product not found: ${item.productId}`);
      orderItemsToProcess.push({
        productId: item.productId,
        quantity: item.quantity,
        product,
      });
    }
  } else {
    // Items from Cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError(status.BAD_REQUEST, "Your cart is empty");
    }
    
    orderItemsToProcess = cart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      product: item.product
    }));
    isFromCart = true;
  }

  // 2. Perform Order creation in a Transaction
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    // Verify stock and calculate total
    for (const item of orderItemsToProcess) {
      if (item.product.stock < item.quantity) {
        throw new AppError(
          status.BAD_REQUEST,
          `Insufficient stock for product: ${item.product.name}`,
        );
      }
      totalAmount += item.product.sellPrice * item.quantity;
    }

    // Create Order
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: totalAmount + 60, // Adding 60 TK shipping charge
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address,
        district: payload.district,
        notes: payload.notes,
        orderStatus: OrderStatus.PENDING,
      },
    });

    // Create OrderItems and reduce stock
    for (const item of orderItemsToProcess) {
      const itemTotal = item.product.sellPrice * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - itemCommission;

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.sellPrice,
          shopId: item.product.shopId,
          platformEarning: itemCommission,
          vendorEarning: vendorEarning,
        },
      });

      // Update stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // 3. Clear Cart Items only if order was from cart
    if (isFromCart) {
      const cart = await tx.cart.findUnique({ where: { userId } });
      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }
    }

    return order;
  });
};

const getAllOrders = async (queryParams: IQueryParams) => {
  const orderQuery = new QueryBuilder(prisma.order, queryParams, {
    searchableFields: ["address", "district", "fullName", "phone"],
    filterableFields: ["orderStatus", "paymentStatus", "userId"],
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      items: {
        include: {
          product: true,
          shop: true,
        },
      },
      user: {
        select: { id: true, name: true, email: true },
      },
    });

  return await orderQuery.execute();
};

const getOrderById = async (id: string, userId?: string, role?: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
          shop: true,
        },
      },
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (!order) {
    throw new AppError(status.NOT_FOUND, "Order not found");
  }

  // If not admin, check if the user is the owner or a vendor of an item in the order
  if (role !== "ADMIN" && role !== "SUPER_ADMIN" && order.userId !== userId) {
    const isVendorOfItem = order.items.some(item => item.shop.vendorId === userId);
    if (!isVendorOfItem) {
      throw new AppError(status.FORBIDDEN, "Access denied");
    }
  }

  return order;
};

const updateOrderStatus = async (id: string, statusValue: OrderStatus) => {
  return await prisma.order.update({
    where: { id },
    data: { orderStatus: statusValue },
  });
};

const updatePaymentStatus = async (id: string, paymentStatus: PaymentStatus) => {
  return await prisma.order.update({
    where: { id },
    data: { paymentStatus: paymentStatus },
  });
};

const updateOrderItemStatus = async (
  itemId: string,
  statusValue: OrderStatus,
  vendorId: string
) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError(status.NOT_FOUND, "Shop not found");

  const orderItem = await prisma.orderItem.findUnique({
    where: { id: itemId },
  });

  if (!orderItem || orderItem.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "Access denied to this order item");
  }

  const updatedItem = await prisma.orderItem.update({
    where: { id: itemId },
    data: { status: statusValue },
  });

  // Also update the main order status to match the item status
  // In a more complex system, we would check if all items are shipped/delivered
  // but for now, we propagate the status to give immediate feedback to the user
  await prisma.order.update({
    where: { id: orderItem.orderId },
    data: { orderStatus: statusValue },
  });

  return updatedItem;
};

const getVendorOrders = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError(status.NOT_FOUND, "Shop not found");

  const orderItems = await prisma.orderItem.findMany({
    where: { shopId: shop.id },
    include: {
      order: true,
      product: true,
    },
    orderBy: {
      order: { createdAt: "desc" },
    },
  });

  return orderItems;
};

const deleteOrder = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    // Delete order items first
    await tx.orderItem.deleteMany({
      where: { orderId: id },
    });

    // Delete the order
    return await tx.order.delete({
      where: { id },
    });
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  getVendorOrders,
  deleteOrder,
  updateOrderItemStatus,
};
