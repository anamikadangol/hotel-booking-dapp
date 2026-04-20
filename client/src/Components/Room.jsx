import React from "react";
import { Link } from "react-router-dom";
import room1 from "../images/room-1.jpeg";
import room2 from "../images/room-2.jpeg";
import room3 from "../images/room-3.jpeg";

const rooms = [
  {
    id: 1,
    name: "Standard Room",
    slug: "standard-room",
    price: 80,
    capacity: 2,
    description: "A comfortable room for two guests with essential amenities.",
    image: room1,
  },
  {
    id: 2,
    name: "Deluxe Room",
    slug: "deluxe-room",
    price: 120,
    capacity: 3,
    description:
      "A spacious deluxe room with modern facilities and extra comfort.",
    image: room2,
  },
  {
    id: 3,
    name: "Executive Suite",
    slug: "suite",
    price: 250,
    capacity: 4,
    description: "A premium suite offering luxury amenities and extra space.",
    image: room3,
  },
];

export default function Rooms() {
  return (
    <section className="rooms-page">
      <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "1rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Available Rooms
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{
                width: "280px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                background: "#fff",
                textAlign: "center",
              }}
            >
              <img
                src={room.image}
                alt={room.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "1rem" }}>
                <h3 style={{ marginBottom: "0.75rem" }}>{room.name}</h3>

                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>£{room.price}</strong>
                </p>

                <p style={{ marginBottom: "0.75rem" }}>per night</p>

                <p style={{ marginBottom: "0.75rem", lineHeight: "1.5" }}>
                  {room.description}
                </p>

                <p style={{ marginBottom: "1rem" }}>
                  <strong>Capacity:</strong> {room.capacity} guest(s)
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Link to={`/rooms/${room.slug}`} className="btn-primary">
                    View Details
                  </Link>

                  <Link to={`/booknow/${room.slug}`} className="btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}