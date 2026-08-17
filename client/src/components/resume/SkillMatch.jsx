import { CheckCircle2, XCircle } from "lucide-react";

export default function SkillMatch({
  matchedSkills = ["React", "JavaScript", "Tailwind CSS"],
  missingSkills = ["TypeScript", "GraphQL"],
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 mb-4">Skill Keyword Analysis</h3>

      <div className="space-y-4">
        {/* MATCHED SKILLS */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Matched Skills ({matchedSkills.length})
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {matchedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
              >
                <CheckCircle2 size={14} /> {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
            Missing Keywords ({missingSkills.length})
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {missingSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600"
              >
                <XCircle size={14} /> {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}