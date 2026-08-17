const features = [
  {
    number: "01",
    title: "AI Resume Analysis",
    description:
      "Upload your resume and get an intelligent analysis of your strengths, weaknesses, missing skills, and improvement areas.",
  },
  {
    number: "02",
    title: "Skill Gap Detection",
    description:
      "Compare your current skills with the requirements of your target role and discover exactly what you need to learn.",
  },
  {
    number: "03",
    title: "AI Mock Interviews",
    description:
      "Practice realistic technical and behavioral interviews and receive structured feedback on your performance.",
  },
  {
    number: "04",
    title: "Personalized Roadmap",
    description:
      "Get a personalized learning roadmap based on your current skills, career goal, and identified skill gaps.",
  },
  {
    number: "05",
    title: "Job Recommendations",
    description:
      "Discover relevant job opportunities based on your profile, skills, experience, and career preferences.",
  },
  {
    number: "06",
    title: "Career Readiness Score",
    description:
      "Track your overall career readiness through resume quality, skills, interview performance, and learning progress.",
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="bg-slate-950 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-500">
            Everything you need
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            One platform for your
            <span className="text-blue-500"> entire career journey</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            CareerPilot combines resume intelligence, skill analysis,
            interview practice, and personalized career planning into one
            intelligent platform.
          </p>

        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/[0.05]"
            >

              <div className="flex items-center justify-between">

                <span className="text-sm font-semibold text-blue-500">
                  {feature.number}
                </span>

                <div className="h-2 w-2 rounded-full bg-blue-500 opacity-60 transition group-hover:scale-150 group-hover:opacity-100" />

              </div>

              <h3 className="mt-8 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>

              <div className="mt-6 text-sm font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
                Explore feature →
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Features