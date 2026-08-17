import { Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ResumeAnalysis({
  strengths = ["Clear experience timeline", "Action verbs used effectively"],
  improvements = ["Add quantifiable metrics to project outcomes", "Include target role keywords in summary"],
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Sparkles size={18} className="text-blue-600" />
        <h3 className="text-base font-bold text-slate-900">AI Detailed Feedback</h3>
      </div>

      {/* STRENGTHS */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Key Strengths
        </h4>
        <ul className="space-y-2">
          {strengths.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AREAS FOR IMPROVEMENT */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Suggestions to Improve
        </h4>
        <ul className="space-y-2">
          {improvements.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
              <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}