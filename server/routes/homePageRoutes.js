import { Router } from "express";
import { uiAuthMiddleware } from "../middleware/authMiddleware.js";
import { homePage, userCardRender } from "../controllers/homePageController.js";

const router = new Router();

router.get("/", homePage);

router.get("/render/userCard", userCardRender);

export default router;
