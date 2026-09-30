const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const jobRoutes = require("./routes/jobRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const jobRecommendationRoutes = require("./routes/jobRecommendationRoutes");

const aiRoutes = require("./routes/aiRoutes");

const profileRoutes = require("./routes/profileRoutes");

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// ENV CHECK
// ==========================================

console.log(
  "MONGO_URI loaded:",
  !!process.env.MONGO_URI
);

console.log(
  "GEMINI_API_KEY loaded:",
  !!process.env.GEMINI_API_KEY
);

console.log(
  "RAPIDAPI_KEY loaded:",
  !!process.env.RAPIDAPI_KEY
);

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/interview",
  interviewRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/roadmap",
  roadmapRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// ==========================================
// JOB RECOMMENDATIONS
// ==========================================

app.use(
  "/api/job-recommendations",
  jobRecommendationRoutes
);

// ==========================================
// GEMINI AI
// ==========================================

app.use(
  "/api/ai",
  aiRoutes
);

// ==========================================
// PROFILE
// ==========================================

app.use(
  "/api/profile",
  profileRoutes
);

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerPilot Backend is Running!",
  });
});

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error(
    "SERVER ERROR:",
    err
  );

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal server error",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `CareerPilot Server running on http://localhost:${PORT}`
  );
});