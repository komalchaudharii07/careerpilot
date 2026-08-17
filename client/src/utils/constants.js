// Base API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// App Info
export const APP_NAME = "CareerPilot";

// User Experience Levels
export const EXPERIENCE_LEVELS = [
  { label: "Beginner / Student", value: "beginner" },
  { label: "Intermediate (1-3 yrs)", value: "intermediate" },
  { label: "Senior (3+ yrs)", value: "senior" },
];

// Target Roles for Career Roadmap & Interviews
export const JOB_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "UI/UX Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Product Manager",
];

// LocalStorage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user_data",
  THEME: "theme_mode",
};