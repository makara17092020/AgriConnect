import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User, { IUser } from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import UserRole, { IUserRole } from "../models/userRole.model";
import { IRegisterInput, ILoginInput, IAuthResponse } from "../types/auth.type";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------ Register ------------------
export const registerUser = async (
  data: IRegisterInput
): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("User already exists");

  // Create user (password hashed by pre-save)
  const user: IUser = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone, // <-- include phone here
  });

  // Assign default "User" role in join table
  const roleDoc = await Role.findOne({ name: "User" });
  if (!roleDoc) throw new Error("Default role 'User' not found");

  await UserRole.create({ userId: user._id, roleId: roleDoc._id });

  // Build roles array dynamically from join table
  const roles = [roleDoc.name];

  const token = jwt.sign({ id: user._id, roles }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "", // fallback to empty string
      roles, // array of role names
    },
  };
};

// ------------------ Login ------------------
export const loginUser = async (data: ILoginInput): Promise<IAuthResponse> => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Get roles from join table
  const userRoles = (await UserRole.find({ userId: user._id }).populate(
    "roleId"
  )) as IUserRole[];
  const roles = userRoles.map((ur) => (ur.roleId as IRole).name);

  const token = jwt.sign({ id: user._id, roles }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles,
      phone: user.phone || "",
    },
  };
};

// ------------------ Add roles to existing user ------------------
export const addRolesToUser = async (userId: string, newRoles: string[]) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  for (const roleName of newRoles) {
    const roleDoc = await Role.findOne({ name: roleName });
    if (!roleDoc) continue;

    const exists = await UserRole.findOne({
      userId: user._id,
      roleId: roleDoc._id,
    });
    if (!exists) {
      await UserRole.create({ userId: user._id, roleId: roleDoc._id });
    }
  }

  // Return updated roles dynamically from join table
  const userRoles = (await UserRole.find({ userId: user._id }).populate(
    "roleId"
  )) as IUserRole[];
  return userRoles.map((ur) => (ur.roleId as IRole).name);
};

// ------------------ Logout ------------------
export const logoutUser = async () => {
  return { message: "Logout successful. Delete token on client side." };
};
