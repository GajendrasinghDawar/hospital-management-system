import express from "express";
import authRoutes from "./routes/auth_routes.ts";
import bookingRoutes from "./routes/booking_routes.ts";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);
async function startServer() {
  app.listen(3000, () => {
    console.log("app is listening on port 3000");
  });
}

startServer();
