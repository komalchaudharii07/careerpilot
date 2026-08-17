import { Target, Award } from "lucide-react";

export default function ReadinessScore({ score = 75 }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">Job Readiness</span>
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
          <Award size={20} />
        </div>
      </div>

      <div className="my-4 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-slate-900">{score}%</span>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          +5% this week
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xs text-slate-400">Targeting Junior Software Engineer</p>
      </div>
    </div>
  );
}