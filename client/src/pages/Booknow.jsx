import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Booknow() {
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://friendly-trout-97j57wv7x4972x7pg-5000.app.github.dev/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: slug || "1",
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: Number(formData.guests),
          totalPrice: 500,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          `Booking created successfully for "${slug}". Booking ID: ${result.data?.id || "N/A"}`
        );

        setFormData({
          guestName: "",
          guestEmail: "",
          checkIn: "",
          checkOut: "",
          guests: 1,
        });
      } else {
        setMessage(result.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking request failed:", error);
      setMessage("Could not connect to backend. Make sure server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Book Room</h1>
      <p>
        <strong>Selected room:</strong> {slug}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}
      >
        <input
          type="text"
          name="guestName"
          placeholder="Guest Name"
          value={formData.guestName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="guestEmail"
          placeholder="Guest Email"
          value={formData.guestEmail}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="guests"
          min="1"
          max="4"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", color: "green", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/rooms" className="btn-primary">
          Back to Rooms
        </Link>
      </div>
    </section>
  );
}