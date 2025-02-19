import express from "express";
import { getAllRaces } from "../controllers/racesController";

const router = express.Router();

router.get("/", getAllRaces);

export default router;
