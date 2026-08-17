import { TrendingUp } from "lucide-react";

export default function ProgressChart() {
  const weeklyData = [
    { day: "Mon", val: 30 },
    { day: "Tue", val: 45 },
    { day: "Wed", val: 60 },
    { day: "Thu", val: 50 },
    { day: "Fri", val: 80 },
    { day: "Sat", val: 75 },
    { day: "Sun", val: 90 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Learning Activity</h3>
          <p className="text-xs text-slate-400">Weekly progress overview</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <TrendingUp size={14} /> +12.5%
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="flex items-end justify-between gap-2 h-36 pt-4">
        {weeklyData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div
              className="w-full bg-blue-600/90 rounded-lg hover:bg-blue-600 transition duration-300"
              style={{ height: `${item.val}%` }}
            />
            <span className="text-[11px] font-medium text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}