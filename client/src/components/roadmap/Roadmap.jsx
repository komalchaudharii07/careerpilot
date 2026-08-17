import LearningProgress from "./LearningProgress";
import RoadmapCard from "./RoadmapCard";

export default function Roadmap({ title = "Frontend Developer Career Path", steps }) {
  const defaultSteps = [
    {
      id: 1,
      title: "HTML & CSS Mastery",
      description: "Semantic HTML5, CSS Grid, Flexbox, and Tailwind CSS framework.",
      status: "completed",
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      description: "Promises, Async/Await, DOM Manipulation, and JS Engine fundamentals.",
      status: "completed",
    },
    {
      id: 3,
      title: "React Fundamentals",
      description: "Components, JSX, Props, State, Hooks, and React Router.",
      status: "in-progress",
    },
    {
      id: 4,
      title: "State Management & API Integration",
      description: "Redux Toolkit / Context API, Axios, and RESTful APIs consumption.",
      status: "pending",
    },
    {
      id: 5,
      title: "Fullstack Project & Deployment",
      description: "Build a production app, connect backend APIs, and deploy to Vercel.",
      status: "pending",
    },
  ];

  const currentSteps = steps || defaultSteps;
  const completedCount = currentSteps.filter((s) => s.status === "completed").length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500 mt-1">
          Follow this step-by-step roadmap to achieve your career goal.
        </p>
      </div>

      <LearningProgress completedCount={completedCount} totalCount={currentSteps.length} />

      <div className="space-y-4 pt-2">
        {currentSteps.map((step, index) => (
          <RoadmapCard
            key={step.id || index}
            stepNumber={index + 1}
            title={step.title}
            description={step.description}
            status={step.status}
          />
        ))}
      </div>
    </div>
  );
}