import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Globe,
  Lock,
  Map,
  PlayCircle,
  Server,
  Sparkles,
  Trophy,
  ChevronRight,
  X,
} from "lucide-react";

const initialRoadmapSteps = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Build a strong foundation in modern frontend development and create responsive web applications.",
    duration: "4–6 weeks",
    progress: 75,
    status: "In Progress",
    icon: Globe,
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 2,
    title: "Backend Development",
    description:
      "Learn how servers, APIs, authentication and databases work together.",
    duration: "5–7 weeks",
    progress: 35,
    status: "In Progress",
    icon: Server,
    skills: ["Node.js", "Express", "REST API", "MongoDB"],
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description:
      "Improve your problem-solving ability with essential DSA concepts for technical interviews.",
    duration: "8–10 weeks",
    progress: 20,
    status: "In Progress",
    icon: Code2,
    skills: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
  },
  {
    id: 4,
    title: "Database & System Design",
    description:
      "Understand scalable systems, database design and architecture fundamentals.",
    duration: "4–5 weeks",
    progress: 0,
    status: "Upcoming",
    icon: Database,
    skills: ["SQL", "DBMS", "System Design", "Caching"],
  },
  {
    id: 5,
    title: "Cyber Security Basics",
    description:
      "Learn the fundamentals of authentication, authorization and secure application development.",
    duration: "3–4 weeks",
    progress: 0,
    status: "Upcoming",
    icon: Lock,
    skills: ["Authentication", "JWT", "HTTPS", "Security"],
  },
];

export default function CareerRoadmap() {
  const [steps, setSteps] = useState(initialRoadmapSteps);
  const [selectedStep, setSelectedStep] = useState(null);

  const completedSkills = 18;
  const totalSkills = 32;
  const overallProgress = Math.round((completedSkills / totalSkills) * 100);

  const handleProgressIncrement = (id) => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id === id) {
          const newProgress = Math.min(step.progress + 25, 100);
          return {
            ...step,
            progress: newProgress,
            status: newProgress === 100 ? "Completed" : "In Progress",
          };
        }
        return step;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Header */}
        <section className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600 sm:text-sm">
            <Map size={18} />
            Career Roadmap
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                Your Career Journey
              </h1>

              <p className="mt-1 max-w-2xl text-xs text-slate-500 sm:text-sm md:text-base">
                A personalized roadmap designed to help you become placement-ready step by step.
              </p>
            </div>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95 sm:w-auto">
              <Sparkles size={17} />
              Personalize Roadmap
            </button>
          </div>
        </section>

        {/* Progress Card */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Left Box */}
            <div className="p-5 sm:p-7 md:p-9">
              <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
                <div>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Overall Progress
                  </p>

                  <div className="mt-1 flex items-baseline gap-2 sm:mt-2 sm:gap-3">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                      {overallProgress}%
                    </h2>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      On Track
                    </span>
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-14 sm:w-14">
                  <Trophy size={24} />
                </div>
              </div>

              {/* Bar */}
              <div className="mb-3 h-2.5 sm:h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>

              <div className="flex flex-col gap-1 text-xs sm:flex-row sm:justify-between sm:text-sm">
                <span className="text-slate-500">
                  {completedSkills} of {totalSkills} skills completed
                </span>

                <span className="font-medium text-slate-700">
                  Keep going!
                </span>
              </div>
            </div>

            {/* Right Box */}
            <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Estimated completion
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl">
                December 2026
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 sm:mt-5 sm:text-sm">
                <Clock3 size={16} />
                ~2 hours/day recommended
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Path */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Learning Path
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Complete each stage to move closer to your target career.
            </p>
          </div>

          <div className="relative">
            {/* Line for both Mobile & Desktop */}
            <div className="absolute left-4 top-6 h-[calc(100%-48px)] w-0.5 bg-slate-200 sm:left-6" />

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="relative pl-10 sm:pl-16"
                  >
                    {/* Timeline Node Icon */}
                    <div
                      className={`absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-50 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:border-4 ${step.progress >= 100
                          ? "bg-emerald-600 text-white"
                          : step.progress > 0
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-400 border-slate-200"
                        }`}
                    >
                      {step.progress >= 100 ? (
                        <CheckCircle2 size={18} className="sm:h-5 sm:w-5" />
                      ) : (
                        <Icon size={16} className="sm:h-5 sm:w-5" />
                      )}
                    </div>

                    {/* Step Card */}
                    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-md sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                              Step {step.id}
                            </span>

                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:text-xs ${step.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : step.status === "In Progress"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                            >
                              {step.status}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 sm:text-xl">
                            {step.title}
                          </h3>

                          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                            {step.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                          <Clock3 size={14} />
                          {step.duration}
                        </div>
                      </div>

                      {/* Skill Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                        {step.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs border border-slate-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action & Progress */}
                      <div className="mt-4 border-t border-slate-100 pt-3 sm:mt-6 sm:pt-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="w-full sm:max-w-xs">
                            <div className="mb-1 flex justify-between text-[11px] sm:text-xs">
                              <span className="font-medium text-slate-500">
                                Step Progress
                              </span>
                              <span className="font-bold text-slate-700">
                                {step.progress}%
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 sm:h-2">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${step.progress >= 100
                                    ? "bg-emerald-500"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                                  }`}
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedStep(step)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Details
                              <ChevronRight size={14} />
                            </button>

                            <button
                              onClick={() => handleProgressIncrement(step.id)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                            >
                              {step.progress >= 100 ? (
                                "Completed"
                              ) : step.progress > 0 ? (
                                <>
                                  Continue
                                  <ArrowRight size={15} />
                                </>
                              ) : (
                                <>
                                  <PlayCircle size={15} />
                                  Start
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-lg shadow-blue-600/20 sm:mt-12 sm:rounded-3xl sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-1.5">
                <Sparkles size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  CareerPilot AI
                </span>
              </div>

              <h2 className="text-lg font-bold sm:text-2xl">
                Want a roadmap built specifically for you?
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-relaxed text-blue-100 sm:text-sm">
                Analyze your skills, target role and experience to generate a personalized career plan.
              </p>
            </div>

            <button className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-blue-600 transition hover:bg-blue-50 active:scale-95">
              Generate with AI
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:rounded-3xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Step {selectedStep.id} Overview
                </span>
                <h3 className="text-xl font-bold">{selectedStep.title}</h3>
              </div>
              <button
                onClick={() => setSelectedStep(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {selectedStep.description}
            </p>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Modules Covered
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedStep.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedStep(null)}
              className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}