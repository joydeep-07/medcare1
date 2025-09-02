const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const JWT_SECRET = process.env.JTW_SECRET || "medcare";

// Configure nodemailer transporter (add this at the top)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});


const otpStorage = new Map();

// Generate random 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// Request OTP for password reset
router.post("/request-password-reset", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email. Please register first.",
      });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStorage.set(email, {
      otp,
      expires: Date.now() + 300000, 
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Medcare Password Reset Verification",
      html: `
    <div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e0e7ff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
          <span style="font-weight: 700;">Medcare</span> Account Security
        </h1>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #1e3a8a; margin-top: 0; font-size: 20px; font-weight: 600;">Password Reset Verification</h2>
        
        <p style="color: #4b5563; line-height: 1.5; margin-bottom: 20px;">
          A password reset request was initiated for your Medcare account. To ensure the security of your medical records and personal information, please use the following verification code:
        </p>
        
        <div style="background-color: #f0f4ff; border: 1px solid #dbeafe; border-radius: 6px; padding: 18px; text-align: center; margin: 25px 0;">
          <div style="font-size: 28px; font-weight: 700; letter-spacing: 3px; color: #1d4ed8; font-family: monospace;">${otp}</div>
        </div>
        
        <p style="color: #4b5563; line-height: 1.5;">
          <strong style="color: #1e3a8a;">This code expires in 5 minutes</strong> and can only be used once. Do not share this code with anyone, including Medcare staff.
        </p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e0e7ff;">
        <p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.5;">
          Protecting your health information is our priority<br>
          © ${new Date().getFullYear()} Medcare. All rights reserved.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    console.error("Password reset request error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process request",
    });
  }
});

// Verify OTP
router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStorage.get(email);

    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (Date.now() > storedOtp.expires) {
      otpStorage.delete(email);
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // OTP is valid - generate a reset token
    const resetToken = jwt.sign(
      { email, purpose: "password_reset" },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Clear the OTP after successful verification
    otpStorage.delete(email);

    res.json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
});

// Reset password (final step)
// Reset password (final step)
router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Verify the reset token
    const decoded = jwt.verify(resetToken, JWT_SECRET);
    if (decoded.purpose !== "password_reset") {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Find user and update password
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Assign new password (hashing will be done by the pre-save hook)
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Password reset error:", err);

    let message = "Failed to reset password";
    if (err.name === "TokenExpiredError") {
      message = "Reset token has expired. Please request a new OTP.";
    } else if (err.name === "JsonWebTokenError") {
      message = "Invalid reset token";
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
});


router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ fullname, email, password });
    await newUser.save(); // Password hashing happens in the User model's pre-save hook

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT payload
    const payload = {
      id: user._id,
    };

 
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d", 
      
    });

    res.json({
      message: "Login successful",
      token,
      user: { _id: user._id, fullname: user.fullname, email: user.email }, 
      
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.get("/verify", authMiddleware, async (req, res) => {
  try {
    // If the token is valid, req.user will be populated by authMiddleware with { id: user._id }
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user found and token valid, return essential user data
    res
      .status(200)
      .json({ _id: user._id, fullname: user.fullname, email: user.email });
  } catch (err) {
    console.error("Verify token error:", err.message);
    // Generic server error for security reasons, specific token errors handled by middleware
    res.status(500).json({ message: "Server error during verification" });
  }
});

module.exports = router;
