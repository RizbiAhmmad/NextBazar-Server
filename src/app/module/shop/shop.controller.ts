import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ShopService } from "./shop.service";
import { IQueryParams } from "../../interfaces/query.interface";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = { ...req.body };

  if (req.files && typeof req.files === "object") {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.logo && files.logo[0]) {
      payload.logo = files.logo[0].path;
    }
    if (files.banner && files.banner[0]) {
      payload.banner = files.banner[0].path;
    }
  }

  const result = await ShopService.createShop(user.userId as string, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Shop registered successfully and is pending approval",
    data: result,
  });
});

const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await ShopService.getAllShops(
    req.query as IQueryParams,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Shops fetched successfully",
    data,
    meta,
  });
});

const getShopById = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.getShopById(req.params.id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Shop details fetched successfully",
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ShopService.getMyShop(user.userId as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My shop details fetched successfully",
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const payload = { ...req.body };

  if (req.files && typeof req.files === "object") {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.logo && files.logo[0]) {
      payload.logo = files.logo[0].path;
    }
    if (files.banner && files.banner[0]) {
      payload.banner = files.banner[0].path;
    }
  }

  const result = await ShopService.updateShop(
    id as string,
    user.userId as string,
    payload,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
});

const changeShopStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status: shopStatus } = req.body;

  const result = await ShopService.changeShopStatus(
    id as string,
    shopStatus,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Shop status updated successfully",
    data: result,
  });
});

export const ShopController = {
  createShop,
  getAllShops,
  getShopById,
  getMyShop,
  updateShop,
  changeShopStatus,
};
