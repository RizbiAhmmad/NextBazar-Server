import { Router, Request, Response, NextFunction } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ProductController } from "./product.controller";
import {
  createProductZodSchema,
  updateProductZodSchema,
} from "./product.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

// Public routes
router.get("/", ProductController.getAllProducts);

// Seller routes (must be declared before "/:id" to avoid being swallowed by the param route)
router.get(
  "/generate-sku",
  checkAuth(Role.SELLER),
  ProductController.generateSku,
);

router.get("/:id", ProductController.getProductById);
router.get("/slug/:slug", ProductController.getProductBySlug);

// Seller routes
router.post(
  "/",
  checkAuth(Role.SELLER),
  multerUpload.array("images", 5), // allow up to 5 images
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(createProductZodSchema),
  ProductController.createProduct,
);

router.patch(
  "/:id",
  checkAuth(Role.SELLER),
  multerUpload.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(updateProductZodSchema),
  ProductController.updateProduct,
);

router.delete(
  "/:id",
  checkAuth(Role.SELLER),
  ProductController.deleteProduct,
);

// Variant-specific routes
router.get(
  "/:id/variants",
  ProductController.getProductVariants,
);

router.patch(
  "/:productId/variants/:variantId/image",
  checkAuth(Role.SELLER),
  multerUpload.single("image"),
  ProductController.uploadVariantImage,
);

export const ProductRoutes = router;
