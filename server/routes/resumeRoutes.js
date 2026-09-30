const express = require("express");
const router = express.Router();
const multer = require("multer");

const resumeController = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");

// Multer
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
});

// GET /api/resume
router.get(
  "/",
  authMiddleware,
  resumeController.getResume
);

// POST /api/resume/save
router.post(
  "/save",
  authMiddleware,
  resumeController.saveResume
);

// POST /api/resume/analyze
router.post(
  "/analyze",
  authMiddleware,
  upload.single("file"),
  resumeController.analyzeResume
);

module.exports = router;