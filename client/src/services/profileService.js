import api from "./api";


// GET PROFILE
export const getProfile = async () => {
  try {
    const response = await api("/profile");

    return response;
  } catch (error) {
    throw new Error(
      error?.message ||
      "Failed to load profile"
    );
  }
};


// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  try {
    const response = await api("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });

    return response;
  } catch (error) {
    throw new Error(
      error?.message ||
      "Failed to update profile"
    );
  }
};