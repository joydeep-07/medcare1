require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const errorHandler = require("./middlewares/errorHandler");
const reviewRoutes = require("./routes/reviewRoutes"); 
const userRoutes = require("./routes/userRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);
// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
