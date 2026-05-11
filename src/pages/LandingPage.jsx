import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-white text-gray-900">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.1),_transparent_35%)]" />
      <div className="absolute -bottom-12 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.08),_transparent_55%)] blur-3xl" />

      <nav className="relative z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-gray-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 ring-1 ring-cyan-200">
              RB
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                AI Powered Resumes Builder
              </p>
              <p className="text-xs text-gray-500">AI-powered resume studio</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <a href="#features" className="transition hover:text-gray-900">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-gray-900">
              How It Works
            </a>
            <Link to="/resume" className="transition hover:text-gray-900">
              Templates
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="">
            <div className="w-[100%] lg:w-[100%]">
              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                AI Powered Resumes Builder
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create interview-ready resumes with intelligent suggestions,
                ATS-friendly templates, and one-click downloads. Get tailored
                feedback from our AI engine and turn experience into
                opportunity.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/builder"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                >
                  Start Building
                </Link>
                <Link
                  to="/analyzer"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 px-8 py-4 text-base font-semibold text-gray-900 transition hover:border-cyan-400 hover:text-cyan-700"
                >
                  Upload Resume
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-gray-100 p-5 ring-1 ring-gray-200">
                  <p className="text-sm text-gray-600">Average build time</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">
                    5 min
                  </p>
                </div>
                <div className="rounded-3xl bg-gray-100 p-5 ring-1 ring-gray-200">
                  <p className="text-sm text-gray-600">AI suggestions</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">
                    Smart bullets
                  </p>
                </div>
                <div className="rounded-3xl bg-gray-100 p-5 ring-1 ring-gray-200">
                  <p className="text-sm text-gray-600">Templates</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">
                    30+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">
              Built for success
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Everything your resume needs to stand out.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Use our AI-enhanced workflow to produce resumes that look
              professional and perform reliably in applicant tracking systems.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-xl shadow-gray-100 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2v4c0 1.105 1.343 2 3 2s3-.895 3-2v-4c0-1.105-1.343-2-3-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2.5C9.239 2.5 7 4.738 7 7.5v1.26a8.002 8.002 0 00-4 7.24v.5c0 1.657 1.343 3 3 3h10c1.657 0 3-1.343 3-3v-.5a8.002 8.002 0 00-4-7.24V7.5C17 4.738 14.761 2.5 12 2.5z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Instant AI feedback
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Upload any resume and get AI-driven insights for stronger
                summaries, bullet points, and keywords.
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-xl shadow-gray-100 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5v15"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7.5 9.75h9"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7.5 14.25h9"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Modern templates
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Choose from polished, recruiter-friendly layouts that adapt to
                any industry.
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-xl shadow-gray-100 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-6a3 3 0 016 0v6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 17h14"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                ATS-ready export
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Download clean PDF resumes that stay readable by both hiring
                managers and applicant tracking systems.
              </p>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
        >
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Start with AI",
                description:
                  "Enter your details or upload your resume to get instant structure and section recommendations.",
              },
              {
                title: "Refine and customize",
                description:
                  "Edit your resume with intuitive controls, smart section suggestions, and polished content.",
              },
              {
                title: "Download and apply",
                description:
                  "Export a recruiter-ready PDF and keep your profile updated for every opportunity.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 shadow-xl shadow-gray-100"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
                  Step
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 py-10 text-center text-gray-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>
            &copy; 2026 ResumeBuilder Pro. Crafted for modern career builders.
          </p>
        </div>
      </footer>
    </div>
  );
}
