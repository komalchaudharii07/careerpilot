import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ChevronDown,
  ChevronRight,
  Circle,
  Loader2,
  Lock,
  Map,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";

import api from "../../services/api";

export default function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [updatingModule, setUpdatingModule] = useState(null);

  // ROLE SELECTION
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [targetRole, setTargetRole] = useState("");

  // Common roles shown as suggestions.
  // These are UI suggestions only.
  const roleSuggestions = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Engineer",
    "Android Developer",
    "iOS Developer",
    "UI/UX Designer",
  ];

  // =====================================================
  // FETCH EXISTING ROADMAP
  // =====================================================

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api("/roadmap");

      if (Array.isArray(data) && data.length > 0) {
        setRoadmap(data[0]);
      } else if (data?.roadmaps?.length > 0) {
        setRoadmap(data.roadmaps[0]);
      } else {
        setRoadmap(null);
      }
    } catch (error) {
      console.error("Fetch roadmap error:", error);

      setError(
        error.message || "Failed to load your career roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  // =====================================================
  // OPEN ROLE SELECTION
  // =====================================================

  const openGenerateModal = () => {
    setError("");

    // If an existing roadmap exists, prefill its role.
    setTargetRole(roadmap?.targetRole || "");

    setShowRoleModal(true);
  };

  // =====================================================
  // GENERATE AI ROADMAP
  // =====================================================

  const generateRoadmap = async () => {
    const role = targetRole.trim();

    if (!role) {
      setError("Please enter the career role you want a roadmap for.");
      return;
    }

    try {
      setGenerating(true);
      setError("");

      const response = await api("/roadmap/generate", {
        method: "POST",
        body: JSON.stringify({
          targetRole: role,
        }),
      });

      if (response?.roadmap) {
        setRoadmap(response.roadmap);

        setExpandedMilestone(null);
        setSelectedMilestone(null);
        setShowRoleModal(false);
      } else {
        setError(
          "Roadmap was generated but no roadmap data was returned."
        );
      }
    } catch (error) {
      console.error("Generate roadmap error:", error);

      setError(
        error.message ||
        "Failed to generate your personalized roadmap."
      );
    } finally {
      setGenerating(false);
    }
  };

  // =====================================================
  // UPDATE MODULE
  // =====================================================

  const handleModuleToggle = async (moduleId, completed) => {
    if (!roadmap?._id || !moduleId) return;

    try {
      setUpdatingModule(moduleId);
      setError("");

      const response = await api(
        `/roadmap/${roadmap._id}/module/${moduleId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            completed,
          }),
        }
      );

      if (response?.roadmap) {
        setRoadmap(response.roadmap);

        if (selectedMilestone) {
          const updatedMilestone =
            response.roadmap.milestones?.find(
              (item) => item._id === selectedMilestone._id
            );

          if (updatedMilestone) {
            setSelectedMilestone(updatedMilestone);
          }
        }
      }
    } catch (error) {
      console.error("Module update error:", error);

      setError(
        error.message || "Failed to update module progress."
      );
    } finally {
      setUpdatingModule(null);
    }
  };

  // =====================================================
  // FORMAT MINUTES
  // =====================================================

  const formatMinutes = (minutes) => {
    if (!minutes || minutes <= 0) return null;

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (remaining === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remaining} min`;
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";

      case "in_progress":
        return "In Progress";

      case "locked":
        return "Locked";

      default:
        return "Not Started";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "locked":
        return "bg-slate-100 text-slate-500 border-slate-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Loader2
                size={23}
                className="animate-spin text-blue-600"
              />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Loading your career roadmap...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-sm">
            <Map size={17} />
            Career Roadmap
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {roadmap?.title || "Your Career Journey"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                {roadmap?.description ||
                  "Build the skills you need through a personalized, AI-powered learning journey."}
              </p>

              {roadmap?.targetRole && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  <Target size={14} />

                  Target:

                  <span>{roadmap.targetRole}</span>
                </div>
              )}

            </div>

            <button
              onClick={openGenerateModal}
              disabled={generating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {roadmap ? (
                <>
                  <RefreshCw size={17} />
                  Change Career Goal
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Generate with AI
                </>
              )}
            </button>

          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

            <span className="mt-0.5 font-bold">
              !
            </span>

            <p className="flex-1">{error}</p>

            <button
              onClick={() => setError("")}
              className="rounded-lg p-1 hover:bg-red-100"
            >
              <X size={16} />
            </button>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!roadmap && (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="relative px-6 py-14 text-center sm:px-10 sm:py-20">

              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Sparkles size={28} />
              </div>

              <h2 className="relative mt-6 text-2xl font-bold text-slate-900">
                Build your personalized roadmap
              </h2>

              <p className="relative mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Tell CareerPilot which career you want to pursue.
                AI will analyze your profile, resume and interview
                performance to create your personalized learning path.
              </p>

              <button
                onClick={openGenerateModal}
                className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Sparkles size={17} />
                Choose Career Goal
              </button>

            </div>

          </section>
        )}

        {/* =================================================
            ROADMAP
        ================================================= */}

        {roadmap && (
          <>

            {/* PROGRESS */}

            <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">

                <div className="p-5 sm:p-7 lg:p-9">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
                        Career Readiness Journey
                      </p>

                      <div className="mt-2 flex items-baseline gap-3">

                        <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                          {roadmap.progress?.percentage || 0}%
                        </h2>

                        {roadmap.progress?.percentage === 100 ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                            Completed
                          </span>
                        ) : (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            In Progress
                          </span>
                        )}

                      </div>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-14 sm:w-14">
                      <Trophy size={25} />
                    </div>

                  </div>

                  <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          roadmap.progress?.percentage || 0,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 sm:text-sm">

                    <span>
                      {roadmap.progress?.completedModules || 0} of{" "}
                      {roadmap.progress?.totalModules || 0} modules completed
                    </span>

                    <span className="hidden text-slate-300 sm:inline">
                      •
                    </span>

                    <span>
                      {roadmap.progress?.completedMilestones || 0} of{" "}
                      {roadmap.progress?.totalMilestones || 0} milestones completed
                    </span>

                  </div>

                </div>

                {/* NEXT ACTION */}

                <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                    <Sparkles size={15} />
                    Next Best Action
                  </div>

                  {roadmap.nextAction?.title ? (
                    <>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900">
                        {roadmap.nextAction.title}
                      </h3>

                      {roadmap.nextAction.reason && (
                        <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                          {roadmap.nextAction.reason}
                        </p>
                      )}

                      {roadmap.nextAction.estimatedMinutes > 0 && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                          <Clock3 size={15} />

                          {formatMinutes(
                            roadmap.nextAction.estimatedMinutes
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      Complete your learning modules to continue.
                    </p>
                  )}

                </div>

              </div>

            </section>

            {/* AI INSIGHT */}

            {roadmap.aiInsight && (
              <section className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Sparkles size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      CareerPilot AI Insight
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                      {roadmap.aiInsight}
                    </p>

                  </div>

                </div>

              </section>
            )}

            {/* LEARNING PATH */}

            <section>

              <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Learning Path
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Follow your AI-generated sequence and complete the actual learning modules.
                </p>

              </div>

              <div className="relative">

                <div className="absolute bottom-8 left-[19px] top-8 w-px bg-slate-200 sm:left-[27px]" />

                <div className="space-y-5 sm:space-y-7">

                  {roadmap.milestones?.map((milestone, index) => {

                    const isExpanded =
                      expandedMilestone === milestone._id;

                    const isLocked =
                      milestone.status === "locked";

                    const isCompleted =
                      milestone.status === "completed" ||
                      milestone.completed;

                    const completedModules =
                      milestone.modules?.filter(
                        (module) => module.completed
                      ).length || 0;

                    const totalModules =
                      milestone.modules?.length || 0;

                    const milestoneProgress =
                      Number(milestone.progress || 0);

                    return (
                      <div
                        key={milestone._id || index}
                        className="relative pl-11 sm:pl-16"
                      >

                        {/* NODE */}

                        <div
                          className={`absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-slate-50 shadow-sm sm:h-14 sm:w-14 sm:rounded-2xl ${isCompleted
                            ? "bg-emerald-600 text-white"
                            : isLocked
                              ? "bg-white text-slate-400"
                              : milestoneProgress > 0
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                            }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} />
                          ) : isLocked ? (
                            <Lock size={18} />
                          ) : (
                            <span className="text-sm font-bold">
                              {milestone.stepNumber || index + 1}
                            </span>
                          )}
                        </div>

                        {/* CARD */}

                        <div
                          className={`overflow-hidden rounded-2xl border bg-white shadow-sm sm:rounded-3xl ${isLocked
                            ? "border-slate-200 opacity-75"
                            : "border-slate-200 hover:border-blue-200 hover:shadow-md"
                            }`}
                        >

                          <div className="p-4 sm:p-6">

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                              <div className="min-w-0">

                                <div className="mb-2 flex flex-wrap items-center gap-2">

                                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                                    Step {milestone.stepNumber || index + 1}
                                  </span>

                                  <span
                                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${getStatusStyles(
                                      milestone.status
                                    )}`}
                                  >
                                    {getStatusLabel(milestone.status)}
                                  </span>

                                </div>

                                <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
                                  {milestone.title}
                                </h3>

                                {milestone.description && (
                                  <p className="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                                    {milestone.description}
                                  </p>
                                )}

                              </div>

                              <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-400">
                                <Clock3 size={14} />

                                {milestone.duration ||
                                  formatMinutes(
                                    milestone.estimatedMinutes
                                  ) ||
                                  "Flexible"}
                              </div>

                            </div>

                            {/* SKILLS */}

                            {milestone.skills?.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">

                                {milestone.skills.map(
                                  (skill, skillIndex) => (
                                    <span
                                      key={`${skill}-${skillIndex}`}
                                      className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 sm:text-xs"
                                    >
                                      {skill}
                                    </span>
                                  )
                                )}

                              </div>
                            )}

                            {/* PROGRESS */}

                            <div className="mt-5 border-t border-slate-100 pt-4">

                              <div className="flex items-center justify-between text-xs">

                                <div className="flex items-center gap-2 text-slate-500">

                                  <span className="font-medium">
                                    Progress
                                  </span>

                                  <span className="text-slate-300">
                                    •
                                  </span>

                                  <span>
                                    {completedModules} / {totalModules} modules
                                  </span>

                                </div>

                                <span className="font-bold text-slate-800">
                                  {milestoneProgress}%
                                </span>

                              </div>

                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">

                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${isCompleted
                                    ? "bg-emerald-500"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                                    }`}
                                  style={{
                                    width: `${Math.min(
                                      milestoneProgress,
                                      100
                                    )}%`,
                                  }}
                                />

                              </div>

                            </div>

                            {/* ACTIONS */}

                            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                              <button
                                onClick={() =>
                                  setSelectedMilestone(milestone)
                                }
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                View Details
                                <ChevronRight size={15} />
                              </button>

                              {!isLocked && (
                                <button
                                  onClick={() =>
                                    setExpandedMilestone(
                                      isExpanded
                                        ? null
                                        : milestone._id
                                    )
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                                >
                                  {isCompleted
                                    ? "Review Modules"
                                    : milestoneProgress > 0
                                      ? "Continue Learning"
                                      : "Start Learning"}

                                  {isExpanded ? (
                                    <ChevronDown size={15} />
                                  ) : (
                                    <ArrowRight size={15} />
                                  )}
                                </button>
                              )}

                              {isLocked && (
                                <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-400">
                                  <Lock size={14} />
                                  Complete previous step
                                </div>
                              )}

                            </div>

                          </div>

                          {/* MODULES */}

                          {isExpanded && !isLocked && (
                            <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-6">

                              <div className="mb-4 flex items-center justify-between">

                                <div>

                                  <h4 className="text-sm font-bold text-slate-900">
                                    Learning Modules
                                  </h4>

                                  <p className="mt-0.5 text-xs text-slate-500">
                                    Complete modules to update your real progress.
                                  </p>

                                </div>

                                <PlayCircle
                                  size={18}
                                  className="text-blue-600"
                                />

                              </div>

                              <div className="space-y-2">

                                {milestone.modules?.length > 0 ? (
                                  milestone.modules.map((module) => {

                                    const isUpdating =
                                      updatingModule === module._id;

                                    return (
                                      <button
                                        key={module._id}
                                        type="button"
                                        disabled={isUpdating}
                                        onClick={() =>
                                          handleModuleToggle(
                                            module._id,
                                            !module.completed
                                          )
                                        }
                                        className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:shadow-sm disabled:cursor-wait disabled:opacity-70 sm:p-4"
                                      >

                                        <div className="mt-0.5 shrink-0">

                                          {isUpdating ? (
                                            <Loader2
                                              size={19}
                                              className="animate-spin text-blue-600"
                                            />
                                          ) : module.completed ? (
                                            <CheckCircle2
                                              size={19}
                                              className="text-emerald-600"
                                            />
                                          ) : (
                                            <Circle
                                              size={19}
                                              className="text-slate-300"
                                            />
                                          )}

                                        </div>

                                        <div className="min-w-0 flex-1">

                                          <p
                                            className={`text-sm font-semibold ${module.completed
                                              ? "text-slate-400 line-through"
                                              : "text-slate-800"
                                              }`}
                                          >
                                            {module.title}
                                          </p>

                                          {module.description && (
                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                              {module.description}
                                            </p>
                                          )}

                                          {module.estimatedMinutes > 0 && (
                                            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                                              <Clock3 size={12} />

                                              {formatMinutes(
                                                module.estimatedMinutes
                                              )}
                                            </div>
                                          )}

                                        </div>

                                      </button>
                                    );
                                  })
                                ) : (
                                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-center text-xs text-slate-500">
                                    No modules were generated for this milestone.
                                  </div>
                                )}

                              </div>

                              {/* PROJECT */}

                              {milestone.project?.title && (
                                <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">

                                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                    Practical Project
                                  </p>

                                  <h5 className="mt-1 text-sm font-bold text-slate-900">
                                    {milestone.project.title}
                                  </h5>

                                  {milestone.project.description && (
                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                      {milestone.project.description}
                                    </p>
                                  )}

                                </div>
                              )}

                            </div>
                          )}

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </section>
          </>
        )}

      </main>

      {/* =====================================================
          ROLE SELECTION MODAL
      ===================================================== */}

      {showRoleModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!generating) {
              setShowRoleModal(false);
            }
          }}
        >

          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="border-b border-slate-100 p-6 sm:p-8">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles size={21} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    What career do you want to pursue?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Choose your target role and CareerPilot AI will
                    build a roadmap specifically for that career.
                  </p>

                </div>

                <button
                  type="button"
                  disabled={generating}
                  onClick={() => setShowRoleModal(false)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                >
                  <X size={20} />
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="p-6 sm:p-8">

              <label className="text-sm font-semibold text-slate-800">
                Target career role
              </label>

              <div className="relative mt-2">

                <Target
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) =>
                    setTargetRole(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      generateRoadmap();
                    }
                  }}
                  placeholder="e.g. Full Stack Developer"
                  disabled={generating}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />

              </div>

              {/* SUGGESTIONS */}

              <div className="mt-5">

                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Popular career paths
                </p>

                <div className="flex flex-wrap gap-2">

                  {roleSuggestions.map((role) => (

                    <button
                      key={role}
                      type="button"
                      disabled={generating}
                      onClick={() => setTargetRole(role)}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${targetRole === role
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                    >
                      {role}
                    </button>

                  ))}

                </div>

              </div>

              {/* INFO */}

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

                <div className="flex gap-3">

                  <Sparkles
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-slate-600">
                    Your roadmap will be generated using your selected
                    career goal along with your profile, resume and
                    interview performance.
                  </p>

                </div>

              </div>

              {/* ACTION */}

              <button
                type="button"
                onClick={generateRoadmap}
                disabled={generating || !targetRole.trim()}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {generating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    AI is creating your roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />

                    Generate My Roadmap

                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMilestone(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                    Step {selectedMilestone.stepNumber}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${getStatusStyles(
                      selectedMilestone.status
                    )}`}
                  >
                    {getStatusLabel(selectedMilestone.status)}
                  </span>

                </div>

                <h3 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                  {selectedMilestone.title}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>

            </div>

            {selectedMilestone.description && (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {selectedMilestone.description}
              </p>
            )}

            {selectedMilestone.skills?.length > 0 && (
              <div className="mt-6">

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Skills
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">

                  {selectedMilestone.skills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Modules
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {selectedMilestone.modules?.length || 0}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Progress
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {selectedMilestone.progress || 0}%
                </p>

              </div>

            </div>

            {selectedMilestone.project?.title && (
              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Practical Project
                </p>

                <h4 className="mt-1 font-bold text-slate-900">
                  {selectedMilestone.project.title}
                </h4>

                {selectedMilestone.project.description && (
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {selectedMilestone.project.description}
                  </p>
                )}

              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedMilestone(null)}
              className="mt-6 w-full rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close Overview
            </button>

          </div>

        </div>
      )}

    </div>
  );
}