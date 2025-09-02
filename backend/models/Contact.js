const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  department: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

module.exports = mongoose.model("Contact", contactSchema);
