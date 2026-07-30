import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { SalesReportController } from "./sales-report.controller";

const router = Router();

router.get("/summary", checkAuth(Role.SELLER), SalesReportController.getSalesSummary);
router.get("/items", checkAuth(Role.SELLER), SalesReportController.getSalesReportItems);

export const SalesReportRoutes = router;
