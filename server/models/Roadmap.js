const mongoose = require("mongoose");

// ======================================================
// MODULE SCHEMA
// ======================================================

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    estimatedMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

// ======================================================
// MILESTONE SCHEMA
// ======================================================

const milestoneSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "locked",
        "not_started",
        "in_progress",
        "completed",
      ],
      default: "not_started",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    duration: {
      type: String,
      default: "",
    },

    estimatedMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    modules: {
      type: [moduleSchema],
      default: [],
    },

    project: {
      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      completed: {
        type: Boolean,
        default: false,
      },
    },

    assessment: {
      total: {
        type: Number,
        default: 0,
        min: 0,
      },

      completed: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

// ======================================================
// ROADMAP SCHEMA
// ======================================================

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    targetRole: {
      type: String,
      default: "",
      trim: true,
    },

    targetDate: {
      type: Date,
      default: null,
    },

    dailyGoalMinutes: {
      type: Number,
      default: null,
      min: 0,
    },

    // AI-generated personalized insight
    aiInsight: {
      type: String,
      default: "",
      trim: true,
    },

    aiGeneratedAt: {
      type: Date,
      default: null,
    },

    milestones: {
      type: [milestoneSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// One roadmap per user + selected role
roadmapSchema.index({
  userId: 1,
  targetRole: 1,
});

module.exports =
  mongoose.models.Roadmap ||
  mongoose.model("Roadmap", roadmapSchema);