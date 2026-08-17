import api from "./api";

// Update logged-in user's profile
export const updateProfile = async (profileData) => {
  return await api("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};