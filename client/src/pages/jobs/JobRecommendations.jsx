import { useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Building2,
  ChevronDown,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

// ======================================================
// OPTIONS
// ======================================================

const JOB_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Java Developer",
  "Python Developer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "UI/UX Designer",
];

const LOCATIONS = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi",
  "Gurgaon",
  "Noida",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Indore",
  "Lucknow",
  "Kanpur",
  "Kochi",
  "Bhubaneswar",
  "Remote",
  "Pan India",
];

const JOB_TYPES = [
  {
    value: "All",
    label: "All Types",
  },
  {
    value: "Full-time",
    label: "Full-time",
  },
  {
    value: "Internship",
    label: "Internship",
  },
  {
    value: "Part-time",
    label: "Part-time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
];

// ======================================================
// JOB CARD
// ======================================================

function JobCard({
  job,
  onViewDetails,
  onBookmark,
  isBookmarked,
}) {
  const initials = job.company
    ? job.company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "CO";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-6">
      {/* TOP */}
      <div className="flex gap-4">
        {/* COMPANY LOGO */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company || "Company"}
              className="h-full w-full object-contain p-2"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-blue-50 text-base font-bold text-blue-600">
              {initials}
            </div>
          )}
        </div>

        {/* JOB INFO */}
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 text-base font-bold leading-6 text-slate-900 sm:text-lg">
            {job.title || "Job Opportunity"}
          </h2>

          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Building2 size={15} className="shrink-0" />
            <span className="truncate">
              {job.company || "Company not specified"}
            </span>
          </p>

          {/* META */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0" />
              {job.location || "Location not specified"}
            </span>

            <span className="flex items-center gap-1.5">
              <BriefcaseBusiness size={14} className="shrink-0" />
              {job.type || "Not specified"}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock3 size={14} className="shrink-0" />
              {job.experience || "Not specified"}
            </span>
          </div>
        </div>

        {/* DESKTOP SCORE + BOOKMARK */}
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-[11px] font-medium text-slate-400">
            AI Match
          </p>

          <p className="text-2xl font-bold text-emerald-600">
            {job.match || 0}%
          </p>

          <button
            type="button"
            onClick={() => onBookmark(job)}
            aria-label={
              isBookmarked
                ? "Remove bookmark"
                : "Save job"
            }
            className={`mt-2 flex h-10 w-10 items-center justify-center rounded-xl border transition ${isBookmarked
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
          >
            {isBookmarked ? (
              <BookmarkCheck size={18} />
            ) : (
              <Bookmark size={18} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SCORE */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 sm:hidden">
        <div>
          <p className="text-[11px] font-medium text-slate-400">
            AI Match
          </p>

          <p className="text-xl font-bold text-emerald-600">
            {job.match || 0}%
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBookmark(job)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isBookmarked
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-500"
            }`}
        >
          {isBookmarked ? (
            <BookmarkCheck size={18} />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      {/* AI REASON */}
      {job.matchReason && (
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
            <Sparkles size={16} />
            Why this matches you
          </div>

          <p className="mt-1.5 text-sm leading-6 text-emerald-700">
            {job.matchReason}
          </p>
        </div>
      )}

      {/* BOTTOM */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-medium text-slate-400">
          Real opportunity from JSearch
        </span>

        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          View Job Details
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

// ======================================================
// JOB DETAILS MODAL
// ======================================================

function JobDetailsModal({
  job,
  onClose,
}) {
  if (!job) return null;

  const initials = job.company
    ? job.company
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "CO";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-base font-bold text-blue-600">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company || "Company"}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0">
              <h2 className="line-clamp-2 text-lg font-bold text-slate-900 sm:text-xl">
                {job.title}
              </h2>

              <p className="mt-1 truncate text-sm text-slate-500">
                {job.company}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-3 shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={21} />
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[calc(92vh-90px)] space-y-6 overflow-y-auto p-5 sm:p-6">
          {/* AI SCORE */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Sparkles size={17} />
              AI Match Score
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-2">
              <span className="text-4xl font-bold text-emerald-600">
                {job.match || 0}%
              </span>

              <span className="pb-1 text-sm text-emerald-700">
                match with your profile
              </span>
            </div>

            {job.matchReason && (
              <p className="mt-3 text-sm leading-6 text-emerald-700">
                {job.matchReason}
              </p>
            )}
          </div>

          {/* JOB INFORMATION */}
          <section>
            <h3 className="mb-3 text-base font-bold text-slate-900">
              Job Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoBox
                label="Location"
                value={
                  job.location || "Not specified"
                }
              />

              <InfoBox
                label="Employment Type"
                value={
                  job.type || "Not specified"
                }
              />

              <InfoBox
                label="Experience"
                value={
                  job.experience || "Not specified"
                }
              />

              <InfoBox
                label="Publisher"
                value={
                  job.publisher || "JSearch"
                }
              />
            </div>
          </section>

          {/* MATCHING SKILLS */}
          {Array.isArray(job.matchingSkills) &&
            job.matchingSkills.length > 0 && (
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-600"
                  />
                  Your Matching Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {job.matchingSkills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

          {/* MISSING SKILLS */}
          {Array.isArray(job.missingSkills) &&
            job.missingSkills.length > 0 && (
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                  <AlertCircle
                    size={18}
                    className="text-orange-500"
                  />
                  Skills You May Need
                </h3>

                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

          {/* DESCRIPTION */}
          <section>
            <h3 className="mb-3 text-base font-bold text-slate-900">
              Job Description
            </h3>

            <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                {job.description ||
                  "No job description available."}
              </p>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>

            {job.url && job.url !== "#" ? (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply Now
                <ExternalLink size={17} />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-white"
              >
                Apply Link Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// INFO BOX
// ======================================================

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// SELECT FIELD
// ======================================================

function SelectField({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => {
            const item =
              typeof option === "string"
                ? {
                  value: option,
                  label: option,
                }
                : option;

            return (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function JobRecommendations() {
  // ====================================================
  // SEARCH FORM
  // ====================================================

  const [searchForm, setSearchForm] = useState({
    role: "",
    location: "",
    type: "All",
  });

  // ====================================================
  // JOBS
  // ====================================================

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [searched, setSearched] = useState(false);

  // ====================================================
  // MODAL
  // ====================================================

  const [selectedJob, setSelectedJob] = useState(null);

  // ====================================================
  // BOOKMARKS
  // ====================================================

  const [bookmarks, setBookmarks] = useState([]);

  // ====================================================
  // SEARCH CHANGE
  // ====================================================

  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove previous error when user changes filters
    if (error) {
      setError("");
    }
  };

  // ====================================================
  // SEARCH JOBS
  // ====================================================

  const handleSearchJobs = async (e) => {
    e.preventDefault();

    setError("");

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (!searchForm.role) {
      setError("Please select a job role.");
      return;
    }

    if (!searchForm.location) {
      setError("Please select a location.");
      return;
    }

    // -----------------------------------------------
    // TOKEN
    // -----------------------------------------------

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    // -----------------------------------------------
    // START SEARCH
    // -----------------------------------------------

    setLoading(true);
    setSearched(true);
    setJobs([]);

    try {
      const params = new URLSearchParams();

      params.set(
        "query",
        searchForm.role
      );

      params.set(
        "location",
        searchForm.location
      );

      params.set(
        "type",
        searchForm.type
      );

      params.set("page", "1");

      console.log(
        "Searching jobs:",
        params.toString()
      );

      const response = await fetch(
        `${API_URL}/job-recommendations?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(
        "Job API response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Failed to fetch jobs."
        );
      }

      setJobs(
        Array.isArray(data.jobs)
          ? data.jobs
          : []
      );
    } catch (err) {
      console.error(
        "Job search error:",
        err
      );

      setError(
        err.message ||
        "Something went wrong while searching jobs."
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // BOOKMARK
  // ====================================================

  const handleBookmark = (job) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (item) => item.id === job.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== job.id
        );
      }

      return [...prev, job];
    });
  };

  // ====================================================
  // CLEAR SEARCH
  // ====================================================

  const handleClearSearch = () => {
    setSearchForm({
      role: "",
      location: "",
      type: "All",
    });

    setJobs([]);
    setSearched(false);
    setError("");
  };

  // ====================================================
  // MAIN UI
  // ====================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 sm:text-sm">
                <BriefcaseBusiness size={16} />

                Career Opportunities
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Job Recommendations
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover real-world opportunities based on the role,
                location, and job type you choose.
              </p>
            </div>

            {/* SAVED JOBS */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow-sm">
              <Bookmark size={16} />

              {bookmarks.length} Saved Jobs
            </div>
          </div>
        </section>

        {/* =================================================
            SEARCH PANEL
        ================================================= */}

        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* PANEL HEADER */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Search size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Find your next opportunity
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Choose your preferences and search real job listings.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSearchJobs}
            className="p-5 sm:p-7"
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* JOB ROLE */}
              <div className="lg:col-span-5">
                <SelectField
                  label="Job Role"
                  value={searchForm.role}
                  onChange={(e) =>
                    handleSearchChange({
                      target: {
                        name: "role",
                        value: e.target.value,
                      },
                    })
                  }
                  options={JOB_ROLES}
                  icon={BriefcaseBusiness}
                  placeholder="Select a job role"
                />
              </div>

              {/* LOCATION */}
              <div className="lg:col-span-3">
                <SelectField
                  label="Location"
                  value={searchForm.location}
                  onChange={(e) =>
                    handleSearchChange({
                      target: {
                        name: "location",
                        value: e.target.value,
                      },
                    })
                  }
                  options={LOCATIONS}
                  icon={MapPin}
                  placeholder="Select location"
                />
              </div>

              {/* JOB TYPE */}
              <div className="lg:col-span-2">
                <SelectField
                  label="Job Type"
                  value={searchForm.type}
                  onChange={(e) =>
                    handleSearchChange({
                      target: {
                        name: "type",
                        value: e.target.value,
                      },
                    })
                  }
                  options={JOB_TYPES}
                  icon={Clock3}
                  placeholder="Select type"
                />
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex items-end lg:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={18} />

                      Search Jobs
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* VALIDATION ERROR */}
            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>
              </div>
            )}

            {/* SEARCH INFO */}
            {!error && (
              <div className="mt-5 flex flex-col gap-3 rounded-xl bg-slate-50 px-4 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Search is started only when you click{" "}
                  <strong className="font-semibold text-slate-700">
                    Search Jobs
                  </strong>
                  .
                </span>

                {searched && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="inline-flex w-fit items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <X size={14} />
                    Clear search
                  </button>
                )}
              </div>
            )}
          </form>
        </section>

        {/* =================================================
            INITIAL STATE
        ================================================= */}

        {!searched && !loading && (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center sm:px-8 sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <Search
                size={29}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
              Ready to find your next opportunity?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Select a job role, location, and employment type above.
              We'll fetch real job opportunities for you.
            </p>
          </section>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <section className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-200" />

                  <div className="flex-1">
                    <div className="h-5 w-3/5 rounded bg-slate-200" />

                    <div className="mt-3 h-4 w-2/5 rounded bg-slate-200" />

                    <div className="mt-3 h-4 w-4/5 rounded bg-slate-200" />
                  </div>
                </div>

                <div className="mt-6 h-20 rounded-xl bg-slate-100" />
              </div>
            ))}
          </section>
        )}

        {/* =================================================
            RESULTS
        ================================================= */}

        {!loading &&
          searched &&
          jobs.length > 0 && (
            <section>
              {/* RESULTS HEADER */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      Job opportunities
                    </h2>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                      {jobs.length} found
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-slate-500">
                    Showing real opportunities for{" "}
                    <strong className="font-semibold text-slate-700">
                      {searchForm.role}
                    </strong>{" "}
                    in{" "}
                    <strong className="font-semibold text-slate-700">
                      {searchForm.location}
                    </strong>
                    .
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Sparkles
                    size={15}
                    className="text-emerald-600"
                  />

                  AI matching available
                </div>
              </div>

              {/* JOB LIST */}
              <div className="space-y-5">
                {jobs.map((job, index) => (
                  <JobCard
                    key={
                      job.id ||
                      job.job_id ||
                      `${job.title}-${index}`
                    }
                    job={job}
                    onViewDetails={
                      setSelectedJob
                    }
                    onBookmark={
                      handleBookmark
                    }
                    isBookmarked={bookmarks.some(
                      (item) =>
                        item.id === job.id
                    )}
                  />
                ))}
              </div>
            </section>
          )}

        {/* =================================================
            NO RESULTS
        ================================================= */}

        {!loading &&
          searched &&
          jobs.length === 0 &&
          !error && (
            <section className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center sm:px-8 sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <BriefcaseBusiness
                  size={28}
                  className="text-slate-500"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                No jobs found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find matching opportunities for this
                search. Try another role or location.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Search size={17} />
                Try another search
              </button>
            </section>
          )}
      </main>

      {/* =================================================
          JOB DETAILS MODAL
      ================================================= */}

      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}