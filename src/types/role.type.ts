// src/types/role.type.ts
import { Types } from "mongoose";

export interface IRoleType {
  _id: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
