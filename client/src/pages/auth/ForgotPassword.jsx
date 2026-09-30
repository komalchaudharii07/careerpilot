import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f7faff] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />

      {/* Card */}
      <div
        className="
          relative
          w-full
          max-w-[500px]
          bg-white
          border border-slate-200
          rounded-[24px]
          px-8 py-8
          sm:px-10 sm:py-9
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >

        {/* Back */}
        <Link
          to="/login"
          className="
            inline-flex items-center gap-2
            text-sm font-medium
            text-slate-500
            hover:text-blue-600
            transition
          "
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {!submitted ? (
          <div className="mt-7">

            {/* Small Icon */}
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-blue-50
                border border-blue-100
                flex items-center justify-center
                mb-5
              "
            >
              <KeyRound
                size={20}
                className="text-blue-600"
              />
            </div>

            {/* Heading */}
            <h1
              className="
                text-[28px]
                sm:text-[30px]
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Forgot password?
            </h1>

            <p
              className="
                mt-2
                text-[14px]
                sm:text-[15px]
                leading-6
                text-slate-500
                max-w-[400px]
              "
            >
              Enter your email and we'll send you a reset link.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-4"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="
                    block
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-600
                    mb-2
                  "
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="
                      w-full
                      h-[52px]
                      pl-11
                      pr-4

                      rounded-xl
                      bg-white
                      border border-slate-200

                      text-sm
                      text-slate-900

                      placeholder:text-slate-400

                      outline-none

                      transition-all

                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />

                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-[52px]
                  rounded-xl

                  bg-blue-600
                  hover:bg-blue-700

                  text-white
                  text-sm
                  font-semibold

                  shadow-[0_8px_18px_rgba(37,99,235,0.22)]

                  transition-all

                  active:scale-[0.99]

                  disabled:opacity-60
                  disabled:cursor-not-allowed

                  flex
                  items-center
                  justify-center
                "
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="
                        w-4 h-4
                        border-2
                        border-white/30
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>

            </form>

          </div>
        ) : (

          /* Success */
          <div className="text-center py-8">

            <div
              className="
                w-12 h-12
                mx-auto
                rounded-xl
                bg-blue-50
                border border-blue-100
                flex items-center justify-center
                mb-5
              "
            >
              <CheckCircle2
                size={23}
                className="text-blue-600"
              />
            </div>

            <h2
              className="
                text-[26px]
                font-bold
                text-slate-900
              "
            >
              Check your inbox
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
                max-w-[350px]
                mx-auto
              "
            >
              We've sent a reset link to{" "}
              <span className="font-semibold text-slate-800">
                {email}
              </span>
              .
            </p>

            <Link
              to="/login"
              className="
                mt-6
                w-full
                h-[50px]
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-blue-600
                hover:bg-blue-700

                text-white
                text-sm
                font-semibold

                transition
              "
            >
              <ArrowLeft size={16} />
              Return to login
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}