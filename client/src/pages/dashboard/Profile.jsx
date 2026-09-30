import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Save,
  FileText,
  Upload,
  Eye,
  CheckCircle,
  X,
  Globe,
} from "lucide-react";

import api from "../../services/api";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [resume, setResume] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "",
    targetRole: "",
    bio: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const locations = [
    "Shillong",
    "Tura",
    "Cherrapunji",
    "Guwahati",
    "Kolkata",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Noida",
    "Gurugram",
    "Lucknow",
    "Kanpur",
    "Jaipur",
    "Ahmedabad",
    "Other",
  ];

  const availableSkills = [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "SQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Next.js",
    "Git",
    "GitHub",
    "REST API",
    "DSA",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ];

  // =========================
  // LOAD PROFILE + RESUME
  // =========================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const profileResponse = await getProfile();

      const data =
        profileResponse?.profile ||
        profileResponse?.user ||
        null;

      if (data) {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          college: data.college || "",
          degree: data.degree || "",
          branch: data.branch || "",
          graduationYear: data.graduationYear || "",
          targetRole: data.targetRole || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills)
            ? data.skills
            : [],
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
        });
      }

      // Load resume
      try {
        const resumeResponse = await api("/resume");

        const resumeData =
          resumeResponse?.resume ||
          resumeResponse?.data ||
          null;

        if (resumeData) {
          setResume(resumeData);
        }
      } catch (resumeError) {
        console.log("No resume found");
      }
    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        err?.message || "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SKILLS
  // =========================

  const toggleSkill = (skill) => {
    setProfile((prev) => {
      const currentSkills = Array.isArray(prev.skills)
        ? prev.skills
        : [];

      if (currentSkills.includes(skill)) {
        return {
          ...prev,
          skills: currentSkills.filter(
            (item) => item !== skill
          ),
        };
      }

      return {
        ...prev,
        skills: [...currentSkills, skill],
      };
    });
  };

  const removeSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (item) => item !== skill
      ),
    }));
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      await updateProfile(profile);

      setMessage("Profile updated successfully");

      // Dashboard par redirect
      setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 800);
    } catch (err) {
      console.error("Save profile error:", err);

      setError(
        err?.message || "Failed to update profile"
      );

      setSaving(false);
    }
  };

  // =========================
  // RESUME UPLOAD
  // =========================

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be less than 5MB");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await api(
        "/resume/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(
        "Resume analyze response:",
        response
      );

      const newResume =
        response?.resume ||
        response?.data?.resume;

      if (newResume) {
        setResume(newResume);
      } else {
        try {
          const latest = await api("/resume");

          const latestResume =
            latest?.resume ||
            latest?.data ||
            null;

          if (latestResume) {
            setResume(latestResume);
          }
        } catch (err) {
          console.log(
            "Could not reload resume"
          );
        }
      }

      setMessage(
        response?.message ||
        "Resume analyzed successfully"
      );
    } catch (err) {
      console.error(
        "Resume upload error:",
        err
      );

      setError(
        err?.message ||
        "Failed to analyze resume"
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // =========================
  // VIEW RESUME
  // =========================

  const handleViewResume = () => {
    const url =
      resume?.url ||
      resume?.fileUrl ||
      resume?.resumeUrl;

    if (!url) {
      setError(
        "Resume preview is not available"
      );
      return;
    }

    window.open(url, "_blank");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />

          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                My Profile
              </h1>

              <p className="text-xs text-slate-500 mt-0.5">
                Manage your CareerPilot profile
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60"
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-6">

        {/* SUCCESS */}
        {message && (
          <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
            <CheckCircle size={17} />
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-center justify-between px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* =========================
              LEFT COLUMN
          ========================= */}

          <div>

            {/* PROFILE CARD */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">

              <div className="flex flex-col items-center text-center">

                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
                  <User size={34} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {profile.name ||
                    "Your Name"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {profile.targetRole ||
                    "Target Role"}
                </p>

                <div className="w-full mt-6 space-y-3 text-left">

                  <InfoRow
                    icon={<Mail size={16} />}
                    value={
                      profile.email ||
                      "Email not added"
                    }
                  />

                  <InfoRow
                    icon={<Phone size={16} />}
                    value={
                      profile.phone ||
                      "Phone not added"
                    }
                  />

                  <InfoRow
                    icon={<MapPin size={16} />}
                    value={
                      profile.location ||
                      "Location not added"
                    }
                  />

                </div>

              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 mt-5">

              <h3 className="font-semibold text-slate-900 mb-4">
                Quick Links
              </h3>

              <div className="space-y-1">

                <QuickLink
                  icon={
                    <Briefcase size={17} />
                  }
                  text="Dashboard"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                />

                <QuickLink
                  icon={
                    <FileText size={17} />
                  }
                  text="Resume"
                  onClick={() =>
                    navigate("/resume")
                  }
                />

                <QuickLink
                  icon={
                    <GraduationCap
                      size={17}
                    />
                  }
                  text="Interview Practice"
                  onClick={() =>
                    navigate("/interview")
                  }
                />

              </div>

            </div>

          </div>

          {/* =========================
              RIGHT COLUMN
          ========================= */}

          <div className="lg:col-span-2 space-y-5">

            {/* RESUME */}
            <section className="bg-white rounded-xl border border-slate-200 p-5">

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Resume
                    </h2>

                    <p className="text-xs text-slate-500">
                      Upload and analyze your resume
                    </p>
                  </div>

                </div>

                <label
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white ${uploading
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >

                  <Upload size={16} />

                  {uploading
                    ? "Analyzing..."
                    : resume
                      ? "Replace"
                      : "Upload Resume"}

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={
                      handleResumeUpload
                    }
                    disabled={uploading}
                  />

                </label>

              </div>

              {resume ? (

                <div className="border border-slate-200 rounded-lg p-4">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FileText size={22} />
                      </div>

                      <div>

                        <p className="font-medium text-slate-900 text-sm">
                          {resume.fileName ||
                            resume.filename ||
                            resume.name ||
                            "My Resume.pdf"}
                        </p>

                        {resume.score !=
                          null && (
                            <p className="text-xs text-blue-600 font-medium mt-1">
                              ATS Score:{" "}
                              {resume.score}/100
                            </p>
                          )}

                        {resume.atsScore !=
                          null &&
                          resume.score ==
                          null && (
                            <p className="text-xs text-blue-600 font-medium mt-1">
                              ATS Score:{" "}
                              {
                                resume.atsScore
                              }
                              /100
                            </p>
                          )}

                      </div>

                    </div>

                    {(resume.url ||
                      resume.fileUrl ||
                      resume.resumeUrl) && (
                        <button
                          type="button"
                          onClick={
                            handleViewResume
                          }
                          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                        >
                          <Eye size={17} />
                        </button>
                      )}

                  </div>

                </div>

              ) : (

                <div className="border border-dashed border-slate-300 rounded-lg p-7 text-center">

                  <div className="w-12 h-12 mx-auto rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
                    <FileText size={24} />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800">
                    No resume uploaded
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Upload your resume in PDF format
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    PDF • Maximum 5MB
                  </p>

                </div>

              )}

            </section>

            {/* PERSONAL INFORMATION */}
            <Section
              title="Personal Information"
              icon={<User size={18} />}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  icon={<User size={16} />}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  icon={<Mail size={16} />}
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  icon={<Phone size={16} />}
                />

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />

                    <select
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="w-full appearance-none pl-10 pr-9 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white outline-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select Location
                      </option>

                      {locations.map(
                        (location) => (
                          <option
                            key={location}
                            value={location}
                          >
                            {location}
                          </option>
                        )
                      )}

                    </select>

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                      ▼
                    </span>

                  </div>

                </div>

              </div>

            </Section>

            {/* EDUCATION */}
            <Section
              title="Education"
              icon={
                <GraduationCap size={18} />
              }
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input
                  label="College / University"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  icon={
                    <GraduationCap
                      size={16}
                    />
                  }
                />

                <Input
                  label="Degree"
                  name="degree"
                  value={profile.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                />

                <Input
                  label="Branch"
                  name="branch"
                  value={profile.branch}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                />

                <Input
                  label="Graduation Year"
                  name="graduationYear"
                  value={
                    profile.graduationYear
                  }
                  onChange={handleChange}
                  placeholder="2026"
                />

              </div>

            </Section>

            {/* CAREER */}
            <Section
              title="Career Information"
              icon={
                <Briefcase size={18} />
              }
            >

              <div className="space-y-4">

                <Input
                  label="Target Role"
                  name="targetRole"
                  value={profile.targetRole}
                  onChange={handleChange}
                  icon={
                    <Briefcase size={16} />
                  }
                  placeholder="e.g. Full Stack Developer"
                />

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell recruiters a little about yourself..."
                    className="w-full px-3.5 py-3 border border-slate-300 rounded-lg text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                  />

                </div>

              </div>

            </Section>

            {/* SKILLS */}
            <Section
              title="Skills"
              icon={<Code2 size={18} />}
            >

              <p className="text-xs text-slate-500 mb-4">
                Click skills to select or unselect
              </p>

              <div className="flex flex-wrap gap-2">

                {availableSkills.map(
                  (skill) => {

                    const selected =
                      profile.skills.includes(
                        skill
                      );

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          toggleSkill(
                            skill
                          )
                        }
                        className={
                          selected
                            ? "px-3.5 py-2 rounded-lg text-sm font-medium border bg-blue-600 text-white border-blue-600"
                            : "px-3.5 py-2 rounded-lg text-sm font-medium border bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                        }
                      >
                        {selected && "✓ "}
                        {skill}
                      </button>
                    );
                  }
                )}

              </div>

              {profile.skills.length >
                0 && (

                  <div className="mt-5 pt-4 border-t border-slate-200">

                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Selected Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {profile.skills.map(
                        (skill) => (

                          <div
                            key={skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm"
                          >

                            <span>
                              {skill}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removeSkill(
                                  skill
                                )
                              }
                              className="hover:text-blue-900"
                            >
                              <X size={14} />
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

            </Section>

            {/* SOCIAL */}
            <Section
              title="Social & Portfolio"
              icon={<Globe size={18} />}
            >

              <div className="space-y-4">

                <Input
                  label="GitHub"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  icon={
                    <Code2 size={16} />
                  }
                  placeholder="https://github.com/username"
                />

                <Input
                  label="LinkedIn"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  icon={
                    <Globe size={16} />
                  }
                  placeholder="https://linkedin.com/in/username"
                />

                <Input
                  label="Portfolio"
                  name="portfolio"
                  value={profile.portfolio}
                  onChange={handleChange}
                  icon={
                    <Globe size={16} />
                  }
                  placeholder="https://yourportfolio.com"
                />

              </div>

            </Section>

            {/* BOTTOM SAVE */}
            <div className="flex justify-end pb-8">

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm disabled:opacity-60"
              >

                <Save size={17} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// =========================
// SECTION
// =========================

const Section = ({
  title,
  icon,
  children,
}) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5">

      <div className="flex items-center gap-2 mb-5">

        <div className="text-blue-600">
          {icon}
        </div>

        <h2 className="text-base font-semibold text-slate-900">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
};

// =========================
// INPUT
// =========================

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon,
  placeholder,
}) => {
  return (
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3.5"
            } pr-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        />

      </div>

    </div>
  );
};

// =========================
// INFO ROW
// =========================

const InfoRow = ({
  icon,
  value,
}) => {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">

      <span className="text-slate-400 shrink-0">
        {icon}
      </span>

      <span className="truncate">
        {value}
      </span>

    </div>
  );
};

// =========================
// QUICK LINK
// =========================

const QuickLink = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition text-left"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Profile;