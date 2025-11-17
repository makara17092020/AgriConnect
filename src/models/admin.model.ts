import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

// Hash password automatically before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
