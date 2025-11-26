import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  total_amount: number;
  status: string;
  shipping_address: string;
  payment_method: string;
  order_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    shipping_address: { type: String, required: true },
    payment_method: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
