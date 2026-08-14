import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

// Sums earned/withdrawn/pending for a shop (or platform-wide when shopId is omitted)
const computeWalletBalance = async (shopId?: string) => {
  const shopFilter = shopId ? { shopId } : {};

  const [earned, withdrawn, pending] = await Promise.all([
    prisma.orderItem.aggregate({
      where: {
        ...shopFilter,
        status: { not: "CANCELLED" },
        order: { paymentStatus: "PAID" },
      },
      _sum: { vendorEarning: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { ...shopFilter, status: "APPROVED" },
      _sum: { amount: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { ...shopFilter, status: "PENDING" },
      _sum: { amount: true },
    }),
  ]);

  const totalEarned = earned._sum.vendorEarning || 0;
  const totalWithdrawn = withdrawn._sum.amount || 0;
  const totalPending = pending._sum.amount || 0;

  return {
    totalEarned,
    totalWithdrawn,
    totalPending,
    availableBalance: totalEarned - totalWithdrawn - totalPending,
  };
};

const createRequest = async (
  vendorId: string,
  payload: {
    amount: number;
    payoutMethod: "MOBILE_BANKING" | "BANK_TRANSFER";
    mobileBankingProvider?: "BKASH" | "NAGAD";
    mobileNumber?: string;
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankBranch?: string;
    bankRoutingNumber?: string;
  },
) => {
  const shop = await getShopForVendor(vendorId);

  const { availableBalance } = await computeWalletBalance(shop.id);
  if (payload.amount > availableBalance) {
    throw new AppError(
      status.BAD_REQUEST,
      `Requested amount exceeds your available balance (৳${availableBalance.toFixed(2)})`,
    );
  }

  return prisma.withdrawalRequest.create({
    data: {
      ...payload,
      shopId: shop.id,
    },
  });
};

const getMyRequests = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await getShopForVendor(vendorId);

  return new QueryBuilder(prisma.withdrawalRequest, queryParams, {
    filterableFields: ["status"],
  })
    .filter()
    .where({ shopId: shop.id })
    .sort()
    .paginate()
    .execute();
};

const getMyWalletSummary = async (vendorId: string) => {
  const shop = await getShopForVendor(vendorId);
  return computeWalletBalance(shop.id);
};

const getAllRequests = async (queryParams: IQueryParams) => {
  return new QueryBuilder(prisma.withdrawalRequest, queryParams, {
    filterableFields: ["status", "shopId"],
  })
    .filter()
    .sort()
    .paginate()
    .include({ shop: { select: { id: true, name: true, vendorId: true } } })
    .execute();
};

const getPlatformWalletSummary = async () => {
  return computeWalletBalance();
};

const approveRequest = async (id: string, adminUserId: string, note?: string) => {
  return prisma.$transaction(async (tx) => {
    const request = await tx.withdrawalRequest.findUnique({ where: { id } });
    if (!request) {
      throw new AppError(status.NOT_FOUND, "Withdrawal request not found");
    }
    if (request.status !== "PENDING") {
      throw new AppError(status.BAD_REQUEST, "This request has already been reviewed");
    }

    const [earnedAgg, withdrawnAgg] = await Promise.all([
      tx.orderItem.aggregate({
        where: {
          shopId: request.shopId,
          status: { not: "CANCELLED" },
          order: { paymentStatus: "PAID" },
        },
        _sum: { vendorEarning: true },
      }),
      tx.withdrawalRequest.aggregate({
        where: { shopId: request.shopId, status: "APPROVED" },
        _sum: { amount: true },
      }),
    ]);

    const totalEarned = earnedAgg._sum.vendorEarning || 0;
    const totalWithdrawn = withdrawnAgg._sum.amount || 0;

    if (totalWithdrawn + request.amount > totalEarned) {
      throw new AppError(
        status.BAD_REQUEST,
        "Insufficient available balance to approve this request — the seller's balance has changed since submission.",
      );
    }

    return tx.withdrawalRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        adminNote: note,
        reviewedAt: new Date(),
        reviewedByAdminId: adminUserId,
      },
    });
  });
};

const rejectRequest = async (id: string, adminUserId: string, note: string) => {
  const request = await prisma.withdrawalRequest.findUnique({ where: { id } });
  if (!request) {
    throw new AppError(status.NOT_FOUND, "Withdrawal request not found");
  }
  if (request.status !== "PENDING") {
    throw new AppError(status.BAD_REQUEST, "This request has already been reviewed");
  }

  return prisma.withdrawalRequest.update({
    where: { id },
    data: {
      status: "REJECTED",
      adminNote: note,
      reviewedAt: new Date(),
      reviewedByAdminId: adminUserId,
    },
  });
};

export const WithdrawalService = {
  createRequest,
  getMyRequests,
  getMyWalletSummary,
  getAllRequests,
  getPlatformWalletSummary,
  approveRequest,
  rejectRequest,
};
