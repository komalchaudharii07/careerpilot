import { useState, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock3,
  Bookmark,
  ArrowRight,
  Search,
  Sparkles,
  Filter,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "0–2 years",
    match: 94,
    skills: ["React", "JavaScript", "Tailwind CSS"],
    description:
      "Looking for a frontend dev with hands-on React experience to build modern dashboard UIs.",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "CodeSphere",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "0–2 years",
    match: 91,
    skills: ["JavaScript", "Node.js", "MongoDB"],
    description:
      "Join our backend team to build scalable REST APIs and microservice architectures.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    location: "Remote",
    type: "Full-time",
    experience: "0–1 years",
    match: 89,
    skills: ["React", "Node.js", "Express"],
    description:
      "End-to-end web application development using modern MERN stack tools.",
  },
  {
    id: 4,
    title: "Junior UI/UX Engineer",
    company: "DesignForge",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–1 years",
    match: 86,
    skills: ["Figma", "React", "CSS3"],
    description:
      "Bridge design and code by translating Figma wireframes into clean React components.",
  },
  {
    id: 5,
    title: "React Native Developer",
    company: "Appify Studios",
    location: "Gurugram, India",
    type: "Hybrid",
    experience: "1–2 years",
    match: 84,
    skills: ["React Native", "TypeScript", "Redux"],
    description:
      "Build cross-platform iOS and Android mobile applications with React Native.",
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "DataPulse Systems",
    location: "Remote",
    type: "Full-time",
    experience: "1–3 years",
    match: 82,
    skills: ["Python", "Django", "PostgreSQL"],
    description:
      "Build efficient data pipelines and relational database queries for fintech analytics.",
  },
  {
    id: 7,
    title: "Associate Web Developer",
    company: "CloudScale",
    location: "Noida, India",
    type: "Full-time",
    experience: "0–1 years",
    match: 80,
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    description:
      "Maintain enterprise client portals and write structured web interfaces.",
  },
  {
    id: 8,
    title: "TypeScript / Next.js Developer",
    company: "Veloce Media",
    location: "Mumbai, India",
    type: "Remote",
    experience: "1–2 years",
    match: 78,
    skills: ["Next.js", "TypeScript", "GraphQL"],
    description:
      "Build high-performance Server-Side Rendered (SSR) web portals.",
  },
  {
    id: 9,
    title: "DevOps Engineer Trainee",
    company: "InfraStack Tech",
    location: "Chennai, India",
    type: "Internship",
    experience: "0–1 years",
    match: 75,
    skills: ["Docker", "Linux", "AWS", "Git"],
    description:
      "Assist in setting up CI/CD deployment pipelines and cloud infrastructure.",
  },
  {
    id: 10,
    title: "QA Automation Engineer",
    company: "TestQuality AI",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "0–2 years",
    match: 72,
    skills: ["Selenium", "JavaScript", "Jest"],
    description:
      "Write automated end-to-end integration tests for web platforms.",
  },
];

export default function JobRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [activeJobModal, setActiveJobModal] = useState(null);

  // Toggle saved jobs
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered Jobs Memo
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some((s) => s.toLowerCase().includes(query));

      const matchesLocation =
        locationFilter === "All" ||
        (locationFilter === "Remote"
          ? job.location.includes("Remote")
          : !job.location.includes("Remote"));

      const matchesType =
        typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [searchTerm, locationFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <Briefcase size={17} />
                Career Opportunities
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Recommended Jobs
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover opportunities matched with your technical skills,
                experience, and career goals.
              </p>
            </div>

            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto">
              <Sparkles size={16} />
              Improve Job Match
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Dynamic Filters */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs, skills or companies..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-1 items-center gap-2 sm:flex-initial">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-400 sm:w-auto"
                >
                  <option value="All">All Locations</option>
                  <option value="Remote">Remote Only</option>
                  <option value="Onsite">Onsite / Hybrid</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-400 sm:flex-initial"
              >
                <option value="All">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Best matches for you</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Showing {filteredJobs.length} of {initialJobs.length} opportunities
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            {bookmarkedIds.length} Saved Jobs
          </span>
        </div>

        {/* Job Cards List */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={bookmarkedIds.includes(job.id)}
                onToggleBookmark={() => toggleBookmark(job.id)}
                onViewDetails={() => setActiveJobModal(job)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Search size={28} className="mx-auto text-slate-400" />
            <h3 className="mt-3 text-base font-bold">No jobs matching your criteria</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search queries or clearing filters.
            </p>
          </div>
        )}

        {/* Bottom CTA Card */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-300">
                <Sparkles size={16} />
                CareerPilot AI
              </div>

              <h2 className="text-xl font-bold">
                Want better job recommendations?
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                Complete your profile and upload your latest resume to improve your job-match scoring precision.
              </p>
            </div>

            <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50 active:scale-95">
              Complete Profile
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      {/* Modal View for Job Details */}
      {activeJobModal && (
        <JobDetailModal
          job={activeJobModal}
          onClose={() => setActiveJobModal(null)}
          isBookmarked={bookmarkedIds.includes(activeJobModal.id)}
          onToggleBookmark={() => toggleBookmark(activeJobModal.id)}
        />
      )}
    </div>
  );
}

/* ---------------- Job Card ---------------- */

function JobCard({ job, isBookmarked, onToggleBookmark, onViewDetails }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Job Details Header */}
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
            {job.company.charAt(0)}
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              {job.title}
            </h3>

            <p className="mt-0.5 text-sm font-medium text-slate-600">
              {job.company}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {job.location}
              </span>

              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-slate-400" />
                {job.type}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-slate-400" />
                {job.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Score & Bookmark */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:justify-start sm:border-0 sm:pt-0">
          <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-0">
            <span className="text-xs text-slate-400">Match Score</span>
            <span className="text-lg font-bold text-emerald-600 sm:text-xl">
              {job.match}%
            </span>
          </div>

          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? "Saved" : "Save Job"}
            className={`mt-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition sm:mt-2 ${isBookmarked
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-400 hover:border-blue-200 hover:bg-slate-50 hover:text-blue-600"
              }`}
          >
            <Bookmark size={17} className={isBookmarked ? "fill-blue-600" : ""} />
          </button>
        </div>
      </div>

      {/* Skills Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-100"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Card Actions */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-slate-400">
          Recommended based on profile score
        </span>

        <button
          onClick={onViewDetails}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
        >
          View Job Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Modal View ---------------- */

function JobDetailModal({ job, onClose, isBookmarked, onToggleBookmark }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
              {job.company.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm font-medium text-slate-500">{job.company}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1">
            <MapPin size={13} /> {job.location}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1">
            <Briefcase size={13} /> {job.type}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1">
            {job.match}% Match
          </span>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-bold text-slate-800">Role Overview</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {job.description}
          </p>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-bold text-slate-800">Required Skills</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${isBookmarked
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
          >
            <Bookmark size={16} className={isBookmarked ? "fill-blue-600" : ""} />
            {isBookmarked ? "Saved" : "Save"}
          </button>

          <button
            onClick={() => alert(`Redirecting to apply for ${job.title}...`)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Apply Now
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}