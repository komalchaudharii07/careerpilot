const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      default: "Uploaded Resume",
    },
    // Dynamic Analysis Fields
    atsScore: {
      type: Number,
      default: 0,
    },
    summary: String,
    strengths: [String],
    weaknesses: [String],
    improvements: [String],

    // Core Resume Fields
    title: {
      type: String,
      default: "My Resume",
    },
    skills: [String],
    experience: [
      {
        company: String,
        role: String,
        description: String,
      },
    ],
    education: [
      {
        college: String,
        degree: String,
        year: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);