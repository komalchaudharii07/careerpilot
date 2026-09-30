
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MonitorSmartphone,
  ShieldCheck,
  LogOut,
  CheckCircle,
  Smartphone,
  Laptop,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

export default function Sessions() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(null);

  // ==========================================
  // FETCH SESSIONS
  // ==========================================

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api("/auth/sessions");

      setSessions(data.sessions || []);
      setCurrentSessionId(
        data.currentSessionId || null
      );
    } catch (err) {
      console.error(
        "Failed to fetch sessions:",
        err
      );

      setError(
        err.message ||
        "Failed to load active sessions."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {
    fetchSessions();
  }, []);

  // ==========================================
  // LOGOUT ONE SESSION
  // ==========================================

  const handleLogoutSession = async (
    sessionId
  ) => {
    try {
      setLoggingOut(sessionId);
      setMessage("");
      setError("");

      const isCurrent =
        sessionId === currentSessionId;

      await api(
        `/auth/sessions/${sessionId}`,
        {
          method: "DELETE",
        }
      );

      // If current session was logged out
      if (isCurrent) {
        localStorage.removeItem("token");

        setMessage(
          "You have been signed out."
        );

        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
        }, 800);

        return;
      }

      setSessions((prev) =>
        prev.filter(
          (session) =>
            session.sessionId !== sessionId
        )
      );

      setMessage(
        "Session logged out successfully."
      );

    } catch (err) {
      console.error(
        "Logout session error:",
        err
      );

      setError(
        err.message ||
        "Failed to logout session."
      );
    } finally {
      setLoggingOut(null);
    }
  };

  // ==========================================
  // LOGOUT OTHER SESSIONS
  // ==========================================

  const handleLogoutOthers = async () => {
    try {
      setLoggingOut("others");
      setMessage("");
      setError("");

      await api("/auth/sessions/others", {
        method: "DELETE",
      });

      // Keep only current session
      setSessions((prev) =>
        prev.filter(
          (session) =>
            session.sessionId ===
            currentSessionId
        )
      );

      setMessage(
        "All other devices have been signed out."
      );

    } catch (err) {
      console.error(
        "Logout other sessions error:",
        err
      );

      setError(
        err.message ||
        "Failed to logout other sessions."
      );
    } finally {
      setLoggingOut(null);
    }
  };

  // ==========================================
  // DEVICE ICON
  // ==========================================

  const getDeviceIcon = (device) => {
    if (
      device?.toLowerCase().includes("mobile")
    ) {
      return <Smartphone size={20} />;
    }

    if (
      device?.toLowerCase().includes("tablet")
    ) {
      return <Smartphone size={20} />;
    }

    return <Laptop size={20} />;
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatLastActive = (date) => {
    if (!date) {
      return "Unknown";
    }

    const lastActive = new Date(date);
    const now = new Date();

    const difference =
      Math.floor(
        (now - lastActive) / 1000
      );

    if (difference < 60) {
      return "Active now";
    }

    if (difference < 3600) {
      const minutes = Math.floor(
        difference / 60
      );

      return `${minutes} minute${minutes !== 1 ? "s" : ""
        } ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(
        difference / 3600
      );

      return `${hours} hour${hours !== 1 ? "s" : ""
        } ago`;
    }

    if (difference < 604800) {
      const days = Math.floor(
        difference / 86400
      );

      return `${days} day${days !== 1 ? "s" : ""
        } ago`;
    }

    return lastActive.toLocaleDateString();
  };

  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {
    navigate("/dashboard/settings");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Settings
          </button>

          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Loading sessions...
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* =========================================
            BACK BUTTON
        ========================================= */}

        <button
          type="button"
          onClick={handleBack}
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
            <MonitorSmartphone size={21} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Login Sessions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the devices currently signed in
            to your CareerPilot account.
          </p>

        </div>

        {/* =========================================
            SUCCESS MESSAGE
        ========================================= */}

        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle size={17} />
            {message}
          </div>
        )}

        {/* =========================================
            ERROR MESSAGE
        ========================================= */}

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        {/* =========================================
            SESSIONS CARD
        ========================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* CARD HEADER */}

          <div className="border-b border-slate-100 p-5 sm:p-6">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-sm font-bold text-slate-900">
                  Active Devices
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {sessions.length} active session
                  {sessions.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>

              {/* LOGOUT OTHER DEVICES */}

              {sessions.length > 1 && (
                <button
                  type="button"
                  onClick={handleLogoutOthers}
                  disabled={
                    loggingOut === "others"
                  }
                  className="hidden items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex"
                >
                  {loggingOut === "others" ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <LogOut size={14} />
                  )}

                  Sign out others
                </button>
              )}

            </div>

          </div>

          {/* =========================================
              NO SESSIONS
          ========================================= */}

          {sessions.length === 0 && (
            <div className="p-8 text-center">

              <MonitorSmartphone
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-700">
                No active sessions found.
              </p>

            </div>
          )}

          {/* =========================================
              SESSION LIST
          ========================================= */}

          <div className="divide-y divide-slate-100">

            {sessions.map((session) => {
              const isCurrent =
                session.sessionId ===
                currentSessionId;

              return (
                <div
                  key={session.sessionId}
                  className="p-5 sm:p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    {/* DEVICE */}

                    <div className="flex min-w-0 items-start gap-3">

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isCurrent
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {getDeviceIcon(
                          session.device
                        )}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-bold text-slate-900">
                            {session.browser ||
                              "Unknown Browser"}
                          </h3>

                          {isCurrent && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                              CURRENT DEVICE
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {session.device ||
                            "Unknown Device"}
                        </p>

                      </div>

                    </div>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleLogoutSession(
                          session.sessionId
                        )
                      }
                      disabled={
                        loggingOut ===
                        session.sessionId
                      }
                      className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loggingOut ===
                        session.sessionId ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <LogOut size={14} />
                      )}

                      <span className="hidden sm:inline">
                        {isCurrent
                          ? "Sign out"
                          : "Log out"}
                      </span>
                    </button>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-[11px] font-medium text-slate-400">
                        Status
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">

                        <span className="h-2 w-2 rounded-full bg-emerald-500" />

                        <p className="text-xs font-semibold text-slate-700">
                          {isCurrent
                            ? "Active now"
                            : "Active"}
                        </p>

                      </div>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-[11px] font-medium text-slate-400">
                        Last active
                      </p>

                      <p className="mt-1.5 text-xs font-semibold text-slate-700">
                        {formatLastActive(
                          session.lastActive
                        )}
                      </p>

                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">

                      <p className="text-[11px] font-medium text-slate-400">
                        IP Address
                      </p>

                      <p className="mt-1.5 truncate text-xs font-semibold text-slate-700">
                        {session.ipAddress ||
                          "Not available"}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* =========================================
              MOBILE LOGOUT OTHER DEVICES
          ========================================= */}

          {sessions.length > 1 && (
            <div className="border-t border-slate-100 p-5 sm:hidden">

              <button
                type="button"
                onClick={handleLogoutOthers}
                disabled={
                  loggingOut === "others"
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut === "others" ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <LogOut size={16} />
                )}

                Sign out all other devices
              </button>

            </div>
          )}

          {/* =========================================
              SECURITY INFO
          ========================================= */}

          <div className="border-t border-slate-100 p-5 sm:p-6">

            <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>

                <p className="text-sm font-semibold text-blue-900">
                  Session security
                </p>

                <p className="mt-1 text-xs leading-relaxed text-blue-700">
                  Review your active devices regularly.
                  If you don't recognize a session,
                  log it out and change your password.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            INFO
        ========================================= */}

        <p className="mt-4 text-center text-xs text-slate-400">
          Sessions automatically expire after 30 days.
        </p>

      </div>
    </div>
  );
}