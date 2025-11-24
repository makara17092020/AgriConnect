"use strict";
// src/services/category.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = require("../models/category.model");
exports.CategoryService = {
    async createCategory(data) {
        const exists = await category_model_1.Category.findOne({ name: data.name });
        if (exists)
            throw new Error("Category already exists");
        return category_model_1.Category.create(data);
    },
    async getCategories() {
        return category_model_1.Category.find().sort({ createdAt: -1 });
    },
    async getCategoryById(id) {
        return category_model_1.Category.findById(id);
    },
    async updateCategory(id, data) {
        return category_model_1.Category.findByIdAndUpdate(id, data, { new: true });
    },
    async deleteCategory(id) {
        return category_model_1.Category.findByIdAndDelete(id);
    },
};
//# sourceMappingURL=category.service.js.map