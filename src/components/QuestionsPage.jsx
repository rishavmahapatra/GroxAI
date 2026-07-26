/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  CheckCircle2,
  Clipboard,
  Download,
  Eye,
  EyeOff,
  Lightbulb,
  RefreshCw,
  Search,
  Sparkles,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { url } from "@/components/config.jsx";
import ApiAlert from "./ApiAlert.jsx";
import { json } from "react-router-dom";
import RecentSessions from "./RecentSession.jsx";

const filters = [
  { label: "All", value: "all" },
  { label: "Needs Review", value: "hidden" },
  { label: "Revealed", value: "revealed" },
  { label: "Deep Dives", value: "deep" },
];

function getQuestionId(item, index) {
  return item.id ?? index + 1;
}

function createTextBundle(item, generatedAnswer, note) {
  return [
    `Question: ${item.question}`,
    item.answer ? `Suggested answer: ${item.answer}` : "",
    generatedAnswer ? `Deep dive: ${generatedAnswer}` : "",
    note ? `My note: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export default function QuestionsPage({ data, setData }) {
  const [answer, setAnswer] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("answers")) || {};
    } catch {
      return {};
    }
  });
  const [visible, setVisible] = useState({});
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("question_notes")) || {};
    } catch {
      return {};
    }
  });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [showColdStartAlert, setShowColdStartAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answer));
  }, [answer]);

  useEffect(() => {
    localStorage.setItem("question_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (loadingId !== null) {
      const timer = setTimeout(() => setShowColdStartAlert(true), 2000);
      return () => clearTimeout(timer);
    }
    setShowColdStartAlert(false);
  }, [loadingId]);

  const normalizedItems = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        itemId: getQuestionId(item, index),
        displayNumber: index + 1,
      })),
    [data],
  );
  const resumeID = JSON.parse(localStorage.getItem("resumeId"));
  console.log(resumeID);

  const stats = useMemo(() => {
    const total = normalizedItems.length;
    const revealed = normalizedItems.filter((item) => visible[item.itemId]).length;
    const deepDives = normalizedItems.filter((item) => answer[item.itemId]).length;
    const noted = normalizedItems.filter((item) => notes[item.itemId]?.trim()).length;

    return { total, revealed, deepDives, noted };
  }, [answer, normalizedItems, notes, visible]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return normalizedItems.filter((item) => {
      const matchesQuery = needle
        ? [item.question, item.answer, answer[item.itemId], notes[item.itemId]]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(needle)
        : true;

      const matchesFilter =
        filter === "all" ||
        (filter === "hidden" && !visible[item.itemId]) ||
        (filter === "revealed" && visible[item.itemId]) ||
        (filter === "deep" && Boolean(answer[item.itemId]));

      return matchesQuery && matchesFilter;
    });
  }, [answer, filter, normalizedItems, notes, query, visible]);

  const handleGetAnswer = (id) => {
    const item = normalizedItems.find((q) => q.itemId === id);

    async function fetchAnswer() {
      setLoadingId(id);
      try {
        const response = await fetch(`${url}/get_answer/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: item?.question, answer: item?.answer }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const result = await response.json();
        setAnswer((prev) => ({ ...prev, [id]: result.answer }));
        setVisible((prev) => ({ ...prev, [id]: true }));
      } catch (err) {
        console.error("Failed to fetch answer:", err);
        setAnswer((prev) => ({ ...prev, [id]: "Error fetching answer." }));
        setVisible((prev) => ({ ...prev, [id]: true }));
      } finally {
        setLoadingId(null);
      }
    }

    fetchAnswer();
  };

  const resetSession = () => {
    localStorage.removeItem("questions");
    localStorage.removeItem("answers");
    localStorage.removeItem("resumeId");
    localStorage.removeItem("question_notes");
    setData([]);
  };

  const revealAll = () => {
    setVisible(
      normalizedItems.reduce((acc, item) => {
        acc[item.itemId] = true;
        return acc;
      }, {}),
    );
  };

  const hideAll = () => {
    setVisible({});
  };

  const copyQuestion = async (item) => {
    const text = createTextBundle(item, answer[item.itemId], notes[item.itemId]);
    await navigator.clipboard.writeText(text);
    setCopiedId(item.itemId);
    setTimeout(() => setCopiedId(null), 1400);
  };

  return (
    <main className="h-[calc(100vh-64px)] overflow-hidden bg-[#f7f4eb] px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
      {showColdStartAlert ? <ApiAlert /> : null}

      <div className="mx-auto grid h-full max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="overflow-y-auto rounded-lg border border-zinc-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900 ">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Workspace
          </p>
          <h1 className="font-display text-3xl font-bold text-zinc-950 dark:text-white">
            Practice Session
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Search prompts, reveal model answers, take notes, and deepen the
            questions that need more work.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              ["Total", stats.total],
              ["Revealed", stats.revealed],
              ["Deep", stats.deepDives],
              ["Notes", stats.noted],
            ].map(([label, value]) => (
              <div
                className="rounded-lg border border-zinc-900/10 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5"
                key={label}
              >
                <p className="font-display text-2xl font-bold text-zinc-950 dark:text-white">
                  {value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{
                width: `${stats.total ? (stats.revealed / stats.total) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="mt-6 grid gap-2">
            <Button className="rounded-lg" onClick={revealAll} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Reveal All
            </Button>
            <Button className="rounded-lg" onClick={hideAll} variant="outline">
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Answers
            </Button>
            <Button className="rounded-lg" onClick={resetSession}>
              <RefreshCw className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </div>
          <div>
            <RecentSessions />
          </div>
        </aside>

        <section className="min-w-0 h-full overflow-y-auto">
          <header className="mb-4 rounded-lg border border-zinc-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  className="h-11 rounded-lg bg-zinc-50 pl-10 dark:bg-white/5"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions, answers, or notes"
                  value={query}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <Button
                    className="rounded-lg"
                    key={item.value}
                    onClick={() => setFilter(item.value)}
                    variant={filter === item.value ? "default" : "outline"}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button asChild className="rounded-lg" variant="outline">
                  <a
                    href={`${url}/download/${resumeID}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-4">
            {filteredItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-900/20 bg-white p-10 text-center dark:border-white/20 dark:bg-zinc-900">
                <p className="font-display text-2xl font-bold text-zinc-950 dark:text-white">
                  No matching questions
                </p>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                  Try another search term or switch filters.
                </p>
              </div>
            ) : null}

            {filteredItems.map((item) => {
              const isVisible = visible[item.itemId];
              const generatedAnswer = answer[item.itemId];
              const note = notes[item.itemId] || "";

              return (
                <article
                  className="rounded-lg border border-zinc-900/10 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
                  key={item.itemId}
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-zinc-950 font-display text-lg font-bold text-white dark:bg-white dark:text-zinc-950">
                      {String(item.displayNumber).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <p className="text-lg font-semibold leading-8 text-zinc-950 dark:text-white">
                          {item.question}
                        </p>
                        <span
                          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                            isVisible
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {isVisible ? "Reviewed" : "Needs Review"}
                        </span>
                      </div>

                      {isVisible ? (
                        <div className="mt-4 rounded-lg border border-emerald-600/20 bg-emerald-50 p-4 dark:bg-emerald-400/10">
                          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                            Suggested Answer
                          </p>
                          <p className="leading-7 text-zinc-700 dark:text-zinc-200">
                            {item.answer || "No suggested answer was returned."}
                          </p>
                        </div>
                      ) : null}

                      {generatedAnswer ? (
                        <div className="prose prose-zinc mt-4 max-w-none rounded-lg border border-sky-600/20 bg-sky-50 p-4 dark:prose-invert dark:bg-sky-400/10">
                          <ReactMarkdown>{generatedAnswer}</ReactMarkdown>
                        </div>
                      ) : null}

                      <div className="mt-4 rounded-lg border border-zinc-900/10 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5">
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                          <StickyNote className="h-4 w-4" />
                          Practice note
                        </label>
                        <textarea
                          className="min-h-20 w-full resize-y rounded-md border border-zinc-900/10 bg-white px-3 py-2 text-sm leading-6 text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100"
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [item.itemId]: e.target.value,
                            }))
                          }
                          placeholder="Write your example, gaps, or STAR story here..."
                          value={note}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row xl:w-44 xl:flex-col">
                      <Button
                        className="rounded-lg"
                        onClick={() =>
                          setVisible((prev) => ({
                            ...prev,
                            [item.itemId]: !prev[item.itemId],
                          }))
                        }
                        variant={isVisible ? "outline" : "default"}
                      >
                        {isVisible ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Show
                          </>
                        )}
                      </Button>

                      <Button
                        className="rounded-lg"
                        disabled={loadingId === item.itemId}
                        onClick={() => handleGetAnswer(item.itemId)}
                        variant="outline"
                      >
                        <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                        {loadingId === item.itemId
                          ? "Thinking..."
                          : generatedAnswer
                            ? "Refresh Deep"
                            : "Dive Deeper"}
                      </Button>

                      <Button
                        className="rounded-lg"
                        onClick={() => copyQuestion(item)}
                        variant="outline"
                      >
                        <Clipboard className="mr-2 h-4 w-4" />
                        {copiedId === item.itemId ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
