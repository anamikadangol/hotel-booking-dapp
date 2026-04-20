import React from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import room1 from "../images/room-1.jpeg";
import room2 from "../images/room-7.jpeg";
import room3 from "../images/room-3.jpeg";

const roomData = {
  "standard-room": {
    name: "Standard Room",
    description:
      "A comfortable and elegant room designed for two guests, featuring essential amenities for a relaxing stay.",
    price: 80,
    capacity: 2,
    image: room1,
  },
  "deluxe-room": {
    name: "Deluxe Room",
    description:
      "A spacious deluxe room with modern furnishings, enhanced comfort, and premium hotel facilities.",
    price: 120,
    capacity: 3,
    image: room2,
  },
  suite: {
    name: "Executive Suite",
    description:
      "A premium suite offering luxury interiors, additional space, and exclusive amenities for a superior experience.",
    price: 250,
    capacity: 4,
    image: room3,
  },
};

export default function SingleRooms() {
  const { slug } = useParams();
  const room = roomData[slug];

  if (!room) {
    return (
      <section className="single-room">
        <Banner title="Room not found">
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </Banner>
      </section>
    );
  }

  return (
    <section className="single-room">
      <Banner title={room.name}>
        <Link to="/rooms" className="btn-primary">
          Back to Rooms
        </Link>
      </Banner>

      <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <img
            src={room.image}
            alt={room.name}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>{room.name}</h2>

          <p style={{ marginBottom: "1rem", lineHeight: "1.7" }}>
            {room.description}
          </p>

          <p style={{ marginBottom: "0.75rem" }}>
            <strong>Price:</strong> £{room.price} per night
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Capacity:</strong> {room.capacity} guest(s)
          </p>

          <Link to={`/booknow/${slug}`} className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}