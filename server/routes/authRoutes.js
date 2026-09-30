const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  getSessions,
  logoutSession,
  logoutOtherSessions,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

// Sessions
router.get("/sessions", protect, getSessions);

// IMPORTANT: /others must come BEFORE /:sessionId
router.delete("/sessions/others", protect, logoutOtherSessions);
router.delete("/sessions/:sessionId", protect, logoutSession);

module.exports = router;