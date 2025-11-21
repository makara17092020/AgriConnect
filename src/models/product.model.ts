// src/models/product.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  stock_quantity: number;
  unit: string;
  farmerId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "Farmer", required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
