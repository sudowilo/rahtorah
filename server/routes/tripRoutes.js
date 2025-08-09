import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTrip,
  listTrips,
  createJoinRequest,
  acceptRequest,
  rejectRequest,
} from "../controllers/tripController.js";
import { closeTrips } from "../middleware/tripMiddleware.js";

const router = Router();

router.post("/create-trip", closeTrips, authMiddleware, createTrip);
router.get("/list-trips", closeTrips, listTrips);
router.post("/create-join-request", closeTrips, authMiddleware, createJoinRequest);
router.post("/accept-request", closeTrips, authMiddleware, acceptRequest);
router.post("/reject-request", closeTrips, authMiddleware, rejectRequest);

export default router;
