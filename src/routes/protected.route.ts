import { Router, Response } from "express";
import { protect, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

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
router.get("/me", protect, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
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
router.get(
  "/admin-test",
  protect,
  authorizeRoles("Admin"),
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "Admin route accessed successfully", user: req.user });
  }
);

export default router;
