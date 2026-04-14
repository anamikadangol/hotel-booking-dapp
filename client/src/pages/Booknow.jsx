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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setMessage(
      `Booking request submitted for "${slug}". Backend + blockchain integration will be connected next.`
    );
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

        <button type="submit" className="btn-primary">
          Submit Booking
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