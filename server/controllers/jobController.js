const Job = require("../models/Job");

// Get all jobs for logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new job
const addJob = async (req, res) => {
  try {
    const { companyName, role, status, salary, appliedDate, notes } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({ message: "Company name and role are required" });
    }

    const newJob = await Job.create({
      userId: req.userId,
      companyName,
      role,
      status,
      salary,
      appliedDate,
      notes,
    });

    res.status(201).json({ message: "Job added successfully!", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update job status
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findOneAndDelete({ _id: id, userId: req.userId });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getJobs, addJob, updateJob, deleteJob };