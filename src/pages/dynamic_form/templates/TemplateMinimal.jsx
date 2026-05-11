/* Template C – Minimal Line
   Emerald green accents · ultra-clean · ATS-friendly */

export default function TemplateMinimal({ data }) {
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
    <div className="bg-white w-full font-sans text-slate-900">
      {/* ── Header ── */}
      <div className="px-11 pt-10 pb-6">
        <h1 className="text-4xl font-light tracking-tight text-slate-900">
          {name}
        </h1>
        <div className="w-14 h-[3px] bg-emerald-500 my-4" />
        <div className="flex flex-wrap gap-5 text-[12.5px] text-slate-500">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
          <span className="text-emerald-600 font-medium">
            Software Developer
          </span>
        </div>
      </div>

      {/* ── Summary strip ── */}
      <div className="px-11 pb-5 border-b border-slate-100">
        <p className="text-[12.5px] text-slate-600 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* ── Body grid ── */}
      <div className="grid grid-cols-[1fr_200px] px-11 py-8 gap-12">
        {/* Left – Experience + Projects */}
        <div className="space-y-8">
          {/* Experience */}
          <section>
            <Heading>Experience</Heading>
            <div className="space-y-5 mt-3">
              {experience.map((ex, i) => (
                <div key={i} className="pl-4 border-l-2 border-emerald-200">
                  <p className="text-[13.5px] font-semibold text-slate-800">
                    {ex.title}
                  </p>
                  <p className="text-[12.5px] text-emerald-600">{ex.company}</p>
                  <p className="text-[11.5px] text-slate-400 mb-2">
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
            <div className="space-y-5 mt-3">
              {projects.map((p, i) => (
                <div key={i} className="pl-4 border-l-2 border-emerald-200">
                  <p className="text-[13.5px] font-semibold text-slate-800">
                    {p.name}
                  </p>
                  <p className="text-[12px] text-slate-600 leading-relaxed mt-1">
                    {p.description}
                  </p>
                  <p className="text-[11.5px] text-emerald-600 mt-1.5">
                    {p.technologies}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right – Skills + Education */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <Heading>Skills</Heading>
            <div className="mt-3 divide-y divide-slate-100">
              {skills.map((s) => (
                <div key={s} className="py-1.5 text-[12.5px] text-slate-700">
                  {s}
                </div>
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
                  <p className="text-[12px] text-slate-500 mt-0.5">
                    {e.institution}
                  </p>
                  <p className="text-[11.5px] text-emerald-600">{e.year}</p>
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
    <h2 className="text-[10px] font-semibold tracking-[2px] uppercase text-emerald-600">
      {children}
    </h2>
  );
}
