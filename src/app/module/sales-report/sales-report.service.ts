import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { OrderStatus } from "../../../generated/prisma/enums";
import { sumByPeriod } from "../../utils/periodSummary";

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

const getSalesSummary = async (vendorId: string) => {
  const shop = await getShopForVendor(vendorId);

  const deliveredItems = await prisma.orderItem.findMany({
    where: { shopId: shop.id, status: OrderStatus.DELIVERED },
    select: {
      price: true,
      quantity: true,
      order: { select: { createdAt: true } },
    },
  });

  return sumByPeriod(
    deliveredItems.map((item) => ({
      amount: item.price * item.quantity,
      date: item.order.createdAt,
    })),
  );
};

const getSalesReportItems = async (
  vendorId: string,
  range: { startDate?: string; endDate?: string },
) => {
  const shop = await getShopForVendor(vendorId);

  let dateFilter: { gte?: Date; lte?: Date } | undefined;
  if (range.startDate || range.endDate) {
    dateFilter = {};
    if (range.startDate) dateFilter.gte = new Date(range.startDate);
    if (range.endDate) {
      const end = new Date(range.endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
  }

  const items = await prisma.orderItem.findMany({
    where: {
      shopId: shop.id,
      status: OrderStatus.DELIVERED,
      ...(dateFilter && { order: { createdAt: dateFilter } }),
    },
    include: {
      product: { select: { name: true } },
      productVariant: { select: { combination: true } },
      order: { select: { orderNumber: true, orderType: true, createdAt: true } },
    },
    orderBy: { order: { createdAt: "desc" } },
  });

  const productMap = new Map<string, { name: string; quantity: number; total: number }>();
  let totalSales = 0;
  let totalQuantity = 0;
  let totalEarning = 0;

  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    totalSales += lineTotal;
    totalQuantity += item.quantity;
    totalEarning += item.vendorEarning;

    const existing = productMap.get(item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.total += lineTotal;
    } else {
      productMap.set(item.productId, {
        name: item.product.name,
        quantity: item.quantity,
        total: lineTotal,
      });
    }
  }

  return {
    items,
    productSummary: Array.from(productMap.values()),
    totals: {
      totalSales,
      totalQuantity,
      totalEarning,
    },
  };
};

export const SalesReportService = {
  getSalesSummary,
  getSalesReportItems,
};
