import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Briefcase,
  FileText,
  Mic,
  Target,
  Loader2,
  Trash2,
} from "lucide-react";

export default function AICareerAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const suggestions = [
    {
      icon: Target,
      text: "What should I learn next for my career?",
    },
    {
      icon: Briefcase,
      text: "How can I prepare better for placements?",
    },
    {
      icon: FileText,
      text: "How can I improve my resume?",
    },
    {
      icon: Mic,
      text: "How can I improve my interview performance?",
    },
  ];

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  // ==========================================
  // LOAD CHAT HISTORY
  // ==========================================

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const token = getToken();

        if (!token) {
          setHistoryLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/ai/history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load chat history"
          );
        }

        if (data.success && Array.isArray(data.messages)) {
          const formattedMessages = data.messages.map((item) => ({
            role: item.role === "assistant" ? "ai" : "user",
            text: item.content,
          }));

          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("❌ Load Chat History Error:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: trimmedMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      // ==========================================
      // GET JWT TOKEN
      // ==========================================

      const token = getToken();

      if (!token) {
        throw new Error(
          "Please login again to use CareerPilot AI."
        );
      }

      // ==========================================
      // CALL CAREERPILOT BACKEND
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      const data = await response.json();

      // ==========================================
      // HANDLE API ERROR
      // ==========================================

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get AI response"
        );
      }

      // ==========================================
      // ADD AI RESPONSE
      // ==========================================

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.message ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("❌ AI Assistant Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error.message ||
            "Something went wrong. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const clearChat = async () => {
    if (loading || historyLoading || messages.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear this chat?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        throw new Error(
          "Please login again to clear your chat."
        );
      }

      const response = await fetch(
        "http://localhost:5000/api/ai/history",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to clear chat"
        );
      }

      setMessages([]);
    } catch (error) {
      console.error("❌ Clear Chat Error:", error);

      alert(
        error.message ||
        "Something went wrong while clearing the chat."
      );
    }
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ==========================================
  // SUGGESTION CLICK
  // ==========================================

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const hasMessages = messages.length > 0;

  // ==========================================
  // HISTORY LOADING
  // ==========================================

  if (historyLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading your conversation...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Bot size={23} />
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                AI Career Assistant
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <p className="text-xs text-slate-500">
                  Personalized career guidance
                </p>
              </div>
            </div>
          </div>

          {/* CLEAR CHAT */}

          {hasMessages && (
            <button
              onClick={clearChat}
              disabled={loading}
              title="Clear chat"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">
                Clear chat
              </span>
            </button>
          )}
        </div>

        {/* ==========================================
            CHAT AREA
        ========================================== */}

        <div className="flex flex-1 flex-col overflow-y-auto">

          {!hasMessages ? (
            /* ======================================
               WELCOME SCREEN
            ====================================== */

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-8 sm:px-8">

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Sparkles size={28} />
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  How can I help with your career?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Ask me about your career, skills, resume,
                  interviews, placements, or what you should
                  focus on next.
                </p>
              </div>

              {/* SUGGESTIONS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.text}
                      onClick={() =>
                        handleSuggestion(item.text)
                      }
                      disabled={loading}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-white group-hover:text-blue-600">
                        <Icon size={17} />
                      </div>

                      <span className="text-sm font-medium leading-5 text-slate-600 group-hover:text-slate-900">
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ======================================
               CHAT MESSAGES
            ====================================== */

            <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-8">

              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`mb-5 flex ${item.role === "user"
                      ? "justify-end"
                      : "justify-start"
                    }`}
                >
                  <div
                    className={`flex max-w-[85%] gap-3 ${item.role === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                      }`}
                  >

                    {/* AVATAR */}

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.role === "user"
                          ? "bg-slate-900 text-white"
                          : "bg-blue-50 text-blue-600"
                        }`}
                    >
                      {item.role === "user" ? (
                        <User size={17} />
                      ) : (
                        <Bot size={18} />
                      )}
                    </div>

                    {/* MESSAGE */}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user"
                          ? "rounded-tr-md bg-blue-600 text-white"
                          : item.error
                            ? "rounded-tl-md border border-red-100 bg-red-50 text-red-600"
                            : "rounded-tl-md bg-slate-100 text-slate-700"
                        }`}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* AI LOADING */}

              {loading && (
                <div className="mb-5 flex justify-start">
                  <div className="flex max-w-[85%] gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Bot size={18} />
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm text-slate-500">
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      CareerPilot AI is thinking...
                    </div>

                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ==========================================
            INPUT
        ========================================== */}

        <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
          <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your career..."
              rows={1}
              disabled={loading}
              className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!message.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Send size={17} />
              )}
            </button>

          </div>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            CareerPilot AI can make mistakes. Verify important
            career decisions.
          </p>
        </div>
      </div>
    </div>
  );
}