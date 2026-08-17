import { Award, TrendingUp } from "lucide-react";

export default function ResumeScore({ score = 78 }) {
  const getScoreColor = () => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
        <Award size={24} />
      </div>

      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        ATS Compatibility Score
      </span>

      <div className={`mt-3 inline-flex items-baseline gap-1 rounded-2xl border px-6 py-2 ${getScoreColor()}`}>
        <span className="text-4xl font-black">{score}</span>
        <span className="text-sm font-bold">/ 100</span>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {score >= 80
          ? "Excellent! Your resume is highly optimized for ATS filters."
          : "Good start! Some key improvements can boost your visibility."}
      </p>
    </div>
  );
}