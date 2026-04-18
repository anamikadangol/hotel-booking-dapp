import { Router } from "express";
import * as roomController from "../controllers/roomController";

const router = Router();

router.get("/", roomController.fetchRooms);
router.get("/slug/:slug", roomController.fetchRoomBySlug);
router.get("/:id", roomController.fetchRoomById);

export default router;