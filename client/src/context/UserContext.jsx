import { createContext, useContext, useState, useEffect } from "react";
import profileService from "../services/profileService";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // User profile data fetch karne ka function
  const fetchProfile = async () => {
    if (!isAuthenticated) return;
    setLoadingProfile(true);
    try {
      const data = await profileService.getProfile();
      setProfile(data.user || data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Profile updates (e.g. skills, experience, target role) save karne ka function
  const updateProfile = async (updatedData) => {
    try {
      const response = await profileService.updateProfile(updatedData);
      const newProfile = response.user || response;
      setProfile(newProfile);
      return newProfile;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  // Authenticated hone par profile auto-load karein
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loadingProfile,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;