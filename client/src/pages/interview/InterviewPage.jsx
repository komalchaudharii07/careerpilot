import { useState } from "react";
import axios from "axios";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Mic,
  Sparkles,
  Trophy,
  Video,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const INTERVIEW_API = `${API_URL}/interview`;

/* =====================================================
   INTERVIEW TYPES
===================================================== */

const interviewTypes = [
  {
    id: "technical",
    title: "Technical Interview",
    description:
      "Technical questions based on your selected role and skills.",
    icon: Code2,
    duration: "AI determined",
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description:
      "Practice communication, HR and situational questions.",
    icon: Trophy,
    duration: "AI determined",
  },
  {
    id: "mixed",
    title: "Full Mock Interview",
    description:
      "A combination of technical and behavioral questions.",
    icon: Sparkles,
    duration: "AI determined",
  },
];

/* =====================================================
   MAIN PAGE
===================================================== */

export default function InterviewPage() {
  const navigate = useNavigate();

  /* ===================================================
     INTERVIEW CONFIGURATION
  =================================================== */

  const [selectedRole, setSelectedRole] = useState("");

  const [selectedLevel, setSelectedLevel] =
    useState("");

  const [selectedType, setSelectedType] =
    useState("technical");

  /* ===================================================
     INTERVIEW STATE
  =================================================== */

  const [started, setStarted] =
    useState(false);

  const [interviewId, setInterviewId] =
    useState(null);

  const [starting, setStarting] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ===================================================
     TOKEN
  =================================================== */

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  /* ===================================================
     START NORMAL INTERVIEW
  =================================================== */

  const startInterview = async () => {
    try {
      setStarting(true);
      setError("");

      /* -----------------------------------------------
         LOGIN CHECK
      ------------------------------------------------ */

      if (!token) {
        setError(
          "Please login before starting an interview."
        );
        return;
      }

      /* -----------------------------------------------
         ROLE VALIDATION
      ------------------------------------------------ */

      if (!selectedRole.trim()) {
        setError(
          "Please enter your job role."
        );
        return;
      }

      /* -----------------------------------------------
         LEVEL VALIDATION
      ------------------------------------------------ */

      if (!selectedLevel) {
        setError(
          "Please select your experience level."
        );
        return;
      }

      /* -----------------------------------------------
         API REQUEST
      ------------------------------------------------ */

      const response = await axios.post(
        `${INTERVIEW_API}/start`,
        {
          role: selectedRole.trim(),
          level: selectedLevel,
          interviewType: selectedType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /* -----------------------------------------------
         GET INTERVIEW DATA
      ------------------------------------------------ */

      const interview =
        response.data?.data;

      if (!interview?._id) {
        throw new Error(
          "Backend did not return an interview ID."
        );
      }

      /* -----------------------------------------------
         SAVE SESSION
      ------------------------------------------------ */

      setInterviewId(interview._id);

      setStarted(true);

    } catch (err) {
      console.error(
        "Start interview error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to start interview."
      );

    } finally {
      setStarting(false);
    }
  };

  /* =====================================================
     OPEN VIDEO INTERVIEW
  ===================================================== */

  const openVideoInterview = () => {
    setError("");

    /* -----------------------------------------------
       LOGIN CHECK
    ------------------------------------------------ */

    if (!token) {
      setError(
        "Please login before starting a video interview."
      );
      return;
    }

    /* -----------------------------------------------
       ROLE CHECK
    ------------------------------------------------ */

    if (!selectedRole.trim()) {
      setError(
        "Please enter your job role before opening video interview."
      );
      return;
    }

    /* -----------------------------------------------
       LEVEL CHECK
    ------------------------------------------------ */

    if (!selectedLevel) {
      setError(
        "Please select your experience level before opening video interview."
      );
      return;
    }

    /* -----------------------------------------------
       NAVIGATE TO VIDEO PAGE
    ------------------------------------------------ */

    navigate("/interview/video", {
      state: {
        role: selectedRole.trim(),
        level: selectedLevel,
        interviewType: selectedType,
      },
    });
  };

  /* =====================================================
     IF NORMAL INTERVIEW STARTED
  ===================================================== */

  if (started && interviewId) {
    return (
      <InterviewSession
        interviewId={interviewId}
        token={token}
        interviewType={selectedType}
        onExit={() => {
          setStarted(false);
          setInterviewId(null);
        }}
      />
    );
  }

  /* =====================================================
     LANDING PAGE
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          <div>

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">

              <Mic size={17} />

              AI Interview Practice

            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">

              Prepare for your next interview

            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">

              Practice with dynamically generated interview
              questions and receive AI-powered feedback
              based on your performance.

            </p>

          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">

            <Sparkles
              size={16}
              className="text-blue-600"
            />

            AI Powered

          </div>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-[1.4fr_0.6fr]">

            {/* LEFT */}

            <div className="p-6 sm:p-8 md:p-9">

              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">

                <Sparkles size={14} />

                Personalized Practice

              </span>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">

                Build confidence before the real interview.

              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">

                Enter your role, choose your experience level
                and let AI generate questions specifically
                for your interview.

              </p>

              {/* ROLE + LEVEL */}

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                {/* ROLE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">

                    Job Role

                  </label>

                  <input
                    type="text"
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(
                        e.target.value
                      )
                    }
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* LEVEL */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">

                    Experience Level

                  </label>

                  <select
                    value={selectedLevel}
                    onChange={(e) =>
                      setSelectedLevel(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >

                    <option value="">
                      Select level
                    </option>

                    <option value="Junior">
                      Junior
                    </option>

                    <option value="Mid">
                      Mid
                    </option>

                    <option value="Senior">
                      Senior
                    </option>

                  </select>

                </div>

              </div>

              {/* FEATURES */}

              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-5">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  Dynamic questions

                </div>

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  AI evaluation

                </div>

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  Performance tracking

                </div>

              </div>

            </div>

            {/* =================================================
                VIDEO SECTION
            ================================================= */}

            <div className="flex flex-col items-center justify-center border-t border-slate-200 bg-slate-50 p-8 lg:border-l lg:border-t-0">

              <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">

                  <Video size={34} />

                </div>

                <p className="mt-5 text-sm font-semibold text-slate-700">

                  Video Interview

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  Practice with camera and microphone.

                </p>

                <button
                  type="button"
                  onClick={openVideoInterview}
                  disabled={
                    !selectedRole.trim() ||
                    !selectedLevel
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  Open Video Interview

                  <ArrowRight size={14} />

                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            INTERVIEW TYPES
        ================================================= */}

        <section>

          <div className="mb-5">

            <h2 className="text-xl font-bold">

              Choose interview type

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              AI will generate questions based on your
              selected role, level and interview type.

            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {interviewTypes.map(
              (type) => {

                const Icon = type.icon;

                const active =
                  selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setSelectedType(
                        type.id
                      )
                    }
                    className={`w-full rounded-2xl border p-5 text-left transition duration-200 sm:p-6 ${active
                        ? "border-blue-500 bg-blue-50/60 shadow-md shadow-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
                      }`}
                  >

                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${active
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                          }`}
                      >

                        <Icon size={21} />

                      </div>

                      {active && (
                        <CheckCircle2
                          size={20}
                          className="text-blue-600"
                        />
                      )}

                    </div>

                    <h3 className="mt-5 font-bold">

                      {type.title}

                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">

                      {type.description}

                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">

                      <Clock3 size={14} />

                      {type.duration}

                    </div>

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

          </div>
        )}

        {/* =================================================
            START NORMAL INTERVIEW
        ================================================= */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">

                Selected interview

              </p>

              <h3 className="mt-1 text-lg font-bold">

                {
                  interviewTypes.find(
                    (item) =>
                      item.id === selectedType
                  )?.title
                }

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                Questions will be generated by AI
                for this session.

              </p>

            </div>

            <button
              onClick={startInterview}
              disabled={
                starting ||
                !selectedRole.trim() ||
                !selectedLevel
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >

              {starting ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Generating...

                </>
              ) : (
                <>
                  Start Interview

                  <ArrowRight size={17} />

                </>
              )}

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =====================================================
   INTERVIEW SESSION
===================================================== */

function InterviewSession({
  interviewId,
  token,
  interviewType,
  onExit,
}) {
  const [question, setQuestion] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [loadingQuestion, setLoadingQuestion] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [elapsed, setElapsed] =
    useState(0);

  const recognitionRef =
    useState(null);

  /* ===================================================
     LOAD INTERVIEW
  =================================================== */

  useState(() => {
    loadQuestion();
  });

  /* ===================================================
     TIMER
  =================================================== */

  useState(() => {
    const timer = setInterval(() => {
      setElapsed(
        (prev) => prev + 1
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  });

  /* ===================================================
     LOAD QUESTION
  =================================================== */

  async function loadQuestion() {
    try {
      setLoadingQuestion(true);
      setError("");

      const response =
        await axios.get(
          `${INTERVIEW_API}/${interviewId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const interview =
        response.data;

      const questions =
        interview?.questions || [];

      const nextQuestion =
        questions.find(
          (item) =>
            !item.userAnswer ||
            item.userAnswer.trim() === ""
        );

      if (nextQuestion) {
        setQuestion(nextQuestion);
      } else {
        setQuestion(null);
      }

    } catch (err) {
      console.error(
        "Load interview error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load interview data."
      );

    } finally {
      setLoadingQuestion(false);
    }
  }

  /* ===================================================
     SPEECH RECOGNITION
  =================================================== */

  const toggleMic = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice input is not supported. Please use Chrome or Edge."
      );

      return;
    }

    if (!recognitionRef.current) {

      const recognition =
        new SpeechRecognition();

      recognition.continuous = true;

      recognition.interimResults = true;

      recognition.lang = "en-US";

      recognition.onresult =
        (event) => {

          let transcript = "";

          for (
            let i =
              event.resultIndex;
            i <
            event.results.length;
            i++
          ) {

            transcript +=
              event.results[i][0]
                .transcript;
          }

          setAnswer(
            (prev) =>
              prev
                ? `${prev} ${transcript}`
                : transcript
          );

        };

      recognition.onerror =
        () => {
          setIsListening(false);
        };

      recognition.onend =
        () => {
          setIsListening(false);
        };

      recognitionRef.current =
        recognition;
    }

    if (isListening) {

      recognitionRef.current.stop();

      setIsListening(false);

    } else {

      try {

        recognitionRef.current.start();

        setIsListening(true);

      } catch (err) {

        console.error(err);

      }
    }
  };

  /* ===================================================
     SUBMIT ANSWER
  =================================================== */

  const submitAnswer = async () => {

    if (!question?.questionId) {

      setError(
        "Question ID is missing from backend response."
      );

      return false;
    }

    if (!answer.trim()) {

      setError(
        "Please answer the question before continuing."
      );

      return false;
    }

    try {

      setSubmitting(true);

      setError("");

      const response =
        await axios.post(
          `${INTERVIEW_API}/${interviewId}/answer`,
          {
            questionId:
              question.questionId,

            question:
              question.question,

            answer:
              answer.trim(),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return response.data;

    } catch (err) {

      console.error(
        "Submit answer error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to save your answer."
      );

      return false;

    } finally {

      setSubmitting(false);

    }
  };

  /* ===================================================
     COMPLETE INTERVIEW
  =================================================== */

  const finishInterview =
    async () => {

      try {

        setSubmitting(true);

        setError("");

        const response =
          await axios.post(
            `${INTERVIEW_API}/${interviewId}/complete`,
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const completedInterview =
          response.data?.data;

        setResult(
          completedInterview
        );

      } catch (err) {

        console.error(
          "Complete interview error:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Unable to complete interview."
        );

      } finally {

        setSubmitting(false);

      }
    };

  /* ===================================================
     NEXT QUESTION
  =================================================== */

  const nextQuestion =
    async () => {

      if (!answer.trim()) {

        setError(
          "Please answer the question before continuing."
        );

        return;
      }

      if (isListening) {

        recognitionRef.current?.stop();

        setIsListening(false);
      }

      const saved =
        await submitAnswer();

      if (!saved) {
        return;
      }

      setAnswer("");

      await loadQuestion();

    };

  /* ===================================================
     FORMAT TIME
  =================================================== */

  const formatTime =
    (seconds) => {

      const minutes =
        Math.floor(
          seconds / 60
        );

      const secs =
        seconds % 60;

      return `${String(
        minutes
      ).padStart(
        2,
        "0"
      )}:${String(
        secs
      ).padStart(
        2,
        "0"
      )}`;
    };

  /* ===================================================
     LOADING
  =================================================== */

  if (loadingQuestion) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="text-center">

          <Loader2
            size={35}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 text-sm font-semibold text-slate-700">

            Preparing your interview...

          </p>

          <p className="mt-1 text-xs text-slate-500">

            Getting your questions from the server.

          </p>

        </div>

      </div>
    );
  }

  /* ===================================================
     RESULT
  =================================================== */

  if (result) {

    return (
      <InterviewResult
        result={result}
        onExit={onExit}
      />
    );
  }

  /* ===================================================
     NO QUESTION
  =================================================== */

  if (!question) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">

            <AlertCircle size={28} />

          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-950">

            Interview could not be loaded

          </h1>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-4 text-left text-sm text-red-600">

              {error}

            </div>
          )}

          <button
            onClick={onExit}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >

            <ArrowRight
              size={17}
              className="rotate-180"
            />

            Back to Interview

          </button>

        </div>

      </div>
    );
  }

  /* ===================================================
     INTERVIEW UI
  =================================================== */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">

              AI Mock Interview

            </p>

            <p className="mt-1 text-sm font-semibold capitalize">

              {interviewType} interview

            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">

              <Clock3 size={16} />

              {formatTime(elapsed)}

            </div>

            <button
              onClick={onExit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >

              <X size={16} />

              <span className="hidden sm:inline">

                Exit

              </span>

            </button>

          </div>

        </div>

      </header>

      {/* BODY */}

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-10">

          {/* QUESTION */}

          <div className="max-w-3xl">

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">

              <Sparkles size={16} />

              AI Generated Question

            </div>

            <h1 className="mt-5 text-xl font-bold leading-relaxed sm:text-2xl md:text-3xl">

              {question.question}

            </h1>

          </div>

          {/* ANSWER */}

          <div className="mt-8">

            <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <label className="text-sm font-semibold text-slate-700">

                Your Answer

              </label>

              <button
                type="button"
                onClick={toggleMic}
                disabled={submitting}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition sm:w-auto ${isListening
                    ? "animate-pulse bg-red-100 text-red-600"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
              >

                {isListening ? (
                  <>
                    <Mic
                      size={14}
                    />

                    Stop Voice Input
                  </>
                ) : (
                  <>
                    <Mic
                      size={14}
                    />

                    Start Voice Input
                  </>
                )}

              </button>

            </div>

            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              disabled={submitting}
              placeholder="Write your answer..."
              rows={8}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:p-5"
            />

            <div className="mt-3 flex justify-between text-xs text-slate-400">

              <span>

                {answer.length} characters

              </span>

              {isListening && (
                <span className="flex items-center gap-1.5 text-red-500">

                  <span className="h-2 w-2 animate-ping rounded-full bg-red-500" />

                  Listening...

                </span>
              )}

            </div>

          </div>

          {/* FOOTER */}

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <Clock3 size={16} />

              <span>

                Your answer will be evaluated by AI.

              </span>

            </div>

            <button
              onClick={nextQuestion}
              disabled={
                !answer.trim() ||
                submitting
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >

              {submitting ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Evaluating...

                </>
              ) : (
                <>
                  Submit Answer

                  <ArrowRight
                    size={17}
                  />

                </>
              )}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

/* =====================================================
   RESULT
===================================================== */

function InterviewResult({
  result,
  onExit,
}) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* HEADER */}

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">

              <CheckCircle2 size={32} />

            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">

              Interview Completed

            </h1>

            <p className="mt-2 text-sm text-slate-500">

              Your answers have been evaluated by AI.

            </p>

          </div>

          {/* SCORE */}

          {typeof result?.overallScore ===
            "number" && (

              <div className="mx-auto mt-8 max-w-md rounded-3xl bg-blue-50 p-6 text-center">

                <p className="text-sm font-medium text-slate-500">

                  Overall Score

                </p>

                <p className="mt-2 text-5xl font-bold text-blue-600">

                  {result.overallScore}%

                </p>

              </div>
            )}

          {/* SUMMARY */}

          {result?.summary && (

            <div className="mt-8">

              <h2 className="text-lg font-bold">

                Performance Summary

              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600">

                {result.summary}

              </p>

            </div>
          )}

          {/* STRENGTHS */}

          {Array.isArray(
            result?.strengths
          ) &&
            result.strengths.length >
            0 && (

              <div className="mt-7">

                <h2 className="text-lg font-bold">

                  Strengths

                </h2>

                <ul className="mt-3 space-y-2">

                  {result.strengths.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex gap-2 text-sm text-slate-600"
                      >

                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-500"
                        />

                        {item}

                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

          {/* WEAKNESSES */}

          {Array.isArray(
            result?.weaknesses
          ) &&
            result.weaknesses.length >
            0 && (

              <div className="mt-7">

                <h2 className="text-lg font-bold">

                  Areas to Improve

                </h2>

                <ul className="mt-3 space-y-2">

                  {result.weaknesses.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex gap-2 text-sm text-slate-600"
                      >

                        <AlertCircle
                          size={17}
                          className="mt-0.5 shrink-0 text-amber-500"
                        />

                        {item}

                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

          {/* RECOMMENDATIONS */}

          {Array.isArray(
            result?.recommendations
          ) &&
            result.recommendations.length >
            0 && (

              <div className="mt-7">

                <h2 className="text-lg font-bold">

                  Recommendations

                </h2>

                <ul className="mt-3 space-y-2">

                  {result.recommendations.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600"
                      >

                        {item}

                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

          {/* QUESTION RESULTS */}

          {Array.isArray(
            result?.questions
          ) &&
            result.questions.length >
            0 && (

              <div className="mt-8">

                <h2 className="text-lg font-bold">

                  Question-wise Performance

                </h2>

                <div className="mt-4 space-y-4">

                  {result.questions.map(
                    (item, index) => (

                      <div
                        key={
                          item.questionId ||
                          index
                        }
                        className="rounded-2xl border border-slate-200 p-5"
                      >

                        {/* QUESTION HEADER */}

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <p className="text-xs font-semibold text-blue-600">

                              Question{" "}
                              {index + 1}

                            </p>

                            <h3 className="mt-1 font-semibold">

                              {item.question}

                            </h3>

                          </div>

                          {typeof item.score ===
                            "number" && (

                              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">

                                {item.score}/100

                              </span>
                            )}

                        </div>

                        {/* EVALUATION */}

                        {item.evaluation && (

                          <div className="mt-4">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.evaluation ===
                                  "correct"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : item.evaluation ===
                                    "partially-correct"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-red-50 text-red-600"
                                }`}
                            >

                              {item.evaluation}

                            </span>

                          </div>
                        )}

                        {/* ANSWER */}

                        {item.userAnswer && (

                          <div className="mt-4 rounded-xl bg-slate-50 p-4">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                              Your Answer

                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">

                              {item.userAnswer}

                            </p>

                          </div>
                        )}

                        {/* AI FEEDBACK */}

                        {item.aiFeedback && (

                          <div className="mt-3 rounded-xl bg-emerald-50 p-4">

                            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">

                              AI Feedback

                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">

                              {item.aiFeedback}

                            </p>

                          </div>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          {/* BACK */}

          <button
            onClick={onExit}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >

            Back to Interview

          </button>

        </div>

      </div>

    </div>
  );
}