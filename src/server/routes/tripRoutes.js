import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTrip,
  listTrips,
  createJoinRequest,
} from "../controllers/tripController.js";

const router = Router();

router.post("/create-trip", authMiddleware, createTrip);
router.get("/list-trips", listTrips);
router.post("/create-join-request", authMiddleware, createJoinRequest);

export default router;
