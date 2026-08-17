// Format ISO Date String to Readable Date (e.g., "12 Aug 2026")
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Capitalize first letter of words
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Save item to localStorage safely
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

// Get item from localStorage safely
export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

// Remove item from localStorage
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};