import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PlayCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />

        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-slate-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:px-8 sm:pt-28 lg:px-10 lg:pb-28">

        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />

              <span className="text-xs font-semibold text-slate-600">
                AI-powered career guidance
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[60px]">
              Build the career
              <br />

              <span className="text-blue-600">
                you actually want.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              CareerPilot helps you understand where you stand, improve your
              resume, prepare for interviews, discover relevant jobs, and
              follow a personalized career roadmap.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
                Get started
                <ArrowRight size={17} />
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                <PlayCircle size={17} />
                See how it works
              </button>

            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Personalized recommendations
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Built for students
              </div>

            </div>

          </div>

          {/* RIGHT — PRODUCT PREVIEW */}
          <div className="relative mx-auto w-full max-w-[500px]">

            {/* Main Card */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-6">

              {/* Window header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">
                    C
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    CareerPilot
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-200" />
                  <span className="h-2 w-2 rounded-full bg-slate-200" />
                  <span className="h-2 w-2 rounded-full bg-slate-200" />
                </div>

              </div>

              {/* Profile */}
              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  K
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Career Overview
                  </p>

                  <p className="text-xs text-slate-400">
                    Your progress at a glance
                  </p>
                </div>

              </div>

              {/* Readiness */}
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Career readiness
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      78%
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-blue-100 border-t-blue-600">
                    <span className="text-xs font-bold text-slate-700">
                      On track
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full w-[78%] rounded-full bg-blue-600" />
                </div>

              </div>

              {/* Mini cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-medium text-slate-400">
                    Resume score
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    82
                    <span className="text-xs font-medium text-slate-400">
                      /100
                    </span>
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                    +12 this month
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-medium text-slate-400">
                    Job matches
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    28
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-blue-600">
                    6 new matches
                  </p>
                </div>

              </div>

              {/* AI recommendation */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    AI recommendation
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                    Improve DSA skills to strengthen your placement readiness.
                  </p>
                </div>

              </div>

            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400">
                    Next milestone
                  </p>

                  <p className="text-xs font-bold text-slate-800">
                    Complete mock interview
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}