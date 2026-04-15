import { Request, Response } from "express";
import { createBooking, getAllBookings } from "../services/bookingService";

export function fetchBookings(req: Request, res: Response) {
  const bookings = getAllBookings();
  res.status(200).json(bookings);
}

export async function createBookingHandler(req: Request, res: Response) {
  try {
    const { roomId, guestName, guestEmail, checkIn, checkOut, guests } = req.body;

    if (!roomId || !guestName || !guestEmail || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: "All booking fields are required" });
    }

    const booking = await createBooking({
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: Number(guests),
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully and verified on Algorand TestNet",
      booking,
      txId: booking.txId,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
}