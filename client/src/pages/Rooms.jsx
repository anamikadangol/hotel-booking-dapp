import React from "react";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";

const rooms = [
  {
    id: 1,
    name: "Standard Room",
    slug: "standard-room",
    price: 120,
    capacity: 2,
    description: "A comfortable room for two guests with essential amenities.",
  },
  {
    id: 2,
    name: "Deluxe Room",
    slug: "deluxe-room",
    price: 180,
    capacity: 3,
    description: "A spacious deluxe room with modern facilities and extra comfort.",
  },
  {
    id: 3,
    name: "Suite",
    slug: "suite",
    price: 250,
    capacity: 4,
    description: "A premium suite offering luxury amenities and extra space.",
  },
];

export default function Rooms() {
  return (
    <section className="rooms-page">
      <Banner title="Our Rooms">
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
      </Banner>

      <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "1rem" }}>
        <h2>Available Rooms</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                background: "#fff",
              }}
            >
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p>
                <strong>Price:</strong> £{room.price} / night
              </p>
              <p>
                <strong>Capacity:</strong> {room.capacity} guest(s)
              </p>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                <Link to={`/rooms/${room.slug}`} className="btn-primary">
                  View Details
                </Link>
                <Link to={`/booknow/${room.slug}`} className="btn-primary">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}