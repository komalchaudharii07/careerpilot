require("dotenv").config();

console.log("1. File started");

console.log(
  "2. API key loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const { GoogleGenAI } = require("@google/genai");

console.log("3. Gemini package loaded");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  console.log("4. Sending request to Gemini...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: "Say only: Gemini connection successful",
    });

    console.log("5. Gemini Response:");
    console.log(response.text);
  } catch (error) {
    console.error("6. Gemini Error:");
    console.error(error.message);
  }
}

testGemini();