import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        {/* BRAND & COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
              C
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Career<span className="text-blue-600">Pilot</span>
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            © {currentYear} CareerPilot. All rights reserved.
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4 md:mt-0">
          <Link to="/" className="text-xs font-medium text-slate-600 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/roadmap" className="text-xs font-medium text-slate-600 hover:text-blue-600 transition">
            Roadmap
          </Link>
          <Link to="/resume" className="text-xs font-medium text-slate-600 hover:text-blue-600 transition">
            Resume Builder
          </Link>
          <Link to="/interview" className="text-xs font-medium text-slate-600 hover:text-blue-600 transition">
            Mock Interview
          </Link>
          <Link to="/jobs" className="text-xs font-medium text-slate-600 hover:text-blue-600 transition">
            Jobs
          </Link>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 flex justify-center gap-4 md:mt-0">
          <a href="#" className="text-slate-400 hover:text-blue-600 transition">
            <Github size={18} />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition">
            <Twitter size={18} />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition">
            <Linkedin size={18} />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}