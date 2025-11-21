// src/models/farmer.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IFarmer extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

const farmerSchema = new Schema<IFarmer>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IFarmer>("Farmer", farmerSchema);
