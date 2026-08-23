import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { NotificationService } from "../notification/notification.service";

const COMMISSION_RATE = 0.1; // 10% commission — mirrors order.service.ts

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

const processOrderReturn = async (
  payload: {
    orderId: string;
    items: { orderItemId: string; quantity: number }[];
  },
  vendorId: string,
) => {
  const shop = await getShopForVendor(vendorId);

  const order = await prisma.order.findUnique({
    where: { id: payload.orderId },
    include: { items: true },
  });
  if (!order) throw new AppError(status.NOT_FOUND, "Order not found");

  const requestedMap = new Map(payload.items.map((i) => [i.orderItemId, i.quantity]));
  const targetItems = order.items.filter((item) => requestedMap.has(item.id));

  if (targetItems.length !== requestedMap.size) {
    throw new AppError(status.BAD_REQUEST, "One or more order items were not found on this order");
  }

  if (targetItems.some((item) => item.shopId !== shop.id)) {
    throw new AppError(status.FORBIDDEN, "You can only process returns for your own shop's items");
  }

  for (const item of targetItems) {
    const requestedQty = requestedMap.get(item.id) as number;
    const remaining = item.quantity - item.returnedQuantity;
    if (requestedQty > remaining) {
      throw new AppError(
        status.BAD_REQUEST,
        `Return quantity for "${item.id}" exceeds the remaining returnable quantity (${remaining})`,
      );
    }
  }

  const orderReturn = await prisma.$transaction(async (tx) => {
    let refundAmount = 0;
    const returnItemsData: {
      orderItemId: string;
      productId: string;
      productVariantId: string | null;
      quantity: number;
      price: number;
      subtotal: number;
    }[] = [];

    for (const item of targetItems) {
      const requestedQty = requestedMap.get(item.id) as number;
      const newReturnedQuantity = item.returnedQuantity + requestedQty;
      const remainingQuantity = item.quantity - newReturnedQuantity;
      const itemTotal = item.price * remainingQuantity;
      const platformEarning = itemTotal * COMMISSION_RATE;
      const vendorEarning = itemTotal - platformEarning;

      await tx.orderItem.update({
        where: { id: item.id },
        data: {
          returnedQuantity: newReturnedQuantity,
          vendorEarning,
          platformEarning,
        },
      });

      // Restock the returned quantity
      if (item.productVariantId) {
        await tx.productVariant.update({
          where: { id: item.productVariantId },
          data: { quantity: { increment: requestedQty } },
        });
      }
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: requestedQty } },
      });

      const subtotal = item.price * requestedQty;
      refundAmount += subtotal;

      returnItemsData.push({
        orderItemId: item.id,
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: requestedQty,
        price: item.price,
        subtotal,
      });
    }

    // Recompute order totals from ALL items on the order (not just the ones just returned)
    const allItems = await tx.orderItem.findMany({ where: { orderId: order.id } });
    const itemsRemainingSubtotal = allItems.reduce(
      (sum, i) => sum + i.price * (i.quantity - i.returnedQuantity),
      0,
    );

    // Shipping/discount are order-level (shared across vendors on multi-vendor orders),
    // so a single vendor's return only shrinks the items subtotal — it never edits them.
    const newTotalAmount = Math.max(
      0,
      itemsRemainingSubtotal + order.shippingFee - order.discountAmount,
    );

    await tx.order.update({
      where: { id: order.id },
      data: { totalAmount: newTotalAmount },
    });

    return tx.orderReturn.create({
      data: {
        orderId: order.id,
        shopId: shop.id,
        refundAmount,
        shippingFee: order.shippingFee,
        discountAmount: order.discountAmount,
        newTotalAmount,
        processedByAdminId: vendorId,
        items: {
          create: returnItemsData,
        },
      },
      include: {
        items: {
          include: { product: true, productVariant: true },
        },
      },
    });
  });

  await NotificationService.notifyOrderReturnProcessed(order, orderReturn.refundAmount);

  return orderReturn;
};

const getAllOrderReturns = async (queryParams: IQueryParams) => {
  const orderReturnQuery = new QueryBuilder(prisma.orderReturn, queryParams, {
    searchableFields: ["order.orderNumber", "order.fullName", "order.phone"],
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      order: {
        select: {
          id: true,
          orderNumber: true,
          fullName: true,
          phone: true,
          district: true,
        },
      },
      items: {
        include: { product: true, productVariant: true },
      },
    });

  return await orderReturnQuery.execute();
};

const getVendorOrderReturns = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await getShopForVendor(vendorId);

  const orderReturnQuery = new QueryBuilder(prisma.orderReturn, queryParams, {
    searchableFields: ["order.orderNumber", "order.fullName", "order.phone"],
  })
    .search()
    .sort()
    .paginate()
    .where({ shopId: shop.id })
    .include({
      order: {
        select: {
          id: true,
          orderNumber: true,
          fullName: true,
          phone: true,
          district: true,
        },
      },
      items: {
        include: { product: true, productVariant: true },
      },
    });

  return await orderReturnQuery.execute();
};

const getReturnsByOrderId = async (orderId: string) => {
  return await prisma.orderReturn.findMany({
    where: { orderId },
    include: {
      items: {
        include: { product: true, productVariant: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const OrderReturnService = {
  processOrderReturn,
  getAllOrderReturns,
  getVendorOrderReturns,
  getReturnsByOrderId,
};
