import { Router } from "express";
import { fetchRoomById, fetchRooms } from "../controllers/roomController";

const router = Router();

router.get("/", fetchRooms);
router.get("/:id", fetchRoomById);

export default router;