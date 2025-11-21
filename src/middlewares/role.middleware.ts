import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user || !user.roles) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const hasRole = user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }

    next();
  };
};
