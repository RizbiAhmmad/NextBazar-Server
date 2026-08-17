import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { OrderStatus, OrderType, PaymentStatus } from "../../../generated/prisma/enums";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { generateOrderNumber } from "../../utils/generateOrderNumber";
import { NotificationService } from "../notification/notification.service";
import { BDCourierService } from "./bdCourier.service";

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
    orderType?: OrderType;
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
  const order = await prisma.$transaction(async (tx) => {
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
        orderType: payload.orderType || OrderType.ONLINE,
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

    const orderWithNumber = await tx.order.update({
      where: { id: order.id },
      data: { orderNumber: generateOrderNumber(order.orderType, order.orderSeq) },
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
          costPrice: item.variant?.purchasePrice ?? item.product.purchasePrice,
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

    return orderWithNumber;
  });

  await NotificationService.notifyOrderPlaced(order, orderItemsToProcess);

  return order;
};

const getAllOrders = async (queryParams: IQueryParams) => {
  const orderQuery = new QueryBuilder(prisma.order, queryParams, {
    searchableFields: [
      "orderNumber",
      "address",
      "district",
      "fullName",
      "phone",
      "shop.name",
      "items.shop.name",
    ],
    filterableFields: ["orderStatus", "paymentStatus", "userId", "orderType"],
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
      shop: {
        select: { id: true, name: true },
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

const checkOrderFraud = async (id: string, userId?: string, role?: string) => {
  const order = await getOrderById(id, userId, role);

  const phone = order.phone?.trim();
  const isValidPhone = !!phone && phone.toUpperCase() !== "N/A" && phone.length >= 10;

  if (!isValidPhone) {
    return { hasPhone: false as const };
  }

  const bdCourierService = new BDCourierService();
  const report = await bdCourierService.checkPhone(phone);

  return { hasPhone: true as const, phone, report };
};

const updateOrderStatus = async (id: string, statusValue: OrderStatus) => {
  const existingOrder = await prisma.order.findUnique({ where: { id } });
  if (!existingOrder) throw new AppError(status.NOT_FOUND, "Order not found");

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { orderStatus: statusValue },
  });

  await NotificationService.notifyOrderStatusChanged(updatedOrder, existingOrder.orderStatus);

  return updatedOrder;
};

const updatePaymentStatus = async (id: string, paymentStatus: PaymentStatus) => {
  const existingOrder = await prisma.order.findUnique({ where: { id } });
  if (!existingOrder) throw new AppError(status.NOT_FOUND, "Order not found");

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { paymentStatus: paymentStatus },
  });

  await NotificationService.notifyPaymentStatusChanged(updatedOrder, existingOrder.paymentStatus);

  return updatedOrder;
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
  const existingOrder = await prisma.order.findUnique({ where: { id: orderItem.orderId } });
  const updatedOrder = await prisma.order.update({
    where: { id: orderItem.orderId },
    data: { orderStatus: statusValue },
  });

  if (existingOrder) {
    await NotificationService.notifyOrderStatusChanged(updatedOrder, existingOrder.orderStatus);
  }

  return updatedItem;
};

const updateOrderItem = async (
  itemId: string,
  vendorId: string,
  payload: {
    status?: OrderStatus;
    productId?: string;
    productVariantId?: string | null;
    quantity?: number;
  },
) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError(status.NOT_FOUND, "Shop not found");

  const orderItem = await prisma.orderItem.findUnique({
    where: { id: itemId },
    include: { order: true },
  });

  if (!orderItem || orderItem.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "Access denied to this order item");
  }

  const isContentEdit =
    payload.productId !== undefined ||
    payload.productVariantId !== undefined ||
    payload.quantity !== undefined;

  if (!isContentEdit) {
    // Status-only update — identical behavior to updateOrderItemStatus
    return updateOrderItemStatus(itemId, payload.status as OrderStatus, vendorId);
  }

  if (orderItem.order.orderType !== OrderType.POS) {
    if (orderItem.status !== OrderStatus.PENDING && orderItem.status !== OrderStatus.PROCESSING) {
      throw new AppError(
        status.BAD_REQUEST,
        "This item can no longer be edited once it has shipped",
      );
    }
  }

  const newProductId = payload.productId ?? orderItem.productId;
  const newProductVariantId =
    payload.productVariantId !== undefined ? payload.productVariantId : orderItem.productVariantId;
  const newQuantity = payload.quantity ?? orderItem.quantity;

  const product = await prisma.product.findUnique({
    where: { id: newProductId },
    include: { variants: true },
  });
  if (!product) throw new AppError(status.NOT_FOUND, `Product not found: ${newProductId}`);
  if (product.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "You can only use your own shop's products");
  }

  let variant = null;
  if (newProductVariantId) {
    variant = product.variants.find((v) => v.id === newProductVariantId);
    if (!variant) {
      throw new AppError(status.NOT_FOUND, `Product variant not found: ${newProductVariantId}`);
    }
  }

  const sellPrice = variant?.sellPrice ?? product.sellPrice;
  const costPrice = variant?.purchasePrice ?? product.purchasePrice;

  const updatedItem = await prisma.$transaction(async (tx) => {
    // Restore stock for the old product/variant
    if (orderItem.productVariantId) {
      await tx.productVariant.update({
        where: { id: orderItem.productVariantId },
        data: { quantity: { increment: orderItem.quantity } },
      });
    }
    await tx.product.update({
      where: { id: orderItem.productId },
      data: { stock: { increment: orderItem.quantity } },
    });

    // Re-validate stock for the new product/variant (post-restore)
    if (newProductVariantId) {
      const freshVariant = await tx.productVariant.findUnique({
        where: { id: newProductVariantId },
      });
      if (!freshVariant || freshVariant.quantity < newQuantity) {
        throw new AppError(
          status.BAD_REQUEST,
          `Insufficient stock for variation of product: ${product.name}`,
        );
      }
      await tx.productVariant.update({
        where: { id: newProductVariantId },
        data: { quantity: { decrement: newQuantity } },
      });
      await tx.product.update({
        where: { id: newProductId },
        data: { stock: { decrement: newQuantity } },
      });
    } else {
      const freshProduct = await tx.product.findUnique({ where: { id: newProductId } });
      if (!freshProduct || freshProduct.stock < newQuantity) {
        throw new AppError(status.BAD_REQUEST, `Insufficient stock for product: ${product.name}`);
      }
      await tx.product.update({
        where: { id: newProductId },
        data: { stock: { decrement: newQuantity } },
      });
    }

    const itemTotal = sellPrice * newQuantity;
    const platformEarning = itemTotal * COMMISSION_RATE;
    const vendorEarning = itemTotal - platformEarning;

    const item = await tx.orderItem.update({
      where: { id: itemId },
      data: {
        productId: newProductId,
        productVariantId: newProductVariantId,
        quantity: newQuantity,
        price: sellPrice,
        costPrice,
        vendorEarning,
        platformEarning,
        ...(payload.status !== undefined && { status: payload.status }),
      },
    });

    // Recompute Order.totalAmount from all items on this order
    const allItems = await tx.orderItem.findMany({ where: { orderId: orderItem.orderId } });
    const itemsTotal = allItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const newTotalAmount = Math.max(
      0,
      itemsTotal + orderItem.order.shippingFee - orderItem.order.discountAmount,
    );

    await tx.order.update({
      where: { id: orderItem.orderId },
      data: {
        totalAmount: newTotalAmount,
        ...(payload.status !== undefined && { orderStatus: payload.status }),
      },
    });

    return item;
  });

  if (payload.status !== undefined) {
    const updatedOrder = await prisma.order.findUnique({ where: { id: orderItem.orderId } });
    if (updatedOrder) {
      await NotificationService.notifyOrderStatusChanged(updatedOrder, orderItem.order.orderStatus);
    }
  }

  return updatedItem;
};

const getVendorOrders = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) throw new AppError(status.NOT_FOUND, "Shop not found");

  const orderType = Object.values(OrderType).includes(
    queryParams.orderType as OrderType,
  )
    ? (queryParams.orderType as OrderType)
    : undefined;

  const searchTerm =
    typeof queryParams.searchTerm === "string" ? queryParams.searchTerm : undefined;

  const orderItems = await prisma.orderItem.findMany({
    where: {
      shopId: shop.id,
      ...((orderType || searchTerm) && {
        order: {
          ...(orderType && { orderType }),
          ...(searchTerm && {
            OR: [
              { orderNumber: { contains: searchTerm, mode: "insensitive" as const } },
              { fullName: { contains: searchTerm, mode: "insensitive" as const } },
              { phone: { contains: searchTerm, mode: "insensitive" as const } },
            ],
          }),
        },
      }),
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
  updateOrderItem,
  checkOrderFraud,
};
