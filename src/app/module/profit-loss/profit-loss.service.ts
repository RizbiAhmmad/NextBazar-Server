import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { OrderStatus } from "../../../generated/prisma/enums";
import { sumByPeriod, IPeriodSummary } from "../../utils/periodSummary";

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

/**
 * Coupons in this app are shop-scoped (a coupon's eligible products always
 * belong to one shop), so an order's discountAmount can be safely prorated
 * using only this shop's own line items within that order — no other shop's
 * items in a mixed-cart order ever share in the same discount.
 */
const buildOrderSubtotals = (items: { orderId: string; price: number; quantity: number }[]) => {
  const subtotals = new Map<string, number>();
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    subtotals.set(item.orderId, (subtotals.get(item.orderId) || 0) + lineTotal);
  }
  return subtotals;
};

const getProfitLossSummary = async (vendorId: string) => {
  const shop = await getShopForVendor(vendorId);

  const items = await prisma.orderItem.findMany({
    where: { shopId: shop.id, status: OrderStatus.DELIVERED },
    select: {
      orderId: true,
      price: true,
      quantity: true,
      costPrice: true,
      product: { select: { purchasePrice: true } },
      productVariant: { select: { purchasePrice: true } },
      order: { select: { discountAmount: true, createdAt: true } },
    },
  });

  const orderSubtotals = buildOrderSubtotals(items);

  const salesEntries: { amount: number; date: Date }[] = [];
  const costEntries: { amount: number; date: Date }[] = [];
  const profitEntries: { amount: number; date: Date }[] = [];

  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    // Prefer the cost snapshot taken at order time; fall back to the current
    // product/variant purchasePrice for orders placed before this field existed.
    const unitCost =
      item.costPrice ?? item.productVariant?.purchasePrice ?? item.product.purchasePrice;
    const lineCost = unitCost * item.quantity;

    const orderSubtotal = orderSubtotals.get(item.orderId) || 0;
    const ratio = orderSubtotal > 0 ? lineTotal / orderSubtotal : 0;
    const lineDiscount = (item.order.discountAmount || 0) * ratio;

    const date = item.order.createdAt;
    salesEntries.push({ amount: lineTotal, date });
    costEntries.push({ amount: lineCost, date });
    profitEntries.push({ amount: lineTotal - lineCost - lineDiscount, date });
  }

  const expenses = await prisma.expense.findMany({
    where: { shopId: shop.id },
    select: { price: true, date: true },
  });
  const expenseEntries = expenses.map((expense) => ({ amount: expense.price, date: expense.date }));

  const sales = sumByPeriod(salesEntries);
  const cost = sumByPeriod(costEntries);
  const profit = sumByPeriod(profitEntries);
  const expense = sumByPeriod(expenseEntries);

  const periods = Object.keys(profit) as (keyof IPeriodSummary)[];
  const netProfit = periods.reduce((acc, period) => {
    acc[period] = profit[period] - expense[period];
    return acc;
  }, {} as IPeriodSummary);

  return { sales, cost, profit, expense, netProfit };
};

const getProfitLossItems = async (
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
      product: { select: { id: true, name: true, purchasePrice: true } },
      productVariant: { select: { id: true, combination: true, purchasePrice: true } },
      order: {
        select: {
          orderNumber: true,
          orderType: true,
          discountAmount: true,
          createdAt: true,
        },
      },
    },
    orderBy: { order: { createdAt: "desc" } },
  });

  const orderSubtotals = buildOrderSubtotals(items);

  let totalSales = 0;
  let totalCost = 0;
  let totalDiscount = 0;
  let totalProfit = 0;

  const result = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    const unitCost =
      item.costPrice ?? item.productVariant?.purchasePrice ?? item.product.purchasePrice;
    const lineCost = unitCost * item.quantity;

    const orderSubtotal = orderSubtotals.get(item.orderId) || 0;
    const ratio = orderSubtotal > 0 ? lineTotal / orderSubtotal : 0;
    const lineDiscount = (item.order.discountAmount || 0) * ratio;
    const lineProfit = lineTotal - lineCost - lineDiscount;

    totalSales += lineTotal;
    totalCost += lineCost;
    totalDiscount += lineDiscount;
    totalProfit += lineProfit;

    return {
      id: item.id,
      product: item.product,
      productVariant: item.productVariant,
      price: item.price,
      quantity: item.quantity,
      unitCost,
      lineTotal,
      lineCost,
      lineDiscount,
      lineProfit,
      order: item.order,
    };
  });

  return {
    items: result,
    totals: { totalSales, totalCost, totalDiscount, totalProfit },
  };
};

export const ProfitLossService = {
  getProfitLossSummary,
  getProfitLossItems,
};
