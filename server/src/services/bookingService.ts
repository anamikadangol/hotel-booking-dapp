import fs from "fs";
import path from "path";
import { getRoomById } from "./roomService";

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  createdAt: string;
}

const bookingsFilePath = path.join(__dirname, "../data/bookings.json");

function readBookings(): Booking[] {
  const data = fs.readFileSync(bookingsFilePath, "utf-8");
  return JSON.parse(data);
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
}

export function createBooking(data: Omit<Booking, "id" | "status" | "createdAt">): Booking {
  const room = getRoomById(data.roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  if (data.guests > room.capacity) {
    throw new Error(`This room allows a maximum of ${room.capacity} guest(s)`);
  }

  const bookings = readBookings();

  const newBooking: Booking = {
    id: `BKG-${Date.now()}`,
    roomId: data.roomId,
    guestName: data.guestName,
    guestEmail: data.guestEmail,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: data.guests,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  return newBooking;
}

export function getAllBookings(): Booking[] {
  return readBookings();
}