import { Router } from "express";
import { register, login, isAuthorized } from "../controllers/authController.js";
import { checkAlreadyLoggedIn, authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",checkAlreadyLoggedIn, register);
router.post("/login",checkAlreadyLoggedIn, login);
router.get("/is-authorized", authMiddleware, isAuthorized);

export default router;
