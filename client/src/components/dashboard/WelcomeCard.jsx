import { useAuth } from "../../context/AuthContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/10">
      <div>
        <div className="flex items-center gap-2 mb-1 text-blue-100 text-xs font-medium uppercase tracking-wider">
          <Sparkles size={16} />
          Welcome Back
        </div>
        <h1 className="text-2xl font-bold">
          Hello, {user?.name || "Career Aspirant"}! 👋
        </h1>
        <p className="text-sm text-blue-100/90 mt-1 max-w-lg">
          Track your skills, practice interviews, and get tailored career insights.
        </p>
      </div>

      <Link
        to="/dashboard/profile"
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition shadow-sm"
      >
        Update Profile
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}