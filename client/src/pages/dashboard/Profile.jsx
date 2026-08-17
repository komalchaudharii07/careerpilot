import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Edit3,
  Camera,
  Globe,
  Save,
  CheckCircle2,
  FileText,
  Sparkles,
  Plus,
  Trash2,
  BookOpen,
  Calendar,
} from "lucide-react";

// Dropdown Pre-defined Options
const COLLEGES = [
  "Indian Institute of Technology (IIT)",
  "National Institute of Technology (NIT)",
  "BITS Pilani",
  "VIT Vellore",
  "SRM Institute of Science and Technology",
  "Delhi Technological University (DTU)",
  "Other / University Not Listed",
];

const BRANCHES = [
  "Computer Science & Engineering (CSE)",
  "Information Technology (IT)",
  "Electronics & Communication (ECE)",
  "Electrical & Electronics (EEE)",
  "Mechanical Engineering",
  "Data Science & AI",
  "civil engineering",
  "chemical engineering",
  "biological engineering",
  "Other",
];

const GRADUATION_YEARS = [
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Komal chaudhari",
    role: "Full Stack Developer",
    email: "komal@google.com",
    phone: "+91 8887950968",
    location: "Uttar pradesh, India",
    college: "National Institute of Technology Meghalaya",
    branch: "Computer Science & Engineering (CSE)",
    gradYear: "2027",
    bio: "Passionate Full Stack Engineer focused on building scalable web applications using React, Node.js, and modern cloud architecture.",
    experienceLevel: "0–1 Years (Fresher)",
    targetRole: "Frontend / Full Stack Engineer",
    github: "github.com/komalchaudharii07",
    linkedin: "linkedin.com/in/komalchaudhari",
    portfolio: "komalchaudhari.dev",
  });

  const [skills, setSkills] = useState([
    "React.js",
    "JavaScript (ES6+)",
    "Node.js",
    "Tailwind CSS",
    "TypeScript",
    "MongoDB",
    "Git & GitHub",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Header Section */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
              <User size={16} />
              Account Settings
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              User Profile
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage your academic background, skills, and personal information.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition active:scale-95 ${isEditing
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
              }`}
          >
            {isEditing ? (
              <>
                <Save size={16} />
                Save Profile
              </>
            ) : (
              <>
                <Edit3 size={16} />
                Edit Details
              </>
            )}
          </button>
        </section>

        {/* Profile Grid Container */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Hero Avatar & Quick Details */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm text-center">
              <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-md">
                  {profile.name
                    ? profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                    : "U"}
                </div>
                <button
                  title="Update Avatar"
                  className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-slate-900 p-2 text-white shadow hover:bg-slate-800 transition"
                >
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="mt-4 text-lg font-bold sm:text-xl text-slate-900">
                {profile.name || "User Name"}
              </h2>
              <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                {profile.role}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-slate-100 pt-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={13} /> Placement Ready
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  <Sparkles size={13} /> Score 88%
                </span>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Social Profiles
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <FaGithub size={18} className="text-slate-600 shrink-0" />
                  <span className="truncate">{profile.github}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <FaLinkedin size={18} className="text-blue-600 shrink-0" />
                  <span className="truncate">{profile.linkedin}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <Globe size={18} className="text-slate-400 shrink-0" />
                  <span className="truncate">{profile.portfolio}</span>
                </div>
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6 text-center border-dashed">
              <FileText size={32} className="mx-auto text-blue-600 mb-2" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Resume / CV
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Uploaded: Alex_Resume_2026.pdf
              </p>
              <button className="mt-3 w-full rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition">
                Update Resume
              </button>
            </div>
          </div>

          {/* Right Column - Academic & Personal Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Academic Details Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600" />
                Academic Background
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* College / University Select Filter */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500">
                    College / University
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500 text-slate-800"
                    >
                      <option value="">Select College / University</option>
                      {COLLEGES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <GraduationCap size={15} className="text-slate-400 shrink-0" />
                      {profile.college || "Not Specified"}
                    </p>
                  )}
                </div>

                {/* Branch / Stream Select Filter */}
                <div>
                  <label className="text-xs font-semibold text-slate-500">
                    Branch / Specialization
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.branch}
                      onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500 text-slate-800"
                    >
                      <option value="">Select Branch</option>
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <BookOpen size={15} className="text-slate-400 shrink-0" />
                      {profile.branch || "Not Specified"}
                    </p>
                  )}
                </div>

                {/* Graduation Year Select Filter */}
                <div>
                  <label className="text-xs font-semibold text-slate-500">
                    Graduation Year
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.gradYear}
                      onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500 text-slate-800"
                    >
                      <option value="">Select Graduation Year</option>
                      {GRADUATION_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar size={15} className="text-slate-400 shrink-0" />
                      {profile.gradYear || "Not Specified"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Primary Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Mail size={14} className="text-slate-400" /> {profile.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400" /> {profile.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-400" /> {profile.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Technical Skills & Tools
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {skills.length} Skills
                </span>
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new skill (e.g. Next.js)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                >
                  <Plus size={16} /> Add
                </button>
              </form>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}