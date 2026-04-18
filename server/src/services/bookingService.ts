import fs from "fs";
import path from "path";
import { sendBookingPayment } from "./algorandService";

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
  blockchainTxId?: string | null;
  blockchainExplorerUrl?: string | null;
}

const bookingsFilePath = path.join(__dirname, "../data/bookings.json");

function readBookings(): Booking[] {
  if (!fs.existsSync(bookingsFilePath)) {
    fs.writeFileSync(bookingsFilePath, "[]", "utf-8");
    return [];
  }

  const raw = fs.readFileSync(bookingsFilePath, "utf-8").trim();

  if (!raw) {
    fs.writeFileSync(bookingsFilePath, "[]", "utf-8");
    return [];
  }

  return JSON.parse(raw);
}

function saveBookings(bookings: Booking[]) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getAllBookings(): Booking[] {
  return readBookings();
}

export async function createBooking(
  bookingData: Omit<Booking, "id" | "createdAt" | "blockchainTxId" | "blockchainExplorerUrl">
): Promise<Booking> {
  const bookings = readBookings();

  let blockchainTxId: string | null = null;
  let blockchainExplorerUrl: string | null = null;

  try {
    const blockchainResult = await sendBookingPayment(1000);
    blockchainTxId = blockchainResult.txId;
    blockchainExplorerUrl = blockchainResult.explorerUrl;
  } catch (error) {
    console.error("Algorand payment failed:", error);
  }

  const newBooking: Booking = {
    id: Date.now().toString(),
    ...bookingData,
    createdAt: new Date().toISOString(),
    blockchainTxId,
    blockchainExplorerUrl,
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return newBooking;
}