export default function Testimonials() {
  const reviews = [
    {
      name: "Aarav Sharma",
      role: "Software Engineer",
      content: "CareerPilot made updating my resume and practicing mock interviews so seamless! Got 2 offers within a month.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Priya Patel",
      role: "Product Designer",
      content: "The AI roadmap feature helped me bridge my skill gaps systematically. Highly recommended for candidates!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Rohan Verma",
      role: "Data Analyst",
      content: "The job recommendation engine matches actual skills rather than generic keywords. Game changer!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loved by Job Seekers & Professionals
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            See how CareerPilot has helped tech talent level up their career path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{item.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-white text-sm font-semibold">{item.name}</h4>
                  <p className="text-slate-400 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}