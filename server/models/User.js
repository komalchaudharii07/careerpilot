const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==============================
    // BASIC INFORMATION
    // ==============================

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

    // ==============================
    // PROFILE INFORMATION
    // ==============================

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    degree: {
      type: String,
      default: "B.Tech",
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

    // ==============================
    // CAREER INFORMATION
    // ==============================

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

    skills: {
      type: [String],
      default: [],
    },

    // ==============================
    // SOCIAL PROFILES
    // ==============================

    github: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==============================
// PASSWORD CHECK
// ==============================

userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;``