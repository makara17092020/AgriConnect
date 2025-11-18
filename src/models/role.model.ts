import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string; // optional description
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleSchema: Schema<IRole> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }, // optional field
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", RoleSchema);
