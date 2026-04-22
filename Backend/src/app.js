import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Smart Queue API Running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;