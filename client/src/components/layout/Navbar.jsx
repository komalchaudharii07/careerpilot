import { Link } from "react-router-dom";
import { Bell, Search, User, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">

        {/* SEARCH BAR */}
        <div className="relative w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search features, tools, roadmaps..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATION BUTTON */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* USER PROFILE / LOGOUT */}
          {user ? (
            <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600 border border-blue-100">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] font-medium text-slate-500">{user.role || user.email}</p>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="ml-2 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}