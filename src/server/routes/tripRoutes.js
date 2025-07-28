import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTrip,
  listTrips,
  createJoinRequest,
  acceptRequest,
  rejectRequest,
} from "../controllers/tripController.js";

const router = Router();

router.post("/create-trip", authMiddleware, createTrip);
router.get("/list-trips", listTrips);
router.post("/create-join-request", authMiddleware, createJoinRequest);
router.post("/accept-request", authMiddleware, acceptRequest);
router.post("/reject-request", authMiddleware, rejectRequest);

export default router;
