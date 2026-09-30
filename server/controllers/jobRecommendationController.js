const axios = require("axios");
const User = require("../models/User");

const {
  generateAIContent,
  parseGeminiJSON,
} = require("../services/geminiService");

// ==========================================
// GET REAL JOB RECOMMENDATIONS
// JSearch + Gemini AI Matching
// ==========================================

const getJobRecommendations = async (req, res) => {
  try {
    // ==========================================
    // 1. GET LOGGED-IN USER
    // ==========================================

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // ==========================================
    // 2. GET SEARCH FILTERS
    // ==========================================

    const {
      query = "software developer",
      location = "",
      type = "All",
      page = 1,
    } = req.query;

    // ==========================================
    // 3. BUILD SEARCH QUERY
    // ==========================================

    let searchQuery = query.trim();

    if (location && location !== "All") {
      searchQuery += ` in ${location}`;
    }

    if (type === "Internship") {
      searchQuery += " internship";
    }

    if (type === "Full-time") {
      searchQuery += " full time";
    }

    // ==========================================
    // 4. CHECK RAPIDAPI KEY
    // ==========================================

    if (!process.env.RAPIDAPI_KEY) {
      return res.status(500).json({
        success: false,
        message: "RAPIDAPI_KEY is missing in .env file",
      });
    }

    console.log("=================================");
    console.log("JSEARCH JOB SEARCH");
    console.log("User:", user.name);
    console.log("Target Role:", user.targetRole);
    console.log("Query:", searchQuery);
    console.log("=================================");

    // ==========================================
    // 5. CALL JSEARCH
    // ==========================================

    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search-v2",
      {
        params: {
          query: searchQuery,
          page: page,
          num_pages: 1,
          country: "in",
          date_posted: "all",
        },

        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host":
            "jsearch.p.rapidapi.com",
          "x-rapidapi-key":
            process.env.RAPIDAPI_KEY,
        },
      }
    );

    // ==========================================
    // 6. GET JOB ARRAY
    // ==========================================

    let jobs = [];

    if (Array.isArray(response.data?.data)) {
      jobs = response.data.data;
    } else if (
      Array.isArray(response.data?.data?.jobs)
    ) {
      jobs = response.data.data.jobs;
    } else if (
      Array.isArray(response.data?.jobs)
    ) {
      jobs = response.data.jobs;
    }

    console.log("Jobs received:", jobs.length);

    // ==========================================
    // 7. FORMAT JOBS
    // ==========================================

    const formattedJobs = jobs.map((job) => {
      const requiredSkills =
        Array.isArray(job.job_required_skills)
          ? job.job_required_skills
          : [];

      return {
        id: job.job_id,

        title:
          job.job_title ||
          "Job Opportunity",

        company:
          job.employer_name ||
          "Company not specified",

        companyLogo:
          job.employer_logo ||
          null,

        location:
          [
            job.job_city,
            job.job_state,
            job.job_country,
          ]
            .filter(Boolean)
            .join(", ") ||
          "Location not specified",

        type:
          job.job_employment_type ||
          "Not specified",

        description:
          job.job_description ||
          "No job description available.",

        skills: requiredSkills,

        experience:
          job.job_required_experience
            ?.experience_mentioned
            ? "Experience required"
            : "Not specified",

        salary:
          job.job_min_salary ||
            job.job_max_salary
            ? {
              min:
                job.job_min_salary ||
                null,

              max:
                job.job_max_salary ||
                null,

              currency:
                job.job_salary_currency ||
                "INR",

              period:
                job.job_salary_period ||
                null,
            }
            : null,

        url:
          job.job_apply_link ||
          job.job_google_link ||
          "#",

        postedAt:
          job.job_posted_at_datetime_utc ||
          null,

        publisher:
          job.job_publisher ||
          null,

        // AI fields
        match: 0,
        matchingSkills: [],
        missingSkills: [],
        matchReason: "",
      };
    });

    // ==========================================
    // 8. NO JOBS
    // ==========================================

    if (formattedJobs.length === 0) {
      return res.status(200).json({
        success: true,
        total: 0,
        query: searchQuery,
        aiMatching: false,
        jobs: [],
      });
    }

    // ==========================================
    // 9. USER PROFILE FOR GEMINI
    // ==========================================

    const profile = {
      name: user.name || "",
      college: user.college || "",
      degree: user.degree || "",
      branch: user.branch || "",
      graduationYear:
        user.graduationYear || null,
      targetRole: user.targetRole || "",
      bio: user.bio || "",
      skills: Array.isArray(user.skills)
        ? user.skills
        : [],
    };

    // ==========================================
    // 10. PREPARE JOBS FOR GEMINI
    // ==========================================

    const jobsForAI = formattedJobs.map(
      (job) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        description:
          job.description.slice(0, 2500),
        skills: job.skills,
        experience: job.experience,
      })
    );

    // ==========================================
    // 11. GEMINI PROMPT
    // ==========================================

    const prompt = `
You are an AI job matching assistant.

Compare the USER PROFILE with ONLY the REAL JOB LISTINGS provided below.

IMPORTANT RULES:

1. Do NOT create jobs.
2. Do NOT invent jobs.
3. Do NOT invent user skills.
4. Do NOT invent job requirements.
5. Use ONLY the supplied information.
6. Every jobId must exactly match a supplied job id.
7. Give a match score from 0 to 100.
8. Consider:
   - Skills
   - Target role
   - Education
   - Branch
   - Experience
   - Job description
9. Higher score means better match.
10. Return ONLY valid JSON.
11. Do not use markdown.
12. Do not add text outside JSON.

USER PROFILE:

${JSON.stringify(profile)}

REAL JOB LISTINGS:

${JSON.stringify(jobsForAI)}

Return exactly:

{
  "matches": [
    {
      "jobId": "REAL_JOB_ID",
      "match": 85,
      "matchingSkills": [
        "React",
        "JavaScript"
      ],
      "missingSkills": [
        "Docker"
      ],
      "reason": "Strong match because the job aligns with the user's target role and skills."
    }
  ]
}
`;

    // ==========================================
    // 12. GEMINI MATCHING
    // ==========================================

    console.log("=================================");
    console.log("GEMINI JOB MATCHING");
    console.log("User:", user.name);
    console.log(
      "Target Role:",
      user.targetRole
    );
    console.log(
      "Jobs sent:",
      jobsForAI.length
    );
    console.log("=================================");

    let aiMatches = [];

    try {
      const aiResponse =
        await generateAIContent(prompt);

      const parsedResult =
        parseGeminiJSON(
          aiResponse.text
        );

      if (
        Array.isArray(
          parsedResult?.matches
        )
      ) {
        aiMatches =
          parsedResult.matches;
      }

      console.log(
        "Gemini matches:",
        aiMatches.length
      );
    } catch (aiError) {
      console.error(
        "Gemini matching failed:",
        aiError.message
      );

      // JSearch jobs should still be shown
      return res.status(200).json({
        success: true,
        total: formattedJobs.length,
        query: searchQuery,
        aiMatching: false,
        jobs: formattedJobs,
      });
    }

    // ==========================================
    // 13. MERGE AI RESULTS
    // ==========================================

    const matchedJobs =
      formattedJobs.map((job) => {
        const aiMatch =
          aiMatches.find(
            (item) =>
              String(item.jobId) ===
              String(job.id)
          );

        if (!aiMatch) {
          return job;
        }

        let score =
          Number(aiMatch.match);

        if (Number.isNaN(score)) {
          score = 0;
        }

        score = Math.max(
          0,
          Math.min(100, score)
        );

        return {
          ...job,

          match: score,

          matchingSkills:
            Array.isArray(
              aiMatch.matchingSkills
            )
              ? aiMatch.matchingSkills
              : [],

          missingSkills:
            Array.isArray(
              aiMatch.missingSkills
            )
              ? aiMatch.missingSkills
              : [],

          matchReason:
            typeof aiMatch.reason ===
              "string"
              ? aiMatch.reason
              : "",
        };
      });

    // ==========================================
    // 14. SORT BY MATCH SCORE
    // ==========================================

    matchedJobs.sort(
      (a, b) =>
        b.match - a.match
    );

    // ==========================================
    // 15. SEND RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      total: matchedJobs.length,
      query: searchQuery,
      aiMatching: true,
      jobs: matchedJobs,
    });
  } catch (error) {
    console.error(
      "JSearch API Error:",
      error.response?.data ||
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch jobs from JSearch",
      error:
        error.response?.data ||
        error.message,
    });
  }
};

module.exports = {
  getJobRecommendations,
};