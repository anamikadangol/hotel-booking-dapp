import { Request, Response } from "express";
import { createBooking, getAllBookings } from "../services/bookingService";

export function fetchBookings(req: Request, res: Response) {
  try {
    const bookings = getAllBookings();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
}

export function addBooking(req: Request, res: Response) {
  try {
    const {
      roomId,
      roomSlug,
      roomName,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests,
      paymentOption,
      paymentStatus,
      totalAmount,
    } = req.body;

    // Basic required field validation
    if (
      !roomId ||
      !roomSlug ||
      !roomName ||
      !guestName ||
      !guestEmail ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !paymentOption ||
      !paymentStatus ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking fields",
      });
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Validate guests
    if (Number(guests) < 1) {
      return res.status(400).json({
        success: false,
        message: "Guests must be at least 1",
      });
    }

    // Validate payment option
    if (paymentOption !== "later" && paymentOption !== "now") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment option",
      });
    }

    // Validate payment status
    if (paymentStatus !== "pending" && paymentStatus !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const newBooking = createBooking({
      roomId,
      roomSlug,
      roomName,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: Number(guests),
      paymentOption,
      paymentStatus,
      totalAmount: Number(totalAmount),
    });

    return res.status(201).json({
      success: true,
      message:
        paymentOption === "now"
          ? "Payment successful and booking confirmed"
          : "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}