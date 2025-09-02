// This file should be something like: src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JTW_SECRET || "medcare"; // Ensure this is the SAME as in your auth.js

module.exports = (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization");

  // Check if no token
  if (!authHeader) {
    // console.log("Auth Middleware: No Authorization header."); // Debug log
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  if (!token) {
    // console.log("Auth Middleware: Token missing after Bearer."); // Debug log
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    // console.log("Auth Middleware: Attempting to verify token..."); // Debug log
    // console.log("Auth Middleware: Token received:", token); // Debug log
    // console.log("Auth Middleware: JWT_SECRET used:", JWT_SECRET); // Debug log

    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret

    // console.log("Auth Middleware: Token decoded successfully:", decoded); // Debug log

    req.user = decoded; // Attach the decoded payload (which contains user.id) to the request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    // console.error("Auth Middleware: Token verification failed.", err); // Debug log

    // Handle specific JWT errors for more informative messages
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      // This includes 'invalid signature', 'jwt malformed', 'invalid token'
      return res.status(401).json({ message: "Token is not valid" });
    }
    // Generic error for other unexpected issues
    res.status(500).json({ message: "Server error during token verification" });
  }
};
