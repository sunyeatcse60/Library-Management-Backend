import { model, Schema } from "mongoose";
import { IBook } from "./books.interface.js";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Book = model<IBook>("Book", bookSchema);
