const User = require("../models/User");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// ==========================================
// GENERATE TOKEN
// ==========================================

const generateToken = (id, sessionId) => {
  return jwt.sign(
    {
      id,
      sessionId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// ==========================================
// CREATE SESSION
// ==========================================

const createSession = async (userId, req) => {
  const sessionId = crypto.randomUUID();

  const userAgent = req.headers["user-agent"] || "";

  // ------------------------------------------
  // DEVICE DETECTION
  // ------------------------------------------

  let device = "Desktop";

  if (/ipad|tablet/i.test(userAgent)) {
    device = "Tablet";
  } else if (/mobile|android|iphone/i.test(userAgent)) {
    device = "Mobile";
  }

  // ------------------------------------------
  // BROWSER DETECTION
  // ------------------------------------------

  let browser = "Unknown Browser";

  if (/edg/i.test(userAgent)) {
    browser = "Microsoft Edge";
  } else if (/opr|opera/i.test(userAgent)) {
    browser = "Opera";
  } else if (/chrome/i.test(userAgent)) {
    browser = "Google Chrome";
  } else if (/firefox/i.test(userAgent)) {
    browser = "Mozilla Firefox";
  } else if (/safari/i.test(userAgent)) {
    browser = "Safari";
  }

  // ------------------------------------------
  // IP ADDRESS
  // ------------------------------------------

  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "";

  // ------------------------------------------
  // SESSION EXPIRATION
  // ------------------------------------------

  const expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  );

  // ------------------------------------------
  // SAVE SESSION
  // ------------------------------------------

  await Session.create({
    user: userId,
    sessionId,
    device,
    browser,
    ipAddress,
    userAgent,
    lastActive: new Date(),
    expiresAt,
  });

  return sessionId;
};

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    // Check existing user
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }

    // Create session
    const sessionId = await createSession(
      user._id,
      req
    );

    // Generate JWT
    const token = generateToken(
      user._id,
      sessionId
    );

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Find user
    const user = await User.findOne({
      email,
    });

    // Check credentials
    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      // Create new session
      const sessionId = await createSession(
        user._id,
        req
      );

      // Generate JWT
      const token = generateToken(
        user._id,
        sessionId
      );

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });

  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// GET CURRENT USER
// ==========================================

const getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error(
      "Get Me Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotPassword = async (req, res) => {
  return res.status(200).json({
    message:
      "Password reset link sent (stub)",
  });
};

// ==========================================
// RESET PASSWORD
// ==========================================

const resetPassword = async (req, res) => {
  return res.status(200).json({
    message:
      "Password updated successfully (stub)",
  });
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // Validation
    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password must be at least 6 characters",
      });
    }

    // Find user
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check old password
    const isPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        salt
      );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL ACTIVE SESSIONS
// ==========================================

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      user: req.user._id,
      expiresAt: {
        $gt: new Date(),
      },
    })
      .sort({
        lastActive: -1,
      })
      .select(
        "-userAgent"
      );

    return res.status(200).json({
      sessions,
      currentSessionId:
        req.sessionId,
    });

  } catch (error) {
    console.error(
      "Get Sessions Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// LOGOUT ONE SESSION
// ==========================================

const logoutSession = async (req, res) => {
  try {
    const {
      sessionId,
    } = req.params;

    const session =
      await Session.findOne({
        sessionId,
        user: req.user._id,
      });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    await Session.deleteOne({
      sessionId,
      user: req.user._id,
    });

    return res.status(200).json({
      message:
        "Session logged out successfully",
    });

  } catch (error) {
    console.error(
      "Logout Session Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// LOGOUT ALL OTHER SESSIONS
// ==========================================

const logoutOtherSessions = async (
  req,
  res
) => {
  try {
    if (!req.sessionId) {
      return res.status(401).json({
        message:
          "Current session not found",
      });
    }

    await Session.deleteMany({
      user: req.user._id,
      sessionId: {
        $ne: req.sessionId,
      },
    });

    return res.status(200).json({
      message:
        "All other sessions logged out successfully",
    });

  } catch (error) {
    console.error(
      "Logout Other Sessions Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,

  getSessions,
  logoutSession,
  logoutOtherSessions,
};