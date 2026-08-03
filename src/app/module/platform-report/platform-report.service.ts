import { prisma } from "../../lib/prisma";
import { OrderStatus, OrderType } from "../../../generated/prisma/enums";
import { sumByPeriod } from "../../utils/periodSummary";

type DateRange = { startDate?: string; endDate?: string };

const buildDateFilter = (range: DateRange): { gte?: Date; lte?: Date } | undefined => {
  if (!range.startDate && !range.endDate) return undefined;

  const filter: { gte?: Date; lte?: Date } = {};
  if (range.startDate) filter.gte = new Date(range.startDate);
  if (range.endDate) {
    const end = new Date(range.endDate);
    end.setHours(23, 59, 59, 999);
    filter.lte = end;
  }
  return filter;
};

/**
 * Period-bucketed platform totals (GMV, commission, vendor payout) across
 * every shop — the admin equivalent of a seller's Sales Report summary.
 */
const getPlatformSummary = async () => {
  const items = await prisma.orderItem.findMany({
    where: { status: OrderStatus.DELIVERED },
    select: {
      price: true,
      quantity: true,
      platformEarning: true,
      vendorEarning: true,
      order: { select: { createdAt: true } },
    },
  });

  const gmv = sumByPeriod(
    items.map((item) => ({ amount: item.price * item.quantity, date: item.order.createdAt })),
  );
  const commission = sumByPeriod(
    items.map((item) => ({ amount: item.platformEarning, date: item.order.createdAt })),
  );
  const vendorPayout = sumByPeriod(
    items.map((item) => ({ amount: item.vendorEarning, date: item.order.createdAt })),
  );

  return { gmv, commission, vendorPayout };
};

/**
 * Marketplace-wide breakdown for the selected date range: totals, channel
 * mix, order-status funnel, and top-performing shops/products.
 */
const getPlatformOverview = async (range: DateRange) => {
  const dateFilter = buildDateFilter(range);

  const items = await prisma.orderItem.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      ...(dateFilter && { order: { createdAt: dateFilter } }),
    },
    select: {
      orderId: true,
      price: true,
      quantity: true,
      platformEarning: true,
      vendorEarning: true,
      productId: true,
      product: { select: { name: true } },
      shopId: true,
      shop: { select: { name: true } },
      order: { select: { orderType: true } },
    },
  });

  let gmv = 0;
  let commission = 0;
  let vendorPayout = 0;
  const orderIds = new Set<string>();

  const byOrderTypeMap = new Map<OrderType, { gmv: number; count: number }>();
  const shopMap = new Map<
    string,
    { shopId: string; name: string; gmv: number; commission: number; orderIds: Set<string> }
  >();
  const productMap = new Map<
    string,
    { productId: string; name: string; quantity: number; revenue: number }
  >();

  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    gmv += lineTotal;
    commission += item.platformEarning;
    vendorPayout += item.vendorEarning;
    orderIds.add(item.orderId);

    const typeBucket = byOrderTypeMap.get(item.order.orderType) || { gmv: 0, count: 0 };
    typeBucket.gmv += lineTotal;
    typeBucket.count += 1;
    byOrderTypeMap.set(item.order.orderType, typeBucket);

    const shopBucket =
      shopMap.get(item.shopId) ||
      {
        shopId: item.shopId,
        name: item.shop.name,
        gmv: 0,
        commission: 0,
        orderIds: new Set<string>(),
      };
    shopBucket.gmv += lineTotal;
    shopBucket.commission += item.platformEarning;
    shopBucket.orderIds.add(item.orderId);
    shopMap.set(item.shopId, shopBucket);

    const productBucket = productMap.get(item.productId) || {
      productId: item.productId,
      name: item.product.name,
      quantity: 0,
      revenue: 0,
    };
    productBucket.quantity += item.quantity;
    productBucket.revenue += lineTotal;
    productMap.set(item.productId, productBucket);
  }

  const orderStatusGroups = await prisma.order.groupBy({
    by: ["orderStatus"],
    _count: { id: true },
    where: dateFilter ? { createdAt: dateFilter } : undefined,
  });

  const topShops = Array.from(shopMap.values())
    .map((s) => ({
      shopId: s.shopId,
      name: s.name,
      gmv: s.gmv,
      commission: s.commission,
      orderCount: s.orderIds.size,
    }))
    .sort((a, b) => b.gmv - a.gmv)
    .slice(0, 8);

  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  return {
    totals: {
      gmv,
      commission,
      vendorPayout,
      orderCount: orderIds.size,
      avgOrderValue: orderIds.size > 0 ? gmv / orderIds.size : 0,
    },
    byOrderType: Array.from(byOrderTypeMap.entries()).map(([orderType, v]) => ({
      orderType,
      ...v,
    })),
    byOrderStatus: orderStatusGroups.map((g) => ({
      orderStatus: g.orderStatus,
      count: g._count.id,
    })),
    topShops,
    topProducts,
  };
};

/**
 * Detailed, exportable order-item list across every shop for the selected
 * filters — the admin equivalent of a seller's Sales Report item table.
 */
const getPlatformItems = async (
  range: DateRange & { orderType?: string; shopId?: string },
) => {
  const dateFilter = buildDateFilter(range);

  const orderWhere: { createdAt?: { gte?: Date; lte?: Date }; orderType?: OrderType } = {};
  if (dateFilter) orderWhere.createdAt = dateFilter;
  if (range.orderType && Object.values(OrderType).includes(range.orderType as OrderType)) {
    orderWhere.orderType = range.orderType as OrderType;
  }

  const items = await prisma.orderItem.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      ...(range.shopId && { shopId: range.shopId }),
      ...(Object.keys(orderWhere).length > 0 && { order: orderWhere }),
    },
    include: {
      product: { select: { id: true, name: true } },
      productVariant: { select: { id: true, combination: true } },
      shop: { select: { id: true, name: true } },
      order: { select: { orderNumber: true, orderType: true, createdAt: true } },
    },
    orderBy: { order: { createdAt: "desc" } },
  });

  let totalGmv = 0;
  let totalCommission = 0;
  let totalVendorPayout = 0;
  let totalQuantity = 0;

  const result = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    totalGmv += lineTotal;
    totalCommission += item.platformEarning;
    totalVendorPayout += item.vendorEarning;
    totalQuantity += item.quantity;

    return {
      id: item.id,
      product: item.product,
      productVariant: item.productVariant,
      shop: item.shop,
      price: item.price,
      quantity: item.quantity,
      lineTotal,
      platformEarning: item.platformEarning,
      vendorEarning: item.vendorEarning,
      order: item.order,
    };
  });

  return {
    items: result,
    totals: { totalGmv, totalCommission, totalVendorPayout, totalQuantity },
  };
};

export const PlatformReportService = {
  getPlatformSummary,
  getPlatformOverview,
  getPlatformItems,
};
