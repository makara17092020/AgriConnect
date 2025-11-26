import { Response } from "express";
import { OrderService } from "../services/order.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class OrderController {
  static async checkout(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { shipping_address, payment_method } = req.body;

      if (!shipping_address || !payment_method) {
        return res
          .status(400)
          .json({ error: "shipping_address and payment_method are required" });
      }

      const result = await OrderService.checkout(
        userId,
        shipping_address,
        payment_method
      );
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
