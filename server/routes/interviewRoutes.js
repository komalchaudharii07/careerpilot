const express = require("express");

const router = express.Router();

const {
  startInterview,
  submitAnswer,
  completeInterview,
  getInterviewHistory,
  getInterviewDetails,
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

// Start interview
router.post(
  "/start",
  authMiddleware,
  startInterview
);

// Submit answer
router.post(
  "/:interviewId/answer",
  authMiddleware,
  submitAnswer
);

// Complete interview
router.post(
  "/:interviewId/complete",
  authMiddleware,
  completeInterview
);

// Interview history
router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);

// Interview details
router.get(
  "/:interviewId",
  authMiddleware,
  getInterviewDetails
);

module.exports = router;