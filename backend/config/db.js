const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("❌ MongoDB connection URI is missing in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    console.log("💡 Troubleshooting Tips:");
    console.log("1. Verify .env file exists in backend directory");
    console.log("2. Check MONGO_URI is spelled correctly in .env");
    console.log("3. Ensure your network allows MongoDB connections");
    console.log("4. Confirm your MongoDB Atlas IP whitelist is configured");
    process.exit(1);
  }
};

module.exports = connectDB;
