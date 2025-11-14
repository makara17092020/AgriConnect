import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: "admin" | "farmer" | "customer";
}

const RoleSchema: Schema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IRole>("Role", RoleSchema);
