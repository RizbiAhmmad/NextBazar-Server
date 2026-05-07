import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

router.get(
  "/me",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.getNewToken);
router.post(
  "/change-password",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER),
  AuthController.changePassword,
);
router.post(
  "/logout",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER),
  AuthController.logoutUser,
);

router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);
router.patch(
  "/update-profile",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER),
  multerUpload.single("file"),
  AuthController.updateProfile,
);

export const AuthRoutes = router;
