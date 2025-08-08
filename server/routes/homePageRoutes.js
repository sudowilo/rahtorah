import { Router } from "express";
import { uiAuthMiddleware } from "../middleware/authMiddleware.js";
import { homePage } from "../controllers/homePageController.js";

const router = new Router();

router.get("/", homePage);

export default router;
