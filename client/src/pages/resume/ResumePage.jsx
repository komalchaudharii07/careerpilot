import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  X,
  ArrowRight,
  Loader2
} from "lucide-react";
import axios from "axios";


export default function ResumePage() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [dragActive, setDragActive] =
    useState(false);

  const navigate =
    useNavigate();


  // ==================================================
  // FILE VALIDATION
  // ==================================================

  const validateFile = (selectedFile) => {

    if (!selectedFile) {
      return false;
    }


    // PDF only

    if (
      selectedFile.type !==
      "application/pdf"
    ) {

      alert(
        "Please upload a PDF resume only."
      );

      return false;

    }


    // 5MB limit

    const maxSize =
      5 * 1024 * 1024;


    if (
      selectedFile.size >
      maxSize
    ) {

      alert(
        "File size must be less than 5MB."
      );

      return false;

    }


    return true;

  };


  // ==================================================
  // FILE CHANGE
  // ==================================================

  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files?.[0];


    if (
      selectedFile &&
      validateFile(selectedFile)
    ) {

      setFile(selectedFile);

    }

  };


  // ==================================================
  // DRAG
  // ==================================================

  const handleDrag = (e) => {

    e.preventDefault();

    e.stopPropagation();


    if (
      e.type === "dragenter" ||
      e.type === "dragover"
    ) {

      setDragActive(true);

    }

    else if (
      e.type === "dragleave"
    ) {

      setDragActive(false);

    }

  };


  // ==================================================
  // DROP
  // ==================================================

  const handleDrop = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setDragActive(false);


    const droppedFile =
      e.dataTransfer.files?.[0];


    if (
      droppedFile &&
      validateFile(droppedFile)
    ) {

      setFile(droppedFile);

    }

  };


  // ==================================================
  // ANALYZE
  // ==================================================

  const handleAnalyze = async () => {

    if (!file) {

      alert(
        "Please upload your resume first."
      );

      return;

    }


    const formData =
      new FormData();


    formData.append(
      "file",
      file
    );


    try {

      setLoading(true);


      const token =
        localStorage.getItem(
          "token"
        );


      const response =
        await axios.post(

          "http://localhost:5000/api/resume/analyze",

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",

              Authorization:
                `Bearer ${token}`

            }

          }

        );


      // =================================================
      // SUCCESS
      // =================================================

      navigate(
        "/resume/result",
        {

          state: {

            resultData:
              response.data.resume,

            fileName:
              file.name

          }

        }

      );


    }

    catch (error) {

      console.error(
        "Error analyzing resume:",
        error
      );


      // Get backend message

      const message =
        error.response?.data?.message ||
        "Failed to analyze resume. Please try again.";


      alert(message);

    }

    finally {

      setLoading(false);

    }

  };


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-900">

      <div className="mx-auto max-w-5xl">


        {/* TITLE */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-blue-600">

            RESUME ANALYSIS

          </p>


          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

            Analyze your resume

          </h1>


          <p className="mt-2 text-slate-500">

            Upload your resume and get insights about ATS compatibility, skills, strengths and areas for improvement.

          </p>

        </div>


        <div className="grid gap-8 lg:grid-cols-3">


          {/* =========================================
              UPLOAD BOX
          ========================================= */}

          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">


              <h2 className="text-lg font-bold">

                Upload your resume

              </h2>


              <p className="text-xs text-slate-400 mb-6">

                PDF only • Maximum 5MB

              </p>


              {!file ? (

                /* DROPZONE */

                <div

                  onDragEnter={handleDrag}

                  onDragLeave={handleDrag}

                  onDragOver={handleDrag}

                  onDrop={handleDrop}

                  className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition ${dragActive

                      ? "border-blue-600 bg-blue-50/50"

                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"

                    }`}

                >

                  <input

                    type="file"

                    accept="application/pdf,.pdf"

                    onChange={
                      handleFileChange
                    }

                    className="absolute inset-0 cursor-pointer opacity-0"

                  />


                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">

                    <Upload size={22} />

                  </div>


                  <p className="font-semibold text-slate-700">

                    Drop your resume here

                  </p>


                  <p className="text-xs text-slate-400 mt-1">

                    or click to browse your computer

                  </p>


                  <div className="mt-4">

                    <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">

                      PDF

                    </span>

                  </div>

                </div>

              ) : (

                /* SELECTED FILE */

                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">

                  <div className="flex items-center justify-between">


                    <div className="flex items-center gap-3">


                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">

                        <FileText size={20} />

                      </div>


                      <div>

                        <p className="text-sm font-semibold text-slate-800">

                          {file.name}

                        </p>


                        <p className="text-xs text-slate-400">

                          {(
                            file.size /
                            (1024 * 1024)
                          ).toFixed(2)}{" "}

                          MB

                        </p>

                      </div>

                    </div>


                    <button

                      onClick={() =>
                        setFile(null)
                      }

                      className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"

                    >

                      <X size={18} />

                    </button>

                  </div>


                  <div className="mt-3 text-xs font-medium text-emerald-600">

                    ✓ PDF selected successfully

                  </div>

                </div>

              )}


              {/* =====================================
                  ANALYZE BUTTON
              ===================================== */}

              <button

                onClick={
                  handleAnalyze
                }

                disabled={
                  !file ||
                  loading
                }

                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition ${!file || loading

                    ? "cursor-not-allowed bg-slate-100 text-slate-400"

                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] cursor-pointer"

                  }`}

              >

                {loading ? (

                  <>

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Analyzing Resume...

                  </>

                ) : (

                  <>

                    Analyze Resume

                    <ArrowRight
                      size={16}
                    />

                  </>

                )}

              </button>


            </div>

          </div>


          {/* =========================================
              INFO BOX
          ========================================= */}

          <div className="space-y-4">


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">


              <h3 className="font-bold text-slate-900 mb-4">

                What you'll get

              </h3>


              <ul className="space-y-3 text-sm text-slate-600">


                <li className="flex items-center gap-2.5">

                  <div className="h-2 w-2 rounded-full bg-blue-600" />

                  ATS compatibility score

                </li>


                <li className="flex items-center gap-2.5">

                  <div className="h-2 w-2 rounded-full bg-blue-600" />

                  Skills and keyword analysis

                </li>


                <li className="flex items-center gap-2.5">

                  <div className="h-2 w-2 rounded-full bg-blue-600" />

                  Resume strengths and weaknesses

                </li>


                <li className="flex items-center gap-2.5">

                  <div className="h-2 w-2 rounded-full bg-blue-600" />

                  Job-role compatibility

                </li>


              </ul>

            </div>

          </div>


        </div>

      </div>

    </div>

  );

}