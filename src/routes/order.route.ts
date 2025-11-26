import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Checkout cart and create an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shipping_address
 *               - payment_method
 *             properties:
 *               shipping_address:
 *                 type: string
 *                 description: Shipping address for the order
 *               payment_method:
 *                 type: string
 *                 description: Payment method (e.g., card, cash)
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post("/checkout", protect, OrderController.checkout);

export default router;
