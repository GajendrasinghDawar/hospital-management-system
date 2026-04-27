import type { Request, Response } from "express";
import { connectToDatabse } from "../config/database.ts";
import type { authRequest } from "../middleware/auth_middleware.ts";
import { ObjectId } from "mongodb";

export async function createAppointment(req: authRequest, res: Response) {
  const { date, time, doctorId } = req.body;

  if (!date || !time || !doctorId) {
    return res.status(400).json({
      message: "date, time and doctorId are required",
    });
  }

  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "unauthorized !",
    });
  }

  const db = await connectToDatabse();
  const appointment = {
    date,
    time,
    doctorId,
    clientId: req.user?.id,
  };

  const existingAppointment = await db.collection("appointments").findOne({
    date,
    time,
    doctorId,
  });

  if (existingAppointment) {
    return res.status(400).json({
      message: "appointment already exist for this date and time",
    });
  }

  const data = await db.collection("appointments").insertOne(appointment);

  if (!data) {
    return res.status(500).json({
      message: "Failed to create appointment",
    });
  }
}

export async function getAppointments(req: authRequest, res: Response) {
  const user = req.user;
  const db = await connectToDatabse();

  if (!user) {
    return res.status(401).json({
      message: "unauthorized !",
    });
  }

  const appointments = await db.collection("appointments").find({
    clientId: user?.id,
    type: user.type,
  });
  res.status(200).json({ ...appointments, status: "booked" });
}

export async function getAppointmentById(req: authRequest, res: Response) {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "unauthorized !",
    });
  }

  if (!id || !ObjectId.isValid(id as string)) {
    return res.status(400).json({
      message: "appointment id is required",
    });
  }

  const db = await connectToDatabse();

  const appointment = await db.collection("appointments").findOne({
    _id: new ObjectId(id as string),
  });
  if (!appointment) {
    return res.status(404).json({
      message: "appointment not found",
    });
  }

  res.status(200).json({ appointment });
}

export async function createAvailability(req: authRequest, res: Response) {
  const { date, time } = req.body;
  const user = req.user;
  if (!user || user.type !== "doctor") {
    return res.status(401).json({
      message: "unauthorized !",
    });
  }
  const db = await connectToDatabse();

  const availability = {
    date,
    time,
    doctorId: user.id,
  };

  const existingAvailability = await db.collection("availabilities").findOne({
    date,
    time,
    doctorId: user.id,
  });

  if (existingAvailability) {
    return res.status(400).json({
      message: "availability already exist for this date and time",
    });
  }

  const data = await db.collection("availabilities").insertOne(availability);
  if (!data) {
    return res.status(500).json({
      message: "Failed to create availability",
    });
  }
  return res.status(200).json({
    message: "availability created successfully",
  });
}
