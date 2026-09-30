const mongoose = require("mongoose");

const jobOpportunitySchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["remote", "hybrid", "onsite", "unknown"],
      default: "unknown",
    },

    employmentType: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    salary: {
      type: String,
      default: "",
    },

    applicationDeadline: {
      type: Date,
      default: null,
    },

    postedAt: {
      type: Date,
      default: null,
      index: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastVerifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

jobOpportunitySchema.index({
  title: "text",
  company: "text",
  description: "text",
  skills: "text",
});

jobOpportunitySchema.index({
  isActive: 1,
  postedAt: -1,
});

module.exports = mongoose.model(
  "JobOpportunity",
  jobOpportunitySchema
);