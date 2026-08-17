import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  // Password Strength Calculator
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score++;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    return score;
  };

  const passStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-900 text-white px-3 py-6 sm:px-6 sm:py-10 overflow-x-hidden font-sans">
      {/* Background Orbs with Responsive Sizing */}
      <div className="absolute top-0 -left-10 w-60 h-60 sm:w-80 sm:h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-10 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto">
        {/* Top Header Badge */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] sm:text-xs font-medium text-blue-400 backdrop-blur-md mb-2.5 max-w-full truncate">
            <Sparkles size={13} className="text-blue-400 shrink-0 animate-pulse" />
            <span className="truncate">Launch Your Journey with CareerPilot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-normal">
            Join thousands of professionals steering their career path.
          </p>
        </div>

        {/* Card Glass Box */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-700/60 bg-slate-800/70 p-4 sm:p-7 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            /* Success Response State UI */
            <div className="py-6 sm:py-8 text-center space-y-3 sm:space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Account Created!</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Welcome, <span className="font-semibold text-blue-400">{formData.name}</span>! Verification link base email address (<span className="text-slate-200 break-all">{formData.email}</span>) pe bhej diya gaya hai.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 w-full py-2.5 sm:py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs sm:text-sm transition active:scale-95"
              >
                Back to Registration
              </button>
            </div>
          ) : (
            <>
              {/* OAuth Buttons - Fully Stacked on Extra Small Screens */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 mb-5">
                <button
                  type="button"
                  onClick={() => alert("Google Sign Up")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition active:scale-95 min-w-0"
                >
                  <FaGoogle className="text-red-500 shrink-0" size={15} />
                  <span className="truncate">Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("GitHub Sign Up")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition active:scale-95 min-w-0"
                >
                  <FaGithub className="shrink-0" size={15} />
                  <span className="truncate">GitHub</span>
                </button>
              </div>

              <div className="relative mb-5 flex items-center justify-center">
                <div className="w-full border-t border-slate-700/80" />
                <span className="absolute bg-slate-800 px-2.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Or register with email
                </span>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition min-w-0"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
                    <input
                      type="email"
                      name="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition min-w-0"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-1.5 space-y-1">
                      <div className="flex gap-1 h-1 w-full bg-slate-900 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${passStrength >= 1
                              ? passStrength > 2
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                              : "bg-red-500"
                            }`}
                          style={{ width: `${(passStrength / 4) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <ShieldCheck size={11} className={passStrength > 2 ? "text-emerald-400" : "text-amber-400"} />
                        Password Strength: {passStrength <= 1 ? "Weak" : passStrength <= 3 ? "Medium" : "Strong"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2 pt-1 min-w-0">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToTerms" className="text-[11px] sm:text-xs text-slate-400 leading-tight">
                    I agree to the{" "}
                    <a href="#" className="font-medium text-blue-400 hover:underline">Terms</a>{" "}
                    &{" "}
                    <a href="#" className="font-medium text-blue-400 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-5 text-center text-xs text-slate-400">
                Already have an account?{" "}
                <a href="#" className="font-semibold text-blue-400 hover:underline">
                  Sign in
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}