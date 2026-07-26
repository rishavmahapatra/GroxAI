import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { url } from "@/components/config.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import QuestionsPage from "./QuestionsPage";
import Shimmer from "./Shimmer";
import RecentSessions from "./RecentSession";

const starterCards = [
  "Resume-aware technical prompts",
  "Behavioral questions mapped to the role",
  "AI answer guidance when you want to go deeper",
];

export default function Home() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const prevQuestions = JSON.parse(localStorage.getItem("questions"));
    if (prevQuestions) {
      setData(prevQuestions);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resume && !jobDescription) {
      setError("Upload a resume, job description, or both to begin.");
      return;
    }

    const formData = new FormData();
    if (resume) {
      formData.append("resume", resume);
    }
    if (jobDescription) {
      formData.append("files_upload", jobDescription);
    }
    formData.append("user_email", JSON.parse(localStorage.getItem("user")).email)

    setLoading(true);

    try {
      const response = await fetch(`${url}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.questions);
        localStorage.setItem("questions", JSON.stringify(result.questions));
        localStorage.setItem("resumeId", JSON.stringify(result.resumeId));
      } else {
        setError("Upload failed. Please check the file and try again.");
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setError("The server could not be reached. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Shimmer />;
  }

  if (data?.length > 0) {
    return <QuestionsPage data={data} setData={setData} />;
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7f4eb] px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center  gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden md:block">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
            <Sparkles className="h-4 w-4 text-amber-500" />
            New practice session
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-6xl">
            Build an interview set from your real materials.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Upload a resume or job description and turn it into a focused
            interview practice workspace in a few seconds.
          </p>

          <div className="mt-8 grid gap-3">
            {starterCards.map((item) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-zinc-900/10 bg-white/70 p-4 text-sm font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                key={item}
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-900/10 bg-white p-5 shadow-2xl shadow-zinc-900/10 dark:border-white/10 dark:bg-zinc-900">
          <div className="rounded-lg bg-zinc-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Session Builder
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Start with a file.
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-zinc-950">
                <UploadCloud className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Upload"],
                ["02", "Generate"],
                ["03", "Practice"],
              ].map(([number, label]) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/5 p-4"
                  key={label}
                >
                  <p className="font-display text-2xl font-bold">{number}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-zinc-900/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 h-5 w-5 text-zinc-500" />
              <div>
                <h3 className="font-semibold text-zinc-950 dark:text-white">
                  Resume or job description
                </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Upload PDF files only. Upload one or both
                  for stronger question matching.
                </p>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 h-12 w-full rounded-lg text-base font-semibold">
                  Upload and Generate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[92vw] rounded-lg sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    Upload practice materials
                  </DialogTitle>
                  <DialogDescription>
                    Add a resume, job description, or both. You can start with a
                    single file.
                  </DialogDescription>
                </DialogHeader>

                <form className="grid gap-5 pt-2" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="resume">Resume</Label>
                    <Input className="dark:file:text-gray-100"
                      id="resume"
                      onChange={(e) => setResume(e.target.files[0])}
                      type="file"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="jobDescription">Job description</Label>
                    <Input className="dark:file:text-gray-100"
                      id="jobDescription"
                      onChange={(e) => setJobDescription(e.target.files[0])}
                      type="file"
                    />
                  </div>

                  {error ? (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-400/10 dark:text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <Button className="h-11 w-full rounded-lg" type="submit">
                    Generate Questions
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
      <div className="mx-auto my-8 bg-zinc-200 rounded-sm p-2 max-w-7xl">
        <RecentSessions />
      </div>
      
    </main>
  );
}
