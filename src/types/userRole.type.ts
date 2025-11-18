// src/types/userRole.type.ts
import { Types } from "mongoose";
import { IRoleType } from "./role.type";

export interface IUserRoleType {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  roleId: IRoleType; // populated role
  createdAt?: Date;
  updatedAt?: Date;
}
