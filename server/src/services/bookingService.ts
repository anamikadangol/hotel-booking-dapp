import fs from "fs";
import path from "path";

type PaymentOption = "pay_later" | "pay_now";
type PaymentStatus = "pending" | "paid";

export interface BookingInput {
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentOption: PaymentOption;
  paymentStatus: PaymentStatus;
}

export interface Booking extends BookingInput {
  id: string;
  createdAt: string;
  blockchainTxId: string | null;
  blockchainExplorerUrl: string | null;
}

const bookingsFilePath = path.join(__dirname, "../data/bookings.json");

function ensureBookingsFileExists() {
  const dataDir = path.dirname(bookingsFilePath);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(bookingsFilePath)) {
    fs.writeFileSync(bookingsFilePath, "[]", "utf-8");
  }
}

function readBookings(): Booking[] {
  ensureBookingsFileExists();

  const rawData = fs.readFileSync(bookingsFilePath, "utf-8").trim();

  if (!rawData) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawData);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch (error) {
    console.error("Invalid bookings.json format. Resetting to empty array.");
    fs.writeFileSync(bookingsFilePath, "[]", "utf-8");
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getAllBookings(): Booking[] {
  return readBookings();
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  const bookings = readBookings();

  // OPTIONAL: Placeholder for future blockchain integration
  // Since your Algorand integration may be partially working / demo-based,
  // we safely keep these fields for hybrid DApp structure.
  let blockchainTxId: string | null = null;
  let blockchainExplorerUrl: string | null = null;

  // If payment is "pay_now", we can simulate blockchain-ready metadata
  if (input.paymentOption === "pay_now" && input.paymentStatus === "paid") {
    blockchainTxId = `SIMULATED-TX-${Date.now()}`;
    blockchainExplorerUrl = `https://testnet.algoexplorer.io/tx/${blockchainTxId}`;
  }

  const newBooking: Booking = {
    id: Date.now().toString(),
    roomId: input.roomId,
    guestName: input.guestName,
    guestEmail: input.guestEmail,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    paymentOption: input.paymentOption,
    paymentStatus: input.paymentStatus,
    createdAt: new Date().toISOString(),
    blockchainTxId,
    blockchainExplorerUrl,
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return newBooking;
}