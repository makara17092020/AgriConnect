import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cartitem.model";
import { Product } from "../models/product.model";
import { Types } from "mongoose";

export class CartService {
  /**
   * Add a product to the user's cart
   */
  static async addToCart(userId: string, productId: string, quantity: number) {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    // Find or create the cart
    let cart = await Cart.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) {
      cart = new Cart({ userId: new Types.ObjectId(userId) });
      await cart.save();
    }

    // Find if the product is already in the cart
    let cartItem = await CartItem.findOne({
      cartId: cart._id,
      productId: new Types.ObjectId(productId),
    });

    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      cartItem.unit_price = product.price;
    } else {
      // Add new item
      cartItem = new CartItem({
        cartId: cart._id,
        productId: new Types.ObjectId(productId),
        quantity,
        unit_price: product.price,
      });
    }

    await cartItem.save();
    return cartItem;
  }

  /**
   * Get the user's cart with items
   */
  static async getCart(userId: string) {
    const cart = await Cart.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) return null;

    const items = await CartItem.find({ cartId: cart._id }).populate(
      "productId"
    );
    return { cart, items };
  }

  /**
   * Remove a product from the cart
   */
  static async removeFromCart(userId: string, productId: string) {
    const cart = await Cart.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) throw new Error("Cart not found");

    const cartItem = await CartItem.findOneAndDelete({
      cartId: cart._id,
      productId: new Types.ObjectId(productId),
    });

    if (!cartItem) throw new Error("Item not found in cart");
    return cartItem;
  }

  /**
   * Clear all items in the user's cart
   */
  static async clearCart(userId: string) {
    const cart = await Cart.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) return null;

    await CartItem.deleteMany({ cartId: cart._id });
    return true;
  }
}
