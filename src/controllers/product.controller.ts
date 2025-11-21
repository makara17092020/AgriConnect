// src/controllers/product.controller.ts
import { Response } from "express";
import { ProductService } from "../services/product.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

const productService = new ProductService();

export const productController = {
  createProduct: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const product = await productService.createProduct(req.body, userId);
      return res.status(201).json(product);
    } catch (err: any) {
      console.error("Create Product Error:", err.message);
      return res.status(400).json({ error: err.message });
    }
  },

  getAllProducts: async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const products = await productService.getAllProducts();
      return res.json(products);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  getProductById: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Product id is required" });
      }

      const product = await productService.getProductById(id);
      return res.json(product);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  },

  updateProduct: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Product id is required" });
      }

      const product = await productService.updateProduct(id, req.body);
      return res.json(product);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  deleteProduct: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Product id is required" });
      }

      await productService.deleteProduct(id);
      return res.json({ message: "Product deleted" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
