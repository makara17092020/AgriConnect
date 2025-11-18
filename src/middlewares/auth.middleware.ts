import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthUser extends JwtPayload {
  id: string;
  email?: string;
  roles?: string[]; // multiple roles
}

// Extend Request
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

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
    ) as AuthUser;

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = decoded; // attach JWT payload to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
