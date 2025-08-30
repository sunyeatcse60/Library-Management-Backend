import { Router } from "express";
import { bookController } from "./books.controller.js";

const router = Router();

router.post("/books", bookController.createBook);

export const bookRoutes = router;
