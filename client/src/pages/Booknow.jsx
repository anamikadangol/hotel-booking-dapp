import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import room1 from "../images/room-1.jpeg";
import room2 from "../images/room-2.jpeg";
import room3 from "../images/room-3.jpeg";

const roomData = {
  "standard-room": {
    roomId: "RM-101",
    name: "Standard Room",
    price: 80,
    image: room1,
    description: "A comfortable room for two guests with essential amenities.",
    capacity: 2,
  },
  "deluxe-room": {
    roomId: "RM-102",
    name: "Deluxe Room",
    price: 120,
    image: room2,
    description: "A spacious deluxe room with modern facilities and extra comfort.",
    capacity: 3,
  },
  suite: {
    roomId: "RM-103",
    name: "Executive Suite",
    price: 250,
    image: room3,
    description: "A premium suite offering luxury amenities and extra space.",
    capacity: 4,
  },
};

export default function Booknow() {
  const { slug } = useParams();
  const selectedRoom = roomData[slug];

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
    expDate: "",
    cvv: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedRoom) {
    return (
      <section style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
        <h1>Room not found</h1>
        <Link to="/rooms" className="btn-primary">
          Back to Rooms
        </Link>
      </section>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  }

  function handleCardChange(e) {
    const { name, value } = e.target;

    // Allow only digits for card number and CVV
    if (name === "cardNumber") {
      setCardData((prev) => ({
        ...prev,
        cardNumber: value.replace(/\D/g, "").slice(0, 16),
      }));
      return;
    }

    if (name === "cvv") {
      setCardData((prev) => ({
        ...prev,
        cvv: value.replace(/\D/g, "").slice(0, 3),
      }));
      return;
    }

    // Expiry field
    if (name === "expDate") {
      let formatted = value.replace(/[^\d]/g, "").slice(0, 4);

      if (formatted.length >= 3) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
      }

      setCardData((prev) => ({
        ...prev,
        expDate: formatted,
      }));
      return;
    }

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const totalNights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    const diffTime = checkOutDate - checkInDate;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  }, [formData.checkIn, formData.checkOut]);

  const totalAmount = totalNights * selectedRoom.price;

  function validateBookingFields() {
    if (!formData.guestName || !formData.guestEmail || !formData.checkIn || !formData.checkOut) {
      setMessage("Please fill in all booking details.");
      return false;
    }

    if (totalNights <= 0) {
      setMessage("Booking failed: Check-out date must be after check-in date.");
      return false;
    }

    if (formData.guests > selectedRoom.capacity) {
      setMessage(
        `Booking failed: ${selectedRoom.name} allows maximum ${selectedRoom.capacity} guest(s).`
      );
      return false;
    }

    return true;
  }

  function validatePayment() {
    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");

    // Card number must be exactly 16 digits
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      setMessage("Booking failed: Invalid card number. Card number must be exactly 16 digits.");
      return false;
    }

    // Expiry date must be MM/YY
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expDate)) {
      setMessage("Booking failed: Invalid expiry date. Use MM/YY format.");
      return false;
    }

    // CVV must be exactly 3 digits
    if (!/^\d{3}$/.test(cardData.cvv)) {
      setMessage("Booking failed: Invalid CVV. CVV must be exactly 3 digits.");
      return false;
    }

    return true;
  }

  async function createBooking(successPrefix = "") {
    try {
      setLoading(true);
      setMessage("");

      const bookingPayload = {
        roomId: selectedRoom.roomId,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (result.success) {
        const bookingId =
          result.data?.id ||
          result.data?.bookingId ||
          result.data?._id ||
          "Generated Successfully";

        setMessage(
          `${successPrefix} Booking created successfully for "${selectedRoom.name}". Booking ID: ${bookingId}`
        );
      } else {
        setMessage(result.message || "Booking failed.");
      }
    } catch (error) {
      setMessage("Could not connect to backend. Make sure server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePayLater() {
    const isBookingValid = validateBookingFields();
    if (!isBookingValid) return;

    await createBooking("");
  }

  async function handlePayNow() {
    const isBookingValid = validateBookingFields();
    if (!isBookingValid) return;

    const isPaymentValid = validatePayment();
    if (!isPaymentValid) return;

    await createBooking("Payment successful. Booking confirmed.");
  }

  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "2rem auto",
        padding: "1.5rem",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Book Your Stay</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE - ROOM + BOOKING SUMMARY */}
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
          }}
        >
          {/* Room Summary Card */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "14px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "1.25rem" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>{selectedRoom.name}</h2>
              <p style={{ marginBottom: "0.75rem", color: "#555" }}>{selectedRoom.description}</p>
              <p>
                <strong>Room ID:</strong> {selectedRoom.roomId}
              </p>
              <p>
                <strong>Price:</strong> £{selectedRoom.price} / night
              </p>
              <p>
                <strong>Capacity:</strong> {selectedRoom.capacity} guest(s)
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "14px",
              background: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              padding: "1.25rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Booking Summary</h3>

            <div style={{ display: "grid", gap: "0.6rem" }}>
              <p>
                <strong>Room:</strong> {selectedRoom.name}
              </p>
              <p>
                <strong>Guests:</strong> {formData.guests} {formData.guests === 1 ? "Guest" : "Guests"}
              </p>
              <p>
                <strong>Check-in:</strong> {formData.checkIn || "Not selected"}
              </p>
              <p>
                <strong>Check-out:</strong> {formData.checkOut || "Not selected"}
              </p>
              <p>
                <strong>Total nights:</strong> {totalNights}
              </p>
              <p>
                <strong>Total amount:</strong> £{totalAmount}
              </p>
              <p>
                <strong>Payment option:</strong> {paymentOption === "later" ? "Pay Later" : "Pay Now"}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "14px",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Guest Details</h3>

          <div style={{ display: "grid", gap: "1rem" }}>
            <input
              type="text"
              name="guestName"
              placeholder="Guest Name"
              value={formData.guestName}
              onChange={handleChange}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="email"
              name="guestEmail"
              placeholder="Guest Email"
              value={formData.guestEmail}
              onChange={handleChange}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
              }}
            >
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              {/* GUESTS DROPDOWN */}
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>

            {/* Payment Option */}
            <div style={{ marginTop: "0.5rem" }}>
              <h3 style={{ marginBottom: "0.75rem" }}>Choose Payment Option</h3>

              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="later"
                    checked={paymentOption === "later"}
                    onChange={(e) => setPaymentOption(e.target.value)}
                  />
                  Pay Later
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="now"
                    checked={paymentOption === "now"}
                    onChange={(e) => setPaymentOption(e.target.value)}
                  />
                  Pay Now
                </label>
              </div>
            </div>

            {/* Card Details (only for Pay Now) */}
            {paymentOption === "now" && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  background: "#f8f9fa",
                }}
              >
                <h3 style={{ marginBottom: "1rem" }}>Card Details</h3>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (16 digits)"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  maxLength="16"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "1rem",
                    boxSizing: "border-box",
                  }}
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
                    name="expDate"
                    placeholder="MM/YY"
                    value={cardData.expDate}
                    onChange={handleCardChange}
                    maxLength="5"
                    style={{
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />

                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV (3 digits)"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    maxLength="3"
                    style={{
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <button
                type="button"
                onClick={handlePayLater}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Processing..." : "Pay Later"}
              </button>

              <button
                type="button"
                onClick={handlePayNow}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "#198754",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <p
              style={{
                marginTop: "1.25rem",
                color: message.toLowerCase().includes("failed") ? "red" : "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}

          {/* BACK BUTTON */}
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