import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  MapPin,
  Mic2,
  Pencil,
  Search,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

import { getDashboardData } from "../../services/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboardData();

        if (mounted) {
          setData(response);
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        if (mounted) {
          setError(
            err?.message || "Failed to load dashboard data"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2
            size={30}
            className="animate-spin text-blue-600"
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
            !
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // DATA FROM BACKEND
  // =====================================================

  const user = data?.user || {};

  const profileCompletion =
    data?.profileCompletion ?? 0;

  const resumeScore =
    data?.resumeScore ?? null;

  const interviewScore =
    data?.interviewScore ?? null;

  const readinessScore =
    data?.readinessScore ?? null;

  const interviewCount =
    data?.interviewCount ?? 0;

  const hasResume =
    data?.hasResume ?? false;

  const recentActivity =
    data?.recentActivity || [];

  const skills =
    Array.isArray(user?.skills)
      ? user.skills
      : [];

  // =====================================================
  // NEXT ACTION
  // =====================================================

  let nextAction;

  if (profileCompletion < 100) {
    nextAction = {
      title: "Complete your profile",
      description:
        "Add your academic details, skills and career preferences.",
      button: "Complete Profile",
      icon: UserRound,
      action: () =>
        navigate("/dashboard/profile"),
    };
  } else if (!hasResume) {
    nextAction = {
      title: "Analyze your resume",
      description:
        "Upload your resume and get an ATS-focused score.",
      button: "Analyze Resume",
      icon: FileText,
      action: () => navigate("/resume"),
    };
  } else if (interviewCount === 0) {
    nextAction = {
      title: "Practice for your interview",
      description:
        "Start an interview session and improve your preparation.",
      button: "Start Interview",
      icon: Mic2,
      action: () => navigate("/interview"),
    };
  } else {
    nextAction = {
      title: "Continue your preparation",
      description:
        "Keep practicing and improving your career readiness.",
      button: "Practice Interview",
      icon: Mic2,
      action: () => navigate("/interview"),
    };
  }

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      label: "Profile",
      value: `${profileCompletion}%`,
      sub:
        profileCompletion === 100
          ? "Profile complete"
          : "Profile completion",
      icon: UserRound,
    },

    {
      label: "Resume",
      value:
        resumeScore !== null
          ? `${resumeScore}/100`
          : "—",
      sub:
        resumeScore !== null
          ? "Latest resume score"
          : "Not analyzed yet",
      icon: FileText,
    },

    {
      label: "Interviews",
      value: interviewCount,
      sub:
        interviewCount === 0
          ? "No sessions yet"
          : "Practice sessions",
      icon: Mic2,
    },

    {
      label: "Readiness",
      value:
        readinessScore !== null
          ? `${readinessScore}%`
          : "—",
      sub:
        readinessScore !== null
          ? "Career readiness"
          : "Start preparing",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      <main className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles size={13} />
                CareerPilot
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back,{" "}
                <span className="text-blue-600">
                  {user.name || "there"}
                </span>
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Here's an overview of your career progress.
              </p>

              {/* USER DETAILS */}

              <div className="mt-4 flex flex-wrap gap-2">

                {user.targetRole && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                    <BriefcaseBusiness
                      size={14}
                      className="text-blue-600"
                    />
                    {user.targetRole}
                  </div>
                )}

                {user.location && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                    <MapPin
                      size={14}
                      className="text-blue-600"
                    />
                    {user.location}
                  </div>
                )}

              </div>

            </div>

            <button
              onClick={() =>
                navigate("/dashboard/profile")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              <Pencil size={15} />
              Edit Profile
            </button>

          </div>

        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </div>

                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.sub}
                </p>

              </div>
            );
          })}

        </section>

        {/* =================================================
            PROFILE COMPLETION
        ================================================= */}

        {profileCompletion < 100 && (
          <section className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound size={19} />
                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Complete your profile
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Complete your profile to get better career recommendations.
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/dashboard/profile")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Complete Profile
                <ArrowRight size={14} />
              </button>

            </div>

            <div className="mt-5">

              <div className="mb-2 flex justify-between">

                <span className="text-xs font-medium text-slate-500">
                  Profile completion
                </span>

                <span className="text-xs font-bold text-slate-700">
                  {profileCompletion}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">

          {/* =================================================
              READINESS
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Career progress
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Career readiness
                </h2>

              </div>

              {readinessScore !== null && (
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  {readinessScore >= 70
                    ? "On Track"
                    : "Keep Improving"}
                </span>
              )}

            </div>

            {readinessScore !== null ? (
              <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">

                {/* SCORE CIRCLE */}

                <div className="relative h-40 w-40 shrink-0">

                  <svg
                    viewBox="0 0 120 120"
                    className="-rotate-90"
                  >

                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="9"
                      className="text-slate-100"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={`${Math.min(
                        Math.max(
                          readinessScore,
                          0
                        ),
                        100
                      ) * 3.14
                        } 314`}
                      className="text-blue-600"
                    />

                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold text-slate-950">
                      {readinessScore}%
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Ready
                    </span>

                  </div>

                </div>

                {/* BREAKDOWN */}

                <div className="w-full space-y-5">

                  <ScoreBar
                    label="Profile"
                    value={profileCompletion}
                  />

                  <ScoreBar
                    label="Resume"
                    value={resumeScore}
                  />

                  <ScoreBar
                    label="Interview"
                    value={interviewScore}
                  />

                </div>

              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-slate-50 p-7 text-center">

                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <Target size={20} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  Your readiness score isn't available yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
                  Analyze your resume or complete an interview to start building your readiness score.
                </p>

                <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">

                  {!hasResume && (
                    <button
                      onClick={() =>
                        navigate("/resume")
                      }
                      className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Analyze Resume
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate("/interview")
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-blue-200 hover:text-blue-600"
                  >
                    Practice Interview
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              RECOMMENDED ACTION
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-lg">

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Sparkles size={19} />
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-blue-300">
                Recommended next step
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {nextAction.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {nextAction.description}
              </p>

              <button
                onClick={nextAction.action}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
              >
                {nextAction.button}
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            LOWER SECTION
        ================================================= */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Profile
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-950">
                  Your skills
                </h2>

              </div>

              <button
                onClick={() =>
                  navigate("/dashboard/profile")
                }
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Edit
                <ChevronRight size={14} />
              </button>

            </div>

            {skills.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2.5">

                {skills.map((skill, index) => {

                  const skillName =
                    typeof skill === "string"
                      ? skill
                      : skill?.name ||
                      skill?.skill ||
                      "Skill";

                  return (
                    <span
                      key={`${skillName}-${index}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-blue-600"
                      />

                      {skillName}
                    </span>
                  );
                })}

              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-slate-50 p-7 text-center">

                <Target
                  size={22}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No skills added yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add your skills to personalize your career journey.
                </p>

                <button
                  onClick={() =>
                    navigate("/dashboard/profile")
                  }
                  className="mt-4 text-xs font-bold text-blue-600"
                >
                  Add Skills →
                </button>

              </div>
            )}

          </div>

          {/* =================================================
              RECENT ACTIVITY
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Activity
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-950">
                Recent activity
              </h2>

            </div>

            {recentActivity.length > 0 ? (
              <div className="mt-5 divide-y divide-slate-100">

                {recentActivity
                  .slice(0, 5)
                  .map((activity, index) => {

                    const Icon =
                      activity.type === "resume"
                        ? FileText
                        : Mic2;

                    return (
                      <div
                        key={index}
                        className="flex gap-3 py-4 first:pt-0 last:pb-0"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-sm font-semibold text-slate-800">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {activity.description}
                          </p>

                        </div>

                        <CheckCircle2
                          size={17}
                          className="mt-1 shrink-0 text-emerald-500"
                        />

                      </div>
                    );
                  })}

              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-slate-50 p-7 text-center">

                <Sparkles
                  size={22}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No activity yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your resume and interview activity will appear here.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="mt-6">

          <div className="mb-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Continue
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-950">
              Quick actions
            </h2>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <QuickAction
              icon={FileText}
              title="Resume Analysis"
              description="Check your ATS score"
              onClick={() => navigate("/resume")}
            />

            <QuickAction
              icon={Mic2}
              title="Interview Practice"
              description="Practice your interview"
              onClick={() =>
                navigate("/interview")
              }
            />

            <QuickAction
              icon={Search}
              title="Find Opportunities"
              description="Explore career opportunities"
              onClick={() => navigate("/jobs")}
            />

          </div>

        </section>

      </main>
    </div>
  );
}

// =====================================================
// SCORE BAR
// =====================================================

function ScoreBar({ label, value }) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-semibold text-slate-600">
          {label}
        </span>

        <span className="text-xs font-bold text-slate-700">
          {value !== null ? `${value}%` : "Not available"}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        {value !== null && (
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${Math.min(
                Math.max(value, 0),
                100
              )}%`,
            }}
          />
        )}

      </div>

    </div>
  );
}

// =====================================================
// QUICK ACTION
// =====================================================

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="text-sm font-bold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ChevronRight
        size={17}
        className="shrink-0 text-slate-300 transition group-hover:text-blue-600"
      />

    </button>
  );
}