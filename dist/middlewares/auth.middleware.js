"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const farmer_model_1 = __importDefault(require("../models/farmer.model"));
// -------------------- Protect Middleware --------------------
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        // Save user into req
        req.user = decoded;
        // OPTIONAL: Auto-load farmerId for farmer users
        const farmer = (await farmer_model_1.default.findOne({
            userId: decoded.id,
        }));
        if (farmer) {
            req.farmerId = farmer._id.toString();
        }
        next();
        return; // FIXED TS7030
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized" });
        return; // FIXED TS7030
    }
};
exports.protect = protect;
// -------------------- Role Authorization --------------------
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
        if (!hasRole) {
            res.status(403).json({ message: "Forbidden: Insufficient role" });
            return;
        }
        next();
        return;
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=auth.middleware.js.map