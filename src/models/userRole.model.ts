import mongoose, { Schema, Document, Types } from "mongoose";
import { IRole } from "./role.model";

export interface IUserRole extends Document {
  userId: Types.ObjectId;
  roleId: Types.ObjectId | IRole;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserRoleSchema: Schema<IUserRole> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserRole>("UserRole", UserRoleSchema);
