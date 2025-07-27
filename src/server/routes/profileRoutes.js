import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {profileInfo} from "../controllers/profileController.js";
const router = Router();

router.get("/info", authMiddleware, profileInfo);

export default router;
