import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Target,
  BriefcaseBusiness,
  FileCheck2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[10%]
            top-[-180px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-600/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[-100px]
            top-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-indigo-600/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-1/2
            h-[350px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/5
            blur-[120px]
          "
        />

        <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
      </div>

      {/* ================= HERO CONTENT ================= */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          px-5
          pb-16
          pt-28
          sm:px-6
          sm:pb-20
          sm:pt-32
          lg:px-8
          lg:pb-24
          lg:pt-36
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-14
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="max-w-2xl">

            {/* BADGE */}

            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                px-3.5
                py-2
                backdrop-blur-md
              "
            >
              <Sparkles
                size={14}
                className="text-blue-400"
              />

              <span className="text-xs font-semibold text-blue-300 sm:text-sm">
                AI-powered career guidance
              </span>
            </div>

            {/* HEADING */}

            <h1
              className="
                max-w-3xl
                text-[42px]
                font-bold
                leading-[1.03]
                tracking-[-0.04em]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[68px]
                xl:text-[72px]
              "
            >
              Build the career
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-indigo-400
                  to-violet-400
                  bg-clip-text
                  text-transparent
                "
              >
                you actually want.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-6
                text-slate-400
                sm:text-base
                sm:leading-7
                lg:text-lg
                lg:leading-8
              "
            >
              CareerPilot brings your resume, interview preparation,
              job search and career roadmap together in one
              personalized experience.
            </p>

            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  duration-200
                  hover:bg-blue-500
                  hover:shadow-blue-500/30
                  active:scale-[0.98]
                "
              >
                Get started

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>

              <button
                onClick={handleHowItWorks}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/70
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-300
                  backdrop-blur-md
                  transition
                  hover:border-slate-700
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <PlayCircle
                  size={17}
                  className="text-blue-400"
                />

                See how it works
              </button>

            </div>

            {/* TRUST POINTS */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-x-6
                gap-y-3
              "
            >
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Personalized recommendations
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Built for students
              </div>
            </div>

          </div>

          {/* =================================================
              RIGHT — PRODUCT PREVIEW
          ================================================= */}

          <div className="relative mx-auto w-full max-w-[570px]">

            {/* SOFT GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                inset-10
                rounded-[40px]
                bg-blue-500/10
                blur-[70px]
              "
            />

            {/* MAIN WINDOW */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-slate-800
                bg-slate-900/90
                shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
              "
            >

              {/* WINDOW TOP */}

              <div
                className="
                  flex
                  h-14
                  items-center
                  justify-between
                  border-b
                  border-slate-800
                  px-4
                  sm:px-5
                "
              >

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-600
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    C
                  </div>

                  <span className="text-sm font-semibold text-white">
                    CareerPilot
                  </span>

                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-700" />
                  <span className="h-2 w-2 rounded-full bg-slate-700" />
                  <span className="h-2 w-2 rounded-full bg-slate-700" />
                </div>

              </div>

              {/* DASHBOARD CONTENT */}

              <div className="p-4 sm:p-5 lg:p-6">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-blue-500/30
                        bg-blue-500/10
                        text-sm
                        font-bold
                        text-blue-400
                      "
                    >
                      K
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Career Overview
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Your progress at a glance
                      </p>
                    </div>

                  </div>

                  <div
                    className="
                      hidden
                      rounded-lg
                      border
                      border-emerald-500/20
                      bg-emerald-500/10
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-emerald-400
                      sm:block
                    "
                  >
                    On track
                  </div>

                </div>

                {/* READINESS CARD */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950/70
                    p-4
                    sm:p-5
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[11px] font-medium text-slate-500">
                        Career readiness
                      </p>

                      <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                        78%
                      </p>

                      <p className="mt-1 text-[10px] text-slate-500">
                        Based on your current progress
                      </p>

                    </div>

                    {/* CIRCLE */}

                    <div
                      className="
                        relative
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        border-[5px]
                        border-slate-800
                        sm:h-[72px]
                        sm:w-[72px]
                      "
                    >

                      <div
                        className="
                          absolute
                          inset-[-5px]
                          rounded-full
                          border-[5px]
                          border-transparent
                          border-t-blue-500
                          border-r-blue-500
                          rotate-[20deg]
                        "
                      />

                      <span className="text-[9px] font-bold text-slate-300">
                        READY
                      </span>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-5">

                    <div className="mb-2 flex justify-between text-[10px]">
                      <span className="text-slate-500">
                        Overall progress
                      </span>

                      <span className="font-semibold text-blue-400">
                        78%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                    </div>

                  </div>

                </div>

                {/* MINI STATS */}

                <div className="mt-3 grid grid-cols-2 gap-3">

                  <div
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-slate-950/60
                      p-4
                    "
                  >

                    <div className="flex items-center justify-between">

                      <p className="text-[10px] font-medium text-slate-500">
                        Resume score
                      </p>

                      <FileCheck2
                        size={14}
                        className="text-blue-400"
                      />

                    </div>

                    <p className="mt-2 text-xl font-bold text-white">
                      82
                      <span className="text-xs font-medium text-slate-600">
                        /100
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-emerald-400">
                      Improving
                    </p>

                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-slate-950/60
                      p-4
                    "
                  >

                    <div className="flex items-center justify-between">

                      <p className="text-[10px] font-medium text-slate-500">
                        Job matches
                      </p>

                      <BriefcaseBusiness
                        size={14}
                        className="text-indigo-400"
                      />

                    </div>

                    <p className="mt-2 text-xl font-bold text-white">
                      28
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-blue-400">
                      6 new matches
                    </p>

                  </div>

                </div>

                {/* AI INSIGHT */}

                <div
                  className="
                    mt-3
                    rounded-2xl
                    border
                    border-blue-500/20
                    bg-gradient-to-r
                    from-blue-500/10
                    to-indigo-500/5
                    p-4
                  "
                >

                  <div className="flex gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-600
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                      "
                    >
                      <Sparkles size={16} />
                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <p className="text-xs font-bold text-white">
                          AI insight
                        </p>

                        <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[8px] font-semibold text-blue-400">
                          PERSONALIZED
                        </span>

                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        Strengthen DSA and complete one mock interview
                        to improve your placement readiness.
                      </p>

                    </div>

                  </div>

                </div>

                {/* NEXT STEP */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950/40
                    px-4
                    py-3
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        text-emerald-400
                      "
                    >
                      <Target size={15} />
                    </div>

                    <div>

                      <p className="text-[10px] text-slate-500">
                        Next step
                      </p>

                      <p className="text-xs font-semibold text-white">
                        Practice mock interview
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={16}
                    className="text-slate-600"
                  />

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}