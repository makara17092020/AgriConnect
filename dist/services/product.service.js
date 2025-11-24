"use strict";
// src/services/product.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("../models/product.model");
const farmer_service_1 = require("./farmer.service");
const farmerService = new farmer_service_1.FarmerService();
class ProductService {
    /**
     * Create new product and automatically link the user → farmer → product
     */
    async createProduct(data, userId) {
        console.log("🔍 createProduct() received userId:", userId);
        if (!userId) {
            throw new Error("UserId is required to create a product");
        }
        // Ensure the user has a farmer profile (auto-create)
        const farmer = await farmerService.ensureFarmer(userId);
        // Create product
        const newProduct = await product_model_1.Product.create({
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
        return product_model_1.Product.find().populate("farmerId", "name email");
    }
    /**
     * Get single product by ID
     */
    async getProductById(id) {
        const product = await product_model_1.Product.findById(id).populate("farmerId", "name email");
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
    /**
     * Update a product
     */
    async updateProduct(id, data) {
        const updated = await product_model_1.Product.findByIdAndUpdate(id, data, {
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
    async deleteProduct(id) {
        const deleted = await product_model_1.Product.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error("Product not found");
        }
        return deleted;
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map