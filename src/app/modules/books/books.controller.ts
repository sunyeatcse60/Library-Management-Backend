import { Request, Response } from "express";
import { Book } from "./books.model.js";

const createBook = async (req: Request, res: Response) => {
  try {

    const book = await Book.create(req.body);
    const { _id, ...rest } = book.toObject();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: { _id, ...rest },
    });
  }

   catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};


export const bookController = { createBook };
