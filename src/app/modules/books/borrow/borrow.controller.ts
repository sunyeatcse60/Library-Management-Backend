import { Request, Response } from "express";
import { Borrow } from "./borrow.model.js";
import { Book } from "../books.model.js";



const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    // Step 1: Update Book Copies using static method
    await (Book as any).borrowBook(book, quantity);

    // Step 2: Save borrow record
    const borrowRecord = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to borrow book",
    });
  }
};




export const borrowedBooksSummary = async (req : Request, res : Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      {
        $unwind: "$bookDetails"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving borrowed books summary"
    });
  }
};



export const borrowController = { borrowBook, borrowedBooksSummary };
