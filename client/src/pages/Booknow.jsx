import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Room data with separate images and prices
import room1 from "../images/room-1.jpeg";
import room2 from "../images/room-2.jpeg";
import room3 from "../images/room-3.jpeg";

const roomData = {
  "standard-room": {
    id: "RM-101",
    name: "Standard Room",
    description: "A comfortable room for two guests with essential amenities.",
    price: 80,
    capacity: 2,
    image: room1,
  },
  "deluxe-room": {
    id: "RM-102",
    name: "Deluxe Room",
    description:
      "A spacious deluxe room with modern facilities and extra comfort.",
    price: 120,
    capacity: 3,
    image: room2,
  },
  "suite": {
    id: "RM-103",
    name: "Executive Suite",
    description: "A premium suite offering luxury amenities and extra space.",
    price: 250,
    capacity: 4,
    image: room3,
  },
};

export default function Booknow() {
  const { slug } = useParams();
  const room = roomData[slug];

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [paymentOption, setPaymentOption] = useState("later"); // later | now
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If slug not found
  if (!room) {
    return (
      <section style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
        <h1>Room not found</h1>
        <Link to="/rooms" className="btn-primary">
          Back to Rooms
        </Link>
      </section>
    );
  }

  // Helpers
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  }

  function handleCardChange(e) {
    const { name, value } = e.target;

    let cleaned = value;

    if (name === "cardNumber") {
      cleaned = value.replace(/\D/g, "").slice(0, 16);
    }

    if (name === "cvv") {
      cleaned = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "expiry") {
      // auto format MM/YY
      let digits = value.replace(/\D/g, "").slice(0, 4);
      if (digits.length >= 3) {
        cleaned = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        cleaned = digits;
      }
    }

    setCardData((prev) => ({
      ...prev,
      [name]: cleaned,
    }));
  }

  function validatePayNow() {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(cardData.cardNumber)) {
      return "Invalid card number. It must be exactly 16 digits.";
    }

    if (!expiryRegex.test(cardData.expiry)) {
      return "Invalid expiry date. Use MM/YY format.";
    }

    if (!cvvRegex.test(cardData.cvv)) {
      return "Invalid CVV. It must be exactly 3 digits.";
    }

    return "";
  }

  const bookingSummary = useMemo(() => {
    const checkInDate = formData.checkIn ? new Date(formData.checkIn) : null;
    const checkOutDate = formData.checkOut ? new Date(formData.checkOut) : null;

    let nights = 0;
    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return {
      nights,
      totalAmount: nights > 0 ? nights * room.price : room.price,
    };
  }, [formData.checkIn, formData.checkOut, room.price]);

  async function createBooking(selectedPaymentOption) {
    setMessage("");
    setError("");

    // Basic validation
    if (
      !formData.guestName ||
      !formData.guestEmail ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      setError("Please fill in all required booking fields.");
      return;
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    // Pay Now validation
    if (selectedPaymentOption === "now") {
      const paymentError = validatePayNow();
      if (paymentError) {
        setError(paymentError);
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        roomId: room.id,
        roomSlug: slug,
        roomName: room.name,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        paymentOption: selectedPaymentOption, // "later" or "now"
        paymentStatus: selectedPaymentOption === "now" ? "paid" : "pending",
        totalAmount: bookingSummary.totalAmount,
      };

      // IMPORTANT: /api/bookings for GitHub Codespaces (NOT localhost:5000)
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Booking failed.");
      }

      const bookingId =
        result?.data?.id ||
        result?.data?.bookingId ||
        result?.data?._id ||
        Date.now();

      if (selectedPaymentOption === "now") {
        setMessage(
          `Payment successful! Booking confirmed for "${room.name}". Booking ID: ${bookingId}`
        );
      } else {
        setMessage(
          `Booking created successfully for "${room.name}". Booking ID: ${bookingId}`
        );
      }

      // Reset form after success
      setFormData({
        guestName: "",
        guestEmail: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      });

      setCardData({
        cardNumber: "",
        expiry: "",
        cvv: "",
      });

      setPaymentOption("later");
    } catch (err) {
      setError(
        err.message || "Could not connect to backend. Make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Book Room</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          {/* Room Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              marginBottom: "1.5rem",
            }}
          >
            <img
              src={room.image}
              alt={room.name}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: "1.5rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>{room.name}</h2>
              <p style={{ color: "#555", marginBottom: "1rem" }}>{room.description}</p>

              <p style={{ margin: "0.4rem 0" }}>
                <strong>Room ID:</strong> {room.id}
              </p>
              <p style={{ margin: "0.4rem 0" }}>
                <strong>Price:</strong> £{room.price} / night
              </p>
              <p style={{ margin: "0.4rem 0" }}>
                <strong>Capacity:</strong> {room.capacity} guest(s)
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              padding: "1.5rem",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Booking Summary</h2>

            <p style={{ margin: "0.5rem 0" }}>
              <strong>Room:</strong> {room.name}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Guests:</strong> {formData.guests}{" "}
              {formData.guests === 1 ? "Guest" : "Guests"}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Check-in:</strong> {formData.checkIn || "Not selected"}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Check-out:</strong> {formData.checkOut || "Not selected"}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Total nights:</strong> {bookingSummary.nights || 0}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Total amount:</strong> £{bookingSummary.totalAmount}
            </p>
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Payment option:</strong>{" "}
              {paymentOption === "now" ? "Pay Now" : "Pay Later"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            padding: "1.5rem",
          }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "grid", gap: "1rem" }}
          >
            <input
              type="text"
              name="guestName"
              placeholder="Guest Name"
              value={formData.guestName}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="guestEmail"
              placeholder="Guest Email"
              value={formData.guestEmail}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
            </select>

            {/* Payment Options */}
            <div style={{ marginTop: "1rem" }}>
              <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.4rem" }}>
                Choose Payment Option
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="later"
                    checked={paymentOption === "later"}
                    onChange={() => setPaymentOption("later")}
                  />
                  Pay Later
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="now"
                    checked={paymentOption === "now"}
                    onChange={() => setPaymentOption("now")}
                  />
                  Pay Now
                </label>
              </div>
            </div>

            {/* Card Details (only when Pay Now selected) */}
            {paymentOption === "now" && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "1rem",
                  background: "#fafafa",
                }}
              >
                <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.4rem" }}>
                  Card Details
                </h2>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (16 digits)"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  style={{ ...inputStyle, marginBottom: "1rem" }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    style={inputStyle}
                  />

                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <button
                type="button"
                onClick={() => createBooking("later")}
                disabled={loading}
                style={{
                  ...buttonStyle,
                  background: "#6c757d",
                }}
              >
                {loading ? "Processing..." : "Pay Later"}
              </button>

              <button
                type="button"
                onClick={() => createBooking("now")}
                disabled={loading}
                style={{
                  ...buttonStyle,
                  background: "#198754",
                }}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>

          {/* Messages */}
          {message && (
            <p
              style={{
                marginTop: "1.5rem",
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              style={{
                marginTop: "1.5rem",
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              {error}
            </p>
          )}

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link to="/rooms" className="btn-primary">
              Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable styles
const inputStyle = {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "0.95rem 1rem",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
};