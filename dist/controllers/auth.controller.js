"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogout = exports.authLogin = exports.authRegister = void 0;
const auth_service_1 = require("../services/auth.service");
const authRegister = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, auth_service_1.registerUser)(data);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.authRegister = authRegister;
const authLogin = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, auth_service_1.loginUser)(data);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.authLogin = authLogin;
const authLogout = async (_req, res) => {
    const result = await (0, auth_service_1.logoutUser)();
    res.status(200).json(result);
};
exports.authLogout = authLogout;
//# sourceMappingURL=auth.controller.js.map