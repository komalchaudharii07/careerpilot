const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Session = require("../models/Session");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        message:
          "Invalid authorization format. Format must be: Bearer <token>",
      });
    }

    const token = parts[1];

    // ==========================================
    // VERIFY JWT
    // ==========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId =
      decoded.id || decoded.userId;

    const sessionId = decoded.sessionId;

    // SessionId hona mandatory hai
    if (!sessionId) {
      return res.status(401).json({
        message:
          "Invalid session. Please login again.",
      });
    }

    // ==========================================
    // CHECK SESSION
    // ==========================================

    const session = await Session.findOne({
      sessionId,
      user: userId,
    });

    if (!session) {
      return res.status(401).json({
        message:
          "Session expired or has been logged out.",
      });
    }

    // ==========================================
    // CHECK SESSION EXPIRATION
    // ==========================================

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({
        sessionId,
      });

      return res.status(401).json({
        message:
          "Session expired. Please login again.",
      });
    }

    // ==========================================
    // GET USER
    // ==========================================

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists.",
      });
    }

    // ==========================================
    // UPDATE LAST ACTIVE
    // ==========================================

    session.lastActive = new Date();
    await session.save();

    // ==========================================
    // ATTACH DATA TO REQUEST
    // ==========================================

    req.user = user;
    req.userId = user._id;
    req.session = session;
    req.sessionId = session.sessionId;

    next();

  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

// Support both import styles
module.exports = authMiddleware;
module.exports.protect = authMiddleware;