import { Award, CheckCircle2, RotateCcw } from "lucide-react";

export default function InterviewResult({ score = 82, feedback = "Great job! Strong technical understanding demonstrated.", onRestart }) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
        <Award size={32} />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">Interview Completed!</h2>
      <p className="text-xs text-slate-500 mt-1">Here is your performance summary</p>

      <div className="my-6 inline-flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-8 py-4 border border-slate-100">
        <span className="text-4xl font-extrabold text-blue-600">{score}%</span>
        <span className="text-xs font-semibold text-slate-500 mt-1">Overall Score</span>
      </div>

      <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100/50 text-left mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <CheckCircle2 size={16} /> AI Feedback
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{feedback}</p>
      </div>

      <button
        onClick={onRestart}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 shadow-sm"
      >
        <RotateCcw size={16} /> Take Another Test
      </button>
    </div>
  );
}