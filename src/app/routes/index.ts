import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { CategoryRoutes } from "../module/category/category.route";
import { ShopRoutes } from "../module/shop/shop.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/categories", CategoryRoutes);
router.use("/shops", ShopRoutes);

export const IndexRoutes = router;
