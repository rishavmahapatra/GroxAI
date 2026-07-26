/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SignIn({ onLogin, user }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const profile = await response.json();

        localStorage.setItem("user", JSON.stringify(profile));

        user(profile);
        onLogin();
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },

    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f7f4eb] px-4 py-10 text-zinc-950 dark:bg-zinc-950 dark:text-white sm:px-6 lg:px-8 sm:py-0">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-zinc-900/10 bg-white shadow-2xl shadow-zinc-900/10 dark:border-white/10 dark:bg-zinc-900 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden bg-zinc-950 p-10 text-white lg:block">
            <div className="relative flex h-full flex-col justify-between">
              <Link
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white"
                to="/"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-zinc-950">
                  <img
                    alt="Logo"
                    className="h-7 w-7 object-cover"
                    src="/icon.avif"
                  />
                </div>

                <h1 className="font-display text-5xl font-bold leading-tight">
                  Prepare with a calmer, smarter workflow.
                </h1>

                <p className="mt-5 max-w-md text-lg leading-8 text-zinc-300">
                  Sign in to keep your generated interview sessions available
                  across devices.
                </p>
              </div>

              <div className="grid gap-3 text-sm font-semibold text-zinc-200">
                {[
                  "Resume-aware questions",
                  "Instant AI feedback",
                  "Saved practice history",
                ].map((item) => (
                  <span className="flex items-center gap-2" key={item}>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10 bg-primary-foreground">
            <Link
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white lg:hidden"
              to="/"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mx-auto max-w-sm py-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  Welcome
                </p>

                <h2 className="mt-3 font-display text-4xl font-bold">
                  Login or create an account.
                </h2>

                <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
                  Use Google to start quickly. Your interview prep stays synced
                  and easy to return to.
                </p>
              </div>

              <Button
              variant="outline"
                className="h-12 font-sans w-full rounded-lg text-base font-semibold"
                onClick={() => login()}
              >
                <span>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 48 48"
                    style={{ display: "block" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </span>
                Sign in with Google
              </Button>

              <div className="mt-6 flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-950 dark:bg-emerald-400/10 dark:text-emerald-100">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" />

                <p>
                  Authentication is only used to preserve your practice
                  sessions. You can continue using the app after sign-in.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
