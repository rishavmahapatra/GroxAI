import { Clock3, FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { url } from "@/components/config.jsx";
import Shimmer from "./Shimmer";

export default function RecentSessions({ compact = false, setData ,setVisible,setNotes }) {
 const [sessions, setSessions] = useState([]);
 const [loading,setLoading] = useState(false);
  const getRecentSession = async function () {
    try{
      setLoading(true);
 const res = await fetch(
      `${url}/getRecentSessions/${JSON.parse(localStorage.getItem("user")).email}`,
    );
      if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const session = await res.json();
    setSessions(session);
  }catch(err){
    console.log("Can't fetch sessions:", err);
  }
  finally{
    setLoading(false)
  }
    }
   
  useEffect(() => {
    getRecentSession();
  }, []);

function timeAgo(date) {
  const now = new Date();
  const uploaded = new Date(date);

  const diffInSeconds = Math.floor((uploaded.getTime() - now.getTime()) / 1000);

  const intervals = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  for (const interval of intervals) {
    const value = Math.trunc(diffInSeconds / interval.seconds);

    if (Math.abs(value) >= 1) {
      return rtf.format(value, interval.unit);
    }
  }

  return "just now";
}
  return ( 
    <section className="bg-white py-4 sm:py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-5">
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
{loading ? <Shimmer /> :
        <div className="space-y-4 ">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="group shrink-0 flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
            >
              <div
                className={`flex flex-col gap-4 ${
                  compact ? "" : "sm:flex-row sm:items-center justify-between"
                }`}
              >
                <div className="flex items-start gap-4 ">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400">
                    <FileText className="h-6 w-6 shrink-0" />
                  </div>

                  <div>
                    <h3 className="font-semibold line-clamp-4 text-zinc-900 dark:text-white">
                      {session.filename}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock3 className="h-4 w-4 shrink-0" />
                        {timeAgo(session.uploadedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={()=>{localStorage.setItem("questions",JSON.stringify(session.questions)),setNotes({}),setData(session.questions),setVisible({}),localStorage.setItem("resumeId", JSON.stringify(session._id))}} className="flex items-center gap-2 font-medium text-sky-600 transition group-hover:gap-3 dark:text-sky-400">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </section>
  );
  
}
