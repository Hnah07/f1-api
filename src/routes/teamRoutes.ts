import express from "express";
import { getAllTeams } from "../controllers/teamsController";

const router = express.Router();

router.get("/", getAllTeams);

export default router;
