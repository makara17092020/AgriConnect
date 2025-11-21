// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/jwt.type";

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
}

// -------------------- Protect Middleware --------------------
export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
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

    req.user = decoded;
    next();
    return; // FIX "not all code paths return a value"
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return; // FIX
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
