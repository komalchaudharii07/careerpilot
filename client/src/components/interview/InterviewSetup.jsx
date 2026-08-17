import { useState } from "react";
import { Play, Sparkles } from "lucide-react";

export default function InterviewSetup({ onStart }) {
  const [role, setRole] = useState("Frontend Developer");
  const [level, setLevel] = useState("intermediate");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStart) onStart({ role, level });
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Mock Interview Setup</h2>
          <p className="text-xs text-slate-500">Configure your session parameters</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Target Job Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Experience Level
          </label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {[
              { id: "beginner", label: "Beginner" },
              { id: "intermediate", label: "Intermediate" },
              { id: "senior", label: "Senior" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setLevel(item.id)}
                className={`rounded-xl border p-3 text-center text-xs font-semibold transition ${level === item.id
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
        >
          <Play size={16} /> Start Interview
        </button>
      </form>
    </div>
  );
}