import LandingNavbar from "../components/layout/LandingNavbar";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Stats from "../components/home/Stats";
import CTA from "../components/home/CTA";
import Testimonials from "../components/home/Testimonials";

import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <LandingNavbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <CTA />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}