import express from "express";
import { getAllCircuits } from "../controllers/circuitsController";

const router = express.Router();

router.get("/", getAllCircuits);

export default router;
