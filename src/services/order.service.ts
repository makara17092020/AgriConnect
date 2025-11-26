import { CartService } from "./cart.service";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/orderitem.model";

export class OrderService {
  static async checkout(
    userId: string,
    shipping_address: string,
    payment_method: string
  ) {
    const cartData = await CartService.getCart(userId);
    if (!cartData || cartData.items.length === 0)
      throw new Error("Cart is empty");

    const total_amount = cartData.items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );

    const order = new Order({
      customerId: userId,
      total_amount,
      shipping_address,
      payment_method,
    });
    await order.save();

    const orderItems = cartData.items.map((item) => ({
      orderId: order._id,
      productId: item.productId._id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.quantity * item.unit_price,
    }));

    await OrderItem.insertMany(orderItems);
    await CartService.clearCart(userId);

    return { order, orderItems };
  }
}
