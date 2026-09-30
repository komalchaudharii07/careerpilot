import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing login
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api("/auth/me");

        setUser(data);
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

  // LOGIN
  const login = async (email, password) => {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("LOGIN RESPONSE:", data);

      // Token must be present
      if (!data?.token) {
        console.error("TOKEN NOT RECEIVED FROM SERVER:", data);
        throw new Error("Login successful but token was not received.");
      }

      // Save token
      localStorage.setItem("token", data.token);

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      // Backend directly user object return karta hai
      setUser(data);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log("REGISTER RESPONSE:", data);

      if (!data?.token) {
        throw new Error(
          "Registration successful but token was not received."
        );
      }

      localStorage.setItem("token", data.token);

      setUser(data);

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Update user
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