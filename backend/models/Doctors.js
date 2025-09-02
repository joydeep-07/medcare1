const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor's name is required"],
      validate: {
        validator: function (v) {
          return v.startsWith("Dr. ") && v.trim().length > 4;
        },
        message: "Name must start with 'Dr. ' and have a valid name",
      },
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: [
        "General Medicine",
        "Cardiology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Dermatology",
      ],
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      minlength: [50, "Bio must be at least 50 characters"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: function (v) {
          return /\.(jpeg|jpg|gif|png|webp)$/i.test(v);
        },
        message: "URL must point to an image file",
      },
    },
    education: {
      type: String,
      required: [true, "Education is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    contact: {
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address",
        ],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v);
          },
          message: "Phone number must be exactly 10 digits",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
