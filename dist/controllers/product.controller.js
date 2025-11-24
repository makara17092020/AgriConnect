"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("../services/product.service");
const productService = new product_service_1.ProductService();
exports.productController = {
    createProduct: async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const product = await productService.createProduct(req.body, userId);
            return res.status(201).json(product);
        }
        catch (err) {
            console.error("Create Product Error:", err.message);
            return res.status(400).json({ error: err.message });
        }
    },
    getAllProducts: async (_req, res) => {
        try {
            const products = await productService.getAllProducts();
            return res.json(products);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Product id is required" });
            }
            const product = await productService.getProductById(id);
            return res.json(product);
        }
        catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Product id is required" });
            }
            const product = await productService.updateProduct(id, req.body);
            return res.json(product);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Product id is required" });
            }
            await productService.deleteProduct(id);
            return res.json({ message: "Product deleted" });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
};
//# sourceMappingURL=product.controller.js.map