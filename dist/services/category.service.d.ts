export declare const CategoryService: {
    createCategory(data: {
        name: string;
        description?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../models/category.model").ICategory, {}, {}> & import("../models/category.model").ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../models/category.model").ICategory, {}, {}> & import("../models/category.model").ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getCategoryById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/category.model").ICategory, {}, {}> & import("../models/category.model").ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateCategory(id: string, data: {
        name?: string;
        description?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("../models/category.model").ICategory, {}, {}> & import("../models/category.model").ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/category.model").ICategory, {}, {}> & import("../models/category.model").ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=category.service.d.ts.map