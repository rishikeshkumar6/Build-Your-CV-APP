import React, { useState } from "react";

const Preview = ({ data }) => {
  // Local state to manage active tab
  const [activeTab, setActiveTab] = useState("Overview");
  // Define the tabs to display in the UI
  const TABS = ["Overview", "Experience", "Education", "Projects", "Rewrites"];

  /* ── Score ring ─────────────────────────────────────────────────────────── */
  function ScoreRing({ score }) {
    const r = 22;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    return (
      <svg viewBox="0 0 56 56" className="w-14 h-14">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#16a34a"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
        <text
          x="28"
          y="33"
          textAnchor="middle"
          fontSize="13"
          fontWeight="500"
          fill="currentColor"
        >
          {score}
        </text>
      </svg>
    );
  }
  // Destructure data with fallback to empty objects/arrays to prevent errors
  const {
    name,
    email,
    phone,
    location,
    summary,
    skills,
    experiences,
    educations,
    projects,
    certifications,
    improvement,
  } = data || {};

  // Get initials for profile avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const totalRewrites = Object.values(improvement.rewrites).flat().length;
  const scoreLabel =
    improvement.score >= 80
      ? "Excellent"
      : improvement.score >= 60
        ? "Good"
        : "Needs work";
  const scoreLabelColor =
    improvement.score >= 80
      ? "text-green-600"
      : improvement.score >= 60
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans space-y-5">
      {/* ── Profile header ── */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-medium text-sm flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {name}
              </p>
              <p className="text-sm text-gray-500">{email}</p>
              {phone && <p className="text-sm text-gray-500">{phone}</p>}
              {location && <p className="text-sm text-gray-500">{location}</p>}
            </div>
          </div>
          {/* Score */}
          <div className="flex items-center gap-3">
            <ScoreRing score={improvement.score} />
            <div>
              <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                {improvement.score}
                <span className="text-sm text-gray-400">/100</span>
              </p>
              <p className={`text-xs font-medium ${scoreLabelColor}`}>
                {scoreLabel}
              </p>
            </div>
          </div>
        </div>
        {summary && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
            {summary}
          </p>
        )}
      </div>

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Skills", value: skills.length },
          { label: "Experience", value: experiences.length },
          { label: "Projects", value: projects.length },
          { label: "Rewrites", value: totalRewrites },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {m.label}
            </p>
            <p className="text-3xl font-medium text-gray-900 dark:text-gray-100">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-fit text-sm px-3 py-1.5 rounded-lg transition-all whitespace-nowrap
              ${
                activeTab === tab
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "Overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-green-600 mb-4 flex items-center gap-2">
                <span>✓</span> Strengths
              </p>
              <ul className="space-y-3">
                {improvement.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-green-500 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
                <span>↗</span> Areas to improve
              </p>
              <ul className="space-y-3">
                {improvement.improvements.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">
                      ↗
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
              Skills detected ({skills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Experience ── */}
      {activeTab === "Experience" && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {exp.title}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg whitespace-nowrap">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {activeTab === "Education" && (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-lg flex-shrink-0">
                🎓
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {edu.degree}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {edu.institution}
                </p>
                <span className="inline-block mt-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Projects ── */}
      {activeTab === "Projects" && (
        <div className="space-y-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                {proj.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.split(",").map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {certifications.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">
              No certifications added.
            </p>
          )}
        </div>
      )}

      {/* ── Rewrites ── */}
      {activeTab === "Rewrites" && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 space-y-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
            AI-suggested rewrites
          </p>
          {Object.entries(improvement.rewrites).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 pb-2 mb-3 capitalize">
                {section}
              </p>
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-none"
                >
                  <span className="text-gray-300 dark:text-gray-600 mt-1 flex-shrink-0">
                    •
                  </span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Preview;
