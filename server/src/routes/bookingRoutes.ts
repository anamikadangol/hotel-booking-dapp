import { Router } from "express";
import { createBookingHandler, fetchBookings } from "../controllers/bookingController";

const router = Router();

router.get("/", fetchBookings);
router.post("/", createBookingHandler);

export default router;