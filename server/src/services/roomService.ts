import fs from "fs";
import path from "path";

export interface Room {
  id: string;
  slug: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
}

const roomsFilePath = path.join(__dirname, "../data/rooms.json");

export function getAllRooms(): Room[] {
  const data = fs.readFileSync(roomsFilePath, "utf-8");
  return JSON.parse(data);
}

export function getRoomById(id: string): Room | undefined {
  const rooms = getAllRooms();
  return rooms.find((room) => room.id === id);
}

export function getRoomBySlug(slug: string): Room | undefined {
  const rooms = getAllRooms();
  return rooms.find((room) => room.slug === slug);
}