import { Response } from "express";
import { CartService } from "../services/cart.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class CartController {
  static async addToCart(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { productId, quantity } = req.body;

      if (!productId)
        return res.status(400).json({ error: "productId is required" });

      const qty = quantity && quantity > 0 ? quantity : 1;
      const cartItem = await CartService.addToCart(userId, productId, qty);

      return res.status(200).json(cartItem);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async getCart(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const cartData = await CartService.getCart(userId);

      if (!cartData) return res.status(404).json({ error: "Cart not found" });

      return res.status(200).json(cartData);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async removeFromCart(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { productId } = req.params;

      if (!productId)
        return res.status(400).json({ error: "productId is required" });

      const cartItem = await CartService.removeFromCart(userId, productId);
      return res.status(200).json(cartItem);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async clearCart(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      await CartService.clearCart(userId);
      return res.status(200).json({ message: "Cart cleared" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
