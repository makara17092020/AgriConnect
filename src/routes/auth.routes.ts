// src/routes/auth.routes.ts
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.model"; // user model
import Admin from "../models/admin.model"; // admin model

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User and Admin authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user (cannot register as admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or forbidden
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Cannot register as admin. Use different email." });
    }

    // Check if email is user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user or admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@agri.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check admin first
    let user = await Admin.findOne({ email });
    let role = "Admin";

    if (!user) {
      // Check user
      user = await User.findOne({ email });
      role = "User";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: (user as any).name,
        email: user.email,
        role,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user or admin
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", async (_req: Request, res: Response) => {
  return res.json({
    message: "Logout successful. Please delete the token on client side.",
  });
});

export default router;
