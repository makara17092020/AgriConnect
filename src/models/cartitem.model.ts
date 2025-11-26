import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  cartId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  unit_price: number;
}

const CartItemSchema = new Schema<ICartItem>({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unit_price: { type: Number, required: true },
});

export const CartItem = mongoose.model<ICartItem>("CartItem", CartItemSchema);
