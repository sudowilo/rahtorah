import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { checkAlreadyLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",checkAlreadyLoggedIn, register);
router.post("/login",checkAlreadyLoggedIn, login);

export default router;
