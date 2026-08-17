const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CareerPilot Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});