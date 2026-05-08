import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { CategoryRoutes } from "../module/category/category.route";
import { ShopRoutes } from "../module/shop/shop.route";
import { ProductRoutes } from "../module/product/product.route";
import { CartRoutes } from "../module/cart/cart.route";
import { OrderRoutes } from "../module/order/order.route";
import { ReviewRoutes } from "../module/review/review.route";
import { AnalyticsRoutes } from "../module/analytics/analytics.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/categories", CategoryRoutes);
router.use("/shops", ShopRoutes);
router.use("/products", ProductRoutes);
router.use("/cart", CartRoutes);
router.use("/orders", OrderRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/analytics", AnalyticsRoutes);

export const IndexRoutes = router;
