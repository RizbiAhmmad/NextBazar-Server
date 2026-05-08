import status from "http-status";
import { prisma } from "../../lib/prisma";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import AppError from "../../errorHelpers/AppError";
import { ShopStatus } from "../../../generated/prisma/enums";

const createShop = async (vendorId: string, payload: any) => {
  // Check if vendor already has a shop
  const existingShop = await prisma.shop.findUnique({
    where: { vendorId },
  });

  if (existingShop) {
    throw new AppError(status.BAD_REQUEST, "You already have a shop registered");
  }

  const shop = await prisma.shop.create({
    data: {
      ...payload,
      vendorId,
      status: ShopStatus.PENDING, // Always pending initially
    },
  });

  return shop;
};

const getAllShops = async (queryParams: IQueryParams) => {
  const shopQuery = new QueryBuilder(prisma.shop, queryParams, {
    searchableFields: ["name"],
    filterableFields: ["status"],
  })
    .search()
    .filter()
    .sort()
    .paginate();

  const result = await shopQuery.execute();
  return result;
};

const getShopById = async (id: string) => {
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: {
      vendor: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  return shop;
};

const getMyShop = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({
    where: { vendorId },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }

  return shop;
};

const updateShop = async (id: string, vendorId: string, payload: any) => {
  const shop = await prisma.shop.findUnique({
    where: { id },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  // Only owner can update
  if (shop.vendorId !== vendorId) {
    throw new AppError(status.FORBIDDEN, "You are not the owner of this shop");
  }

  const updatedShop = await prisma.shop.update({
    where: { id },
    data: payload,
  });

  return updatedShop;
};

const changeShopStatus = async (id: string, shopStatus: ShopStatus) => {
  const shop = await prisma.shop.findUnique({
    where: { id },
  });

  if (!shop) {
    throw new AppError(status.NOT_FOUND, "Shop not found");
  }

  const updatedShop = await prisma.shop.update({
    where: { id },
    data: { status: shopStatus },
  });

  return updatedShop;
};

export const ShopService = {
  createShop,
  getAllShops,
  getShopById,
  getMyShop,
  updateShop,
  changeShopStatus,
};
