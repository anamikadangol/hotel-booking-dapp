import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: "#f8f9fa", marginTop: "3rem" }}>
      {/* Top Footer */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem 2rem",
        }}
      >
        {/* 4 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          {/* ABOUT */}
          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem" }}>ABOUT</h5>
            <p>How Hotel Booking Works</p>
            <p>Newsroom</p>
            <p>Our Services</p>
            <p>Investors</p>
            <p>Careers</p>
          </div>

          {/* COMMUNITY */}
          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem" }}>COMMUNITY</h5>
            <p>Guest Reviews</p>
            <p>Accessibility</p>
            <p>Travel Support</p>
            <p>Loyalty Program</p>
            <p>Special Offers</p>
          </div>

          {/* HOST */}
          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem" }}>ROOMS</h5>
            <p>Standard Room</p>
            <p>Deluxe Room</p>
            <p>Executive Suite</p>
            <p>Responsible Hosting</p>
            <p>Booking Support</p>
          </div>

          {/* SUPPORT */}
          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem" }}>SUPPORT</h5>
            <p>Help Center</p>
            <p>Cancellation Policy</p>
            <p>Payment Support</p>
            <p>Trust & Safety</p>
            <p>Contact Us</p>
          </div>
        </div>

        {/* Middle Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "2.5rem",
            gap: "1rem",
          }}
        >
          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem" }}>ALSO AVAILABLE ON</h5>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ height: "40px" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ height: "40px" }}
              />
            </div>
          </div>

          <div>
            <h5 style={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
              Connect With Us
            </h5>
            <div style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}>
              <FaFacebookF />
              <FaLinkedinIn />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          background: "#2f3542",
          color: "#fff",
          padding: "1rem 1.5rem",
          fontSize: "0.95rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ margin: 0 }}>© 2026 Hotel Booking DApp. All Rights Reserved</p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <span>Careers</span>
            <span>Warranty Policy</span>
            <span>Sell With Us</span>
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}