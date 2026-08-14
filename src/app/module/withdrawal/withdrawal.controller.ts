import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { WithdrawalService } from "./withdrawal.service";
import { IQueryParams } from "../../interfaces/query.interface";

const createRequest = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await WithdrawalService.createRequest(
    user.userId as string,
    req.body,
  );

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Withdrawal request submitted successfully",
    data: result,
  });
});

const getMyRequests = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { data, meta } = await WithdrawalService.getMyRequests(
    user.userId as string,
    req.query as IQueryParams,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Withdrawal requests fetched successfully",
    data,
    meta,
  });
});

const getMyWalletSummary = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await WithdrawalService.getMyWalletSummary(user.userId as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Wallet summary fetched successfully",
    data: result,
  });
});

const getAllRequests = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await WithdrawalService.getAllRequests(
    req.query as IQueryParams,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Withdrawal requests fetched successfully",
    data,
    meta,
  });
});

const getPlatformWalletSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await WithdrawalService.getPlatformWalletSummary();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Platform wallet summary fetched successfully",
    data: result,
  });
});

const approveRequest = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const { note } = req.body;

  const result = await WithdrawalService.approveRequest(
    id as string,
    user.userId as string,
    note,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Withdrawal request approved successfully",
    data: result,
  });
});

const rejectRequest = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const { note } = req.body;

  const result = await WithdrawalService.rejectRequest(
    id as string,
    user.userId as string,
    note,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Withdrawal request rejected successfully",
    data: result,
  });
});

export const WithdrawalController = {
  createRequest,
  getMyRequests,
  getMyWalletSummary,
  getAllRequests,
  getPlatformWalletSummary,
  approveRequest,
  rejectRequest,
};
