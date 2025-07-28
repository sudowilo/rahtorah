import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { profileInfo, requests, openTrips } from "../controllers/profileController.js";
const router = Router();

router.get("/info", authMiddleware, profileInfo);
router.get("/requests", authMiddleware, requests);
router.get("/open-trips", authMiddleware, openTrips);

export default router;
