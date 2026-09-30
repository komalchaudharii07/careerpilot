// server/controllers/resumeController.js

const Resume = require("../models/Resume");

/* =========================================================
   PDF PARSER
   ========================================================= */

let pdfParse;

try {
  pdfParse = require("pdf-parse");
} catch (error) {
  console.error("❌ pdf-parse is not installed.");
}


/* =========================================================
   GET RESUME
   ========================================================= */

const getResume = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User authentication required.",
      });
    }

    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        message: "No saved resume found.",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("getResume error:", error);

    return res.status(500).json({
      message: "Failed to fetch resume.",
      error: error.message,
    });
  }
};


/* =========================================================
   SAVE RESUME
   ========================================================= */

const saveResume = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User authentication required.",
      });
    }

    const resumeData = req.body;

    let resume = await Resume.findOne({ userId });

    if (resume) {
      Object.assign(resume, resumeData);
      await resume.save();
    } else {
      resume = await Resume.create({
        ...resumeData,
        userId,
      });
    }

    return res.status(200).json({
      message: "Resume saved successfully.",
      resume,
    });
  } catch (error) {
    console.error("saveResume error:", error);

    return res.status(500).json({
      message: "Failed to save resume.",
      error: error.message,
    });
  }
};


/* =========================================================
   RESUME ANALYZER
   ========================================================= */

const analyzeResume = async (req, res) => {
  try {

    /* =====================================================
       STEP 1: CHECK FILE
       ===================================================== */

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }


    /* =====================================================
       STEP 2: CHECK FILE TYPE
       ===================================================== */

    const isPDF =
      req.file.mimetype === "application/pdf" ||
      req.file.originalname?.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      return res.status(400).json({
        message: "Only PDF files are supported.",
      });
    }


    /* =====================================================
       STEP 3: CHECK PDF PARSER
       ===================================================== */

    if (!pdfParse) {
      return res.status(500).json({
        message:
          "PDF parser is not installed. Please install pdf-parse.",
      });
    }


    /* =====================================================
       STEP 4: EXTRACT PDF TEXT
       ===================================================== */

    let pdfData;

    try {
      pdfData = await pdfParse(req.file.buffer);
    } catch (error) {
      console.error("PDF parsing error:", error);

      return res.status(422).json({
        message:
          "We could not read this PDF. Please upload a valid text-based PDF.",
      });
    }

    let extractedText = pdfData?.text || "";

    console.log("========== PDF DEBUG ==========");
    console.log("File:", req.file.originalname);
    console.log("PDF pages:", pdfData?.numpages);
    console.log("Extracted text length:", extractedText.length);
    console.log(
      "Extracted text:",
      extractedText.slice(0, 500)
    );
    console.log("================================");


    /* =====================================================
       STEP 5: NORMALIZE TEXT
       ===================================================== */

    extractedText = extractedText
      .replace(/\r/g, " ")
      .replace(/\n+/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();


    /* =====================================================
       STEP 6: CHECK READABLE TEXT
       ===================================================== */

    if (extractedText.length < 80) {
      return res.status(422).json({
        message:
          "This PDF does not contain enough readable text. Please upload a proper resume PDF.",
      });
    }


    /* =====================================================
       STEP 7: NORMALIZE FOR ANALYSIS
       ===================================================== */

    const lowerText = extractedText.toLowerCase();


    /* =====================================================
       STEP 8: RESUME SECTION DETECTION
       ===================================================== */

    const resumeSections = [
      "education",
      "academic",
      "experience",
      "work experience",
      "professional experience",
      "employment",

      "skills",
      "technical skills",

      "projects",
      "project",

      "internship",
      "internships",

      "certifications",
      "certification",
      "certificate",

      "achievements",
      "achievement",

      "summary",
      "professional summary",

      "objective",
      "career objective",

      "profile",

      "qualification",
      "qualifications",

      "coursework",

      "languages",

      "interests",

      "publications",
    ];


    const foundSections = resumeSections.filter((section) =>
      lowerText.includes(section)
    );

    const uniqueSections = [
      ...new Set(foundSections),
    ];


    /* =====================================================
       STEP 9: CONTACT INFORMATION
       ===================================================== */

    const emailRegex =
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

    const phoneRegex =
      /(?:\+91[\s-]?)?[6-9]\d{9}/;

    const hasEmail = emailRegex.test(extractedText);

    const hasPhone = phoneRegex.test(extractedText);


    /* =====================================================
       STEP 10: RESUME KEYWORDS
       ===================================================== */

    const resumeKeywords = [
      "resume",
      "curriculum vitae",
      "cv",

      "developer",
      "software",
      "engineer",
      "student",

      "programming",
      "technology",
      "technical",

      "linkedin",
      "github",

      "education",
      "experience",
      "skills",
      "projects",
      "internship",

      "certification",
      "objective",
    ];


    const foundKeywords = resumeKeywords.filter(
      (keyword) => lowerText.includes(keyword)
    );


    /* =====================================================
       STEP 11: RESUME CLASSIFICATION
       ===================================================== */

    const hasStrongResumeStructure =
      uniqueSections.length >= 2;

    const hasContactInformation =
      hasEmail || hasPhone;

    const hasResumeKeywords =
      foundKeywords.length >= 3;


    const isLikelyResume =
      (
        hasStrongResumeStructure &&
        hasResumeKeywords
      )
      ||
      (
        uniqueSections.length >= 3 &&
        hasContactInformation
      )
      ||
      (
        uniqueSections.length >= 2 &&
        hasContactInformation &&
        foundKeywords.length >= 2
      );


    const resumeConfidence =
      Math.min(
        uniqueSections.length * 2 +
        foundKeywords.length +
        (hasEmail ? 2 : 0) +
        (hasPhone ? 2 : 0),
        20
      );


    if (!isLikelyResume) {
      console.log(
        "Resume validation failed:",
        {
          sections: uniqueSections,
          keywords: foundKeywords,
          hasEmail,
          hasPhone,
          confidence: resumeConfidence,
        }
      );

      return res.status(422).json({
        message:
          "This PDF does not appear to be a resume. Please upload a valid resume PDF.",
      });
    }


    /* =====================================================
       STEP 12: SKILL DETECTION
       ===================================================== */

    const skillList = [

      // Programming Languages
      "C",
      "C++",
      "C#",
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "Go",
      "Rust",
      "PHP",
      "Ruby",
      "Kotlin",
      "Swift",

      // Frontend
      "HTML",
      "CSS",
      "React",
      "React.js",
      "Angular",
      "Vue",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",

      // Backend
      "Node.js",
      "Node",
      "Express",
      "Express.js",
      "Django",
      "Flask",
      "Spring Boot",
      "REST API",
      "REST APIs",

      // Database
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "SQL",
      "Redis",
      "Firebase",

      // Tools
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Postman",
      "Linux",

      // Cloud
      "AWS",
      "Azure",
      "Google Cloud",

      // CS
      "Data Structures",
      "Algorithms",
      "DSA",
      "OOP",
      "Object Oriented Programming",

      // AI / ML
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "TensorFlow",
      "PyTorch",
    ];


    const formattedSkills = [];


    for (const skill of skillList) {

      const escapedSkill = skill.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      const skillRegex = new RegExp(
        `(^|[^a-zA-Z0-9])${escapedSkill}([^a-zA-Z0-9]|$)`,
        "i"
      );


      if (skillRegex.test(extractedText)) {

        if (
          !formattedSkills.some(
            (existing) =>
              existing.toLowerCase() ===
              skill.toLowerCase()
          )
        ) {
          formattedSkills.push(skill);
        }
      }
    }


    /* =====================================================
       STEP 13: PROJECT ANALYSIS
       ===================================================== */

    const hasProjects =
      lowerText.includes("project") ||
      lowerText.includes("projects");


    const projectActionWords = [
      "developed",
      "built",
      "created",
      "designed",
      "implemented",
      "integrated",
      "deployed",
      "optimized",
      "engineered",
      "automated",
      "develop",
      "build",
      "implement",
    ];


    const projectTechWords = [
      "react",
      "node",
      "node.js",
      "express",
      "mongodb",
      "mysql",
      "python",
      "java",
      "javascript",
      "typescript",
      "html",
      "css",
      "next.js",
      "django",
      "flask",
      "aws",
      "docker",
      "firebase",
    ];


    let projectScore = 0;


    if (hasProjects) {

      // Project section exists
      projectScore += 5;


      const projectActionCount =
        projectActionWords.filter(
          (word) => lowerText.includes(word)
        ).length;


      const projectTechCount =
        projectTechWords.filter(
          (word) => lowerText.includes(word)
        ).length;


      // Action-oriented descriptions
      if (projectActionCount >= 2) {
        projectScore += 5;
      }


      // Technologies used
      if (projectTechCount >= 2) {
        projectScore += 5;
      }


      // Project has enough description
      const projectIndex =
        lowerText.indexOf("project");


      if (
        projectIndex !== -1 &&
        extractedText.length - projectIndex > 150
      ) {
        projectScore += 5;
      }
    }


    projectScore = Math.min(
      projectScore,
      20
    );


    /* =====================================================
       STEP 14: WORK EXPERIENCE ANALYSIS
       ===================================================== */

    const experienceSection =
      lowerText.includes("experience") ||
      lowerText.includes("work experience") ||
      lowerText.includes("professional experience") ||
      lowerText.includes("internship") ||
      lowerText.includes("employment");


    const experienceActionWords = [
      "developed",
      "built",
      "implemented",
      "designed",
      "managed",
      "led",
      "created",
      "improved",
      "optimized",
      "worked",
      "maintained",
      "integrated",
      "deployed",
      "automated",
    ];


    let experienceScore = 0;


    if (experienceSection) {

      // Experience section exists
      experienceScore += 5;


      const experienceActionCount =
        experienceActionWords.filter(
          (word) => lowerText.includes(word)
        ).length;


      // Strong action words
      if (experienceActionCount >= 3) {
        experienceScore += 5;
      }


      // Date/year signals
      const hasDates =
        /\b(19\d{2}|20\d{2})\b/.test(
          extractedText
        );


      if (hasDates) {
        experienceScore += 5;
      }


      // Enough description
      const experienceIndex =
        lowerText.indexOf("experience");


      if (
        experienceIndex !== -1 &&
        extractedText.length - experienceIndex > 150
      ) {
        experienceScore += 5;
      }
    }


    experienceScore = Math.min(
      experienceScore,
      20
    );


    /* =====================================================
       STEP 15: EXPERIENCE COUNT
       ===================================================== */

    const experienceKeywords = [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "internship",
      "internships",
      "worked at",
      "working at",
      "software engineer",
      "developer",
      "intern",
    ];


    let experienceCount = 0;


    for (const keyword of experienceKeywords) {

      const regex = new RegExp(
        keyword.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        ),
        "gi"
      );


      const matches =
        extractedText.match(regex);


      if (matches) {
        experienceCount += matches.length;
      }
    }


    experienceCount = Math.min(
      experienceCount,
      10
    );


    /* =====================================================
       STEP 16: EDUCATION
       ===================================================== */

    const hasEducation =
      lowerText.includes("education") ||
      lowerText.includes("academic") ||
      lowerText.includes("degree") ||
      lowerText.includes("b.tech") ||
      lowerText.includes("btech") ||
      lowerText.includes("bachelor") ||
      lowerText.includes("master") ||
      lowerText.includes("university") ||
      lowerText.includes("college");


    const educationScore =
      hasEducation ? 10 : 0;


    /* =====================================================
       STEP 17: CERTIFICATIONS & ACHIEVEMENTS
       ===================================================== */

    const hasCertification =
      lowerText.includes("certification") ||
      lowerText.includes("certifications") ||
      lowerText.includes("certificate");


    const hasAchievement =
      lowerText.includes("achievement") ||
      lowerText.includes("achievements") ||
      lowerText.includes("award") ||
      lowerText.includes("honor");


    let certificationScore = 0;


    if (hasCertification) {
      certificationScore += 5;
    }


    if (hasAchievement) {
      certificationScore += 5;
    }


    certificationScore = Math.min(
      certificationScore,
      10
    );


    /* =====================================================
       STEP 18: RESUME STRUCTURE
       ===================================================== */

    let structureScore = 0;


    if (uniqueSections.length >= 2) {
      structureScore += 4;
    }


    if (uniqueSections.length >= 4) {
      structureScore += 3;
    }


    if (uniqueSections.length >= 6) {
      structureScore += 3;
    }


    structureScore = Math.min(
      structureScore,
      10
    );


    /* =====================================================
       STEP 19: CONTACT SCORE
       ===================================================== */

    let contactScoreForATS = 0;


    if (hasEmail) {
      contactScoreForATS += 3;
    }


    if (hasPhone) {
      contactScoreForATS += 2;
    }


    contactScoreForATS = Math.min(
      contactScoreForATS,
      5
    );


    /* =====================================================
       STEP 20: SKILLS SCORE
       ===================================================== */

    const skillScore = Math.min(
      formattedSkills.length * 2,
      20
    );


    /* =====================================================
       STEP 21: ATS KEYWORDS
       ===================================================== */

    const keywordScoreForATS =
      Math.min(
        foundKeywords.length,
        5
      );


    /* =====================================================
       STEP 22: FINAL ATS SCORE
       ===================================================== */

    let calculatedScore =
      skillScore +
      projectScore +
      experienceScore +
      educationScore +
      certificationScore +
      structureScore +
      contactScoreForATS +
      keywordScoreForATS;


    calculatedScore = Math.min(
      Math.max(calculatedScore, 35),
      100
    );


    /* =====================================================
       SCORE DEBUG
       ===================================================== */

    console.log(
      "========== RESUME SCORE =========="
    );

    console.log(
      "Skills:",
      skillScore,
      "/ 20"
    );

    console.log(
      "Projects:",
      projectScore,
      "/ 20"
    );

    console.log(
      "Experience:",
      experienceScore,
      "/ 20"
    );

    console.log(
      "Education:",
      educationScore,
      "/ 10"
    );

    console.log(
      "Certifications:",
      certificationScore,
      "/ 10"
    );

    console.log(
      "Structure:",
      structureScore,
      "/ 10"
    );

    console.log(
      "Contact:",
      contactScoreForATS,
      "/ 5"
    );

    console.log(
      "Keywords:",
      keywordScoreForATS,
      "/ 5"
    );

    console.log(
      "FINAL SCORE:",
      calculatedScore,
      "/ 100"
    );

    console.log(
      "=================================="
    );


    /* =====================================================
       STEP 23: STRENGTHS
       ===================================================== */

    const strengths = [];


    // Skills
    if (formattedSkills.length >= 8) {

      strengths.push(
        "Strong technical skills coverage"
      );

    } else if (formattedSkills.length >= 4) {

      strengths.push(
        "Good technical skills coverage"
      );

    } else if (formattedSkills.length > 0) {

      strengths.push(
        "Technical skills section detected"
      );
    }


    // Projects
    if (projectScore >= 15) {

      strengths.push(
        "Projects include technologies and meaningful implementation details"
      );

    } else if (projectScore >= 5) {

      strengths.push(
        "Projects section detected"
      );
    }


    // Experience
    if (experienceScore >= 15) {

      strengths.push(
        "Work experience contains meaningful responsibilities and action-oriented details"
      );

    } else if (experienceScore >= 5) {

      strengths.push(
        "Experience information detected"
      );
    }


    // Education
    if (hasEducation) {

      strengths.push(
        "Education details detected"
      );
    }


    // Contact
    if (hasEmail && hasPhone) {

      strengths.push(
        "Contact information is available"
      );

    } else if (hasEmail || hasPhone) {

      strengths.push(
        "Contact information detected"
      );
    }


    // Structure
    if (uniqueSections.length >= 5) {

      strengths.push(
        "Well-structured resume sections"
      );
    }


    // Certifications
    if (hasCertification) {

      strengths.push(
        "Certifications section detected"
      );
    }


    /* =====================================================
       STEP 24: WEAKNESSES
       ===================================================== */

    const weaknesses = [];


    // Skills
    if (formattedSkills.length < 5) {

      weaknesses.push({
        title:
          "Add more relevant technical skills",

        description:
          "Include technical skills that match the job role you are targeting.",
      });
    }


    // Projects
    if (!hasProjects) {

      weaknesses.push({
        title:
          "Add projects",

        description:
          "Include relevant projects and explain the technologies, features and results.",
      });

    } else if (projectScore < 15) {

      weaknesses.push({
        title:
          "Improve project descriptions",

        description:
          "Describe what you built, which technologies you used, what you implemented and the results achieved.",
      });
    }


    // Experience
    if (!experienceSection) {

      weaknesses.push({
        title:
          "Add experience",

        description:
          "Include internships, work experience, or relevant practical experience.",
      });

    } else if (experienceScore < 15) {

      weaknesses.push({
        title:
          "Improve experience descriptions",

        description:
          "Use strong action verbs and explain your responsibilities, technologies and measurable impact.",
      });
    }


    // Education
    if (!hasEducation) {

      weaknesses.push({
        title:
          "Add education details",

        description:
          "Include your degree, university/college and relevant academic information.",
      });
    }


    // Email
    if (!hasEmail) {

      weaknesses.push({
        title:
          "Add an email address",

        description:
          "Make sure your professional email address is clearly visible.",
      });
    }


    // Phone
    if (!hasPhone) {

      weaknesses.push({
        title:
          "Add a phone number",

        description:
          "Include a professional contact number if appropriate.",
      });
    }


    // Certifications
    if (!hasCertification && !hasAchievement) {

      weaknesses.push({
        title:
          "Consider adding certifications or achievements",

        description:
          "Add relevant certifications, awards, competitive achievements or other accomplishments.",
      });
    }


    // Structure
    if (uniqueSections.length < 4) {

      weaknesses.push({
        title:
          "Improve resume structure",

        description:
          "Consider adding clear sections such as Skills, Projects, Education and Experience.",
      });
    }


    // Word count
    const wordCount =
      extractedText
        .split(/\s+/)
        .filter(Boolean)
        .length;


    if (wordCount < 150) {

      weaknesses.push({
        title:
          "Add more relevant details",

        description:
          "Your resume contains limited text. Add meaningful project, experience or achievement details.",
      });
    }


    /* =====================================================
       STEP 25: FALLBACK MESSAGES
       ===================================================== */

    if (strengths.length === 0) {

      strengths.push(
        "Resume structure was successfully detected."
      );
    }


    if (weaknesses.length === 0) {

      weaknesses.push({
        title:
          "Continue improving job relevance",

        description:
          "Review your resume against the requirements of the job you are targeting.",
      });
    }


    /* =====================================================
       STEP 26: FINAL RESULT
       ===================================================== */

    const result = {

      fileName:
        req.file.originalname,

      atsScore:
        calculatedScore,

      skills:
        formattedSkills,

      strengths,

      weaknesses,

      experienceCount,

      resumeConfidence,

      detectedSections:
        uniqueSections,

      wordCount,

      // Additional score breakdown
      scoreBreakdown: {
        skills: skillScore,
        projects: projectScore,
        experience: experienceScore,
        education: educationScore,
        certifications: certificationScore,
        structure: structureScore,
        contact: contactScoreForATS,
        keywords: keywordScoreForATS,
      },
    };


    /* =====================================================
       DEBUG
       ===================================================== */

    console.log(
      "Resume analysis completed:",
      {
        fileName:
          result.fileName,

        atsScore:
          result.atsScore,

        skills:
          result.skills,

        sections:
          result.detectedSections,

        wordCount:
          result.wordCount,

        projectScore:
          projectScore,

        experienceScore:
          experienceScore,
      }
    );


    /* =====================================================
       RESPONSE
       ===================================================== */

    return res.status(200).json({
      message:
        "Resume analyzed successfully.",

      resume:
        result,
    });


  } catch (error) {

    console.error(
      "analyzeResume error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong while analyzing the resume.",

      error:
        error.message,
    });
  }
};


/* =========================================================
   EXPORTS
   ========================================================= */

module.exports = {
  getResume,
  saveResume,
  analyzeResume,
};