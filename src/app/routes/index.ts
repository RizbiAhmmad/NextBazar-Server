import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { CategoryRoutes } from "../module/category/category.route";
import { ShopRoutes } from "../module/shop/shop.route";
import { ProductRoutes } from "../module/product/product.route";
import { CartRoutes } from "../module/cart/cart.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/categories", CategoryRoutes);
router.use("/shops", ShopRoutes);
router.use("/products", ProductRoutes);
router.use("/cart", CartRoutes);

export const IndexRoutes = router;
