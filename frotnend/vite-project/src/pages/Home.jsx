import React, { useState } from "react";
import { Link } from "react-router-dom";
// ResumeBuilderLanding.react.jsx
// Single-file production-ready React component (Tailwind CSS required)
// - Exports default React component
// - Uses Tailwind utility classes for layout and styling
// - Simple interactive template selector and pricing CTA

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [plan, setPlan] = useState("monthly");

  const templates = [
    {
      id: "modern",
      title: "Modern",
      tag: "Popular",
      desc: "Clean, ATS-friendly with bold headings.",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "creative",
      title: "Creative",
      tag: "Design",
      desc: "Color accents and a two-column layout.",
      img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "corporate",
      title: "Corporate",
      tag: "Minimal",
      desc: "Conservative, perfect for corporate roles.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "onepage",
      title: "One-Page",
      tag: "Compact",
      desc: "Concise one page to highlight top wins.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="border-b bg-white/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-extrabold tracking-tight">
              ResumeForge
            </div>
            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
              Resume builder
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#templates" className="hover:underline">
              Templates
            </a>
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#pricing" className="hover:underline">
              Pricing
            </a>
            <a href="#faq" className="hover:underline">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-block px-4 py-2 rounded-lg text-sm font-medium">
              <Link to={"/login"}>Log in</Link>
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setSelectedTemplate(templates[0]);
              }}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Build a beautiful resume in minutes — no design skills required
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              Choose a template, customize content, and download a polished,
              ATS-friendly resume that helps you land interviews faster.
              Templates crafted by hiring experts.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setShowModal(true);
                  setSelectedTemplate(templates[0]);
                }}
                className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700"
              >
                Try a template
              </button>
              <a
                href="#features"
                className="px-5 py-3 rounded-lg border border-gray-200 text-sm flex items-center"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <strong>+5,000</strong>
                <span>resumes built</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <strong>4.8/5</strong>
                <span>average rating</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <strong>ATS-friendly</strong>
                <span>export as PDF / DOCX</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-indigo-600">
                    RF
                  </div>
                  <div>
                    <div className="text-sm font-medium">Preview</div>
                    <div className="text-xs text-gray-500">
                      Modern template • One-click edit
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Auto-save</div>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <div className="h-[520px] overflow-hidden rounded-md">
                  {/* Simple mock resume preview */}
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-full bg-gray-200" />
                      <div>
                        <h3 className="text-xl font-bold">Alex Johnson</h3>
                        <p className="text-sm text-gray-500">
                          Product Designer • San Francisco, CA
                        </p>
                        <div className="mt-3 text-xs text-gray-500 flex gap-2">
                          alex@example.com • (555) 555-0123 •
                          linkedin.com/in/alex
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold">Experience</h4>
                        <div className="mt-2 text-sm text-gray-700 leading-relaxed">
                          <strong>Senior Product Designer</strong>
                          <div className="text-xs text-gray-500">
                            Acme Inc • 2021 — Present
                          </div>
                          <ul className="mt-2 list-disc pl-5 text-gray-600 text-sm">
                            <li>Led redesign increasing conversion by 17%.</li>
                            <li>
                              Built design system used across 10+ products.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">Skills</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            "Figma",
                            "Sketch",
                            "Prototyping",
                            "User Research",
                          ].map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2 py-1 border rounded text-gray-600"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-semibold">Education</h4>
                      <div className="mt-2 text-sm text-gray-700">
                        B.Sc. in Design — University of Creativity
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">Export: PDF · DOCX</div>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-2 rounded-md border text-sm">
                    Edit
                  </button>
                  <button className="px-3 py-2 rounded-md bg-indigo-600 text-white">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section id="templates" className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Choose a template</h2>
              <p className="text-gray-600 mt-1">
                Quickly start from professional templates designed for hiring
                managers.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Filters • Categories • Clear
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((t) => (
              <article
                key={t.id}
                className="group relative bg-white rounded-xl shadow hover:shadow-lg border cursor-pointer transform hover:-translate-y-1 transition overflow-hidden"
              >
                <div className="h-40 bg-gray-100 rounded-t-xl overflow-hidden relative">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                  />

                  {/* Hover Button */}
                  <button
                    onClick={() => {
                      setSelectedTemplate(t);
                      setShowModal(true);
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                  >
                    <span className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow">
                      Use this template
                    </span>
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t.title}</h3>
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{t.desc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTemplate(t);
                        setShowModal(true);
                      }}
                      className="px-3 py-2 rounded-md text-sm border"
                    >
                      Preview
                    </button>
                    <button className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">
                      Use
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold">Smart Editor</h4>
            <p className="mt-2 text-sm text-gray-600">
              Inline editing, auto-formatting and helper tips to craft stronger
              bullets.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold">ATS Optimized</h4>
            <p className="mt-2 text-sm text-gray-600">
              Templates are structured to be friendly for Applicant Tracking
              Systems.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold">Export & Share</h4>
            <p className="mt-2 text-sm text-gray-600">
              Download PDF/DOCX or share an online resume link with one click.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pricing</h2>
              <p className="text-gray-600 mt-1">
                Free templates + premium plans for advanced exports and
                templates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlan("monthly")}
                className={`px-4 py-2 rounded ${
                  plan === "monthly" ? "bg-indigo-600 text-white" : "border"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPlan("yearly")}
                className={`px-4 py-2 rounded ${
                  plan === "yearly" ? "bg-indigo-600 text-white" : "border"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="font-semibold">Free</h3>
              <div className="mt-4 text-3xl font-extrabold">$0</div>
              <p className="mt-2 text-sm text-gray-600">
                Basic templates, inline editor, export watermark.
              </p>
              <button className="mt-6 w-full py-3 rounded-md border">
                Start free
              </button>
            </div>

            <div className="p-6 bg-white rounded-lg border shadow-lg transform scale-100 lg:scale-105">
              <h3 className="font-semibold">Pro</h3>
              <div className="mt-4 text-3xl font-extrabold">
                {plan === "monthly" ? "$9/mo" : "$79/yr"}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                All templates, export without watermark, priority support.
              </p>
              <button className="mt-6 w-full py-3 rounded-md bg-indigo-600 text-white">
                Choose Pro
              </button>
            </div>

            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="font-semibold">Teams</h3>
              <div className="mt-4 text-3xl font-extrabold">Contact us</div>
              <p className="mt-2 text-sm text-gray-600">
                Centralized billing & team templates.
              </p>
              <button className="mt-6 w-full py-3 rounded-md border">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 bg-indigo-600 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">
                Ready to build your resume?
              </h3>
              <p className="mt-2 text-indigo-100">
                Try a professional template and export a resume that stands out.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-3 rounded-lg bg-white text-indigo-700 font-semibold">
                Start for free
              </button>
              <button className="px-5 py-3 rounded-lg border border-white/30">
                See templates
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12">
          <h3 className="text-xl font-bold">Frequently asked questions</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <details className="p-4 bg-white rounded shadow">
              <summary className="font-medium">
                Are the templates ATS friendly?
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                Yes — we structure content and use safe fonts so applicant
                tracking systems can parse sections reliably.
              </p>
            </details>

            <details className="p-4 bg-white rounded shadow">
              <summary className="font-medium">Can I export to DOCX?</summary>
              <p className="mt-2 text-sm text-gray-600">
                Yes, Pro plan supports DOCX and PDF export without watermark.
              </p>
            </details>
          </div>
        </section>

        <footer className="mt-16 border-t pt-8 pb-20 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} ResumeForge — Crafted with ❤️
            </div>
            <div className="flex gap-4">
              <a>Terms</a>
              <a>Privacy</a>
              <a>Contact</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedTemplate.title} template
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTemplate.desc}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-md overflow-hidden border">
                <img
                  src={selectedTemplate.img}
                  alt="template"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div>
                <div className="text-sm text-gray-700">
                  Preview the template and try the editor with sample data.
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white"
                    onClick={() => {
                      alert("Editor would open — integrate your editor here");
                    }}
                  >
                    Try Editor
                  </button>
                  <button
                    className="px-4 py-2 rounded-md border"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <strong>What you get:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Customizable sections</li>
                    <li>ATS-optimized structure</li>
                    <li>PDF / DOCX export</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
