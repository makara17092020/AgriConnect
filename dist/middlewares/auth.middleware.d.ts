import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../types/jwt.type";
export interface AuthenticatedRequest extends Request {
    user?: IJwtPayload;
    farmerId?: string;
}
export declare const protect: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authorizeRoles: (...allowedRoles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map