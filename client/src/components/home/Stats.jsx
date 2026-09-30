import {
  Users,
  FileCheck2,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    value: "10K+",
    label: "Career profiles",
    icon: Users,
  },
  {
    value: "95%",
    label: "Resume improvement",
    icon: FileCheck2,
  },
  {
    value: "2.5K+",
    label: "Opportunities matched",
    icon: BriefcaseBusiness,
  },
  {
    value: "87%",
    label: "Users feel more prepared",
    icon: TrendingUp,
  },
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="border-y border-slate-800 bg-slate-950 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-slate-800">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  flex min-w-0
                  flex-col items-center
                  px-3 text-center
                  sm:px-5
                  lg:px-8
                "
              >
                {/* ICON */}
                <div
                  className="
                    mb-4 flex
                    h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    border border-slate-800
                    bg-slate-900
                    text-blue-400
                    sm:h-11 sm:w-11
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                {/* VALUE */}
                <p
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {stat.value}
                </p>

                {/* LABEL */}
                <p
                  className="
                    mt-1.5
                    max-w-[130px]
                    text-[11px]
                    font-medium
                    leading-5
                    text-slate-400
                    sm:max-w-none
                    sm:text-sm
                  "
                >
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}