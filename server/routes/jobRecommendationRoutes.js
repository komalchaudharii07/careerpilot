const express = require("express");

const router = express.Router();

const {
  getJobRecommendations,
} = require("../controllers/jobRecommendationController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  getJobRecommendations
);

module.exports = router;