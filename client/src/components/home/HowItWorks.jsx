const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Create Your Profile",
    description:
      "Tell CareerPilot about your education, skills, experience, target role, and career goals.",
    tag: "Your Profile",
  },
  {
    number: "02",
    icon: "📄",
    title: "Analyze Your Resume",
    description:
      "Upload your resume and get insights into your skills, experience, projects, strengths, and weaknesses.",
    tag: "AI Analysis",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Find Your Skill Gaps",
    description:
      "CareerPilot compares your current profile with your target role and identifies the skills you need to improve.",
    tag: "Skill Intelligence",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Become Career Ready",
    description:
      "Follow your personalized roadmap, practice AI interviews, track progress, and improve your career readiness.",
    tag: "Career Growth",
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-950 px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Your journey starts here
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            From
            <span className="text-slate-500"> confusion </span>
            to
            <span className="text-blue-500"> career clarity.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            CareerPilot transforms your current profile into a clear,
            data-driven path toward your dream career.
          </p>

        </div>

        {/* Journey */}
        <div className="relative mt-20">

          {/* Connecting line */}
          <div className="absolute left-1/2 top-8 hidden h-0.5 w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative"
              >

                {/* Step circle */}
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-900 text-2xl shadow-lg shadow-blue-500/10 transition duration-300 group-hover:-translate-y-2 group-hover:border-blue-400 group-hover:bg-blue-500/10 group-hover:shadow-blue-500/20">
                  {step.icon}
                </div>

                {/* Card */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition duration-300 group-hover:-translate-y-2 group-hover:border-blue-500/30 group-hover:bg-white/[0.05]">

                  {/* Number */}
                  <div className="text-xs font-bold tracking-widest text-blue-500">
                    STEP {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>

                  {/* Tag */}
                  <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                    {step.tag}
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Bottom message */}
        <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-6 text-center">

          <p className="text-sm text-slate-300">
            <span className="font-semibold text-blue-400">
              Your career is not a guessing game.
            </span>{" "}
            CareerPilot uses your data, skills, and goals to help you make
            smarter career decisions.
          </p>

        </div>

      </div>
    </section>
  )
}

export default HowItWorks