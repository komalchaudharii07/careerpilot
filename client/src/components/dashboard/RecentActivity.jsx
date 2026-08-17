import { Clock, FileText, Mic, Map } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Completed React Mock Interview",
      time: "2 hours ago",
      icon: Mic,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: 2,
      title: "Generated Resume ATS Report",
      time: "Yesterday",
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 3,
      title: "Updated Frontend Roadmap Step",
      time: "3 days ago",
      icon: Map,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-base">Recent Activity</h3>
        <Clock size={16} className="text-slate-400" />
      </div>

      <div className="space-y-3">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${item.color}`}>
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium text-slate-800">
                  {item.title}
                </span>
              </div>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}