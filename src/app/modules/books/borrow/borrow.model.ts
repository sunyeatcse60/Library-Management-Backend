import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface.js";



const borrowSchema = new Schema<IBorrow>({
    book: { type: String, required: true },
    quantity: { type: Number, required: true },
    duedate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{
    timestamps : true,
    versionKey : false
}
);


export const Borrow = model<IBorrow>('Borrow', borrowSchema);