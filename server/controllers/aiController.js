const User = require("../models/User");
const ChatHistory = require("../models/ChatHistory");

const {
  generateAIContent,
  parseGeminiJSON,
} = require("../services/geminiService");

// ==========================================
// MATCH JOB WITH CURRENT USER
// ==========================================

const matchJobWithAI = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name college degree branch graduationYear targetRole bio skills"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { job } = req.body;

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job data is required",
      });
    }

    const profile = {
      name: user.name,
      college: user.college,
      degree: user.degree,
      branch: user.branch,
      graduationYear: user.graduationYear,
      targetRole: user.targetRole,
      bio: user.bio,
      skills: user.skills,
    };

    const prompt = `
You are CareerPilot AI, an AI career assistant.

TASK:
Compare the user's profile with the real job listing.

RULES:
- Use only the information provided.
- Never invent user skills.
- Never invent job requirements.
- Never invent experience, projects, achievements or qualifications.
- Consider skills, target role, education and job requirements.
- Return only valid JSON.

USER PROFILE:
${JSON.stringify(profile, null, 2)}

REAL JOB:
${JSON.stringify(job, null, 2)}

Return exactly:

{
  "match": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "reason": ""
}
`;

    console.log("=================================");
    console.log("🤖 GEMINI JOB MATCHING");
    console.log("User:", user.name);
    console.log("Target Role:", user.targetRole || "Not specified");
    console.log("Job:", job.title || "Unknown");
    console.log("=================================");

    const response = await generateAIContent(prompt);

    const result = parseGeminiJSON(response.text);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("❌ AI Job Matching Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to match job with AI",
      error: error.message,
    });
  }
};

// ==========================================
// AI CAREER ASSISTANT
// ==========================================

const chatWithAI = async (req, res) => {
  try {
    // ==========================================
    // GET USER
    // ==========================================

    const user = await User.findById(req.user._id).select(
      "name college degree branch graduationYear targetRole bio skills"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // GET MESSAGE
    // ==========================================

    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const currentMessage = message.trim();

    // ==========================================
    // USER PROFILE
    // ==========================================

    const profile = {
      name: user.name,
      college: user.college,
      degree: user.degree,
      branch: user.branch,
      graduationYear: user.graduationYear,
      targetRole: user.targetRole,
      bio: user.bio,
      skills: user.skills,
    };

    // ==========================================
    // GET EXISTING CHAT HISTORY
    // ==========================================

    const chatHistory = await ChatHistory.findOne({
      user: req.user._id,
    }).select("messages");

    // Keep only recent messages for Gemini
    const recentMessages = chatHistory
      ? chatHistory.messages.slice(-12)
      : [];

    // ==========================================
    // FORMAT CHAT HISTORY
    // ==========================================

    const conversation = recentMessages.length
      ? recentMessages
        .map((item) => {
          const role =
            item.role === "assistant"
              ? "CareerPilot AI"
              : "User";

          return `${role}: ${item.content}`;
        })
        .join("\n")
      : "No previous conversation.";

    // ==========================================
    // DEBUG
    // ==========================================

    console.log("=================================");
    console.log("🤖 CAREER ASSISTANT");
    console.log("User:", user.name);
    console.log(
      "Target Role:",
      user.targetRole || "Not specified"
    );
    console.log("Current Skills:", user.skills || []);
    console.log(
      "Previous Messages:",
      recentMessages.length
    );
    console.log("Message:", currentMessage);
    console.log("=================================");

    // ==========================================
    // CAREERPILOT AI PROMPT
    // ==========================================

    const prompt = `
You are CareerPilot AI, a friendly and personalized career
assistant inside a career platform.

Your job is to have a natural, short and useful conversation
with the user.

You can help with:
- Career planning
- Skill development
- Resume improvement
- Interview preparation
- Placement preparation
- Job preparation
- Learning decisions
- Professional growth

==========================================
USER PROFILE
==========================================

${JSON.stringify(profile, null, 2)}

==========================================
PROFILE RULES
==========================================

1. USER PROFILE is the only source of truth about the user.

2. Never invent:
- skills
- projects
- internships
- experience
- certifications
- achievements
- scores
- companies
- jobs

3. Never claim the user knows a skill unless it appears in
USER PROFILE.skills or USER PROFILE.bio.

4. Never infer the user's academic year from graduation year.

5. Clearly separate:
- skills the user already has
- skills you suggest learning

6. If important profile information is missing, do not guess.

==========================================
RECENT CONVERSATION
==========================================

${conversation}

==========================================
CURRENT USER MESSAGE
==========================================

${currentMessage}

==========================================
CONVERSATION MEMORY
==========================================

The RECENT CONVERSATION is important context.

Understand the CURRENT USER MESSAGE together with the
RECENT CONVERSATION.

Do NOT treat every message as a new conversation.

If the user says:

"okay"
"yes"
"sure"
"continue"
"tell me more"
"the first one"
"what about that?"
"how?"
"why?"
"then what?"

understand what they are referring to from the recent
conversation.

Continue naturally from the previous topic.

Do not restart the conversation.

Do not repeat information that was already explained unless
the user asks for it again.

If the user refers to:
"first one"
"second one"
"that"
"this"

use the recent conversation to identify the correct reference.

==========================================
RESPONSE STYLE
==========================================

IMPORTANT:

The response must feel like a modern career chatbot,
NOT like an article, essay or textbook.

1. Answer the user's actual question first.

2. Keep the response SHORT.

3. Prefer KEY POINTS over paragraphs.

4. Use 2-5 short bullet points when multiple points are needed.

5. Keep each bullet approximately 1-2 lines.

6. Put each important point on a separate line.

7. Use **bold** for important keywords.

8. Use emojis naturally when useful.

Examples:
👋 💡 🎯 🚀 ✨ 💻 📄 🧠 ✅

9. Do not overuse emojis.

10. Avoid long paragraphs.

11. Avoid article-style explanations.

12. Avoid unnecessary formal headings.

13. Do not use "---".

14. Do not repeat the user's profile unnecessarily.

15. Do not repeatedly say:
"Since you're a Frontend Developer..."

Only mention the target role when relevant.

16. Do not constantly give 3-5 new options.

17. Do not make every response end with:
"What would you like to focus on?"

18. Offer choices only when genuinely useful.

19. Recommendations should feel like suggestions,
not commands.

20. Do not give exaggerated motivation.

21. Do not turn a simple question into a complete
career roadmap.

22. Do not automatically provide large code examples.

23. Only provide code when:
- the user asks for code
OR
- a very small example is necessary.

24. If code is necessary, keep it small.

25. Do not explain every detail unless the user asks.

==========================================
RESPONSE LENGTH
==========================================

Follow these limits strictly.

For a simple question:
2-5 short lines.

For a normal career question:
4-8 short lines.

For a detailed question:
maximum around 10-12 short lines.

Never write a long essay unless the user explicitly asks
for a detailed explanation.

==========================================
FORMATTING
==========================================

When multiple points are needed, use this style:

**For better placements, focus on these 👇**

🔹 **DSA** — practice common interview patterns.

🔹 **Projects** — know your role and technical decisions.

🔹 **Interview practice** — practice answering aloud.

💡 **First step:** Start with one DSA topic and one project.

Do NOT turn this into one long paragraph.

==========================================
QUESTION-SPECIFIC BEHAVIOR
==========================================

If the user asks a simple question:
Give a short direct answer.

If the user asks what to learn:
Recommend only 2-4 relevant things based on their current
skills and target role.

If the user asks about a resume:
Give practical advice.

If the actual resume is unavailable:
Clearly say that specific resume feedback requires the resume.

If the user asks about interviews:
Prefer interactive practice over a long explanation.

If the user asks for a roadmap:
Give a structured roadmap using short steps.

If the user asks about a specific problem:
Focus only on that problem.

If the user asks "tell me more":
Explain the current topic without restarting it.

If the user asks "how should I start?":
Give 2-4 practical first steps for the current topic.

Then give ONE clear first action.

If the user asks "what next?":
Continue from the current topic.

If the user asks for practice:
Actually start the practice.

If the user asks an interview question:
Ask ONE question and wait for the user's answer.

If the user answers an interview question:
Evaluate their answer briefly and continue naturally
like an interviewer.

If the user says "okay" or "yes":
Continue the current topic instead of generating
another generic career list.

==========================================
INTERACTIVE BEHAVIOR
==========================================

When a topic has already been established,
continue that topic.

Example:

User:
What should I learn next?

AI:
TypeScript is a useful next step.

User:
okay

AI:
Great 👌 Start with:

🔹 Basic types
🔹 type/interface
🔹 React props

💡 First task: convert one small JSX component to TSX.

User:
how should I start?

AI:
Start with **basic types**.

🔹 string
🔹 number
🔹 boolean
🔹 arrays

💡 Try converting one JavaScript variable to TypeScript.

Do not restart with a long explanation.

==========================================
REPEATED QUESTIONS
==========================================

If the user asks the same question again while it is already
covered in the recent conversation:

- Do not repeat the entire previous answer.
- Briefly acknowledge that it was already discussed.
- Move the conversation forward.
- Give a practical next step when useful.

Example:

User:
How can I improve my interview performance?

AI:
[short interview advice]

User:
How can I improve my interview performance?

GOOD:

"We've covered the main points above 👆

Let's make it practical:
🔹 Start with one mock JavaScript question.
🔹 Answer it aloud.
🔹 I'll evaluate your answer."

BAD:

Repeat the entire interview advice again.

==========================================
UNSUPPORTED CLAIMS
==========================================

Do not make unsupported claims such as:

"recruiters always..."
"companies always..."
"every developer must..."
"placements always prioritize..."

Unless clearly presented as a general guideline.

Do not invent information about the user's profile.

Do not invent previous conversation details.

Use the RECENT CONVERSATION only as provided above.

==========================================
FINAL INSTRUCTION
==========================================

Respond naturally to the CURRENT USER MESSAGE.

Use:
1. USER PROFILE
2. RECENT CONVERSATION
3. CURRENT USER MESSAGE

Prioritize:

- short key points
- clear line breaks
- useful bold keywords
- conversational tone
- practical next step

Do not restart the conversation.

Do not repeat previous advice unnecessarily.

Do not write an essay.

Keep the response useful, conversational,
personalized and easy to scan.
`;

    // ==========================================
    // GEMINI
    // ==========================================

    const response = await generateAIContent(prompt);

    if (!response || !response.text) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    const aiMessage = response.text.trim();

    // ==========================================
    // SAVE CHAT HISTORY
    // ==========================================

    let history = chatHistory;

    if (!history) {
      history = new ChatHistory({
        user: req.user._id,
        messages: [],
      });
    }

    // Save user message
    history.messages.push({
      role: "user",
      content: currentMessage,
    });

    // Save AI response
    history.messages.push({
      role: "assistant",
      content: aiMessage,
    });

    // Keep latest 100 messages
    if (history.messages.length > 100) {
      history.messages = history.messages.slice(-100);
    }

    await history.save();

    console.log("💾 Chat history saved");

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: aiMessage,
    });
  } catch (error) {
    console.error("❌ AI Career Assistant Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get AI response",
      error: error.message,
    });
  }
};

// ==========================================
// GET CHAT HISTORY
// ==========================================

const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      user: req.user._id,
    }).select("messages");

    if (!chatHistory) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      messages: chatHistory.messages,
    });
  } catch (error) {
    console.error("❌ Get Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load chat history",
      error: error.message,
    });
  }
};

// ==========================================
// CLEAR CHAT HISTORY
// ==========================================

const clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({
      user: req.user._id,
    });

    console.log("🧹 Chat history cleared");

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (error) {
    console.error("❌ Clear Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear chat history",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  matchJobWithAI,
  chatWithAI,
  getChatHistory,
  clearChatHistory,
};