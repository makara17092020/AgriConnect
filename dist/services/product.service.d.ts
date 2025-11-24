export declare class ProductService {
    /**
     * Create new product and automatically link the user → farmer → product
     */
    createProduct(data: any, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/product.model").IProduct, {}, {}> & import("../models/product.model").IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    /**
     * Get all products with farmer info populated
     */
    getAllProducts(): Promise<(import("mongoose").Document<unknown, {}, import("../models/product.model").IProduct, {}, {}> & import("../models/product.model").IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    /**
     * Get single product by ID
     */
    getProductById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/product.model").IProduct, {}, {}> & import("../models/product.model").IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    /**
     * Update a product
     */
    updateProduct(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("../models/product.model").IProduct, {}, {}> & import("../models/product.model").IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    /**
     * Delete a product
     */
    deleteProduct(id: string): Promise<import("mongoose").Document<unknown, {}, import("../models/product.model").IProduct, {}, {}> & import("../models/product.model").IProduct & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=product.service.d.ts.map