// "use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  Sparkles,
  Target,
  UploadCloud,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import Footer1 from "./Footer1";
import { Button } from "./ui/button";
import { useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package

gsap.registerPlugin(ScrollTrigger) 

const proofPoints = [
  "Free to start",
  "Google sign-in",
  "Instant feedback",
];

const steps = [
  {
    title: "Upload your resume or role",
    description:
      "Start with a resume, job description, or both so the practice session has useful context.",
    icon: UploadCloud,
  },
  {
    title: "Generate a focused question set",
    description:
      "Get a balanced mix of technical, behavioral, and role-specific questions.",
    icon: Sparkles,
  },
  {
    title: "Practice with feedback",
    description:
      "Review your answers, spot weak areas, and repeat with clearer direction.",
    icon: MessageSquareText,
  },
];

const benefits = [
  {
    title: "Faster prep cycles",
    description:
      "Move from raw job post to practice session without building question lists by hand.",
    icon: Clock3,
    stat: "80%",
    label: "less setup time",
  },
  {
    title: "Sharper answer quality",
    description:
      "See where answers are vague, missing examples, or drifting from the role.",
    icon: Target,
    stat: "95%",
    label: "coverage clarity",
  },
  {
    title: "Role-aware practice",
    description:
      "Keep each session aligned to the actual skills, seniority, and expectations.",
    icon: FileText,
    stat: "60%",
    label: "less guesswork",
  },
];

const testimonials = [
  {
    quote:
      "The questions feel role-specific, and the feedback makes it obvious what to fix next.",
    name: "Ananya",
    title: "Frontend candidate",
  },
  {
    quote:
      "I stopped over-preparing and started iterating. Much faster to get to solid answers.",
    name: "Karan",
    title: "SWE interview prep",
  },
  {
    quote:
      "Great for turning a job description into a practice plan without guessing what matters.",
    name: "Meera",
    title: "Product-minded engineer",
  },
];

export default function Land() {
  const hero = useRef();

  useGSAP(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    
      gsap.from(".herosection", {
        y: 80,
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out",
      });
    gsap.to(".heroScroll", {
      y: 30,
      scale: 1.1,
      scrollTrigger: {
        trigger: ".heroScroll",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    const sectionAnimation = (target) => {
      gsap.from(target, {
        y: 50,
        opacity: 0,
        scale: 0.94,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: target,
          start: "top 95%",
          once: true,
          end: "top 30%",
          scrub: 0.5,
        },
      });
    };
    
    sectionAnimation("#featureCard");
    sectionAnimation("#howItWorks");
    sectionAnimation("#benefits");
    sectionAnimation("#feedback");
    sectionAnimation(".footerbanner");

  }, []);
  const navigate = useNavigate();

  return (
    <main ref={hero} className=" overflow-hidden">
      <section
        
        className="hero relative isolate px-4 pb-20 pt-28 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#f7f4eb_0%,#e8f2ef_44%,#f3e8df_100%)] dark:bg-[linear-gradient(135deg,#070707_0%,#101817_48%,#1b1712_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] [background-size:25px_25px] dark:opacity-[0.1] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-500/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 top-24 -z-10 h-[520px] w-[520px] rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/10"
        />

        <div className="scene-3d herosection mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/65 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-zinc-200">
            <Zap className="h-4 w-4 text-amber-500" />
            AI interview practice built for real roles
          </div>
{/* <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-blue-500/20" /> */}
           <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Ace every interview with{" "}
            <br></br>
            <span className="bg-gradient-to-r from-indigo-600 dark:from-indigo-500 via-blue-500 to-sky-500 dark:to-sky-400 bg-clip-text text-transparent">AI-powered practice</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 dark:text-zinc-200 sm:text-xl">
            Prepare with questions tailored to your resume and job description,
            then improve with clear AI feedback before the real interview.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              className="h-12 rounded-lg bg-zinc-950 px-6 text-base font-semibold text-white shadow-xl shadow-zinc-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              onClick={() => navigate("/home")}
            >
              Start Practicing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* <Button
              variant="outline"
              className="h-12 rounded-lg border-zinc-300 bg-white/70 px-6 text-base font-semibold text-zinc-900 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              onClick={() => navigate("/demo")}
            >
              Try Demo
            </Button> */}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {proofPoints.map((point) => (
              <span className="inline-flex items-center gap-2" key={point}>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {point}
              </span>
            ))}
          </div>

          <div className="heroScroll hidden sm:block relative mt-12 w-full max-w-5xl">
            <div className="hero-device-3 w-full rounded-lg border border-zinc-900/10 bg-zinc-950 p-3 text-left shadow-2xl shadow-zinc-900/20 transition duration-500 dark:border-white/10">
              <div className="rounded-md bg-[#f8f5ec] p-4 dark:bg-zinc-900">
                <div className="mb-4 flex flex-col gap-3 border-b border-zinc-900/10 pb-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Live Session
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Frontend engineer interview prep
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center sm:w-[320px]">
                    {[
                      ["92", "fit"],
                      ["12", "questions"],
                      ["8m", "setup"],
                    ].map(([value, label]) => (
                      <div
                        className="rounded-md border border-zinc-900/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-zinc-950"
                        key={label}
                      >
                        <p className="font-display text-xl font-bold text-zinc-950 dark:text-white">
                          {value}
                        </p>
                        <p className="text-[11px] font-semibold uppercase text-zinc-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[0.9fr_1.4fr_0.9fr]">
                  <div className="panel-3d relative rounded-lg border border-zinc-900/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Source
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="h-3 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                  <div className="mt-6 rounded-lg bg-amber-100 p-3 text-sm font-semibold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">
                    Resume matched to frontend engineer role
                  </div>
                  </div>

                  <div className="panel-3d relative rounded-lg border border-zinc-900/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Practice Queue
                    </p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                      12 questions
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      "Tell me about a UI performance issue you solved.",
                      "How would you structure a reusable component system?",
                      "Walk through a tradeoff you made under deadline.",
                    ].map((question, index) => (
                      <div
                        className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm font-medium text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
                        key={question}
                      >
                        <span className="mr-3 text-zinc-400">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        {question}
                      </div>
                    ))}
                  </div>
                  </div>

                  <div className="panel-3d relative rounded-lg border border-zinc-900/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Feedback
                  </p>
                  <div className="mt-5 flex items-end gap-2">
                    {[55, 72, 64, 88].map((height, index) => (
                      <div
                        className="w-full rounded-t bg-sky-500/80"
                        key={height}
                        style={{ height: `${height}px`, opacity: 0.75 + index * 0.06 }}
                      />
                    ))}
                  </div>
                  <p className="mt-5 rounded-lg bg-sky-100 p-3 text-sm font-semibold text-sky-950 dark:bg-sky-400/15 dark:text-sky-200">
                    Strong examples. Add measurable impact to answer 2.
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="featureCard" className="min-h-screen py-20">
  <FeatureCard />
</div>

      <section id="howItWorks" className="bg-white py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className=" mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Workflow
            </p>
            <h2 className="font-display text-3xl font-bold text-zinc-950 dark:text-white md:text-5xl">
              From upload to better answers in three steps.
            </h2>
          </div>

          <div className="grid new gap-4 lg:grid-cols-3">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <article
                className="hover-lift-3d rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                key={title}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-zinc-200 dark:text-white/15">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#f6f1e8] py-20 dark:bg-[#0d1110]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              Outcomes
            </p>
            <h2 className="font-display text-3xl font-bold text-zinc-950 dark:text-white md:text-5xl">
              Prep that feels concrete, not generic.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Interview Valley helps candidates practice against the role in
              front of them, with feedback that points to the next best edit.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon, stat, label }) => (
              <article
                className="hover-lift-3d rounded-lg border border-zinc-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950"
                key={title}
              >
                <Icon className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
                <p className="mt-8 font-display text-4xl font-bold text-zinc-950 dark:text-white">
                  {stat}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {label}
                </p>
                <h3 className="mt-8 text-lg font-semibold text-zinc-950 dark:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="feedback" className="bg-white py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Feedback Loop
            </p>
            <h2 className="font-display text-3xl font-bold text-zinc-950 dark:text-white md:text-5xl">
              Built to feel like real prep.
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Practice, review, and improve without rebuilding your plan from
              scratch each time.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map(({ quote, name, title }) => (
              <figure
                key={name}
                className="hover-lift-3d rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5"
              >
                <blockquote className="text-base leading-7 text-zinc-700 dark:text-zinc-200">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-white">
                      {name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {title}
                    </p>
                  </div>
                  <MessageSquareText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="footerbanner mt-14 overflow-hidden rounded-2xl border border-zinc-900/10 bg-[linear-gradient(135deg,#0b1220_0%,#1a1033_45%,#0b1f1a_100%)] px-6 py-12 text-white shadow-xl shadow-zinc-950/10 dark:border-white/10 sm:px-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Start today
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Turn the job post into a practice session in minutes.
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                  Upload context, get a focused set of questions, and iterate
                  with feedback until your answers sound like you.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button
                  className="h-12 rounded-lg bg-white px-6 text-base dark:text-white font-semibold text-zinc-950 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                  onClick={() => navigate("/signin")}
                >
                  Create My Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
