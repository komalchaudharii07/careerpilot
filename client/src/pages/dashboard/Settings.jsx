import { useState } from "react";
import {
  Bell,
  User,
  Shield,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden">
      <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
            ACCOUNT
          </p>

          <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Manage your account preferences and privacy settings.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {/* Account Section */}
          <SettingsSection
            icon={<User size={18} />}
            title="Account"
            description="Manage your account information."
          >
            <SettingRow
              title="Profile information"
              description="Update your name, education and career details."
              action="Edit"
            />
          </SettingsSection>

          {/* Notifications Section */}
          <SettingsSection
            icon={<Bell size={18} />}
            title="Notifications"
            description="Control how CareerPilot communicates with you."
          >
            <ToggleRow
              title="Career updates"
              description="Receive updates about your career progress."
              defaultChecked={true}
            />

            <ToggleRow
              title="Job recommendations"
              description="Get notified when relevant opportunities are found."
              defaultChecked={true}
            />
          </SettingsSection>

          {/* Security Section */}
          <SettingsSection
            icon={<Shield size={18} />}
            title="Privacy & Security"
            description="Manage your account security."
          >
            <SettingRow
              title="Password"
              description="Change your account password."
              action="Change"
            />

            <SettingRow
              title="Login sessions"
              description="Review active sessions on your account."
              action="Manage"
            />
          </SettingsSection>

          {/* Appearance Section */}
          <SettingsSection
            icon={<Moon size={18} />}
            title="Appearance"
            description="Customize how CareerPilot looks."
          >
            <SettingRow
              title="Theme"
              description="Choose your preferred appearance."
              action="Light"
            />
          </SettingsSection>

          {/* Sign Out Box */}
          <section className="rounded-xl sm:rounded-2xl border border-red-100 bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <LogOut size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    Sign out
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500 leading-normal">
                    Sign out from your CareerPilot account.
                  </p>
                </div>
              </div>

              <button className="w-full sm:w-auto shrink-0 rounded-lg sm:rounded-xl border border-red-200 bg-red-50/50 px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-100 transition active:scale-95 text-center">
                Sign out
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Base Responsive Card Section */
function SettingsSection({ icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="flex items-start gap-3 border-b border-slate-100 p-3.5 sm:p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 leading-tight sm:leading-normal">
            {description}
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">{children}</div>
    </section>
  );
}

/* Row with Action Button */
function SettingRow({ title, description, action }) {
  return (
    <div className="flex flex-row items-center justify-between gap-3 p-3.5 sm:p-5">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500 leading-tight sm:leading-normal">
          {description}
        </p>
      </div>

      {action && (
        <button className="shrink-0 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition active:scale-95">
          <span>{action}</span>
          <ChevronRight size={13} className="text-slate-400 sm:hidden" />
        </button>
      )}
    </div>
  );
}

/* Row with Toggle Switch */
function ToggleRow({ title, description, defaultChecked }) {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 sm:p-5">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500 leading-tight sm:leading-normal">
          {description}
        </p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center shrink-0">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="peer sr-only"
        />

        <div className="h-5 w-9 sm:h-6 sm:w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600 after:absolute after:top-[2px] sm:after:top-[3px] after:left-[2px] sm:after:left-[3px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4 sm:peer-checked:after:translate-x-5" />
      </label>
    </div>
  );
}