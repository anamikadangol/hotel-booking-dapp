import React from "react";
import Loading from "./Loading";
import Room from "./Room";

const sampleRooms = [
  {
    id: 1,
    name: "Standard Room",
    slug: "standard-room",
    images: [{ fields: { file: { url: "/src/images/room-1.jpeg" } } }],
    price: 120,
  },
  {
    id: 2,
    name: "Deluxe Room",
    slug: "deluxe-room",
    images: [{ fields: { file: { url: "/src/images/room-2.jpeg" } } }],
    price: 180,
  },
  {
    id: 3,
    name: "Suite",
    slug: "suite",
    images: [{ fields: { file: { url: "/src/images/room-3.jpeg" } } }],
    price: 250,
  },
];

export default function FeaturedRooms() {
  const loading = false;

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="featured-rooms">
      <div className="featured-rooms-center">
        {sampleRooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}