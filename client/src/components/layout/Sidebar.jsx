import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mic,
  Map,
  Briefcase,
  User,
  Settings,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    {
      section: "WORKSPACE",
      links: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Resume", path: "/resume", icon: FileText },
        { name: "Interview", path: "/interview", icon: Mic },
        { name: "Career Roadmap", path: "/roadmap", icon: Map },
        { name: "Job Recommendations", path: "/jobs", icon: Briefcase },
      ],
    },
    {
      section: "ACCOUNT",
      links: [
        { name: "Profile", path: "/dashboard/profile", icon: User },
        { name: "Settings", path: "/dashboard/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="sticky top-0 z-30 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-slate-100 bg-white p-5">
      <div>
        {/* BRAND LOGO */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Career<span className="text-blue-600">Pilot</span>
          </span>
        </div>

        {/* NAVIGATION LIST */}
        <div className="mt-8 space-y-6">
          {navItems.map((group) => (
            <div key={group.section}>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {group.section}
              </p>
              <nav className="mt-2 space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === "/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition cursor-pointer ${isActive
                          ? "bg-blue-50/80 text-blue-600 font-semibold"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon
                              size={18}
                              className={isActive ? "text-blue-600" : "text-slate-400"}
                            />
                            <span>{link.name}</span>
                          </div>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM WIDGET CARD */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm border border-slate-100">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">AI Assist Pro</p>
            <p className="text-[10px] text-slate-500">Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}