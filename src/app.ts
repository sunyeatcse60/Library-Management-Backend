import express, { Request, Response } from "express";
import { bookRoutes } from "./app/modules/books/books.route.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", bookRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Library Management System",
  });
});

export default app;
