import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { WithdrawalController } from "./withdrawal.controller";
import {
  approveWithdrawalZodSchema,
  createWithdrawalRequestZodSchema,
  rejectWithdrawalZodSchema,
} from "./withdrawal.validation";

const router = Router();

// SELLER specific routes
router.post(
  "/",
  checkAuth(Role.SELLER),
  validateRequest(createWithdrawalRequestZodSchema),
  WithdrawalController.createRequest,
);

router.get(
  "/my-requests",
  checkAuth(Role.SELLER),
  WithdrawalController.getMyRequests,
);

router.get(
  "/my-summary",
  checkAuth(Role.SELLER),
  WithdrawalController.getMyWalletSummary,
);

// ADMIN specific routes
router.get(
  "/summary",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  WithdrawalController.getPlatformWalletSummary,
);

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  WithdrawalController.getAllRequests,
);

router.patch(
  "/:id/approve",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(approveWithdrawalZodSchema),
  WithdrawalController.approveRequest,
);

router.patch(
  "/:id/reject",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(rejectWithdrawalZodSchema),
  WithdrawalController.rejectRequest,
);

export const WithdrawalRoutes = router;
