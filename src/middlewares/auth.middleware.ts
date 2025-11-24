// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/jwt.type";
import Farmer, { IFarmer } from "../models/farmer.model";

// Extend express Request
export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
  farmerId?: string;
}

// -------------------- Protect Middleware --------------------
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IJwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Save user into req
    req.user = decoded;

    // OPTIONAL: Auto-load farmerId for farmer users
    const farmer = (await Farmer.findOne({
      userId: decoded.id,
    })) as IFarmer | null;

    if (farmer) {
      req.farmerId = farmer._id.toString();
    }

    next();
    return; // FIXED TS7030
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return; // FIXED TS7030
  }
};

// -------------------- Role Authorization --------------------
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !req.user.roles) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }

    next();
    return;
  };
};
