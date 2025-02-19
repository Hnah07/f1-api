import express from "express";
import { getAllDrivers } from "../controllers/driversController";

const router = express.Router();

router.get("/", getAllDrivers);

export default router;
