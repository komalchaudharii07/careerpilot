import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

      {/* Main Container Card */}
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">

        {/* LEFT SECTION - Branding & Features */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/20">
                C
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Career<span className="text-blue-600">Pilot</span>
              </span>
            </div>

            <div className="max-w-md">
              <p className="text-blue-600 font-semibold text-sm mb-4">
                START YOUR JOURNEY TODAY
              </p>
              <h1 className="text-4xl font-bold leading-tight mb-6 text-slate-900">
                Accelerate your career with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}AI guidance.
                </span>
              </h1>

              {/* Feature Checklist */}
              <div className="space-y-4 my-8">
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                  <span>AI Resume Builder & ATS Scanner</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                  <span>Interactive AI Interview Preparation</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                  <span>Custom Career Roadmaps & Job Matching</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            Join over 10,000+ students and professionals growing with CareerPilot.
          </p>
        </div>

        {/* RIGHT SECTION - Form */}
        <div className="p-8 sm:p-12">
          {/* Mobile Branding Header */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              C
            </div>
            <span className="text-xl font-bold">
              Career<span className="text-blue-600">Pilot</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-slate-500">
              Sign up to unlock your AI-powered career tools.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Get Started Now"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Encrypted & Secure Signup
          </div>

          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}