import { Request, Response } from "express";
import { getAllRooms, getRoomById } from "../services/roomService";

export function fetchRooms(req: Request, res: Response) {
  const rooms = getAllRooms();
  res.status(200).json(rooms);
}

export function fetchRoomById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const room = getRoomById(id);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  return res.status(200).json(room);
}