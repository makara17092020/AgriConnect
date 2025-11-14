import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IRegisterInput, ILoginInput, IAuthResponse } from "../types/auth.type";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------ Register User ------------------
export const registerUser = async (
  data: IRegisterInput
): Promise<IAuthResponse> => {
  const existingUser = (await User.findOne({
    email: data.email,
  })) as IUser | null;
  if (existingUser) throw new Error("User already exists");

  const newUser: IUser = await User.create({
    name: data.name,
    email: data.email,
    password: data.password, // 🔹 do NOT hash here
    role: "User",
    phone: data.phone,
  });

  const userId = newUser._id.toString();

  const token = jwt.sign(
    { id: userId, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET || "supersecretkey",
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: userId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      ...(newUser.phone && { phone: newUser.phone }),
    },
  };
};

// ------------------ Login User ------------------
export const loginUser = async (data: ILoginInput): Promise<IAuthResponse> => {
  const user = (await User.findOne({ email: data.email })) as IUser | null;
  console.log("User found:", user);

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) throw new Error("Invalid credentials");

  const userId = user._id.toString();

  const token = jwt.sign(
    { id: userId, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.phone && { phone: user.phone }),
    },
  };
};

// ------------------ Logout User ------------------
export const logoutUser = async (): Promise<{ message: string }> => {
  return {
    message: "Logout successful. Please delete the token on client side.",
  };
};
