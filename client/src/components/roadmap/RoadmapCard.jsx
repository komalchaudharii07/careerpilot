import { CheckCircle, Circle, ArrowRight } from "lucide-react";

export default function RoadmapCard({ stepNumber = 1, title = "HTML & CSS Fundamentals", description = "Learn semantic tags, Flexbox, CSS Grid, and responsive design patterns.", status = "completed" }) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <div className={`relative flex items-start gap-4 rounded-2xl border p-6 transition shadow-sm ${isCompleted
        ? "border-emerald-100 bg-emerald-50/30"
        : isInProgress
          ? "border-blue-200 bg-blue-50/20"
          : "border-slate-100 bg-white"
      }`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100">
        {isCompleted ? (
          <CheckCircle className="text-emerald-600" size={20} />
        ) : (
          <Circle className={isInProgress ? "text-blue-600" : "text-slate-300"} size={20} />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step {stepNumber}
          </span>
          {isInProgress && (
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
              In Progress
            </span>
          )}
        </div>
        <h3 className="mt-1 text-base font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>

      <div className="self-center">
        <ArrowRight size={18} className="text-slate-400" />
      </div>
    </div>
  );
}