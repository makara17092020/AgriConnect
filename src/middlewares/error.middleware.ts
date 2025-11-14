import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
