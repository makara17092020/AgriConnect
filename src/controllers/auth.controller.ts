import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "../services/auth.service";
import { IRegisterInput, ILoginInput } from "../types/auth.type";

export const authRegister = async (req: Request, res: Response) => {
  try {
    const data: IRegisterInput = req.body;
    const result = await registerUser(data);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  try {
    const data: ILoginInput = req.body;
    const result = await loginUser(data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const authLogout = async (_req: Request, res: Response) => {
  const result = await logoutUser();
  res.status(200).json(result);
};
