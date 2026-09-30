const express = require("express");

const router = express.Router();

const {
  getRoadmaps,
  getRoadmapById,
  generateRoadmap,
  createRoadmap,
  updateModule,
  updateMilestone,
  deleteRoadmap,
} = require("../controllers/roadmapController");

const authMiddleware = require("../middleware/authMiddleware");

// ======================================================
// GET ALL ROADMAPS
// GET /api/roadmap
// ======================================================

router.get(
  "/",
  authMiddleware,
  getRoadmaps
);

// ======================================================
// GENERATE AI ROADMAP
// POST /api/roadmap/generate
// ======================================================

router.post(
  "/generate",
  authMiddleware,
  generateRoadmap
);

// ======================================================
// CREATE MANUAL ROADMAP
// POST /api/roadmap/create
// ======================================================

router.post(
  "/create",
  authMiddleware,
  createRoadmap
);

// ======================================================
// UPDATE MODULE
// PUT /api/roadmap/:roadmapId/module/:moduleId
// ======================================================

router.put(
  "/:roadmapId/module/:moduleId",
  authMiddleware,
  updateModule
);

// ======================================================
// UPDATE MILESTONE
// PUT /api/roadmap/:roadmapId/milestone/:milestoneId
// ======================================================

router.put(
  "/:roadmapId/milestone/:milestoneId",
  authMiddleware,
  updateMilestone
);

// ======================================================
// GET SINGLE ROADMAP
// GET /api/roadmap/:id
// ======================================================

router.get(
  "/:id",
  authMiddleware,
  getRoadmapById
);

// ======================================================
// DELETE ROADMAP
// DELETE /api/roadmap/:id
// ======================================================

router.delete(
  "/:id",
  authMiddleware,
  deleteRoadmap
);

module.exports = router;