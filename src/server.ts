// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import raceRoutes from "./routes/raceRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import teamRoutes from "./routes/teamRoutes";
import driverRoutes from "./routes/driverRoutes";
import circuitRoutes from "./routes/circuitRoutes";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/races", raceRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/circuits", circuitRoutes);
app.all("*", notFound);

// Database connection
try {
  if (!process.env.MONGO_URI_LIVE) {
    throw new Error("MONGO_URI environment variable is not set");
  }
  await mongoose.connect(process.env.MONGO_URI_LIVE!);
  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
