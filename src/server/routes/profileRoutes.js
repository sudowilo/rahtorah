import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { profileInfo, requests } from "../controllers/profileController.js";
const router = Router();

router.get("/info", authMiddleware, profileInfo);
router.get("/requests", authMiddleware, requests);

export default router;
