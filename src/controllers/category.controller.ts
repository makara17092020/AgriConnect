import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import {
  CategoryParams,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category.type";

// 📌 Create Category
export const createCategory = async (
  req: Request<{}, {}, CreateCategoryDto>,
  res: Response
): Promise<void> => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 Get All Categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CategoryService.getCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get Category By ID
export const getCategoryById = async (
  req: Request<CategoryParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Update Category
export const updateCategory = async (
  req: Request<CategoryParams, {}, UpdateCategoryDto>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await CategoryService.updateCategory(id, req.body);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete Category
export const deleteCategory = async (
  req: Request<CategoryParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await CategoryService.deleteCategory(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
