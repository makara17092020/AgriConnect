// src/services/farmer.service.ts
import User from "../models/user.model";
import Farmer from "../models/farmer.model";
import UserRole from "../models/userRole.model";
import Role from "../models/role.model";

export class FarmerService {
  // Ensure Farmer exists for the given userId
  async ensureFarmer(userId: string) {
    console.log("Checking farmer for user:", userId);

    // Find user
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Check if farmer already exists
    let farmer = await Farmer.findOne({ userId });
    if (farmer) {
      console.log("✔ Farmer already exists:", farmer._id);
      return farmer;
    }

    // Create new farmer
    console.log("Creating NEW farmer for:", userId);

    farmer = await Farmer.create({
      userId,
      name: user.name,
      email: user.email,
    });

    // Add Farmer role
    const roleDoc = await Role.findOne({ name: "Farmer" });
    if (roleDoc) {
      const exists = await UserRole.findOne({
        userId,
        roleId: roleDoc._id,
      });

      if (!exists) {
        await UserRole.create({ userId, roleId: roleDoc._id });
      }
    }

    console.log("✔ New Farmer Created:", farmer._id);
    return farmer;
  }
}
