const express = require("express");
const router = express.Router();
const { getJobs, addJob, updateJob, deleteJob } = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getJobs);
router.post("/add", authMiddleware, addJob);
router.put("/update/:id", authMiddleware, updateJob);
router.delete("/delete/:id", authMiddleware, deleteJob);

module.exports = router; // ← Yeh hona zaroori hai