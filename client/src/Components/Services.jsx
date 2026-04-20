import React from "react";
import { FaWifi, FaConciergeBell, FaShuttleVan, FaSpa } from "react-icons/fa";
import Title from "./Title";

const Services = () => {
  const service = {
    services: [
      {
        icon: <FaWifi />,
        title: "Free Wi-Fi",
        info: "High-speed internet access is available in all rooms and public areas for every guest.",
      },
      {
        icon: <FaConciergeBell />,
        title: "24/7 Room Service",
        info: "Guests can enjoy food, beverages, and hotel assistance at any time during their stay.",
      },
      {
        icon: <FaShuttleVan />,
        title: "Airport Transfer",
        info: "Convenient airport pickup and drop-off services are available for a smooth travel experience.",
      },
      {
        icon: <FaSpa />,
        title: "Spa & Wellness",
        info: "Relax and unwind with premium wellness treatments, spa facilities, and massage services.",
      },
    ],
  };

  return (
    <div className="container-fluid services">
      <Title title="Our Services" />
      <div className="row">
        {service.services.map((item, index) => {
          return (
            <div
              className="col-md-4 col-lg-3 col-12 mx-auto my-3"
              key={index}
            >
              <div className="card shadow-lg border-0 p-4">
                <article className="service">
                  <span>{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.info}</p>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;