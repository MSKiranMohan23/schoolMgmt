import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
import db from "./config/db";

import registerRoutes from "./routes/registerRoutes";
import commonStudentsRoutes from "./routes/commonStudentsRoutes";
import suspendRoutes from "./routes/suspendRoutes";
import notificationRoutes from "./routes/notificationRoutes";

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(cors()); // Enable CORS
// app.use(helmet()); // Enhance security with HTTP headers
// app.use(morgan('dev')); // Logging requests in development

// Test database connection
(async () => {
  try {
    await db.getConnection();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// Routes
app.use("/api", registerRoutes);
app.use("/api", commonStudentsRoutes);
app.use("/api", suspendRoutes);
app.use("/api", notificationRoutes);

// Health Check Endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "API is running smoothly!" });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
