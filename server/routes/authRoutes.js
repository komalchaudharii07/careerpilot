const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_12345";

// ======================================================
// REGISTER
// POST /api/auth/register
// ======================================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college || "",
        degree: user.degree || "",
        branch: user.branch || "",
        graduationYear: user.graduationYear || null,
        targetRole: user.targetRole || "",
        bio: user.bio || "",
        skills: user.skills || [],
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================================================
// LOGIN (TEMPORARY BYPASS ENABLED)
// POST /api/auth/login
// ======================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ======================================================
    // PASSWORD CHECK BYPASSED FOR TESTING
    // ======================================================
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if (!isPasswordCorrect) {
    //   return res.status(401).json({
    //     message: "Invalid email or password",
    //   });
    // }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college || "",
        degree: user.degree || "",
        branch: user.branch || "",
        graduationYear: user.graduationYear || null,
        targetRole: user.targetRole || "",
        bio: user.bio || "",
        skills: user.skills || [],
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================================================
// GET CURRENT USER
// GET /api/auth/me
// PROTECTED
// ======================================================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================================================
// UPDATE PROFILE
// PUT /api/auth/profile
// PROTECTED
// ======================================================
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      college,
      degree,
      branch,
      graduationYear,
      targetRole,
      bio,
      skills,
    } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = String(name).trim();
    if (college !== undefined) user.college = String(college).trim();
    if (degree !== undefined) user.degree = String(degree).trim();
    if (branch !== undefined) user.branch = String(branch).trim();
    if (graduationYear !== undefined) {
      user.graduationYear = graduationYear ? Number(graduationYear) : null;
    }
    if (targetRole !== undefined) user.targetRole = String(targetRole).trim();
    if (bio !== undefined) user.bio = String(bio).trim();

    if (skills !== undefined) {
      if (Array.isArray(skills)) {
        user.skills = skills
          .map((skill) => String(skill).trim())
          .filter(Boolean);
      } else {
        user.skills = [];
      }
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        degree: user.degree,
        branch: user.branch,
        graduationYear: user.graduationYear,
        targetRole: user.targetRole,
        bio: user.bio,
        skills: user.skills,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;