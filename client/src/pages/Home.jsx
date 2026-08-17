import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;