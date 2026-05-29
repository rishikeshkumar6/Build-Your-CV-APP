import { useState } from "react";

// ── New API JSON structure ────────────────────────────────────────────────────
const resumeData = {
  id: 1,
  name: "Rishikesh Kumar Singh",
  email: "rishikeshkumarsingh810@gmail.com",
  phone: "+9154359803948",
  location: "Dwarka, South West Delhi, Delhi, IND",
  summary:
    "Passionate software developer with 2.2 years of experience in building scalable React.js and Node.js applications. Skilled in developing logistics and real-time tracking systems using Redux Toolkit, FastAPI, and PostgreSQL.",
  created_at: "2026-05-25T16:53:28.041229+05:30",
  updated_at: "2026-05-25T16:53:46.635079+05:30",
  languages: [],
  achievements: [],
  certifications: [],
  skills: [
    { id: 12, name: "React.js" },
    { id: 11, name: "Node.js" },
    { id: 10, name: "PostgreSQL" },
    { id: 9, name: "FastAPI" },
    { id: 8, name: "Redux Toolkit" },
    { id: 7, name: "JavaScript" },
  ],
  experiences: [
    {
      id: 2,
      title: "Software Developer",
      company: "Omneelab Softwale Solutions",
      duration: "January 2024 - Present",
      description:
        "Contributed to the development of the Order Management module in a last-mile logistics webapp, consolidating orders from multiple e-commerce platforms. Designed and implemented a webhook-based automation system to fetch and display real-time orders from multiple marketplaces.",
    },
  ],
  educations: [
    {
      id: 2,
      degree: "B.Tech - Computer Science Engineering",
      institution: "Rabindranath Tagore University, Bhopal",
      year: "2019-2023",
    },
  ],
  projects: [
    {
      id: 4,
      name: "Logistic-solutions",
      description:
        "Developed a React/Redux-based system for real-time tracking of orders, courier details, payment status, and delivery timelines.",
      technologies: "JavaScript, React, Redux, PostgreSQL, Express.js",
    },
    {
      id: 3,
      name: "Build-your-CV",
      description:
        "Developed a user-centric interface for inventory management, including SKU tracking, batch/expiry monitoring, and warranty integration.",
      technologies: "JavaScript, React, Redux, Material UI, PostgreSQL",
    },
  ],
  improvement: {
    id: 1,
    resume_id: 1,
    score: 87.0,
    career_level: "Mid-level",
    improved_summary:
      "High-Performing Software Developer with 2.2 years of experience in building scalable applications using React.js, Node.js, and PostgreSQL. Skilled in developing real-time tracking systems and logistics solutions, with a focus on performance and user-centric design.",
    cover_letter_hook:
      "As a skilled software developer with experience in building scalable applications, I am excited to apply for [Job Title] at [Company Name].",
    score_breakdown: {
      ats_compatibility: 90,
      content_quality: 85,
      keyword_density: 83,
      formatting: 89,
      impact_language: 78,
    },
    strengths: [
      "Experienced Software Developer with a strong background in building scalable React.js and Node.js applications.",
      "Skilled in developing logistics and real-time tracking systems using Redux Toolkit, FastAPI, and PostgreSQL.",
      "Proven ability to create performant, user-centric solutions for e-commerce and last-mile delivery platforms.",
      "Proficient in a range of technologies including React, Redux, Node.js, Express.js, and PostgreSQL.",
      "Experience with web development frameworks and libraries such as React Hooks, Tailwind CSS, and Material UI.",
    ],
    improvements: [
      "Consider adding more detail to the experience section, including specific metrics and achievements.",
      "Use stronger action verbs such as 'Designed', 'Developed', and 'Managed' to enhance the impact of language.",
      "Incorporate more context about the company and the role in the experience section.",
      "Add a section on achievements or awards to highlight the candidate's success.",
      "Consider using a more concise and direct writing style to improve clarity.",
    ],
    critical_issues: [
      "The contact information section is missing, including phone number and location.",
      "The LinkedIn URL is formatted incorrectly and should be adjusted to match a standard LinkedIn URL.",
    ],
    missing_sections: [
      "Certifications",
      "LinkedIn URL",
      "Portfolio/Website URL",
    ],
    ats_keywords: {
      found: [
        "software developer",
        "react.js",
        "node.js",
        "postgresql",
        "fastapi",
        "redux toolkit",
        "real-time tracking",
        "logistics",
        "scalable applications",
      ],
      missing: [
        "javascript",
        "express.js",
        "mongodb",
        "sequelize",
        "webhook automation",
        "last-mile delivery",
        "e-commerce platforms",
        "ui/ux design",
        "agile development",
        "git/github",
      ],
    },
    skill_suggestions: {
      add: [
        "Cloud computing",
        "Containerization",
        "Microservices",
        "API Gateway",
        "Event-Driven Architecture",
        "Machine Learning",
        "Data Science",
        "Cyber Security",
      ],
      remove: [],
      reorder:
        "Reorder skills to prioritize the most relevant and technical skills first, followed by industry-specific and soft skills.",
    },
    rewrites: {
      experience: [
        "Contributed to the development of the Order Management module in a last-mile logistics webapp, consolidating orders from multiple e-commerce platforms.",
        "Designed and implemented a webhook-based automation system to fetch and display real-time orders from multiple marketplaces.",
      ],
      frontend: [
        "Developed responsive UI components using React Hooks, Redux Toolkit Query, and Tailwind CSS, connected to a FastAPI PostgreSQL backend.",
      ],
      project: [
        "Developed a React/Redux-based system for real-time tracking of orders, courier details, payment status, and delivery timelines.",
        "Created a user-centric interface for inventory management, including SKU tracking, batch/expiry monitoring, and warranty integration.",
      ],
    },
    target_roles: [
      "Software Developer",
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Backend Developer",
    ],
    industry_fit: [
      "E-commerce",
      "Logistics and Supply Chain Management",
      "Technology and Software Development",
    ],
    action_verbs: {
      current: [
        "Contributed",
        "Implemented",
        "Designed",
        "Developed",
        "Managed",
      ],
      suggested: [
        "Created",
        "Developed",
        "Engineered",
        "Architected",
        "Optimized",
      ],
    },
    linkedin_tips: [
      "Ensure the LinkedIn profile is up-to-date and consistent with the resume.",
      "Use the profile to demonstrate soft skills and personality traits.",
      "Engage with industry thought leaders and influencers to showcase expertise.",
    ],
    experience_tips: [
      "Use specific metrics and achievements to quantify the impact of each project and experience.",
      "Emphasize the technologies and frameworks used in each project or experience.",
      "Highlight the problems solved and the benefits delivered in each project or experience.",
      "Use action verbs like 'Designed', 'Developed', and 'Managed' to enhance the impact of language.",
    ],
  },
};

// ── Reusable UI primitives ────────────────────────────────────────────────────

const ScoreRing = ({ value }) => {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 85 ? "#2563eb" : value >= 70 ? "#d97706" : "#dc2626";
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth="9"
      />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x="55"
        y="60"
        textAnchor="middle"
        fontSize="22"
        fontWeight="600"
        fill={color}
      >
        {value}
      </text>
    </svg>
  );
};

const ProgressBar = ({ label, value }) => {
  const color =
    value >= 85 ? "bg-blue-500" : value >= 75 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-44 text-sm text-slate-500 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%`, transition: "width 1s ease" }}
        />
      </div>
      <span className="w-7 text-right text-sm font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
};

const Badge = ({ children, variant = "gray" }) => {
  const map = {
    gray: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red: "bg-red-50 text-red-700 border border-red-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${map[variant]}`}
    >
      {children}
    </span>
  );
};

const SectionCard = ({ title, icon, children, accent }) => (
  <div
    className={`bg-white rounded-2xl border ${accent || "border-slate-200"} p-5 shadow-sm`}
  >
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg">{icon}</span>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const Pill = ({ label, variant }) => {
  const map = {
    found: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    missing: "bg-red-50 text-red-800 border border-red-200",
    add: "bg-blue-50 text-blue-800 border border-blue-200",
    current: "bg-slate-100 text-slate-600",
    suggest: "bg-purple-50 text-purple-700 border border-purple-200",
    skill: "bg-slate-50 text-slate-700 border border-slate-200",
    tech: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium m-0.5 ${map[variant]}`}
    >
      {label}
    </span>
  );
};

const RewriteBlock = ({ text, color = "green" }) => {
  const map = {
    green: "border-l-4 border-emerald-400 bg-emerald-50 text-emerald-900",
    blue: "border-l-4 border-blue-400 bg-blue-50 text-blue-900",
  };
  return (
    <p
      className={`text-sm leading-relaxed rounded-r-lg px-4 py-3 mb-2 ${map[color]}`}
    >
      {text}
    </p>
  );
};

const ListItem = ({ icon, text, dot }) => {
  const dotMap = {
    green: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };
  return (
    <div className="flex gap-3 items-start py-2.5 border-b border-slate-100 last:border-0">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold ${dotMap[dot]}`}
      >
        {icon}
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
    <span className="text-xs text-slate-400 w-20 shrink-0 pt-0.5">{label}</span>
    <span className="text-sm text-slate-700 break-all">
      {value || <span className="italic text-slate-300">—</span>}
    </span>
  </div>
);

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = ["Overview", "Profile", "Keywords", "Rewrites", "Skills", "Tips"];

export default function ResumeImprovementDashboard({ data }) {
  const [activeTab, setActiveTab] = useState("Overview");

  // ── Destructure for easy access ───────────────────────────────────────────────
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
    improvement,
  } = data;
  const {
    score,
    career_level,
    improved_summary,
    cover_letter_hook,
    score_breakdown,
    strengths,
    improvements,
    critical_issues,
    missing_sections,
    ats_keywords,
    skill_suggestions,
    rewrites,
    target_roles,
    industry_fit,
    action_verbs,
    linkedin_tips,
    experience_tips,
  } = improvement;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Top header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
        <div>
          <p className="text-xs text-slate-400 mb-0.5 tracking-wide uppercase">
            Resume analysis · ID #{data.id}
          </p>
          <h1 className="text-xl font-semibold text-slate-900">{name}</h1>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <Badge variant="gray">{career_level}</Badge>
            <Badge variant="blue">Software Developer</Badge>
            <Badge variant="green">E-commerce · Logistics</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ScoreRing value={Math.round(score)} />
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(score)}
              <span className="text-slate-300 text-lg font-normal">/100</span>
            </p>
            <p className="text-xs text-slate-400">Overall score</p>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* ══ OVERVIEW ══ */}
        {activeTab === "Overview" && (
          <>
            {/* Score breakdown */}
            <SectionCard title="Score breakdown" icon="📊">
              <ProgressBar
                label="ATS compatibility"
                value={score_breakdown.ats_compatibility}
              />
              <ProgressBar
                label="Formatting"
                value={score_breakdown.formatting}
              />
              <ProgressBar
                label="Content quality"
                value={score_breakdown.content_quality}
              />
              <ProgressBar
                label="Keyword density"
                value={score_breakdown.keyword_density}
              />
              <ProgressBar
                label="Impact language"
                value={score_breakdown.impact_language}
              />
            </SectionCard>

            {/* Critical issues */}
            <SectionCard
              title="Critical issues"
              icon="🚨"
              accent="border-red-300"
            >
              <div className="mb-3">
                <Badge variant="red">
                  {critical_issues.length} issues found
                </Badge>
              </div>
              {critical_issues.map((issue, i) => (
                <ListItem key={i} icon="!" text={issue} dot="red" />
              ))}
            </SectionCard>

            {/* Missing sections */}
            <SectionCard title="Missing sections" icon="📋">
              <div className="flex flex-wrap gap-2">
                {missing_sections.map((s, i) => (
                  <Badge key={i} variant="amber">
                    ⚠ {s}
                  </Badge>
                ))}
              </div>
            </SectionCard>

            {/* Improved summary */}
            <SectionCard title="Improved summary" icon="✍️">
              <p className="text-xs text-slate-400 mb-2">Original</p>
              <p className="text-sm text-slate-500 italic mb-3 leading-relaxed">
                "{summary}"
              </p>
              <p className="text-xs text-slate-400 mb-2">Suggested</p>
              <div className="border-l-4 border-blue-400 bg-blue-50 text-blue-900 px-4 py-3 rounded-r-lg text-sm leading-relaxed italic">
                "{improved_summary}"
              </div>
              <p className="text-xs text-slate-400 mt-2">
                💡 Lead with "High-Performing" to strengthen personal brand
                positioning.
              </p>
            </SectionCard>

            {/* Strengths & improvements */}
            <div className="grid sm:grid-cols-2 gap-4">
              <SectionCard
                title="Strengths"
                icon="✅"
                accent="border-emerald-200"
              >
                {strengths.map((s, i) => (
                  <ListItem key={i} icon="✓" text={s} dot="green" />
                ))}
              </SectionCard>
              <SectionCard
                title="Improvements needed"
                icon="🔧"
                accent="border-amber-200"
              >
                {improvements.map((s, i) => (
                  <ListItem key={i} icon="✏" text={s} dot="amber" />
                ))}
              </SectionCard>
            </div>
          </>
        )}

        {/* ══ PROFILE ══ */}
        {activeTab === "Profile" && (
          <>
            {/* Contact info */}
            <SectionCard title="Contact information" icon="👤">
              <InfoRow label="Name" value={name} />
              <InfoRow label="Email" value={email} />
              <InfoRow label="Phone" value={phone} />
              <InfoRow label="Location" value={location} />
            </SectionCard>

            {/* Experience */}
            {experiences.map((exp) => (
              <SectionCard key={exp.id} title="Work experience" icon="💼">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-slate-800">{exp.title}</p>
                    <p className="text-sm text-slate-500">{exp.company}</p>
                  </div>
                  <Badge variant="blue">{exp.duration}</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </SectionCard>
            ))}

            {/* Education */}
            {educations.map((edu) => (
              <SectionCard key={edu.id} title="Education" icon="🎓">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-slate-800">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                  </div>
                  <Badge variant="gray">{edu.year}</Badge>
                </div>
              </SectionCard>
            ))}

            {/* Projects */}
            <SectionCard title="Projects" icon="🚀">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="mb-4 last:mb-0 pb-4 last:pb-0 border-b border-slate-100 last:border-0"
                >
                  <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                    <p className="font-semibold text-slate-800">{proj.name}</p>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap">
                    {proj.technologies.split(",").map((t, i) => (
                      <Pill key={i} label={t.trim()} variant="tech" />
                    ))}
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Current skills" icon="🛠">
              <div className="flex flex-wrap">
                {skills.map((sk) => (
                  <Pill key={sk.id} label={sk.name} variant="skill" />
                ))}
              </div>
            </SectionCard>

            {/* Empty sections notice */}
            {(resumeData.certifications.length === 0 ||
              resumeData.achievements.length === 0) && (
              <SectionCard
                title="Empty sections"
                icon="⚠️"
                accent="border-amber-200"
              >
                <div className="flex flex-wrap gap-2">
                  {resumeData.certifications.length === 0 && (
                    <Badge variant="amber">No certifications</Badge>
                  )}
                  {resumeData.achievements.length === 0 && (
                    <Badge variant="amber">No achievements</Badge>
                  )}
                  {resumeData.languages.length === 0 && (
                    <Badge variant="amber">No languages listed</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Consider adding these to improve your profile completeness.
                </p>
              </SectionCard>
            )}
          </>
        )}

        {/* ══ KEYWORDS ══ */}
        {activeTab === "Keywords" && (
          <>
            <SectionCard
              title="ATS keywords found"
              icon="✅"
              accent="border-emerald-200"
            >
              <p className="text-xs text-slate-400 mb-3">
                {ats_keywords.found.length} keywords detected in your resume
              </p>
              <div>
                {ats_keywords.found.map((k, i) => (
                  <Pill key={i} label={k} variant="found" />
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="ATS keywords missing"
              icon="❌"
              accent="border-red-200"
            >
              <p className="text-xs text-slate-400 mb-3">
                {ats_keywords.missing.length} high-value keywords not found —
                add them where relevant
              </p>
              <div>
                {ats_keywords.missing.map((k, i) => (
                  <Pill key={i} label={k} variant="missing" />
                ))}
              </div>
            </SectionCard>
          </>
        )}

        {/* ══ REWRITES ══ */}
        {activeTab === "Rewrites" && (
          <>
            <SectionCard title="Experience rewrites" icon="💼">
              {rewrites.experience.map((r, i) => (
                <RewriteBlock key={i} text={r} color="green" />
              ))}
            </SectionCard>

            <SectionCard title="Frontend rewrites" icon="🖥">
              {rewrites.frontend.map((r, i) => (
                <RewriteBlock key={i} text={r} color="blue" />
              ))}
            </SectionCard>

            <SectionCard title="Project rewrites" icon="🚀">
              {rewrites.project.map((r, i) => (
                <RewriteBlock key={i} text={r} color="green" />
              ))}
            </SectionCard>

            <SectionCard title="Action verbs upgrade" icon="💬">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Currently using
                  </p>
                  <div>
                    {action_verbs.current.map((v, i) => (
                      <Pill key={i} label={v} variant="current" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                    Suggested upgrades
                  </p>
                  <div>
                    {action_verbs.suggested.map((v, i) => (
                      <Pill key={i} label={v} variant="suggest" />
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {/* ══ SKILLS ══ */}
        {activeTab === "Skills" && (
          <>
            <SectionCard title="Current skills" icon="🛠">
              <p className="text-xs text-slate-400 mb-3">
                Skills currently on your resume
              </p>
              <div>
                {skills.map((sk) => (
                  <Pill key={sk.id} label={sk.name} variant="skill" />
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title="Skills to add"
              icon="➕"
              accent="border-blue-200"
            >
              <p className="text-xs text-slate-400 mb-3">
                Expand your market fit by adding these in-demand skills
              </p>
              <div>
                {skill_suggestions.add.map((s, i) => (
                  <Pill key={i} label={s} variant="add" />
                ))}
              </div>
              {skill_suggestions.reorder && (
                <p className="text-xs text-slate-400 mt-3">
                  💡 {skill_suggestions.reorder}
                </p>
              )}
            </SectionCard>

            <div className="grid sm:grid-cols-2 gap-4">
              <SectionCard title="Target roles" icon="🎯">
                {target_roles.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0 text-sm text-slate-700"
                  >
                    <span className="text-blue-400">→</span> {r}
                  </div>
                ))}
              </SectionCard>
              <SectionCard title="Industry fit" icon="🏭">
                {industry_fit.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0 text-sm text-slate-700"
                  >
                    <span className="text-emerald-400">◆</span> {r}
                  </div>
                ))}
              </SectionCard>
            </div>
          </>
        )}

        {/* ══ TIPS ══ */}
        {activeTab === "Tips" && (
          <>
            <SectionCard
              title="LinkedIn tips"
              icon="🔗"
              accent="border-blue-200"
            >
              {linkedin_tips.map((t, i) => (
                <ListItem key={i} icon="in" text={t} dot="blue" />
              ))}
            </SectionCard>

            <SectionCard title="Experience tips" icon="📝">
              {experience_tips.map((t, i) => (
                <ListItem key={i} icon="✓" text={t} dot="green" />
              ))}
            </SectionCard>

            <SectionCard title="Cover letter opening hook" icon="📄">
              <div className="border-l-4 border-blue-400 bg-blue-50 text-blue-900 px-4 py-3 rounded-r-lg text-sm leading-relaxed italic">
                "{cover_letter_hook}"
              </div>
            </SectionCard>
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        Resume analysis for{" "}
        <span className="font-medium text-slate-600">{name}</span>
        {" · "}
        {career_level}
        {" · "}Overall score {Math.round(score)}/100
        {" · "}Last updated{" "}
        {new Date(resumeData.updated_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
