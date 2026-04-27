import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.ts";
import {
  createAppointment,
  getAppointmentById,
  getAppointments,
} from "../controllers/booking_controllers.ts";

const router = Router();

router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", authMiddleware, getAppointments);
router.get("/appointments/:id", authMiddleware, getAppointmentById);

export default router;
