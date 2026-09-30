const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  // Token 7 dino ke liye valid rahega
  return jwt.sign({ userId }, process.env.JWT_SECRET || "mera_secret_key_123", {
    expiresIn: "7d",
  });
};

module.exports = generateToken;