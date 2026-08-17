import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumeResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // Route state se target file name extract karein (agar available ho)
  const fileName = location.state?.fileName || "Uploaded Resume";
  const score = 82;

  // Print/Download handler
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              C
            </div>

            <div>
              <p className="font-bold">
                Career<span className="text-blue-600">Pilot</span>
              </p>

              <p className="text-xs text-slate-400">Resume Analysis</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
            <Download size={16} />
            Download Report
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/resume")}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 print:hidden"
        >
          <ArrowLeft size={16} />
          Back to Resume
        </button>

        {/* Heading */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            ANALYSIS COMPLETE
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Resume Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Here is a detailed overview for{" "}
            <span className="font-medium text-slate-800">{fileName}</span> covering resume quality, strengths, and target areas for improvement.
          </p>
        </section>

        {/* Score + Overview */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Resume Score
                </p>

                <p className="mt-2 text-5xl font-bold text-slate-900">
                  {score}
                  <span className="text-2xl text-slate-400">/100</span>
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FileText size={28} />
              </div>
            </div>

            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
              <TrendingUp size={16} />
              Strong resume
            </div>
          </div>

          {/* Strengths */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold">Resume Overview</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your resume performs well in several important areas.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <OverviewItem
                title="Skills"
                value="Excellent"
                positive
              />
              <OverviewItem
                title="Experience"
                value="Good"
                positive
              />
              <OverviewItem
                title="Formatting"
                value="Good"
                positive
              />
              <OverviewItem
                title="Keywords"
                value="Needs improvement"
              />
            </div>
          </div>
        </section>

        {/* Two columns */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h2 className="font-bold">What you're doing well</h2>
                <p className="text-xs text-slate-500">
                  Strong areas in your resume
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Strength text="Clear technical skills section" />
              <Strength text="Good project descriptions" />
              <Strength text="Relevant education details" />
              <Strength text="Clean and readable structure" />
            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Lightbulb size={20} />
              </div>

              <div>
                <h2 className="font-bold">Recommended Improvements</h2>
                <p className="text-xs text-slate-500">
                  Changes that can improve your score
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Improvement
                title="Add more job-specific keywords"
                description="Match your skills with keywords commonly used in your target roles."
              />
              <Improvement
                title="Strengthen project impact"
                description="Use measurable results instead of only describing what you built."
              />
              <Improvement
                title="Improve summary section"
                description="Make your professional summary more focused on your target role."
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-lg font-bold">Detected Skills</h2>

          <p className="mt-1 text-sm text-slate-500">
            Skills identified from your resume.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "HTML",
              "CSS",
              "Git",
              "REST API",
              "SQL",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 rounded-2xl bg-slate-900 p-7 text-white md:p-8 print:hidden">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Ready to improve your resume?
              </h2>

              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Apply these recommendations and run another analysis to track
                your improvement.
              </p>
            </div>

            <button
              onClick={() => navigate("/resume")}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50 active:scale-95 cursor-pointer"
            >
              Analyze Again
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- Sub-Components ---------------- */

function OverviewItem({ title, value, positive }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{title}</span>

        <span
          className={`text-sm font-semibold ${positive ? "text-emerald-600" : "text-amber-600"
            }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function Strength({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}

function Improvement({ title, description }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}