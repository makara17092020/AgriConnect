"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/protected/me:
 *   get:
 *     summary: "Get current authenticated user info"
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "User info retrieved successfully"
 *       401:
 *         description: "Unauthorized"
 */
router.get("/me", auth_middleware_1.protect, (req, res) => {
    const user = req.user;
    res.json({ message: "Protected route accessed", user });
});
/**
 * @swagger
 * /api/protected/admin-test:
 *   get:
 *     summary: "Admin-only test route"
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Admin accessed successfully"
 *       401:
 *         description: "Unauthorized"
 *       403:
 *         description: "Forbidden: Admins only"
 */
router.get("/admin-test", auth_middleware_1.protect, (0, role_middleware_1.authorizeRoles)("Admin"), (req, res) => {
    res.json({ message: "Admin route accessed successfully", user: req.user });
});
exports.default = router;
//# sourceMappingURL=protected.route.js.map