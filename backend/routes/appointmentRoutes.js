const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Create appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getAllAppointments);

// Update appointment status
router.patch("/:id/status", appointmentController.updateAppointmentStatus);

module.exports = router;
