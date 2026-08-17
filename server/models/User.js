const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // =========================
    // EDUCATION / PROFILE
    // =========================
    college: {
      type: String,
      default: "",
      trim: true,
    },

    degree: {
      type: String,
      default: "",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    graduationYear: {
      type: Number,
      default: null,
    },

    // =========================
    // CAREER
    // =========================
    targetRole: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // SKILLS
    // =========================
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;