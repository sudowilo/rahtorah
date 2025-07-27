import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTrip, listTrips } from "../controllers/tripController.js";

const router = Router();

router.post("/create-trip", authMiddleware, createTrip);
router.get("/list-trips", authMiddleware, listTrips);

export default router;
