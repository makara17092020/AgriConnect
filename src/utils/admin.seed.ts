import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/admin.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@agri.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "password123";

    const existing = await Admin.findOne({ email: adminEmail });
    if (!existing) {
      await Admin.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword, // plain password, pre-save hook hashes it
        role: "Admin",
      });

      console.log("Admin seeded successfully");
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    } else {
      console.log("Admin already exists");
    }

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exit(1);
  }
};

seedAdmin();
