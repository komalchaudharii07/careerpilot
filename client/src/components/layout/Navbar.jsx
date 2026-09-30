import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              CareerPilot
            </p>

            <p className="hidden text-xs text-slate-500 sm:block">
              Your career workspace
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/profile"
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-[140px] truncate text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-[11px] text-slate-500">
              Profile
            </p>
          </div>
        </Link>

      </div>
    </header>
  );
}