import api from "./api";

// Start a new mock interview session
export const startInterview = async (role, level) => {
  try {
    const response = await api.post("/interview/start", { role, level });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Submit user response to an interview question
export const submitAnswer = async (interviewId, questionId, answer) => {
  try {
    const response = await api.post(`/interview/${interviewId}/answer`, {
      questionId,
      answer,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get past interview history/results
export const getInterviewHistory = async () => {
  try {
    const response = await api.get("/interview/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get detailed report for a specific interview
export const getInterviewDetails = async (interviewId) => {
  try {
    const response = await api.get(`/interview/${interviewId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  startInterview,
  submitAnswer,
  getInterviewHistory,
  getInterviewDetails,
};