import api from "./api";

export const registerUser = async (userData) => {
  return await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  const data = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const getCurrentUser = async () => {
  return await api("/auth/me", {
    method: "GET",
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};