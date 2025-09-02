const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctors");
const { body, validationResult } = require("express-validator");
const sanitize = require("mongo-sanitize");

const doctorValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("specialty").trim().notEmpty().withMessage("Specialty is required"),
  body("bio")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Bio must be at least 50 characters"),
  body("image").isURL().withMessage("Valid image URL is required"),
  body("education").trim().notEmpty().withMessage("Education is required"),
  body("experience").trim().notEmpty().withMessage("Experience is required"),
  body("contact.email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("contact.phone")
    .isMobilePhone() 
    .withMessage("Valid phone number is required"),
];


router.post("/", doctorValidationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }

    const sanitizedData = sanitize(req.body);

    
    if (!sanitizedData.name.startsWith("Dr. ")) {
      sanitizedData.name = "Dr. " + sanitizedData.name.trim();
    }

    const doctor = new Doctor(sanitizedData);
    await doctor.save();

    res.status(201).json({
      success: true,
      data: doctor,
      message: "Doctor added successfully",
    });
  } catch (err) {
    console.error("Error adding doctor:", err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET / - Get All Doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET /:id - Get a Single Doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (err) {
    console.error("Error fetching doctor:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// PUT /:id - Update a Doctor by ID
router.put("/:id", doctorValidationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }

    const sanitizedData = sanitize(req.body);


    if (!sanitizedData.name.startsWith("Dr. ")) {
      sanitizedData.name = "Dr. " + sanitizedData.name.trim();
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      sanitizedData,
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor updated successfully",
    });
  } catch (err) {
    console.error("Error updating doctor:", err);

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// DELETE /:id - Delete a Doctor by ID
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
