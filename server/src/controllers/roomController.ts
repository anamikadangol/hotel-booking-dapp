import { Request, Response } from "express";
import { getAllRooms, getRoomById, getRoomBySlug } from "../services/roomService";

export const fetchRooms = (_req: Request, res: Response) => {
  const rooms = getAllRooms();

  res.json({
    success: true,
    data: rooms,
  });
};

export const fetchRoomById = (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const room = getRoomById(id);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  return res.json({
    success: true,
    data: room,
  });
};

export const fetchRoomBySlug = (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const room = getRoomBySlug(slug);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  return res.json({
    success: true,
    data: room,
  });
};