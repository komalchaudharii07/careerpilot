import { BookOpen, CheckCircle2 } from "lucide-react";

export default function LearningProgress({ completedCount = 3, totalCount = 6 }) {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Roadmap Progress</h3>
            <p className="text-xs text-slate-500">
              {completedCount} of {totalCount} topics completed
            </p>
          </div>
        </div>
        <span className="text-2xl font-black text-blue-600">{percentage}%</span>
      </div>

      <div className="mt-4 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}