import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/mongo";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(
        `📚 Swagger Docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
