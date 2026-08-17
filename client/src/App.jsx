import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from "react-router-dom";

// LAYOUT
import DashboardLayout from "./components/layout/DashboardLayout";

// PUBLIC
import Home from "./pages/Home";

// CAREER ROADMAP
import CareerRoadmap from "./pages/roadmap/CareerRoadmap";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// DASHBOARD
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";

// RESUME
import ResumePage from "./pages/resume/ResumePage";
import ResumeResult from "./pages/resume/ResumeResult";

// INTERVIEW
import InterviewPage from "./pages/interview/InterviewPage";
import InterviewHistory from "./pages/interview/InterviewHistory";

// JOBS
import JobRecommendations from "./pages/jobs/JobRecommendations";

function ProtectedRoute() {
  return <Outlet />;
}

function PublicOnlyRoute({ children }) {
  return children;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          CareerPilot
        </p>
        <h1 className="mt-3 text-6xl font-bold tracking-tight text-slate-950">404</h1>
        <p className="mt-3 text-sm text-slate-500">The page you're looking for doesn't exist.</p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />

            <Route path="/resume" element={<ResumePage />} />
            <Route path="/resume/result" element={<ResumeResult />} />

            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/interview/history" element={<InterviewHistory />} />

            <Route path="/roadmap" element={<CareerRoadmap />} />
            <Route path="/jobs" element={<JobRecommendations />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}