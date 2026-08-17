import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api("/auth/me");
        setUser(data.user);
      } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login Function
  const login = async (email, password) => {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setUser(data.user);
    return data;
  };

  // Register Function
  const register = async (name, email, password) => {
    const data = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setUser(data.user);
    return data;
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Helper to sync updated profile data across all components
  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;