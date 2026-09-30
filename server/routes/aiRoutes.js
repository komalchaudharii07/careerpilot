const express = require("express");

const router = express.Router();

const {
  matchJobWithAI,
  chatWithAI,
  getChatHistory,
  clearChatHistory,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateAIContent,
} = require("../services/geminiService");

// ==========================================
// GEMINI TEST
// ==========================================

router.get("/test", async (req, res) => {
  try {
    const response = await generateAIContent(
      "Say only: Gemini connection successful"
    );

    res.json({
      success: true,
      message: response.text,
    });
  } catch (error) {
    console.error("Gemini test error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// MATCH JOB WITH CURRENT USER
// ==========================================

router.post(
  "/match-job",
  authMiddleware,
  matchJobWithAI
);

// ==========================================
// AI CAREER ASSISTANT
// ==========================================

router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);

// ==========================================
// GET CHAT HISTORY
// ==========================================

router.get(
  "/history",
  authMiddleware,
  getChatHistory
);

// ==========================================
// CLEAR CHAT HISTORY
// ==========================================

router.delete(
  "/history",
  authMiddleware,
  clearChatHistory
);

module.exports = router;