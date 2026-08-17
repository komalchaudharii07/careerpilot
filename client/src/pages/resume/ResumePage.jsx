import {
  Upload,
  FileText,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumePage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // FIXED: Analyze button handler added here
  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // Backend API Call (Jab backend ready ho, tab ise uncomment karein)
      /*
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      */

      // Simulated Delay for Testing UI (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Resume Result page par redirect karein
      navigate("/resume/result", { state: { fileName: file.name } });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Header */}
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
            <FileText size={17} />
            Resume Analysis
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Analyze your resume
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Upload your resume and get insights about ATS compatibility,
            skills, strengths and areas for improvement.
          </p>
        </section>

        {/* Main */}
        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Upload */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold">Upload your resume</h2>

            <p className="mt-1 text-sm text-slate-500">
              PDF or DOCX • Maximum 5MB
            </p>

            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`mt-7 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(event) =>
                    handleFile(event.target.files?.[0])
                  }
                />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Upload size={27} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-800">
                  Drop your resume here
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  or click to browse your computer
                </p>

                <div className="mt-5 flex justify-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                    PDF
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                    DOCX
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <FileText size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={loading}
                    className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-500 disabled:opacity-50"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white p-3 text-sm text-emerald-600">
                  <CheckCircle2 size={17} />
                  Resume uploaded successfully
                </div>
              </div>
            )}

            {/* Analyze Button - FIXED: onClick and loading state added */}
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${file && !loading
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-98 cursor-pointer"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Analyze Resume
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold">What you'll get</h2>

              <div className="mt-5 space-y-4">
                <Feature text="ATS compatibility score" />
                <Feature text="Skills and keyword analysis" />
                <Feature text="Resume strengths and weaknesses" />
                <Feature text="Job-role compatibility" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-5">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="shrink-0 text-slate-600"
                />

                <div>
                  <h3 className="text-sm font-semibold">
                    Your resume stays private
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your document is used only for providing your
                    resume analysis.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <CheckCircle2 size={15} />
      </div>

      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}