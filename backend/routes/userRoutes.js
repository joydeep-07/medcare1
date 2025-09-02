// routes/userRoutes.js
const express = require("express");
const User = require("../models/User"); // Path to your User Mongoose model
const authMiddleware = require("../middlewares/authMiddleware"); // Import the new middleware

const router = express.Router();

// GET all users (protected route)
// This route requires authentication via JWT.
// It fetches all users from the database and excludes their password hash.
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Find all users and select all fields except the password
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});

module.exports = router;
