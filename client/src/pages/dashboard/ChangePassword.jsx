import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import api from "../../services/api";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------
    // Validation
    // -----------------------------

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      await api("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      setSuccess("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Change password error:", err);

      setError(
        err.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* =========================================
            BACK BUTTON
        ========================================= */}

        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Settings
        </button>

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-7">

          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <LockKeyhole size={21} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Change Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your CareerPilot account password.
          </p>

        </div>

        {/* =========================================
            FORM CARD
        ========================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* Security info */}

          <div className="mb-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-blue-900">
                Keep your account secure
              </p>

              <p className="mt-1 text-xs leading-relaxed text-blue-700">
                Use a strong password that you don't use on other
                websites.
              </p>
            </div>

          </div>

          {/* =========================================
              ERROR
          ========================================= */}

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          {/* =========================================
              SUCCESS
          ========================================= */}

          {success && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-700">

              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{success}</span>

            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* =========================================
                CURRENT PASSWORD
            ========================================= */}

            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              setShow={setShowCurrent}
              placeholder="Enter your current password"
            />

            {/* =========================================
                NEW PASSWORD
            ========================================= */}

            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              setShow={setShowNew}
              placeholder="Enter your new password"
            />

            {/* Password requirement */}

            <p className="-mt-2 text-xs text-slate-400">
              Password must be at least 6 characters long.
            </p>

            {/* =========================================
                CONFIRM PASSWORD
            ========================================= */}

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              setShow={setShowConfirm}
              placeholder="Confirm your new password"
            />

            {/* =========================================
                BUTTON
            ========================================= */}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

// =====================================================
// PASSWORD INPUT COMPONENT
// =====================================================

function PasswordInput({
  label,
  value,
  onChange,
  show,
  setShow,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        <LockKeyhole
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          aria-label={
            show ? "Hide password" : "Show password"
          }
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}