const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
  };

  // JSON request ke liye
  // FormData ke liye browser khud Content-Type set karega
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  // Response ko pehle text lo
  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch (parseError) {
    console.error(
      "API returned non-JSON response:"
    );
    console.error(text);

    throw new Error(
      `Server returned an invalid response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
};

export default api;