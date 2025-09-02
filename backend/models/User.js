// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define a schema for our counters
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Name of the counter (e.g., "patientId")
  seq: { type: Number, default: 999 }, // Starting sequence number for "PID1000" (1000-1)
});
const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    patientId: { type: String, unique: true }, 
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }

  
  if (this.isNew && !this.patientId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "patientId" }, 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } 
      );
      this.patientId = `PID${counter.seq}`;
    } catch (err) {
      console.error("Error generating patientId:", err);
      return next(err);
    }
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
