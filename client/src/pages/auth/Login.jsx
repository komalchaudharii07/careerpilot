import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Login API call
      const data = await login(email, password);

      console.log("LOGIN RESPONSE:", data);

      // Safety check: token milna compulsory hai
      if (!data?.token) {
        console.error("NO TOKEN RECEIVED:", data);

        setError(
          "Login failed: server did not return an authentication token."
        );

        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Verify token was actually saved
      const savedToken = localStorage.getItem("token");

      console.log("TOKEN SAVED:", savedToken);

      if (!savedToken) {
        setError("Token could not be saved. Please try again.");
        return;
      }

      // Everything okay
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN FAILED:", err);

      setError(
        err?.message ||
        "Failed to sign in. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">

          <div>
            {/* Logo */}
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
                WELCOME BACK
              </p>

              <h1 className="text-4xl font-bold leading-tight mb-6 text-slate-900">
                Continue your journey to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}career success.
                </span>
              </h1>

              {/* Features */}
              <div className="space-y-4 my-8">

                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2
                    className="text-blue-600 shrink-0"
                    size={20}
                  />
                  <span>AI Resume Builder & ATS Scanner</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2
                    className="text-blue-600 shrink-0"
                    size={20}
                  />
                  <span>
                    Interactive AI Interview Preparation
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2
                    className="text-blue-600 shrink-0"
                    size={20}
                  />
                  <span>
                    Custom Career Roadmaps & Job Matching
                  </span>
                </div>

              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            Empowering your professional growth every step of the way.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-6 sm:p-12 flex flex-col justify-center">

          {/* Mobile Branding */}
          <div className="flex lg:hidden items-center gap-3 mb-8">

            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              C
            </div>

            <span className="text-xl font-bold">
              Career<span className="text-blue-600">Pilot</span>
            </span>

          </div>

          <div className="mb-8">

            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-500 text-sm sm:text-base">
              Please enter your details to sign in.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition text-sm sm:text-base"
              />

            </div>

            {/* Password */}
            <div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">

                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition whitespace-nowrap"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition text-sm sm:text-base"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          {/* Security */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Secure & Encrypted Login
          </div>

          {/* Register */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}