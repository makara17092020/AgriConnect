"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerService = void 0;
// src/services/farmer.service.ts
const user_model_1 = __importDefault(require("../models/user.model"));
const farmer_model_1 = __importDefault(require("../models/farmer.model"));
const userRole_model_1 = __importDefault(require("../models/userRole.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
class FarmerService {
    // Ensure Farmer exists for the given userId
    async ensureFarmer(userId) {
        console.log("Checking farmer for user:", userId);
        // Find user
        const user = await user_model_1.default.findById(userId);
        if (!user)
            throw new Error("User not found");
        // Check if farmer already exists
        let farmer = await farmer_model_1.default.findOne({ userId });
        if (farmer) {
            console.log("✔ Farmer already exists:", farmer._id);
            return farmer;
        }
        // Create new farmer
        console.log("Creating NEW farmer for:", userId);
        farmer = await farmer_model_1.default.create({
            userId,
            name: user.name,
            email: user.email,
        });
        // Add Farmer role
        const roleDoc = await role_model_1.default.findOne({ name: "Farmer" });
        if (roleDoc) {
            const exists = await userRole_model_1.default.findOne({
                userId,
                roleId: roleDoc._id,
            });
            if (!exists) {
                await userRole_model_1.default.create({ userId, roleId: roleDoc._id });
            }
        }
        console.log("✔ New Farmer Created:", farmer._id);
        return farmer;
    }
}
exports.FarmerService = FarmerService;
//# sourceMappingURL=farmer.service.js.map