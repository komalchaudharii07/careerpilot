import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Mic,
  MicOff,
  Play,
  Sparkles,
  Trophy,
  Video,
  X,
  RotateCcw,
} from "lucide-react";

const interviewTypes = [
  {
    id: "technical",
    title: "Technical Interview",
    description: "DSA, programming, CS fundamentals and problem solving.",
    icon: Code2,
    duration: "20–30 min",
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "Practice HR, communication and situational questions.",
    icon: Trophy,
    duration: "15–20 min",
  },
  {
    id: "mixed",
    title: "Full Mock Interview",
    description: "A realistic mix of technical and behavioral questions.",
    icon: Sparkles,
    duration: "30–40 min",
  },
];

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState("technical");
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <InterviewSession
        type={selectedType}
        onExit={() => setStarted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Mic size={17} />
              AI Interview Practice
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Prepare for your next interview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Practice realistic interview questions, improve your answers and
              understand where you need to improve.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm md:flex">
            <Sparkles size={16} className="text-blue-600" />
            AI Powered
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Hero Card */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
            {/* Left */}
            <div className="p-7 md:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles size={14} />
                Personalized Practice
              </span>

              <h2 className="mt-5 text-2xl font-bold md:text-3xl">
                Build confidence before the real interview.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Select an interview type below and start a simulated interview.
                Your performance can later be analyzed across communication,
                technical knowledge and problem-solving.
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  Instant feedback
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  Skill-based questions
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  Performance tracking
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-center border-t border-slate-200 bg-slate-50 p-8 lg:border-l lg:border-t-0">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Video size={34} />
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-700">
                  Realistic Interview Environment
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Practice without the pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interview Types */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold">Choose interview type</h2>

            <p className="mt-1 text-sm text-slate-500">
              Pick the type of interview you want to practice.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {interviewTypes.map((type) => {
              const Icon = type.icon;
              const active = selectedType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`group cursor-pointer rounded-2xl border p-6 text-left transition duration-200 ${active
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

                  <h3 className="mt-5 font-bold">{type.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {type.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Clock3 size={14} />
                    {type.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Start Button Container */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Selected interview
              </p>

              <h3 className="mt-1 text-lg font-bold">
                {
                  interviewTypes.find(
                    (item) => item.id === selectedType
                  )?.title
                }
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Make sure you're ready before starting the session.
              </p>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
            >
              Start Interview
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-bold">Before you begin</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Tip
              number="01"
              title="Think before answering"
              text="Take a few seconds to organize your thoughts."
            />

            <Tip
              number="02"
              title="Be specific"
              text="Use examples from your projects and experience."
            />

            <Tip
              number="03"
              title="Stay concise"
              text="Focus on the question instead of giving unnecessary details."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= INTERVIEW SESSION ================= */

function InterviewSession({ type, onExit }) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const recognitionRef = useRef(null);

  const questions = {
    technical: [
      "What is the difference between let, const and var in JavaScript?",
      "Explain how React state works and how re-rendering is triggered.",
      "What is the difference between SQL and NoSQL databases?",
    ],
    behavioral: [
      "Tell me about yourself.",
      "Tell me about a challenging project you worked on.",
      "Where do you see yourself in the next five years?",
    ],
    mixed: [
      "Tell me about yourself and your technical background.",
      "Explain a difficult technical problem you solved in your past project.",
      "Why should we hire you for this role?",
    ],
  };

  const currentQuestions = questions[type] || questions.technical;
  const question = currentQuestions[questionNumber - 1];
  const progress = (questionNumber / currentQuestions.length) * 100;

  // Web Speech API initialization
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (err) => {
        console.error("Speech Recognition Error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please use Chrome/Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const nextQuestion = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (questionNumber < currentQuestions.length) {
      setQuestionNumber((prev) => prev + 1);
      setAnswer("");
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">Interview Completed!</h2>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Great job completing your mock interview session. Your answers have been recorded for feedback.
          </p>

          <button
            onClick={onExit}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <RotateCcw size={16} />
            Back to Mock Interviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Session Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              AI Mock Interview
            </p>

            <p className="mt-1 text-sm font-semibold">
              Question {questionNumber} of {currentQuestions.length}
            </p>
          </div>

          <button
            onClick={onExit}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition"
          >
            <X size={16} />
            Exit
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 bg-slate-200">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Session Body */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          {/* Question */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Sparkles size={16} />
              Interview Question
            </div>

            <h1 className="mt-5 text-2xl font-bold leading-relaxed md:text-3xl">
              {question}
            </h1>
          </div>

          {/* Answer Box */}
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Your Answer
              </label>

              {/* Functional Mic Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${isListening
                    ? "animate-pulse bg-red-100 text-red-600"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
              >
                {isListening ? (
                  <>
                    <MicOff size={14} /> Recording... Click to stop
                  </>
                ) : (
                  <>
                    <Mic size={14} /> Start Voice Input
                  </>
                )}
              </button>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here or click 'Start Voice Input' to speak..."
              rows={7}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {answer.length} characters typed
              </p>

              {isListening && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  Listening to your speech...
                </span>
              )}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} />
              Take your time to structure your thoughts
            </div>

            <button
              onClick={nextQuestion}
              disabled={!answer.trim()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {questionNumber === currentQuestions.length
                ? "Finish Interview"
                : "Next Question"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= TIP COMPONENT ================= */

function Tip({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-xs font-bold text-blue-600">{number}</span>
      <h3 className="mt-3 text-sm font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-5 text-slate-500">{text}</p>
    </div>
  );
}