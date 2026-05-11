/* Template A – Classic Elegant
   Dark navy header · two-column body · blue accents · skill chips */

export default function TemplateClassic({ data }) {
  const {
    name,
    email,
    phone,
    location,
    summary,
    skills,
    experience,
    education,
    projects,
  } = data;

  return (
    <div className="bg-white w-full font-sans text-slate-800">
      {/* ── Header ── */}
      <div className="bg-slate-900 text-white px-10 py-8">
        <h1 className="text-3xl font-bold tracking-tight font-serif">{name}</h1>
        <p className="text-blue-300 text-sm mt-1 font-medium">
          Software Developer
        </p>
        <div className="flex flex-wrap gap-5 mt-3 text-slate-300 text-xs">
          {email && <span>✉ {email}</span>}
          {phone && <span>✆ {phone}</span>}
          {location && <span>⌖ {location}</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="bg-slate-50 border-r border-slate-100 px-6 py-7 space-y-7">
          {/* Skills */}
          <section>
            <SidebarHeading>Skills</SidebarHeading>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="bg-blue-50 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full border border-blue-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SidebarHeading>Education</SidebarHeading>
            <div className="space-y-4 mt-3">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="text-[12.5px] font-semibold text-slate-800">
                    {e.degree}
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">
                    {e.institution}
                  </p>
                  <p className="text-[11px] text-slate-400">{e.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Main */}
        <div className="px-8 py-7 space-y-7">
          {/* Summary */}
          <section>
            <MainHeading>Profile</MainHeading>
            <p className="text-[12.5px] text-slate-600 leading-relaxed mt-2">
              {summary}
            </p>
          </section>

          {/* Experience */}
          <section>
            <MainHeading>Experience</MainHeading>
            <div className="space-y-5 mt-2">
              {experience.map((ex, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-800">
                    {ex.title}
                  </p>
                  <p className="text-[12px] text-blue-600 mt-0.5">
                    {ex.company}
                  </p>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    {ex.duration}
                  </p>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <MainHeading>Projects</MainHeading>
            <div className="space-y-4 mt-2">
              {projects.map((p, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-800">
                    {p.name}
                  </p>
                  <p className="text-[12px] text-slate-600 leading-relaxed mt-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.technologies.split(",").map((t) => (
                      <span
                        key={t}
                        className="bg-blue-50 text-blue-700 text-[10.5px] px-2 py-0.5 rounded border border-blue-100"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SidebarHeading({ children }) {
  return (
    <h2 className="text-[10px] font-semibold tracking-widest uppercase text-slate-800 pb-1.5 border-b-2 border-slate-800">
      {children}
    </h2>
  );
}

function MainHeading({ children }) {
  return (
    <h2 className="text-[10px] font-semibold tracking-widest uppercase text-blue-600 pb-1.5 border-b-2 border-blue-600">
      {children}
    </h2>
  );
}
