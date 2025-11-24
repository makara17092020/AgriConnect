export interface CreateProductDto {
    name: string;
    description: string;
    category: string;
    price: number;
    stock_quantity: number;
    unit: string;
}
export interface UpdateProductDto {
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    stock_quantity?: number;
    unit?: string;
}
//# sourceMappingURL=product.type.d.ts.map