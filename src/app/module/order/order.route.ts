import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { OrderController } from "./order.controller";
import {
  createOrderZodSchema,
  updateOrderStatusZodSchema,
  updatePaymentStatusZodSchema,
} from "./order.validation";

const router = Router();

// Create order & Get My orders (Any user)
router.post(
  "/",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createOrderZodSchema),
  OrderController.createOrder,
);

router.get(
  "/my-orders",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getMyOrders,
);

// Get Vendor's orders
router.get(
  "/vendor-orders",
  checkAuth(Role.SELLER),
  OrderController.getVendorOrders,
);

// Admin only routes
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getAllOrders,
);

router.patch(
  "/:id/status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateOrderStatusZodSchema),
  OrderController.updateOrderStatus,
);

router.patch(
  "/:id/payment-status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updatePaymentStatusZodSchema),
  OrderController.updatePaymentStatus,
);

// Get single order detail
router.get(
  "/:id",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getOrderById,
);

export const OrderRoutes = router;
