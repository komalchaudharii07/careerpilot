import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="border-t border-slate-800 bg-slate-900 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
          Ready to Elevate Your Career?
        </h2>
        <p className="mb-8 text-lg text-slate-400">
          Join thousands of professionals using CareerPilot to accelerate their
          career growth.
        </p>
        <Link
          to="/register"
          className="inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
        >
          Get Started For Free
        </Link>
      </div>
    </section>
  );
}