import { useState, useMemo } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Mic,
  Search,
  Sparkles,
  Trophy,
  X,
  FileText,
  Filter,
} from "lucide-react";

const initialInterviews = [
  {
    id: 1,
    type: "Technical Interview",
    category: "Technical",
    date: "Aug 13, 2026",
    duration: "24 min",
    score: 82,
    status: "Completed",
    focus: "JavaScript, React, DSA",
    summary:
      "Strong technical fundamentals demonstrated. Excellent grasp of React state management and ES6 syntax. Recommended focus on optimizing space complexity in DSA solutions.",
  },
  {
    id: 2,
    type: "Behavioral Interview",
    category: "Behavioral",
    date: "Aug 10, 2026",
    duration: "18 min",
    score: 76,
    status: "Completed",
    focus: "Communication, HR",
    summary:
      "Good structure using the STAR method. Clear communication style, though answers could benefit from more quantitative metrics when discussing past achievements.",
  },
  {
    id: 3,
    type: "Full Mock Interview",
    category: "Full Mock",
    date: "Aug 06, 2026",
    duration: "31 min",
    score: 71,
    status: "Completed",
    focus: "Technical + Behavioral",
    summary:
      "Solid overall performance across both domains. Showed strong problem-solving initiative under pressure, but needs slight refinement in system design concepts.",
  },
];

export default function InterviewHistory({ onStartNewInterview }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedInterview, setSelectedInterview] = useState(null);

  // Filter logic for search and category select
  const filteredInterviews = useMemo(() => {
    return initialInterviews.filter((interview) => {
      const matchesSearch =
        interview.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.focus.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "All" || interview.category === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <Clock3 size={17} />
                Interview Practice
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Interview History
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500">
                Review your previous interviews and track how your performance
                is improving over time.
              </p>
            </div>

            <button
              onClick={onStartNewInterview}
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
            >
              <Sparkles size={16} />
              New Interview
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Analytics Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Mic size={20} />}
            title="Total Interviews"
            value="12"
            subtitle="Completed sessions"
          />

          <SummaryCard
            icon={<Trophy size={20} />}
            title="Average Score"
            value="78%"
            subtitle="+6% from last month"
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            title="Best Score"
            value="91%"
            subtitle="Technical interview"
          />

          <SummaryCard
            icon={<Clock3 size={20} />}
            title="Practice Time"
            value="4.8h"
            subtitle="Total interview time"
          />
        </section>

        {/* Search & Filtering Controls */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or technologies (e.g. React, HR)..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400 md:hidden" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white md:w-auto"
              >
                <option value="All">All interviews</option>
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Full Mock">Full Mock</option>
              </select>
            </div>
          </div>
        </section>

        {/* Interview List Section */}
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Previous Interviews</h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredInterviews.length} of {initialInterviews.length} sessions
              </p>
            </div>
          </div>

          {filteredInterviews.length > 0 ? (
            <div className="space-y-4">
              {filteredInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onViewResult={() => setSelectedInterview(interview)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Search size={22} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-800">
                No interviews found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your search terms or filter selection.
              </p>
            </div>
          )}
        </section>

        {/* Progress CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-slate-900 p-7 text-white md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-300">
                <Sparkles size={16} />
                Keep improving
              </div>

              <h2 className="text-xl font-bold">
                Your interview score is improving.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Continue practicing to improve your communication, technical
                knowledge and confidence.
              </p>
            </div>

            <button
              onClick={onStartNewInterview}
              className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50 active:scale-95"
            >
              Practice Again
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      {/* Result Modal */}
      {selectedInterview && (
        <ResultModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

/* ================= INTERVIEW CARD ================= */

function InterviewCard({ interview, onViewResult }) {
  const isTechnical = interview.type.includes("Technical");

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {isTechnical ? <Code2 size={21} /> : <Mic size={21} />}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold">{interview.type}</h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={12} />
                {interview.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {interview.date}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={14} />
                {interview.duration}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {interview.focus.split(", ").map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-between gap-6 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
          <div>
            <p className="text-xs text-slate-400">Score</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {interview.score}%
            </p>
          </div>

          <button
            onClick={onViewResult}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
          >
            View Result
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= RESULT MODAL ================= */

function ResultModal({ interview, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold">{interview.type}</h3>
              <p className="text-xs text-slate-400">{interview.date}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Performance Score
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {interview.score}%
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-bold text-slate-800">
            Performance Summary & Feedback
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {interview.summary}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}