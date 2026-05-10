import { prisma } from "../../lib/prisma";
import { Role } from "../../../generated/prisma/enums";

const getAdminAnalytics = async () => {
  const [
    totalUsers,
    totalVendors,
    totalShops,
    totalProducts,
    totalOrders,
    orderStats,
  ] = await Promise.all([
    prisma.user.count({ where: { role: Role.USER } }),
    prisma.user.count({ where: { role: Role.SELLER } }),
    prisma.shop.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  // Calculate monthly revenue trend (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyRevenue = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      totalAmount: true,
      createdAt: true,
    },
  });

  // Get product count by category
  const categoryDistribution = await prisma.category.findMany({
    select: {
      name: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return {
    summary: {
      totalUsers,
      totalVendors,
      totalShops,
      totalProducts,
      totalOrders,
      totalRevenue: orderStats._sum.totalAmount || 0,
    },
    monthlyRevenue,
    categoryDistribution,
  };
};

const getVendorAnalytics = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({
    where: { vendorId },
  });

  if (!shop) {
    return { message: "No shop found for this vendor" };
  }

  const [totalProducts, orderItemsStats] = await Promise.all([
    prisma.product.count({ where: { shopId: shop.id } }),
    prisma.orderItem.aggregate({
      where: { shopId: shop.id },
      _sum: {
        vendorEarning: true,
        quantity: true,
      },
      _count: {
        id: true,
      },
    }),
  ]);

  // Recent 5 sales
  const recentSales = await prisma.orderItem.findMany({
    where: { shopId: shop.id },
    include: {
      product: { select: { name: true, images: true } },
      order: { select: { createdAt: true, orderStatus: true } },
    },
    orderBy: { order: { createdAt: "desc" } },
    take: 5,
  });

  return {
    summary: {
      totalProducts,
      totalSales: orderItemsStats._count.id,
      totalEarnings: orderItemsStats._sum.vendorEarning || 0,
      itemsSold: orderItemsStats._sum.quantity || 0,
    },
    recentSales,
  };
};

const getUserAnalytics = async (userId: string) => {
  const [totalOrders, orderStats, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.aggregate({
      where: { userId },
      _sum: {
        totalAmount: true,
      },
    }),
    prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    summary: {
      totalOrders,
      totalSpending: orderStats._sum.totalAmount || 0,
    },
    recentOrders,
  };
};

export const AnalyticsService = {
  getAdminAnalytics,
  getVendorAnalytics,
  getUserAnalytics,
};
