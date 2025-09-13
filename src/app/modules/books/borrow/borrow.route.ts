import { Router } from "express";
import { borrowController } from "./borrow.controller.js";

const router = Router();

router.post("/borrow", borrowController.borrowBook);
router.get("/borrow", borrowController.borrowedBooksSummary)

export const borrowRoutes = router;
