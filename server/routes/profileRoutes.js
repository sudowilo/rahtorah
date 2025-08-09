import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { profileInfo, requests, openTrips } from "../controllers/profileController.js";
import { closeTrips } from "../middleware/tripMiddleware.js";
const router = Router();

router.get("/info", authMiddleware, profileInfo);
router.get("/requests", closeTrips, authMiddleware, requests);
router.get("/open-trips", closeTrips, authMiddleware, openTrips);

export default router;
