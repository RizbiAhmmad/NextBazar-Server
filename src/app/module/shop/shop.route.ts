import { Router, Request, Response, NextFunction } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ShopController } from "./shop.controller";
import {
  createShopZodSchema,
  updateShopStatusZodSchema,
  updateShopZodSchema,
} from "./shop.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

// Public route (Moved to the bottom to prevent intercepting /my-shop)

// SELLER specific routes
router.post(
  "/",
  checkAuth(Role.SELLER, Role.USER),
  multerUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createShopZodSchema),
  ShopController.createShop,
);

router.get(
  "/my-shop",
  checkAuth(Role.SELLER),
  ShopController.getMyShop,
);

// Public route
router.get("/:id", ShopController.getShopById);


router.patch(
  "/:id",
  checkAuth(Role.SELLER),
  multerUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateShopZodSchema),
  ShopController.updateShop,
);

// ADMIN specific routes
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ShopController.getAllShops,
);

router.patch(
  "/:id/status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateShopStatusZodSchema),
  ShopController.changeShopStatus,
);

export const ShopRoutes = router;
