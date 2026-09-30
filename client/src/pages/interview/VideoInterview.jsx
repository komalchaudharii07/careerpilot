import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Video,
  Clock3,
  ChevronRight,
  CheckCircle2,
  Trophy,
  RotateCcw,
  ArrowLeft,
  Home,
  AlertCircle,
  Circle,
  Square,
  Loader2,
} from "lucide-react";

import {
  startInterview,
  submitAnswer,
  completeInterview,
  getInterviewDetails,
} from "../../services/interviewService";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
}

export default function VideoInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  /*
    Interview configuration comes from InterviewPage.

    Example:
    navigate("/interview/video", {
      state: {
        role,
        level,
        interviewType
      }
    });
  */

  const role = location.state?.role;
  const level = location.state?.level;
  const interviewType = location.state?.interviewType;

  const [interviewId, setInterviewId] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingReady, setRecordingReady] = useState(false);

  const [cameraError, setCameraError] = useState("");

  const [time, setTime] = useState(0);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {
    if (!interviewStarted || completed) return;

    const interval = setInterval(() => {
      setTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [interviewStarted, completed]);

  // =====================================================
  // CAMERA
  // =====================================================

  const startCamera = async () => {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError(
          "Camera access is not supported by this browser."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      stream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });

      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });

      setCameraOn(true);
      setMicOn(true);
    } catch (err) {
      console.error("Camera error:", err);

      setCameraError(
        "Camera/Microphone permission denied. Please allow access from your browser."
      );
    }
  };

  // =====================================================
  // CAMERA TOGGLE
  // =====================================================

  const toggleCamera = async () => {
    if (!streamRef.current) {
      await startCamera();
      return;
    }

    const tracks = streamRef.current.getVideoTracks();

    if (!tracks.length) return;

    const newState = !cameraOn;

    tracks.forEach((track) => {
      track.enabled = newState;
    });

    setCameraOn(newState);
  };

  // =====================================================
  // MIC TOGGLE
  // =====================================================

  const toggleMic = async () => {
    if (!streamRef.current) {
      await startCamera();
      return;
    }

    const tracks = streamRef.current.getAudioTracks();

    if (!tracks.length) return;

    const newState = !micOn;

    tracks.forEach((track) => {
      track.enabled = newState;
    });

    setMicOn(newState);
  };

  // =====================================================
  // START INTERVIEW
  // =====================================================

  const handleStartInterview = async () => {
    try {
      if (!role || !level || !interviewType) {
        setError(
          "Interview configuration is missing. Please start the video interview from the Interview page."
        );
        return;
      }

      setLoading(true);
      setError("");

      const response = await startInterview(
        role,
        level,
        interviewType
      );

      const interview = response?.data;

      if (!interview?._id) {
        throw new Error("Invalid interview response from server.");
      }

      setInterviewId(interview._id);

      setQuestions(interview.questions || []);

      setAnswers({});

      setCurrentQuestion(0);

      setTime(0);

      setCompleted(false);

      setResult(null);

      setInterviewStarted(true);

      await startCamera();
    } catch (err) {
      console.error("Start video interview error:", err);

      setError(
        err?.message ||
        err?.response?.data?.message ||
        "Unable to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ANSWER CHANGE
  // =====================================================

  const handleAnswerChange = (value) => {
    if (!questions[currentQuestion]) return;

    const questionId =
      questions[currentQuestion].questionId;

    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  // =====================================================
  // SUBMIT CURRENT ANSWER
  // =====================================================

  const submitCurrentAnswer = async () => {
    const question = questions[currentQuestion];

    if (!question) return;

    const answer =
      answers[question.questionId]?.trim() || "";

    if (!answer) return;

    try {
      setEvaluating(true);
      setError("");

      /*
        Backend will:
        1. Save answer
        2. Send question + answer to Gemini
        3. Gemini evaluates it
        4. Save score + feedback
      */

      const response = await submitAnswer(
        interviewId,
        question.questionId,
        question.question,
        answer
      );

      const updatedInterview = response?.data;

      if (updatedInterview) {
        setQuestions(updatedInterview.questions || []);

        const updatedAnswers = {};

        updatedInterview.questions?.forEach((item) => {
          updatedAnswers[item.questionId] =
            item.userAnswer || "";
        });

        setAnswers(updatedAnswers);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((previous) => previous + 1);
      } else {
        await finishInterview();
      }
    } catch (err) {
      console.error("Answer evaluation error:", err);

      setError(
        err?.message ||
        err?.response?.data?.message ||
        "Unable to evaluate answer."
      );
    } finally {
      setEvaluating(false);
    }
  };

  // =====================================================
  // COMPLETE INTERVIEW
  // =====================================================

  const finishInterview = async () => {
    try {
      setLoading(true);

      const response =
        await completeInterview(interviewId);

      const completedInterview = response?.data;

      setResult(completedInterview);

      setCompleted(true);

      stopCamera();
    } catch (err) {
      console.error("Complete interview error:", err);

      setError(
        err?.message ||
        err?.response?.data?.message ||
        "Unable to complete interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RECORDING
  // =====================================================

  const startRecording = () => {
    if (!streamRef.current) {
      alert("Please turn on your camera first.");
      return;
    }

    if (!window.MediaRecorder) {
      alert("Recording is not supported in this browser.");
      return;
    }

    try {
      recordedChunksRef.current = [];

      const recorder = new MediaRecorder(
        streamRef.current
      );

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        setRecordingReady(true);
      };

      recorder.start();

      setRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
      alert("Unable to start recording.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setRecording(false);
  };

  // =====================================================
  // STOP CAMERA
  // =====================================================

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setMicOn(false);
  };

  // =====================================================
  // DOWNLOAD RECORDING
  // =====================================================

  const downloadRecording = () => {
    if (!recordedChunksRef.current.length) {
      alert("No recording available.");
      return;
    }

    const blob = new Blob(
      recordedChunksRef.current,
      {
        type: "video/webm",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `careerpilot-interview-${Date.now()}.webm`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // RESTART
  // =====================================================

  const restartInterview = () => {
    stopCamera();

    setQuestions([]);
    setAnswers({});
    setCurrentQuestion(0);

    setInterviewId(null);

    setTime(0);

    setInterviewStarted(false);
    setCompleted(false);

    setResult(null);

    setRecording(false);
    setRecordingReady(false);

    setError("");
  };

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // =====================================================
  // RESULT SCREEN
  // =====================================================

  if (completed && result) {
    const answeredQuestions =
      result.questions?.filter(
        (question) =>
          question.userAnswer?.trim()
      ) || [];

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                CareerPilot
              </p>

              <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                Interview Result
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {result.jobRole} • {result.level} •{" "}
                {result.interviewType}
              </p>
            </div>

            <button
              onClick={() => navigate("/interview")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <ArrowLeft size={18} />
              Back to Interview
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">

            {/* AI SCORE */}

            <div className="text-center">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">

                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    {result.overallScore ?? 0}
                  </p>

                  <p className="text-xs text-slate-500">
                    / 100
                  </p>
                </div>

              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-950">
                Interview Completed
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                {result.summary ||
                  "Your interview evaluation has been completed."}
              </p>

            </div>

            {/* STATS */}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-slate-50 p-5 text-center">
                <Trophy
                  className="mx-auto text-blue-600"
                  size={24}
                />

                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {result.overallScore ?? 0}%
                </p>

                <p className="text-sm text-slate-500">
                  AI Overall Score
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center">
                <CheckCircle2
                  className="mx-auto text-emerald-600"
                  size={24}
                />

                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {answeredQuestions.length}
                </p>

                <p className="text-sm text-slate-500">
                  Questions Answered
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center">
                <Clock3
                  className="mx-auto text-orange-500"
                  size={24}
                />

                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {formatTime(time)}
                </p>

                <p className="text-sm text-slate-500">
                  Interview Duration
                </p>
              </div>

            </div>

            {/* AI SUMMARY */}

            <div className="mt-10">

              <h3 className="text-lg font-bold text-slate-950">
                AI Evaluation
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-950">
                    Strengths
                  </h4>

                  <ul className="mt-3 space-y-2">
                    {result.strengths?.length ? (
                      result.strengths.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600"
                          >
                            • {item}
                          </li>
                        )
                      )
                    ) : (
                      <li className="text-sm text-slate-500">
                        No strengths available.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-950">
                    Areas to Improve
                  </h4>

                  <ul className="mt-3 space-y-2">
                    {result.weaknesses?.length ? (
                      result.weaknesses.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600"
                          >
                            • {item}
                          </li>
                        )
                      )
                    ) : (
                      <li className="text-sm text-slate-500">
                        No weaknesses available.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-950">
                    Recommendations
                  </h4>

                  <ul className="mt-3 space-y-2">
                    {result.recommendations?.length ? (
                      result.recommendations.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600"
                          >
                            • {item}
                          </li>
                        )
                      )
                    ) : (
                      <li className="text-sm text-slate-500">
                        No recommendations available.
                      </li>
                    )}
                  </ul>
                </div>

              </div>

            </div>

            {/* ANSWER REVIEW */}

            <div className="mt-10">

              <h3 className="text-lg font-bold text-slate-950">
                Answer Review
              </h3>

              <div className="mt-4 space-y-4">

                {result.questions?.map(
                  (question, index) => {

                    const score =
                      question.score ?? 0;

                    return (
                      <div
                        key={question.questionId}
                        className="rounded-2xl border border-slate-200 p-5"
                      >

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                              Question {index + 1}
                            </p>

                            <h4 className="mt-1 font-semibold text-slate-950">
                              {question.question}
                            </h4>
                          </div>

                          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                            {score}/100
                          </span>

                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4">

                          <p className="text-xs font-semibold uppercase text-slate-400">
                            Your Answer
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {question.userAnswer?.trim()
                              ? question.userAnswer
                              : "No answer provided."}
                          </p>

                        </div>

                        {question.aiFeedback && (
                          <div className="mt-3 rounded-xl bg-blue-50 p-4">

                            <p className="text-xs font-semibold uppercase text-blue-600">
                              AI Feedback
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {question.aiFeedback}
                            </p>

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* RECORDING */}

            {recordingReady && (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="font-semibold text-slate-950">
                      Interview recording is ready
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Your recording was created in your browser.
                    </p>
                  </div>

                  <button
                    onClick={downloadRecording}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Download Recording
                  </button>

                </div>

              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <button
                onClick={restartInterview}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
              >
                <RotateCcw size={18} />
                Practice Again
              </button>

              <button
                onClick={() =>
                  navigate("/interview/history")
                }
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700"
              >
                View Interview History
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700"
              >
                <Home size={18} />
                Dashboard
              </button>

            </div>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // START SCREEN
  // =====================================================

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <button
            onClick={() => navigate("/interview")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={18} />
            Back to Interview
          </button>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

            <div className="bg-slate-950 px-6 py-10 text-center text-white sm:px-10">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                <Video size={30} />
              </div>

              <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
                Video Interview
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">
                Practice a realistic AI-powered interview using
                your camera and microphone.
              </p>

            </div>

            <div className="p-6 sm:p-10">

              {role && level && interviewType ? (
                <div className="rounded-2xl bg-slate-50 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Interview Configuration
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                      {role}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                      {level}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                      {interviewType}
                    </span>

                  </div>

                </div>
              ) : (
                <div className="rounded-2xl bg-amber-50 p-5">

                  <div className="flex gap-3">

                    <AlertCircle
                      className="shrink-0 text-amber-600"
                      size={20}
                    />

                    <p className="text-sm leading-6 text-amber-800">
                      Please configure your interview from
                      the Interview page before starting the
                      video interview.
                    </p>

                  </div>

                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <Camera
                    className="text-blue-600"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold text-slate-950">
                    Camera
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Use your camera for a realistic interview.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <Mic
                    className="text-blue-600"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold text-slate-950">
                    Microphone
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Practice answering questions naturally.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <Clock3
                    className="text-blue-600"
                    size={24}
                  />

                  <h3 className="mt-4 font-semibold text-slate-950">
                    AI Evaluation
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Your answers will be evaluated by AI.
                  </p>
                </div>

              </div>

              {error && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleStartInterview}
                disabled={loading || !role || !level || !interviewType}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Generating AI Interview...
                  </>
                ) : (
                  <>
                    Start Video Interview
                    <ChevronRight size={20} />
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // INTERVIEW SCREEN
  // =====================================================

  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  const currentAnswer =
    answers[question.questionId] || "";

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* TOP BAR */}

        <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              CareerPilot
            </p>

            <h1 className="mt-1 text-lg font-bold text-slate-950">
              AI Video Interview
            </h1>
          </div>

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
              <Clock3
                size={17}
                className="text-slate-500"
              />

              <span className="font-mono text-sm font-semibold text-slate-700">
                {formatTime(time)}
              </span>
            </div>

            <button
              onClick={finishInterview}
              disabled={loading || evaluating}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
            >
              End Interview
            </button>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">

          <div className="flex items-center justify-between text-sm">

            <span className="font-semibold text-slate-700">
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <span className="text-slate-500">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* VIDEO */}

          <div className="rounded-3xl bg-slate-950 p-3">

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900">

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover ${cameraOn ? "block" : "hidden"
                  }`}
              />

              {!cameraOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                    <CameraOff
                      size={28}
                      className="text-slate-400"
                    />
                  </div>

                  <p className="mt-4 font-semibold text-white">
                    Camera is off
                  </p>

                </div>
              )}

              {recording && (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">

                  <Circle
                    size={10}
                    fill="currentColor"
                  />

                  Recording

                </div>
              )}

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-slate-950/90 p-2">

                <button
                  onClick={toggleCamera}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${cameraOn
                      ? "bg-white text-slate-900"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {cameraOn ? (
                    <Camera size={19} />
                  ) : (
                    <CameraOff size={19} />
                  )}
                </button>

                <button
                  onClick={toggleMic}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${micOn
                      ? "bg-white text-slate-900"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {micOn ? (
                    <Mic size={19} />
                  ) : (
                    <MicOff size={19} />
                  )}
                </button>

                <button
                  onClick={
                    recording
                      ? stopRecording
                      : startRecording
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${recording
                      ? "bg-red-600"
                      : "bg-blue-600"
                    }`}
                >
                  {recording ? (
                    <Square
                      size={17}
                      fill="currentColor"
                    />
                  ) : (
                    <Circle
                      size={19}
                      fill="currentColor"
                    />
                  )}
                </button>

              </div>

            </div>

            {cameraError && (
              <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {cameraError}
              </div>
            )}

          </div>

          {/* QUESTION */}

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">

            <div className="flex items-center justify-between">

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                AI Question
              </span>

              <span className="text-xs font-medium text-slate-400">
                {currentQuestion + 1}/{questions.length}
              </span>

            </div>

            <h2 className="mt-6 text-xl font-bold leading-8 text-slate-950 sm:text-2xl">
              {question.question}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Take a moment to think and give a clear,
              structured answer.
            </p>

            <textarea
              value={currentAnswer}
              onChange={(event) =>
                handleAnswerChange(
                  event.target.value
                )
              }
              placeholder="Type your answer here..."
              className="mt-6 min-h-[220px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none focus:border-blue-400 focus:bg-white"
            />

            <div className="mt-3 text-xs text-slate-400">
              {currentAnswer.trim()
                ? `${currentAnswer
                  .trim()
                  .split(/\s+/).length} words`
                : "Start typing your answer"}
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-end">

              <button
                onClick={submitCurrentAnswer}
                disabled={
                  !currentAnswer.trim() ||
                  evaluating ||
                  loading
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >

                {evaluating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    AI is evaluating...
                  </>
                ) : currentQuestion ===
                  questions.length - 1 ? (
                  <>
                    Finish Interview
                    <CheckCircle2 size={18} />
                  </>
                ) : (
                  <>
                    Submit & Next
                    <ChevronRight size={18} />
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}