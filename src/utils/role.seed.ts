import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/role.model";

dotenv.config();

const roles = [
  { name: "Admin", description: "Admin user with full access" },
  { name: "Farmer", description: "Farmer who can manage products" },
  { name: "User", description: "Regular user with limited access" },
];

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");

    for (const roleData of roles) {
      const existing = await Role.findOne({ name: roleData.name });
      if (!existing) {
        const role = await Role.create(roleData);
        console.log("Role created:", role.name, "-", role.description);
      }
    }

    console.log("All roles seeded");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedRoles();
