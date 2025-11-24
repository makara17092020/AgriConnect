import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/auth.routes"; // user auth
import protectedRoutes from "./routes/protected.route";
import { errorHandler } from "./middlewares/error.middleware";
import productRoutes from "./routes/product.route";
import categoryRoutes from "./routes/category.route";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/products", productRoutes);

// Category routes
app.use("/api/categories", categoryRoutes);

// Global error handler
app.use(errorHandler);

export default app;
