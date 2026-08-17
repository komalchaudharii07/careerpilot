import { useState } from "react";
import { Mic, Send } from "lucide-react";

export default function AnswerBox({ onSubmit, isSubmitting = false }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && onSubmit) {
      onSubmit(answer);
      setAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Your Answer
        </label>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600"
        >
          <Mic size={14} /> Speech to Text
        </button>
      </div>

      <textarea
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your detailed answer here..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
      />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={!answer.trim() || isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={15} /> {isSubmitting ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </form>
  );
}