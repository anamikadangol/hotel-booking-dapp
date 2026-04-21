import express from "express";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hotel Booking DApp API is running");
});

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;