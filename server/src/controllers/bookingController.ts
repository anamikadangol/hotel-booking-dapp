import { Request, Response } from "express";
import { createBooking, getAllBookings } from "../services/bookingService";

export const fetchBookings = (_req: Request, res: Response) => {
  try {
    const bookings = getAllBookings();

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching bookings",
    });
  }
};

export const addBooking = async (req: Request, res: Response) => {
  try {
    const {
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests,
      paymentOption,
      paymentStatus,
    } = req.body;

    // Basic required field validation
    if (
      !roomId ||
      !guestName ||
      !guestEmail ||
      !checkIn ||
      !checkOut ||
      guests === undefined ||
      !paymentOption ||
      !paymentStatus
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: roomId, guestName, guestEmail, checkIn, checkOut, guests, paymentOption, paymentStatus",
      });
    }

    // Validate paymentOption
    const validPaymentOptions = ["pay_later", "pay_now"];
    if (!validPaymentOptions.includes(paymentOption)) {
      return res.status(400).json({
        success: false,
        message: "Invalid paymentOption. Use 'pay_later' or 'pay_now'.",
      });
    }

    // Validate paymentStatus
    const validPaymentStatuses = ["pending", "paid"];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid paymentStatus. Use 'pending' or 'paid'.",
      });
    }

    const booking = await createBooking({
      roomId,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests: Number(guests),
      paymentOption,
      paymentStatus,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while creating booking",
    });
  }
};
