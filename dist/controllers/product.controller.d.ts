import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
export declare const productController: {
    createProduct: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllProducts: (_req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProductById: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProduct: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProduct: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=product.controller.d.ts.map