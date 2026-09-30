const mongoose = require("mongoose");

// ==========================================
// QUESTION SCHEMA
// ==========================================

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    userAnswer: {
      type: String,
      default: "",
    },

    aiFeedback: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    evaluation: {
      type: String,
      enum: [
        "not-evaluated",
        "correct",
        "partially-correct",
        "incorrect",
      ],
      default: "not-evaluated",
    },
  },
  {
    _id: false,
  }
);

// ==========================================
// INTERVIEW SCHEMA
// ==========================================

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      default: "Junior",
    },

    interviewType: {
      type: String,
      enum: [
        "technical",
        "behavioral",
        "mixed",
      ],
      default: "mixed",
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    summary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "in-progress",
        "completed",
      ],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Interview ||
  mongoose.model(
    "Interview",
    interviewSchema
  );