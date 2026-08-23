import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { OrderReturnController } from "./orderReturn.controller";
import { processOrderReturnZodSchema } from "./orderReturn.validation";

const router = Router();

// Sellers process returns for their own shop's items (mirrors updateOrderItem/updateOrderItemStatus)
router.post(
  "/",
  checkAuth(Role.SELLER),
  validateRequest(processOrderReturnZodSchema),
  OrderReturnController.processOrderReturn,
);

// Seller's own return history (their shop's items only)
router.get(
  "/vendor-returns",
  checkAuth(Role.SELLER),
  OrderReturnController.getVendorOrderReturns,
);

// Admin-only: read-only report of all returns across the platform
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  OrderReturnController.getAllOrderReturns,
);

// Return history for a single order — shown to both Admin (report) and Seller (own order view)
router.get(
  "/order/:orderId",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderReturnController.getReturnsByOrderId,
);

export const OrderReturnRoutes = router;
