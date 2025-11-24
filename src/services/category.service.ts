// src/services/category.service.ts

import { Category } from "../models/category.model";

export const CategoryService = {
  async createCategory(data: { name: string; description?: string }) {
    const exists = await Category.findOne({ name: data.name });
    if (exists) throw new Error("Category already exists");

    return Category.create(data);
  },

  async getCategories() {
    return Category.find().sort({ createdAt: -1 });
  },

  async getCategoryById(id: string) {
    return Category.findById(id);
  },

  async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteCategory(id: string) {
    return Category.findByIdAndDelete(id);
  },
};
