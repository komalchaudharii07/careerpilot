import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Filter,
  Loader2,
  Mic,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/interview";

export default function InterviewHistory({
  onStartNewInterview,
}) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedInterview, setSelectedInterview] =
    useState(null);

  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(
        response.data?.data || []
      );
    } catch (err) {
      console.error(
        "Interview history error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load interview history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);


  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const type =
        interview.interviewType || "";

      const role =
        interview.jobRole || "";

      const matchesSearch =
        type
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        role
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      let category = "Technical";

      if (type === "behavioral") {
        category = "Behavioral";
      }

      if (type === "mixed") {
        category = "Full Mock";
      }

      const matchesFilter =
        filterType === "All" ||
        category === filterType;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    interviews,
    searchTerm,
    filterType,
  ]);


  const averageScore =
    interviews.length > 0
      ? Math.round(
        interviews.reduce(
          (sum, item) =>
            sum +
            (item.overallScore || 0),
          0
        ) / interviews.length
      )
      : 0;

  const bestScore =
    interviews.length > 0
      ? Math.max(
        ...interviews.map(
          (item) =>
            item.overallScore || 0
        )
      )
      : 0;


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Clock3 size={17} />
              Interview Practice
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Interview History
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Review your previous interviews and track
              your performance.
            </p>
          </div>

          <button
            onClick={onStartNewInterview}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-fit"
          >
            <Sparkles size={16} />
            New Interview
          </button>
        </div>
      </header>


      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* SUMMARY */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Mic size={20} />}
            title="Total Interviews"
            value={interviews.length}
            subtitle="Completed sessions"
          />

          <SummaryCard
            icon={<Trophy size={20} />}
            title="Average Score"
            value={`${averageScore}%`}
            subtitle="Overall performance"
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            title="Best Score"
            value={`${bestScore}%`}
            subtitle="Top interview"
          />

          <SummaryCard
            icon={<Clock3 size={20} />}
            title="Practice Status"
            value={
              interviews.length
                ? "Active"
                : "Start"
            }
            subtitle={
              interviews.length
                ? "Keep practicing"
                : "Take your first interview"
            }
          />
        </section>


        {/* SEARCH */}
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
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                placeholder="Search by role or interview type..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter
                size={18}
                className="text-slate-400 md:hidden"
              />

              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none md:w-auto"
              >
                <option value="All">
                  All interviews
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="Behavioral">
                  Behavioral
                </option>

                <option value="Full Mock">
                  Full Mock
                </option>
              </select>
            </div>
          </div>
        </section>


        {/* LIST */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Previous Interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing{" "}
              {filteredInterviews.length} of{" "}
              {interviews.length} sessions
            </p>
          </div>


          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Loading your interview history...
              </div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
              <p>{error}</p>

              <button
                onClick={fetchHistory}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Try Again
              </button>
            </div>
          ) : filteredInterviews.length > 0 ? (
            <div className="space-y-4">
              {filteredInterviews.map(
                (interview) => (
                  <InterviewCard
                    key={interview._id}
                    interview={interview}
                    onViewResult={() =>
                      setSelectedInterview(
                        interview
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Search size={22} />
              </div>

              <h3 className="mt-4 text-base font-bold">
                No interviews found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Complete an interview and it will appear
                here.
              </p>
            </div>
          )}
        </section>
      </main>


      {selectedInterview && (
        <ResultModal
          interview={selectedInterview}
          token={token}
          onClose={() =>
            setSelectedInterview(null)
          }
        />
      )}
    </div>
  );
}


/* ================= SUMMARY ================= */

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}


/* ================= CARD ================= */

function InterviewCard({
  interview,
  onViewResult,
}) {
  const type =
    interview.interviewType ||
    "technical";

  const isTechnical =
    type === "technical";

  const title =
    type === "technical"
      ? "Technical Interview"
      : type === "behavioral"
        ? "Behavioral Interview"
        : "Full Mock Interview";

  const date = interview.createdAt
    ? new Date(
      interview.createdAt
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )
    : "Unknown date";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {isTechnical ? (
              <Code2 size={21} />
            ) : (
              <Mic size={21} />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold">
                {title}
              </h3>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                {interview.status ===
                  "completed"
                  ? "Completed"
                  : "In Progress"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {interview.jobRole ||
                "Frontend Developer"}
            </p>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {date}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={14} />
                {interview.duration || 0} min
              </span>

              <span>
                {interview.questions?.length ||
                  0}{" "}
                questions
              </span>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between lg:border-0 lg:pt-0">
          <div>
            <p className="text-xs text-slate-400">
              Score
            </p>

            <p className="mt-1 text-2xl font-bold">
              {interview.overallScore || 0}%
            </p>
          </div>

          <button
            onClick={onViewResult}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
          >
            View Result
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}


/* ================= MODAL ================= */

function ResultModal({
  interview,
  token,
  onClose,
}) {
  const [details, setDetails] =
    useState(interview);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const response =
          await axios.get(
            `${API_URL}/${interview._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setDetails(
          response.data?.data ||
          interview
        );
      } catch (error) {
        console.error(
          "Result details error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [interview._id]);


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center py-6">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>

              <div>
                <h3 className="font-bold">
                  Interview Result
                </h3>

                <p className="text-xs text-slate-400">
                  {details.jobRole}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>


          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <Loader2
                size={24}
                className="animate-spin text-blue-600"
              />
            </div>
          ) : (
            <>
              <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center">
                <p className="text-sm text-slate-500">
                  Performance Score
                </p>

                <p className="mt-1 text-4xl font-bold text-blue-600">
                  {details.overallScore || 0}%
                </p>
              </div>


              {details.summary && (
                <div className="mt-6">
                  <h4 className="font-bold">
                    Performance Summary
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {details.summary}
                  </p>
                </div>
              )}


              {details.questions?.length >
                0 && (
                  <div className="mt-6">
                    <h4 className="font-bold">
                      Question-wise Result
                    </h4>

                    <div className="mt-3 space-y-3">
                      {details.questions.map(
                        (q, index) => (
                          <div
                            key={
                              q._id ||
                              index
                            }
                            className="rounded-xl border border-slate-200 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold">
                                Q{index + 1}.{" "}
                                {q.question}
                              </p>

                              <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                                {q.score ||
                                  0}
                                /100
                              </span>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                              {q.userAnswer}
                            </p>

                            {q.aiFeedback && (
                              <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-slate-600">
                                <b className="text-emerald-600">
                                  Feedback:
                                </b>{" "}
                                {
                                  q.aiFeedback
                                }
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}


              {details.strengths?.length >
                0 && (
                  <div className="mt-6">
                    <h4 className="font-bold">
                      Strengths
                    </h4>

                    <ul className="mt-2 space-y-2">
                      {details.strengths.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={index}
                            className="flex gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-emerald-500"
                            />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}


              {details.weaknesses?.length >
                0 && (
                  <div className="mt-6">
                    <h4 className="font-bold">
                      Areas to Improve
                    </h4>

                    <ul className="mt-2 space-y-2">
                      {details.weaknesses.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600"
                          >
                            • {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </>
          )}


          <button
            onClick={onClose}
            className="mt-7 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}