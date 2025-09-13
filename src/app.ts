import express, { Request, Response } from "express";
import { bookRoutes } from "./app/modules/books/books.route.js";
import { borrowRoutes } from "./app/modules/books/borrow/borrow.route.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", bookRoutes);
app.use("/api/borrow", borrowRoutes);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Library Management System",
  });
});


app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
