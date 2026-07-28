import { useEffect, useState } from "react";
import ApiAlert from "./ApiAlert.jsx";

export default function Shimmer() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7f4eb] dark:bg-zinc-950 py-10">
      {showAlert ? <ApiAlert /> : null}
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <div className="h-4 w-36 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-zinc-300 dark:bg-zinc-800" />
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, idx) => (
            <div
              className="rounded-lg border border-zinc-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900"
              key={idx}
            >
              <div className="flex gap-4">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-9 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
