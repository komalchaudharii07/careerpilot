import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  User,
  LogOut,
  ChevronRight,
  CheckCircle,
  LockKeyhole,
  MonitorSmartphone,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const [careerUpdates, setCareerUpdates] = useState(true);
  const [jobRecommendations, setJobRecommendations] = useState(true);
  const [message, setMessage] = useState("");

  // =====================================================
  // LOAD SAVED SETTINGS
  // =====================================================

  useEffect(() => {
    const savedCareerUpdates =
      localStorage.getItem("careerUpdates");

    const savedJobRecommendations =
      localStorage.getItem("jobRecommendations");

    if (savedCareerUpdates !== null) {
      setCareerUpdates(savedCareerUpdates === "true");
    }

    if (savedJobRecommendations !== null) {
      setJobRecommendations(
        savedJobRecommendations === "true"
      );
    }
  }, []);

  // =====================================================
  // SHOW MESSAGE
  // =====================================================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  // =====================================================
  // CAREER UPDATES
  // =====================================================

  const handleCareerUpdates = (value) => {
    setCareerUpdates(value);

    localStorage.setItem(
      "careerUpdates",
      String(value)
    );

    showMessage(
      value
        ? "Career updates enabled"
        : "Career updates disabled"
    );
  };

  // =====================================================
  // JOB RECOMMENDATIONS
  // =====================================================

  const handleJobRecommendations = (value) => {
    setJobRecommendations(value);

    localStorage.setItem(
      "jobRecommendations",
      String(value)
    );

    showMessage(
      value
        ? "Job recommendations enabled"
        : "Job recommendations disabled"
    );
  };

  // =====================================================
  // SIGN OUT
  // =====================================================

  const handleSignOut = () => {
    localStorage.removeItem("token");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7">

          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <SettingsIcon size={16} />

            <span className="text-xs font-bold uppercase tracking-widest">
              ACCOUNT SETTINGS
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
            Manage your account and CareerPilot preferences.
          </p>

        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">

            <CheckCircle size={17} />

            <span>{message}</span>

          </div>
        )}

        <div className="space-y-5">

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <SettingsSection
            icon={<User size={18} />}
            title="Account"
            description="Manage your personal and security information."
          >

            {/* Profile Information */}

            <SettingRow
              icon={<User size={17} />}
              title="Profile information"
              description="Update your name, education, skills and career details."
              action="Manage"
              onClick={() =>
                navigate("/dashboard/profile")
              }
            />

            {/* Change Password */}

            <SettingRow
              icon={<LockKeyhole size={17} />}
              title="Change password"
              description="Update your password to keep your account secure."
              action="Change"
              onClick={() =>
                navigate("/dashboard/change-password")
              }
            />

            {/* Manage Sessions */}

            <SettingRow
              icon={<MonitorSmartphone size={17} />}
              title="Manage sessions"
              description="View and manage devices currently signed in to your account."
              action="Manage"
              onClick={() =>
                navigate("/dashboard/sessions")
              }
            />

          </SettingsSection>

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <SettingsSection
            icon={<Bell size={18} />}
            title="Notifications"
            description="Choose which updates you want to receive."
          >

            {/* Career Updates */}

            <ToggleRow
              title="Career updates"
              description="Receive updates about your career progress."
              checked={careerUpdates}
              onChange={handleCareerUpdates}
            />

            {/* Job Recommendations */}

            <ToggleRow
              title="Job recommendations"
              description="Get notified about relevant job opportunities."
              checked={jobRecommendations}
              onChange={handleJobRecommendations}
            />

          </SettingsSection>

          {/* =================================================
              SIGN OUT
          ================================================= */}

          <section className="rounded-2xl border border-red-200 bg-white p-4 sm:p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <LogOut size={18} />
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-slate-900">
                    Sign out
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Sign out from your CareerPilot account.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.98] sm:w-auto"
              >
                Sign out
              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

// =====================================================
// SETTINGS SECTION
// =====================================================

function SettingsSection({
  icon,
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Section Header */}

      <div className="flex items-start gap-3 border-b border-slate-100 p-4 sm:p-5">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <h2 className="text-sm font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>

        </div>

      </div>

      {/* Section Content */}

      <div className="divide-y divide-slate-100">
        {children}
      </div>

    </section>
  );
}

// =====================================================
// SETTING ROW
// =====================================================

function SettingRow({
  icon,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:p-5">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-slate-900">
            {title}
          </p>

          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
      >
        {action}

        <ChevronRight size={14} />
      </button>

    </div>
  );
}

// =====================================================
// TOGGLE ROW
// =====================================================

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 sm:p-5">

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>

      </div>

      <label className="relative inline-flex shrink-0 cursor-pointer items-center">

        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
          className="peer sr-only"
        />

        <div className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600 after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-5" />

      </label>

    </div>
  );
}