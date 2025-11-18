import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model";
import Role from "../models/role.model";
import UserRole from "../models/userRole.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@agri.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "password123";

    // Check if admin already exists
    let adminUser = await User.findOne({ email: adminEmail });
    // Create admin user if not exists
    if (!adminUser) {
      adminUser = await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword, // ✔️ let pre-save hash it
        role: "Admin",
      });
      console.log("Admin user created:", adminEmail);
    }

    // Find Admin role
    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole)
      throw new Error("Admin role not found. Please seed roles first.");

    // Create UserRole link if it doesn't exist
    const existingUserRole = await UserRole.findOne({
      userId: adminUser._id,
      roleId: adminRole._id,
    });
    if (!existingUserRole) {
      await UserRole.create({ userId: adminUser._id, roleId: adminRole._id });
      console.log("Admin role linked to admin user.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
};

seedAdmin();
