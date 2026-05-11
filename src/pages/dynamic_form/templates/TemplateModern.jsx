/* Template B – Modern Split
   Amber/gold accents · skill bars · two-column layout */

function SkillBar({ name, level }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-[12px] text-slate-700 w-28 shrink-0">{name}</span>
      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function TemplateModern({ data }) {
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

  const skillLevels = {
    "React.js": 92,
    "Redux Toolkit": 88,
    "RTK Query": 85,
    "Node.js": 80,
    FastAPI: 78,
    PostgreSQL: 75,
    "Tailwind CSS": 88,
    MongoDB: 70,
    "Git/GitHub": 88,
  };

  return (
    <div className="bg-white w-full font-sans text-slate-800">
      {/* ── Header ── */}
      <div className="px-10 pt-9 pb-6 border-b-4 border-amber-400 flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-serif text-slate-900">
            {name}
          </h1>
          <p className="text-amber-500 text-sm font-semibold mt-1">
            Software Developer · 2.2 Years Experience
          </p>
        </div>
        <div className="text-right text-[12px] text-slate-500 leading-7">
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {location && <p>{location}</p>}
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="px-10 py-5 border-b border-slate-100">
        <p className="text-[12.5px] text-slate-600 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* ── Body grid ── */}
      <div className="grid grid-cols-[1fr_220px] px-10 py-7 gap-10">
        {/* Left */}
        <div className="space-y-7">
          {/* Experience */}
          <section>
            <Heading>Experience</Heading>
            <div className="space-y-5 mt-3">
              {experience.map((ex, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-800">
                    {ex.title}
                  </p>
                  <p className="text-[12px] text-slate-500">{ex.company}</p>
                  <p className="text-[11.5px] text-amber-500 mb-2">
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
            <Heading>Projects</Heading>
            <div className="space-y-4 mt-3">
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
                        className="bg-amber-50 text-amber-800 text-[10.5px] px-2 py-0.5 rounded border border-amber-100"
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

        {/* Right */}
        <div className="space-y-7">
          {/* Skill bars */}
          <section>
            <Heading>Tech Skills</Heading>
            <div className="mt-3">
              {Object.entries(skillLevels).map(([skill, level]) => (
                <SkillBar key={skill} name={skill} level={level} />
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills
                .filter((s) => !skillLevels[s])
                .map((s) => (
                  <span
                    key={s}
                    className="bg-slate-100 text-slate-600 text-[10.5px] px-2 py-0.5 rounded"
                  >
                    {s}
                  </span>
                ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <Heading>Education</Heading>
            <div className="space-y-4 mt-3">
              {education.map((e, i) => (
                <div key={i}>
                  <p className="text-[12.5px] font-semibold text-slate-800">
                    {e.degree}
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">
                    {e.institution}
                  </p>
                  <p className="text-[11px] text-amber-500">{e.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Heading({ children }) {
  return (
    <h2 className="text-[10px] font-semibold tracking-widest uppercase text-amber-500">
      {children}
    </h2>
  );
}
