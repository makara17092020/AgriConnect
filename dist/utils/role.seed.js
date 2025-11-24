"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const role_model_1 = __importDefault(require("../models/role.model"));
dotenv_1.default.config();
const roles = [
    { name: "Admin", description: "Admin user with full access" },
    { name: "Farmer", description: "Farmer who can manage products" },
    { name: "User", description: "Regular user with limited access" },
];
const seedRoles = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        for (const roleData of roles) {
            const existing = await role_model_1.default.findOne({ name: roleData.name });
            if (!existing) {
                const role = await role_model_1.default.create(roleData);
                console.log("Role created:", role.name, "-", role.description);
            }
        }
        console.log("All roles seeded");
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seedRoles();
//# sourceMappingURL=role.seed.js.map