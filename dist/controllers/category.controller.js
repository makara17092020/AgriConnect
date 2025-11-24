"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const category_service_1 = require("../services/category.service");
// 📌 Create Category
const createCategory = async (req, res) => {
    try {
        const category = await category_service_1.CategoryService.createCategory(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createCategory = createCategory;
// 📌 Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await category_service_1.CategoryService.getCategories();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCategories = getCategories;
// 📌 Get Category By ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_service_1.CategoryService.getCategoryById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCategoryById = getCategoryById;
// 📌 Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_service_1.CategoryService.updateCategory(id, req.body);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateCategory = updateCategory;
// 📌 Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_service_1.CategoryService.deleteCategory(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map