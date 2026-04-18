import { Request, Response } from "express";
import { createBooking, getAllBookings } from "../services/bookingService";

export const fetchBookings = (_req: Request, res: Response) => {
  const bookings = getAllBookings();

  return res.json({
    success: true,
    data: bookings,
  });
};

export const addBooking = async (req: Request, res: Response) => {
  try {
    const { roomId, guestName, guestEmail, checkIn, checkOut, guests, totalPrice } =
      req.body;

    if (
      !roomId ||
      !guestName ||
      !guestEmail ||
      !checkIn ||
      !checkOut ||
      guests === undefined ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking fields",
      });
    }

    const newBooking = await createBooking({
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: Number(guests),
      totalPrice: Number(totalPrice),
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
