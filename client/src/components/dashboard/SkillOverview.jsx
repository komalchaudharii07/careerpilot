import { CheckCircle2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function SkillOverview({ skills = ["React", "JavaScript", "Tailwind CSS", "Node.js"] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-base">Key Skills</h3>
        <Link
          to="/dashboard/profile"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus size={14} /> Add Skill
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-medium border border-slate-100"
          >
            <CheckCircle2 size={14} className="text-blue-600" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}