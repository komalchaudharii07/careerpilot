import api from "./api";

// Upload and analyze resume PDF/Doc
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user's active/saved resume data
export const getResumeData = async () => {
  try {
    const response = await api.get("/resume/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Analyze ATS compatibility score against a job description
export const analyzeATS = async (jobDescription) => {
  try {
    const response = await api.post("/resume/analyze", { jobDescription });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Save or update structured resume data
export const saveResumeData = async (resumeData) => {
  try {
    const response = await api.put("/resume/update", resumeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  uploadResume,
  getResumeData,
  analyzeATS,
  saveResumeData,
};