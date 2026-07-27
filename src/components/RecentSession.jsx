import { Clock3, FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { url } from "@/components/config.jsx";

export default function RecentSessions({ compact = false, setData }) {
  const [sessions, setSessions] = useState([]);
  const getRecentSession = async function () {
    const res = await fetch(
      `${url}/getRecentSession/${JSON.parse(localStorage.getItem("user")).email}`,
    );
    const session = await res.json();
    setSessions(session);
  };
  useEffect(() => {
    getRecentSession();
  }, []);
  return (
    <section className="bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Continue Practicing
            </p>

            <h2 className="text-3xl font-bold text-zinc-950 dark:text-white">
              Recent Sessions
            </h2>

            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
              Pick up where you left off or review previous interview sessions.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="group flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
            >
              <div
                className={`flex flex-col gap-4 items-center ${
                  compact ? "" : "sm:flex-row sm:items-center justify-between"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400">
                    <FileText className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {session.filename}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-4 w-4" />
                        {new Date(session.uploadedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={()=>{localStorage.setItem("questions",JSON.stringify(session.questions)),setData(session.questions)}} className="flex items-center gap-2 font-medium text-sky-600 transition group-hover:gap-3 dark:text-sky-400">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
