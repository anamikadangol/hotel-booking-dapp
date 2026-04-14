import React from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "../Components/Banner";

const roomData = {
  "standard-room": {
    name: "Standard Room",
    description: "A comfortable room for two guests with essential amenities.",
    price: 120,
    capacity: 2,
  },
  "deluxe-room": {
    name: "Deluxe Room",
    description: "A spacious deluxe room with modern facilities and extra comfort.",
    price: 180,
    capacity: 3,
  },
  suite: {
    name: "Suite",
    description: "A premium suite offering luxury amenities and extra space.",
    price: 250,
    capacity: 4,
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
            Back to rooms
          </Link>
        </Banner>
      </section>
    );
  }

  return (
    <section className="single-room">
      <Banner title={room.name}>
        <Link to="/rooms" className="btn-primary">
          Back to rooms
        </Link>
      </Banner>

      <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2>{room.name}</h2>
        <p>{room.description}</p>
        <p>
          <strong>Price:</strong> £{room.price} / night
        </p>
        <p>
          <strong>Capacity:</strong> {room.capacity} guest(s)
        </p>

        <Link to={`/booknow/${slug}`} className="btn-primary">
          Book Now
        </Link>
      </div>
    </section>
  );
}
