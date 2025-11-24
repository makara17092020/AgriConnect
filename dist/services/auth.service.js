"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.addRolesToUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const userRole_model_1 = __importDefault(require("../models/userRole.model"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
// ------------------ Register ------------------
const registerUser = async (data) => {
    const existingUser = await user_model_1.default.findOne({ email: data.email });
    if (existingUser)
        throw new Error("User already exists");
    // Create user (password hashed by pre-save)
    const user = await user_model_1.default.create({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone, // <-- include phone here
    });
    // Assign default "User" role in join table
    const roleDoc = await role_model_1.default.findOne({ name: "User" });
    if (!roleDoc)
        throw new Error("Default role 'User' not found");
    await userRole_model_1.default.create({ userId: user._id, roleId: roleDoc._id });
    // Build roles array dynamically from join table
    const roles = [roleDoc.name];
    const token = jsonwebtoken_1.default.sign({ id: user._id, roles }, JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone || "", // fallback to empty string
            roles, // array of role names
        },
    };
};
exports.registerUser = registerUser;
// ------------------ Login ------------------
const loginUser = async (data) => {
    const user = await user_model_1.default.findOne({ email: data.email });
    if (!user)
        throw new Error("Invalid email or password");
    const isMatch = await bcryptjs_1.default.compare(data.password, user.password);
    if (!isMatch)
        throw new Error("Invalid email or password");
    // Get roles from join table
    const userRoles = (await userRole_model_1.default.find({ userId: user._id }).populate("roleId"));
    const roles = userRoles.map((ur) => ur.roleId.name);
    const token = jsonwebtoken_1.default.sign({ id: user._id, roles }, JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles,
            phone: user.phone || "",
        },
    };
};
exports.loginUser = loginUser;
// ------------------ Add roles to existing user ------------------
const addRolesToUser = async (userId, newRoles) => {
    const user = await user_model_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    for (const roleName of newRoles) {
        const roleDoc = await role_model_1.default.findOne({ name: roleName });
        if (!roleDoc)
            continue;
        const exists = await userRole_model_1.default.findOne({
            userId: user._id,
            roleId: roleDoc._id,
        });
        if (!exists) {
            await userRole_model_1.default.create({ userId: user._id, roleId: roleDoc._id });
        }
    }
    // Return updated roles dynamically from join table
    const userRoles = (await userRole_model_1.default.find({ userId: user._id }).populate("roleId"));
    return userRoles.map((ur) => ur.roleId.name);
};
exports.addRolesToUser = addRolesToUser;
// ------------------ Logout ------------------
const logoutUser = async () => {
    return { message: "Logout successful. Delete token on client side." };
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=auth.service.js.map