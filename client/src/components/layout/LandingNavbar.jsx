import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function LandingNavbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">

        <nav
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-slate-950/70
            px-4
            py-3
            shadow-lg
            shadow-black/10
            backdrop-blur-xl
            sm:px-5
          "
        >

          {/* LOGO */}

          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                text-sm
                font-bold
                text-white
              "
            >
              C
            </div>

            <span className="text-base font-bold tracking-tight text-white">
              Career<span className="text-blue-400">Pilot</span>
            </span>
          </button>

          {/* NAVIGATION */}

          <div className="hidden items-center gap-7 md:flex">

            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              How it works
            </button>

            <button
              onClick={() => scrollToSection("stats")}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Stats
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Testimonials
            </button>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="
                hidden
                rounded-xl
                px-4
                py-2
                text-sm
                font-semibold
                text-slate-300
                transition
                hover:bg-white/5
                hover:text-white
                sm:block
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-blue-500
                sm:text-sm
              "
            >
              Get started

              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>

          </div>

        </nav>
      </div>
    </header>
  );
}