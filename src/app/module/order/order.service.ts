import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { OrderStatus, OrderType, PaymentStatus } from "../../../generated/prisma/enums";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";

const COMMISSION_RATE = 0.1; // 10% commission

const createOrder = async (
  userId: string | null,
  payload: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    notes?: string;
    items?: { productId: string; productVariantId?: string | null; quantity: number }[];
    couponId?: string | null;
    discountAmount?: number;
    shippingFee?: number;
  },
) => {
  let orderItemsToProcess: {
    productId: string;
    productVariantId: string | null;
    quantity: number;
    product: any;
    variant: any;
    sellPrice: number;
  }[] = [];
  let isFromCart = false;

  // 1. Determine items to process
  if (payload.items && payload.items.length > 0) {
    // Direct items (Buy Now)
    for (const item of payload.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });
      if (!product) throw new AppError(status.NOT_FOUND, `Product not found: ${item.productId}`);
      
      let sellPrice = product.sellPrice;
      let variant = null;
      if (product.type === "VARIABLE" && item.productVariantId) {
        variant = product.variants.find((v) => v.id === item.productVariantId);
        if (!variant) throw new AppError(status.NOT_FOUND, `Product variant not found: ${item.productVariantId}`);
        sellPrice = variant.sellPrice;
      }

      orderItemsToProcess.push({
        productId: item.productId,
        productVariantId: item.productVariantId || null,
        quantity: item.quantity,
        product,
        variant,
        sellPrice,
      });
    }
  } else {
    // Items from Cart (guests always pass explicit items, so this path requires a logged-in user)
    if (!userId) {
      throw new AppError(status.BAD_REQUEST, "No items provided for order");
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true,
              },
            },
            productVariant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError(status.BAD_REQUEST, "Your cart is empty");
    }
    
    orderItemsToProcess = cart.items.map((item) => {
      let sellPrice = item.product.sellPrice;
      if (item.product.type === "VARIABLE" && item.productVariant) {
        sellPrice = item.productVariant.sellPrice;
      }
      return {
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        product: item.product,
        variant: item.productVariant,
        sellPrice,
      };
    });
    isFromCart = true;
  }

  // 2. Perform Order creation in a Transaction
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    // Verify stock and calculate total
    for (const item of orderItemsToProcess) {
      if (item.variant) {
        if (item.variant.quantity < item.quantity) {
          throw new AppError(
            status.BAD_REQUEST,
            `Insufficient stock for variation of product: ${item.product.name}`,
          );
        }
      } else {
        if (item.product.stock < item.quantity) {
          throw new AppError(
            status.BAD_REQUEST,
            `Insufficient stock for product: ${item.product.name}`,
          );
        }
      }
      totalAmount += item.sellPrice * item.quantity;
    }

    const discountAmount = payload.discountAmount || 0;
    const shippingFee = payload.shippingFee || 0;
    const finalTotalAmount = Math.max(0, totalAmount + shippingFee - discountAmount);

    // Create Order
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: finalTotalAmount,
        discountAmount,
        shippingFee,
        couponId: payload.couponId || null,
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
      const itemTotal = item.sellPrice * item.quantity;
      const itemCommission = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - itemCommission;

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.sellPrice,
          shopId: item.product.shopId,
          platformEarning: itemCommission,
          vendorEarning: vendorEarning,
        },
      });

      // Update stock
      if (item.productVariantId) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
        // Keep main product stock decrement in sync
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    // 3. Clear Cart Items (either all if checked out full cart, or only processed items) — guests have no cart
    const cart = userId ? await tx.cart.findUnique({ where: { userId } }) : null;
    if (cart) {
      if (isFromCart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      } else {
        for (const item of orderItemsToProcess) {
          await tx.cartItem.deleteMany({
            where: {
              cartId: cart.id,
              productId: item.productId,
              productVariantId: item.productVariantId || null,
            },
          });
        }
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
          productVariant: true,
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
          productVariant: true,
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
    const isVendorOfItem = order.items.some((item) => item.shop.vendorId === userId);
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

  const orderType =
    queryParams.orderType === OrderType.POS || queryParams.orderType === OrderType.ONLINE
      ? queryParams.orderType
      : undefined;

  const orderItems = await prisma.orderItem.findMany({
    where: {
      shopId: shop.id,
      ...(orderType ? { order: { orderType } } : {}),
    },
    include: {
      order: true,
      product: true,
      productVariant: true,
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
