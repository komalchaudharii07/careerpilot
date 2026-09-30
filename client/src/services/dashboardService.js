import api from "./api";

export const getDashboardData = async () => {
  try {
    const response = await api("/dashboard");
    return response;
  } catch (error) {
    throw new Error(
      error?.message || "Failed to load dashboard data"
    );
  }
};