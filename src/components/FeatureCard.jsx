import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  FileSearch,
  MessageSquareText,
  SlidersHorizontal,
} from "lucide-react";
import {useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const features = [
  {
    title: "Smart Resume Analysis",
    description:
      "Turn resumes into targeted prompts that match the candidate's real experience.",
    icon: FileSearch,
    tone: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Job Description Matching",
    description:
      "Generate role-specific questions from job requirements and seniority signals.",
    icon: BookOpenCheck,
    tone: "text-sky-600 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Skill-Based Questions",
    description:
      "Cover technical depth, communication, ownership, and problem solving.",
    icon: BrainCircuit,
    tone: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "AI-Powered Feedback",
    description:
      "Review responses with clear scoring, gaps, and practical improvement notes.",
    icon: MessageSquareText,
    tone: "text-rose-600 bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Custom Templates",
    description:
      "Reuse interview structures across teams, roles, and recurring hiring loops.",
    icon: SlidersHorizontal,
    tone: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Interview Analytics",
    description:
      "Track prep quality and performance patterns so progress is easy to see.",
    icon: BarChart3,
    tone: "text-lime-700 bg-lime-500/10 border-lime-500/20",
  },
];

export default function FeatureCard() {
  const sectionRef = useRef();

useGSAP(() => {
  gsap.from(".feature-card", {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
      once: true
    },
  });
}, { scope: sectionRef });
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
            Practice System
          </p>
          <h2 className="font-display text-3xl font-bold text-zinc-950 dark:text-white md:text-5xl">
            Everything you need for sharper interview prep.
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            A focused workspace for turning raw resumes and job descriptions
            into useful practice, feedback, and momentum.
          </p>
        </div>

        <div ref={sectionRef}  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon, tone }) => (
            <article
              className="feature-card hover-lift-3d group relative overflow-hidden rounded-lg border border-zinc-200/80 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/70 dark:hover:border-white/20"
              key={title}
            >
              <div
                className={`mb-8 flex h-12 w-12 items-center justify-center rounded-lg border ${tone}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                {description}
              </p>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-zinc-900/20 via-zinc-900/5 to-transparent dark:from-white/25 dark:via-white/5" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
