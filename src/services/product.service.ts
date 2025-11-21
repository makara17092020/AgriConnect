// src/services/product.service.ts

import { Product } from "../models/product.model";
import { FarmerService } from "./farmer.service";

const farmerService = new FarmerService();

export class ProductService {
  /**
   * Create new product and automatically link the user → farmer → product
   */
  async createProduct(data: any, userId: string) {
    console.log("🔍 createProduct() received userId:", userId);

    if (!userId) {
      throw new Error("UserId is required to create a product");
    }

    // Ensure the user has a farmer profile (auto-create)
    const farmer = await farmerService.ensureFarmer(userId);

    // Create product
    const newProduct = await Product.create({
      ...data,
      farmerId: farmer._id,
    });

    console.log("✔ Product created with farmer:", farmer._id);

    return newProduct;
  }

  /**
   * Get all products with farmer info populated
   */
  async getAllProducts() {
    return Product.find().populate("farmerId", "name email");
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: string) {
    const product = await Product.findById(id).populate(
      "farmerId",
      "name email"
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  /**
   * Update a product
   */
  async updateProduct(id: string, data: any) {
    const updated = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Product not found");
    }

    return updated;
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string) {
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error("Product not found");
    }

    return deleted;
  }
}
