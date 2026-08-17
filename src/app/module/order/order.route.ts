import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { OrderController } from "./order.controller";
import {
  createOrderZodSchema,
  updateOrderItemZodSchema,
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

// Seller/Vendor routes
router.get(
  "/vendor-orders",
  checkAuth(Role.SELLER),
  OrderController.getVendorOrders,
);

router.patch(
  "/items/:id/status",
  checkAuth(Role.SELLER),
  validateRequest(updateOrderStatusZodSchema),
  OrderController.updateOrderItemStatus,
);

router.patch(
  "/items/:id",
  checkAuth(Role.SELLER),
  validateRequest(updateOrderItemZodSchema),
  OrderController.updateOrderItem,
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

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.deleteOrder,
);

// Get single order detail
router.get(
  "/:id",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.getOrderById,
);

// Courier fraud check (based on the order's phone number)
router.get(
  "/:id/fraud-check",
  checkAuth(Role.USER, Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  OrderController.checkOrderFraud,
);

export const OrderRoutes = router;
