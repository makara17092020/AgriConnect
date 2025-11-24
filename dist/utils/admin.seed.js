"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const userRole_model_1 = __importDefault(require("../models/userRole.model"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || "");
        console.log("MongoDB connected");
        const adminEmail = process.env.ADMIN_EMAIL || "admin@agri.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "password123";
        // Check if admin already exists
        let adminUser = await user_model_1.default.findOne({ email: adminEmail });
        // Create admin user if not exists
        if (!adminUser) {
            adminUser = await user_model_1.default.create({
                name: "Admin",
                email: adminEmail,
                password: adminPassword, // ✔️ let pre-save hash it
                role: "Admin",
            });
            console.log("Admin user created:", adminEmail);
        }
        // Find Admin role
        const adminRole = await role_model_1.default.findOne({ name: "Admin" });
        if (!adminRole)
            throw new Error("Admin role not found. Please seed roles first.");
        // Create UserRole link if it doesn't exist
        const existingUserRole = await userRole_model_1.default.findOne({
            userId: adminUser._id,
            roleId: adminRole._id,
        });
        if (!existingUserRole) {
            await userRole_model_1.default.create({ userId: adminUser._id, roleId: adminRole._id });
            console.log("Admin role linked to admin user.");
        }
        process.exit(0);
    }
    catch (err) {
        console.error("Failed to seed admin:", err);
        process.exit(1);
    }
};
seedAdmin();
//# sourceMappingURL=admin.seed.js.map