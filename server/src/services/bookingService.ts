import fs from "fs";
import path from "path";

export interface Booking {
  id: string;
  roomId: string;
  roomSlug: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentOption: "later" | "now";
  paymentStatus: "pending" | "paid";
  totalAmount: number;
  createdAt: string;
}

const bookingsFilePath = path.join(__dirname, "../data/bookings.json");

function ensureBookingsFileExists() {
  if (!fs.existsSync(bookingsFilePath)) {
    fs.writeFileSync(bookingsFilePath, "[]", "utf-8");
  }
}

function readBookings(): Booking[] {
  ensureBookingsFileExists();

  const data = fs.readFileSync(bookingsFilePath, "utf-8");

  if (!data || data.trim() === "") {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getAllBookings(): Booking[] {
  return readBookings();
}

interface CreateBookingInput {
  roomId: string;
  roomSlug: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentOption: "later" | "now";
  paymentStatus: "pending" | "paid";
  totalAmount: number;
}

export function createBooking(input: CreateBookingInput): Booking {
  const bookings = readBookings();

  const newBooking: Booking = {
    id: Date.now().toString(),
    roomId: input.roomId,
    roomSlug: input.roomSlug,
    roomName: input.roomName,
    guestName: input.guestName,
    guestEmail: input.guestEmail,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: Number(input.guests),
    paymentOption: input.paymentOption,
    paymentStatus: input.paymentStatus,
    totalAmount: Number(input.totalAmount),
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  return newBooking;
}