import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResumeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.resultData;

  // If user directly opens /resume/result
  // without analyzing a resume first
  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Resume Analysis Found
          </h2>

          <p className="text-gray-500 mb-6">
            Please upload and analyze a resume first.
          </p>

          <button
            onClick={() => navigate("/resume")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const fileName = resultData.fileName || "Uploaded Resume";

  // No fake score
  const score = resultData.atsScore ?? 0;

  // No fake skills
  const skills = Array.isArray(resultData.skills)
    ? resultData.skills
    : [];

  // No fake strengths
  const strengths = Array.isArray(resultData.strengths)
    ? resultData.strengths
    : [];

  // No fake weaknesses
  const weaknesses = Array.isArray(resultData.weaknesses)
    ? resultData.weaknesses
    : [];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/resume")}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Resume Checker
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Resume Analysis
          </h1>

          <p className="text-gray-500 mt-2">
            Analysis for: <span className="font-medium">{fileName}</span>
          </p>
        </div>

        {/* ATS Score */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                ATS Score
              </h2>

              <p className="text-gray-500 mt-2">
                How well your resume is optimized for Applicant Tracking
                Systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">
                  {score}
                </span>
              </div>

              <p className="text-gray-500 mt-2">
                out of 100
              </p>
            </div>

          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Detected Skills
          </h2>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No technical skills were detected in this resume.
            </p>
          )}
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Strengths
          </h2>

          {strengths.length > 0 ? (
            <div className="space-y-4">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 text-green-600">
                    ✓
                  </div>

                  <p className="text-gray-700">
                    {typeof strength === "string"
                      ? strength
                      : strength.title || strength.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No specific strengths were identified.
            </p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Areas for Improvement
          </h2>

          {weaknesses.length > 0 ? (
            <div className="space-y-5">
              {weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5"
                >
                  {typeof weakness === "string" ? (
                    <p className="text-gray-700">
                      {weakness}
                    </p>
                  ) : (
                    <>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {weakness.title}
                      </h3>

                      <p className="text-gray-500">
                        {weakness.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No areas for improvement were identified.
            </p>
          )}
        </div>

        {/* Analyze Another Resume */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/resume")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Analyze Another Resume
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeResult;