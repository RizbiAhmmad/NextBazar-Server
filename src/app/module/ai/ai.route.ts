import express from "express";
import { AIController } from "./ai.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/generate-product-data",
  checkAuth(Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN),
  AIController.generateProductData,
);

export const AIRoutes = router;
