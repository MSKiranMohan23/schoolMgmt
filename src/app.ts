import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import registerRoutes from "./routes/registerRoutes";
import commonStudentsRoutes from "./routes/commonStudentsRoutes";
import suspendRoutes from "./routes/suspendRoutes";
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

const app: Application = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use("/api", registerRoutes);
app.use("/api", commonStudentsRoutes);
app.use("/api", suspendRoutes);
app.use("/api",notificationRoutes);

// Middleware for 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
