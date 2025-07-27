import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTrip } from "../controllers/tripController.js";

const router = Router();

router.post("/create-trip", authMiddleware, createTrip);

export default router;