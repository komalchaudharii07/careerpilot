import api from "./api";

// ==========================================
// START INTERVIEW
// ==========================================

export const startInterview = async (
  role,
  level,
  interviewType
) => {
  try {
    const data = await api("/interview/start", {
      method: "POST",
      body: JSON.stringify({
        role,
        level,
        interviewType,
      }),
    });

    return data;
  } catch (error) {
    console.error("Start Interview Error:", error);
    throw error;
  }
};

// ==========================================
// SUBMIT ANSWER
// ==========================================

export const submitAnswer = async (
  interviewId,
  questionId,
  question,
  answer
) => {
  try {
    const data = await api(
      `/interview/${interviewId}/answer`,
      {
        method: "POST",
        body: JSON.stringify({
          questionId,
          question,
          answer,
        }),
      }
    );

    return data;
  } catch (error) {
    console.error("Submit Answer Error:", error);
    throw error;
  }
};

// ==========================================
// COMPLETE INTERVIEW
// ==========================================

export const completeInterview = async (
  interviewId
) => {
  try {
    const data = await api(
      `/interview/${interviewId}/complete`,
      {
        method: "POST",
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Complete Interview Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// GET INTERVIEW HISTORY
// ==========================================

export const getInterviewHistory = async () => {
  try {
    const data = await api(
      "/interview/history",
      {
        method: "GET",
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Interview History Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// GET INTERVIEW DETAILS
// ==========================================

export const getInterviewDetails = async (
  interviewId
) => {
  try {
    const data = await api(
      `/interview/${interviewId}`,
      {
        method: "GET",
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Interview Details Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// DEFAULT EXPORT
// ==========================================

export default {
  startInterview,
  submitAnswer,
  completeInterview,
  getInterviewHistory,
  getInterviewDetails,
};