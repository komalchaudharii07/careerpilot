import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck, Sparkles } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">

          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center font-bold text-xl">
                C
              </div>

              <span className="text-2xl font-bold">
                Career<span className="text-blue-200">Pilot</span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-blue-100 text-sm font-semibold mb-4">
                <Sparkles size={17} />
                SECURE ACCOUNT RECOVERY
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Get back on track with your
                <span className="text-blue-200"> career journey.</span>
              </h1>

              <p className="mt-6 text-blue-100 leading-7">
                Forgot your password? No problem. Enter your registered
                email and we'll help you get back into your CareerPilot
                account.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-blue-100">
            <ShieldCheck size={18} />
            Your account security matters to us.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              C
            </div>

            <span className="text-xl font-bold text-slate-900">
              Career<span className="text-blue-600">Pilot</span>
            </span>
          </div>

          {/* Back */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition mb-8"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          {!submitted ? (
            <>
              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Forgot password?
                </h2>

                <p className="mt-2 text-slate-500 leading-6">
                  Enter your email address and we'll send you instructions
                  to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                >
                  Send reset instructions
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-8">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">

              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Mail size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Check your inbox
              </h2>

              <p className="mt-3 text-slate-500 leading-6">
                If an account exists for{" "}
                <span className="font-semibold text-slate-700">
                  {email}
                </span>
                , password reset instructions have been sent.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <ArrowLeft size={17} />
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}