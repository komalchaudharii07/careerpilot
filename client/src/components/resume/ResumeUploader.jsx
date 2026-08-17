import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function ResumeUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf") || selectedFile.name.endsWith(".docx")) {
        setFile(selectedFile);
        setError("");
        if (onUpload) onUpload(selectedFile);
      } else {
        setError("Please upload a PDF or DOCX file.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
        <Upload size={28} />
      </div>

      <h3 className="text-lg font-bold text-slate-900">Upload Your Resume</h3>
      <p className="mt-1 text-xs text-slate-500">
        Supports PDF or DOCX formats (Max 5MB)
      </p>

      <label className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
        <FileText size={16} />
        Browse File
        <input
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-100">
          <CheckCircle size={16} /> Selected: {file.name}
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-100">
          <AlertCircle size={16} /> {error}
        </div>
      )}
    </div>
  );
}