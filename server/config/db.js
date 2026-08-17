const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Direct local URI hardcode kar rahe hain taaki .env ka jhanjhat hi na rahe
    const localURI = "mongodb://127.0.0.1:27017/careerpilot";

    await mongoose.connect(localURI);

    console.log("MongoDB connected successfully to LOCAL DB! 🚀");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;