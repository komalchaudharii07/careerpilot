const reviews = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    content:
      "CareerPilot made updating my resume and practicing mock interviews so seamless. It helped me stay focused throughout my preparation.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Priya Patel",
    role: "Product Designer",
    content:
      "The AI roadmap helped me understand my skill gaps and organize my learning journey in a much more structured way.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Rohan Verma",
    role: "Data Analyst",
    content:
      "The job recommendation experience made it easier to discover opportunities that actually aligned with my skills.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-slate-800/80 bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Community
          </p>

          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
              md:text-4xl
            "
          >
            Loved by Job Seekers & Professionals
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-slate-400
              sm:text-base
              sm:leading-7
            "
          >
            See how CareerPilot helps candidates build stronger resumes,
            prepare for interviews and move towards their career goals.
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {reviews.map((item) => (
            <article
              key={item.name}
              className="
                flex
                min-w-0
                flex-col
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/60
                p-5
                transition
                duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:bg-slate-900
                sm:p-6
              "
            >
              {/* QUOTE */}
              <div className="mb-6 flex-1">
                <span className="text-3xl font-serif leading-none text-blue-500/60">
                  “
                </span>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-slate-300
                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  {item.content}
                </p>
              </div>

              {/* USER */}
              <div className="flex items-center gap-3 border-t border-slate-800 pt-5">
                <img
                  src={item.avatar}
                  alt=""
                  className="
                    h-10
                    w-10
                    shrink-0
                    rounded-full
                    border
                    border-slate-700
                    object-cover
                  "
                />

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {item.name}
                  </h4>

                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}