const { GoogleGenAI } = require("@google/genai");

// ==========================================
// GEMINI SETUP
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// GENERATE AI CONTENT
// ==========================================

const generateAIContent = async (prompt) => {
  const models = [

    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
  ];

  let lastError;

  for (const model of models) {
    try {
      console.log(`Trying Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response;
    } catch (error) {
      lastError = error;

      const status = error?.status || error?.code;

      console.error(
        `${model} failed with status:`,
        status
      );

      // Only try another model for temporary problems
      if (status !== 503 && status !== 429) {
        throw error;
      }

      console.log("Trying next Gemini model...");
    }
  }

  throw lastError;
};

// ==========================================
// PARSE GEMINI JSON
// ==========================================

const parseGeminiJSON = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Gemini returned empty response");
  }

  let cleanedText = text.trim();

  cleanedText = cleanedText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleanedText);
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  generateAIContent,
  parseGeminiJSON,
};