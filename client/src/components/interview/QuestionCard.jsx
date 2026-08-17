import { HelpCircle } from "lucide-react";

export default function QuestionCard({ questionNumber = 1, totalQuestions = 5, question = "Explain the difference between Virtual DOM and Real DOM in React." }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          <HelpCircle size={14} /> Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-xs text-slate-400">AI Generated</span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900 leading-relaxed">
        {question}
      </h3>
    </div>
  );
}