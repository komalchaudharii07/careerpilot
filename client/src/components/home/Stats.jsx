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
    <section className="border-y border-slate-200 bg-white px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-slate-200">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center px-4 text-center sm:px-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
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