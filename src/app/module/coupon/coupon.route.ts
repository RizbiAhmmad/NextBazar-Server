import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { CouponController } from "./coupon.controller";
import { createCouponZodSchema } from "./coupon.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.SELLER),
  validateRequest(createCouponZodSchema),
  CouponController.createCoupon
);

router.get(
  "/shop/:shopId",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  CouponController.getMyCoupons
);

router.get(
  "/:id",
  CouponController.getCouponById
);

router.patch(
  "/:id/status",
  checkAuth(Role.SELLER),
  CouponController.toggleCouponStatus
);

router.delete(
  "/:id",
  checkAuth(Role.SELLER),
  CouponController.deleteCoupon
);

// Public route — validate coupon at checkout
router.post("/validate", CouponController.validateCoupon);

export const CouponRoutes = router;
