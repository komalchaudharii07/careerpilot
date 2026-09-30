const User = require("../models/User");
const Interview = require("../models/Interview");
const Resume = require("../models/Resume");

// @desc    Get real user dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id || req.userId;

    // =====================================================
    // USER
    // =====================================================

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================================
    // INTERVIEWS
    // =====================================================

    const interviews = await Interview.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    // =====================================================
    // LATEST RESUME
    // =====================================================

    const resume = await Resume.findOne({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    // =====================================================
    // INTERVIEW SCORE
    // =====================================================

    let interviewScore = null;

    if (interviews.length > 0) {
      const validScores = interviews
        .map((item) => {
          const score =
            item.score ??
            item.overallScore ??
            item.totalScore;

          return typeof score === "number"
            ? score
            : null;
        })
        .filter((score) => score !== null);

      if (validScores.length > 0) {
        const total = validScores.reduce(
          (sum, score) => sum + score,
          0
        );

        interviewScore = Math.round(
          total / validScores.length
        );
      }
    }

    // =====================================================
    // RESUME SCORE
    // =====================================================

    let resumeScore = null;

    if (resume) {
      const score =
        resume.score ??
        resume.atsScore ??
        resume.resumeScore;

      if (typeof score === "number") {
        resumeScore = score;
      }
    }

    // =====================================================
    // PROFILE COMPLETION
    // =====================================================

    const profileFields = [
      user.name,
      user.email,
      user.college,
      user.degree,
      user.branch,
      user.graduationYear,
      user.targetRole,
      user.location,
      Array.isArray(user.skills) &&
        user.skills.length > 0
        ? "skills"
        : "",
    ];

    const completedFields =
      profileFields.filter(
        (field) =>
          field !== null &&
          field !== undefined &&
          String(field).trim() !== ""
      ).length;

    const profileCompletion = Math.round(
      (completedFields / profileFields.length) * 100
    );

    // =====================================================
    // CAREER READINESS
    // =====================================================
    //
    // Only calculate using REAL available scores.
    // No fake default score.
    //

    const readinessParts = [];

    if (resumeScore !== null) {
      readinessParts.push({
        score: resumeScore,
        weight: 0.5,
      });
    }

    if (interviewScore !== null) {
      readinessParts.push({
        score: interviewScore,
        weight: 0.5,
      });
    }

    let readinessScore = null;

    if (readinessParts.length > 0) {
      const totalWeight = readinessParts.reduce(
        (sum, item) => sum + item.weight,
        0
      );

      const weightedScore =
        readinessParts.reduce(
          (sum, item) =>
            sum + item.score * item.weight,
          0
        ) / totalWeight;

      readinessScore = Math.round(
        weightedScore
      );
    }

    // =====================================================
    // RECENT ACTIVITY
    // =====================================================

    const recentActivity = [];

    // Resume activity
    if (resume) {
      recentActivity.push({
        type: "resume",
        title: "Resume analyzed",
        description:
          resumeScore !== null
            ? `Latest resume score: ${resumeScore}/100`
            : "Your resume was analyzed.",
        time: resume.createdAt,
      });
    }

    // Interview activities
    interviews.slice(0, 5).forEach((interview) => {
      const score =
        interview.score ??
        interview.overallScore ??
        null;

      recentActivity.push({
        type: "interview",
        title: "Interview practice completed",
        description:
          typeof score === "number"
            ? `Interview score: ${score}/100`
            : "Interview practice completed.",
        time: interview.createdAt,
      });
    });

    // Sort newest first
    recentActivity.sort((a, b) => {
      return (
        new Date(b.time || 0) -
        new Date(a.time || 0)
      );
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      user: {
        _id: user._id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        college: user.college || "",
        degree: user.degree || "",
        branch: user.branch || "",
        graduationYear:
          user.graduationYear || null,
        targetRole: user.targetRole || "",
        bio: user.bio || "",
        skills: Array.isArray(user.skills)
          ? user.skills
          : [],
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      },

      // Real values
      readinessScore,
      resumeScore,
      interviewScore,

      // Profile
      profileCompletion,

      // Actual counts
      interviewCount: interviews.length,
      hasResume: !!resume,

      // Activity
      recentActivity:
        recentActivity.slice(0, 5),
    });
  } catch (error) {
    console.error(
      "Dashboard controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard data",
    });
  }
};

module.exports = {
  getDashboardData,
};