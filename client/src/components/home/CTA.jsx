import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-slate-900 py-20 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Elevate Your Career?
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Join thousands of professionals using CareerPilot to accelerate their career growth.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
        >
          Get Started For Free
        </Link>
      </div>
    </section>
  );
}