import { Link, useLocation } from "react-router-dom";
import { ArrowUp, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const scrollToSection = (section) => {
    if (location.pathname === "/") {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.location.href = `/#${section}`;
    }
  };

  const scrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_1fr_1fr_1fr]
            lg:gap-12
          "
        >
          {/* BRAND */}
          <div className="max-w-sm">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2"
            >
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  bg-slate-950
                  text-sm
                  font-bold
                  text-white
                  transition
                  group-hover:bg-blue-600
                "
              >
                C
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                Career<span className="text-blue-600">Pilot</span>
              </span>
            </button>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your AI-powered career companion for building skills,
              improving your resume, preparing for interviews and
              discovering relevant opportunities.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-xs
                  font-bold
                  text-slate-500
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                  hover:text-slate-900
                "
              >
                GH
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-slate-200
                  text-xs
                  font-bold
                  text-slate-500
                  transition
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                in
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Product
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                to="/resume"
                className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-blue-600"
              >
                Resume Builder
                <ArrowRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/interview"
                className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-blue-600"
              >
                Mock Interview
                <ArrowRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/roadmap"
                className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-blue-600"
              >
                Career Roadmap
                <ArrowRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                to="/jobs"
                className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-blue-600"
              >
                Job Recommendations
                <ArrowRight
                  size={13}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Explore
            </h3>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                How It Works
              </button>

              <button
                onClick={() => scrollToSection("stats")}
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Stats
              </button>

              <button
                onClick={() => scrollToSection("testimonials")}
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Testimonials
              </button>
            </div>
          </div>

          {/* GET STARTED */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Get Started
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Build your career journey with tools designed around your
              goals.
            </p>

            <Link
              to="/register"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-600
              "
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            border-t
            border-slate-100
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-xs text-slate-400">
            © {currentYear} CareerPilot. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              text-xs
              font-semibold
              text-slate-500
              transition
              hover:text-blue-600
            "
          >
            Back to top

            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-lg
                border border-slate-200
                transition
                group-hover:border-blue-200
                group-hover:bg-blue-50
              "
            >
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}