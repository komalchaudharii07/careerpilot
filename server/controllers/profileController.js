const User = require("../models/User");

// =====================================================
// GET LOGGED-IN USER PROFILE
// GET /api/profile
// =====================================================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
};


// =====================================================
// UPDATE LOGGED-IN USER PROFILE
// PUT /api/profile
// =====================================================

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      email,
      phone,
      location,
      college,
      degree,
      branch,
      graduationYear,
      targetRole,
      bio,
      skills,
      github,
      linkedin,
      portfolio,
    } = req.body;


    // =================================================
    // UPDATE ONLY PROVIDED FIELDS
    // =================================================

    if (name !== undefined)
      user.name = name;

    if (email !== undefined)
      user.email = email;

    if (phone !== undefined)
      user.phone = phone;

    if (location !== undefined)
      user.location = location;

    if (college !== undefined)
      user.college = college;

    if (degree !== undefined)
      user.degree = degree;

    if (branch !== undefined)
      user.branch = branch;

    if (graduationYear !== undefined)
      user.graduationYear = graduationYear;

    if (targetRole !== undefined)
      user.targetRole = targetRole;

    if (bio !== undefined)
      user.bio = bio;

    if (github !== undefined)
      user.github = github;

    if (linkedin !== undefined)
      user.linkedin = linkedin;

    if (portfolio !== undefined)
      user.portfolio = portfolio;


    // =================================================
    // SKILLS
    // =================================================

    if (
      skills !== undefined &&
      Array.isArray(skills)
    ) {
      user.skills = skills;
    }


    // =================================================
    // SAVE
    // =================================================

    const updatedUser = await user.save();


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message: "Profile updated successfully",

      profile: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        college: updatedUser.college,
        degree: updatedUser.degree,
        branch: updatedUser.branch,
        graduationYear:
          updatedUser.graduationYear,
        targetRole:
          updatedUser.targetRole,
        bio: updatedUser.bio,
        skills:
          Array.isArray(updatedUser.skills)
            ? updatedUser.skills
            : [],
        github: updatedUser.github,
        linkedin: updatedUser.linkedin,
        portfolio: updatedUser.portfolio,
      },
    });

  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};


module.exports = {
  getProfile,
  updateProfile,
};