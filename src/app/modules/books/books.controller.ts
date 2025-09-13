import { Request, Response } from "express";
import { Book } from "./books.model.js";


// Creater book
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
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } 
};


// Get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    let { filter, sortBy, sort, limit } = req.query;

    const sortField = sortBy?.toString() || "createdAt";
    const sortOrder = sort?.toString() === "asc" ? 1 : -1;
    const maxLimit = parseInt(limit as string) || 10;

    const query: any = {};
    if (filter) {
      query.genre = filter.toString().toUpperCase();
    }

    const books = await Book.find(query).sort({ [sortField]: sortOrder }).limit(maxLimit);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// Get Book By ID
const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    res.status(200).json({ success: true, data: book });
  } 
  catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID"
    });
  }
};

// Update Book
const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } 
  catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid request"
    });
  }
};


// Delete Book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } 
  catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Invalid request"
    });
  }
};


export const bookController = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
