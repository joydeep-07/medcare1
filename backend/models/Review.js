const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: [1, "Review must not be empty"],
    },

    userFullName: {
      type: String,
      required: [true, "User full name is required"],
    },

    userEmail: {
      type: String,
      required: [true, "User email is required"],
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
