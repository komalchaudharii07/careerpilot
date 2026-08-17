import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mic2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Career readiness",
    value: "78",
    suffix: "%",
    change: "+6.4%",
    icon: Target,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    label: "Resume score",
    value: "82",
    suffix: "/100",
    change: "+12",
    icon: FileText,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    label: "Interview score",
    value: "76",
    suffix: "/100",
    change: "+8",
    icon: Mic2,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    label: "Matched opportunities",
    value: "28",
    suffix: "",
    change: "+6",
    icon: BriefcaseBusiness,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
];

const activities = [
  {
    icon: FileText,
    title: "Resume analysis completed",
    description: "Your resume score improved to 82/100",
    time: "2 hours ago",
  },
  {
    icon: Mic2,
    title: "Mock interview completed",
    description: "Technical interview · 76/100",
    time: "Yesterday",
  },
  {
    icon: FileText,
    title: "Career roadmap updated",
    description: "Frontend Development · 75% complete",
    time: "2 days ago",
  },
];

const skills = [
  { name: "React", level: 86, color: "bg-blue-600" },
  { name: "JavaScript", level: 79, color: "bg-indigo-600" },
  { name: "Node.js", level: 64, color: "bg-emerald-500" },
  { name: "DSA & Problem Solving", level: 58, color: "bg-amber-500" },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700 shadow-xs">
            <Sparkles size={13} className="text-blue-600" /> Welcome back
          </span>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Your Career Dashboard
          </h1>

          <p className="mt-1 max-w-2xl text-xs font-medium text-slate-500 sm:text-sm">
            Track your preparation metrics, identify critical skill gaps, and optimize your path to job readiness.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-500/35 active:scale-95">
          <Sparkles size={15} />
          Improve Profile
        </button>
      </section>

      {/* ================= STATS CARDS ================= */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>

                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>

              <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                {stat.value}
                <span className="ml-1 text-xs font-semibold text-slate-400">
                  {stat.suffix}
                </span>
              </p>
            </div>
          );
        })}
      </section>

      {/* ================= MAIN CONTENT GRID ================= */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Career Readiness Progress */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Readiness Score
              </span>
              <h2 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
                Placement Preparation Status
              </h2>
            </div>

            <span className="rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              On Track
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            {/* Circular Gauge */}
            <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 transition-all duration-1000 ease-out"
                  strokeDasharray="78, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute text-center">
                <p className="text-3xl font-black tracking-tight text-slate-900">78%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Overall
                </p>
              </div>
            </div>

            {/* Progress Breakdown Bars */}
            <div className="w-full flex-1 space-y-4">
              <ReadinessBar label="Resume Quality" value={82} color="bg-blue-600" />
              <ReadinessBar label="Technical Proficiency" value={74} color="bg-indigo-600" />
              <ReadinessBar label="Mock Interview Score" value={76} color="bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Recommended Action Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/20 p-6 shadow-xs sm:p-7">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Action
            </span>

            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
              Priority Focus Area
            </h2>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-xs backdrop-blur-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Mic2 size={20} />
              </div>

              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Interview Practice
              </span>

              <h3 className="mt-1 text-base font-bold text-slate-900">
                Complete Technical Mock Interview
              </h3>

              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Practice interactive questions tailored to React & Node.js to boost your confidence.
              </p>
            </div>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-600 active:scale-98">
            Start Interview Session
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* ================= SECONDARY GRID ================= */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Technical Skills Overview */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Skill Overview
              </h2>
              <p className="text-xs text-slate-400">Evaluated technical strengths</p>
            </div>

            <button className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700">
              Roadmap <ChevronRight size={14} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{skill.name}</span>
                  <span className="text-slate-500">{skill.level}%</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xs sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-400">Latest progress logs</p>
            </div>

            <button className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 bg-slate-50 text-slate-600">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-900">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-slate-400">
                      {activity.time}
                    </p>
                  </div>

                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function ReadinessBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-800">{value}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}