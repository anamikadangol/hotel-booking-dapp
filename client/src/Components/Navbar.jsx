import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" style={{ padding: "1rem", background: "#f8f9fa" }}>
      <div
        className="nav-center"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ margin: 0 }}>Hotel Booking DApp</h2>

        <div style={{ display: "flex", gap: "1rem" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/rooms">Rooms</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}