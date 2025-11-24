import { Request, Response } from "express";
import { CategoryParams, CreateCategoryDto, UpdateCategoryDto } from "../types/category.type";
export declare const createCategory: (req: Request<{}, {}, CreateCategoryDto>, res: Response) => Promise<void>;
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryById: (req: Request<CategoryParams>, res: Response) => Promise<void>;
export declare const updateCategory: (req: Request<CategoryParams, {}, UpdateCategoryDto>, res: Response) => Promise<void>;
export declare const deleteCategory: (req: Request<CategoryParams>, res: Response) => Promise<void>;
//# sourceMappingURL=category.controller.d.ts.map