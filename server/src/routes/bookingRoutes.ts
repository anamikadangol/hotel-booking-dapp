import { Router } from "express";
import { fetchBookings, addBooking } from "../controllers/bookingController";

const router = Router();

router.get("/", fetchBookings);
router.post("/", addBooking);

export default router;