import { Router } from "express";
import { authMiddleware } from "../middleware/auth_middleware.ts";
import {
  createAppointment,
  getAppointmentById,
  getAppointments,
  createAvailability,
  getAvailabilities,
} from "../controllers/booking_controllers.ts";

const router = Router();

router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", authMiddleware, getAppointments);
router.get("/appointments/:id", authMiddleware, getAppointmentById);
router.post("/availability", authMiddleware, createAvailability);
router.get("/availability", authMiddleware, getAvailabilities);

export default router;
