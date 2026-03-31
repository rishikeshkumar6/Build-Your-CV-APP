import React from "react";

const styles = {
  page: {
    width: "794px",
    minHeight: "1123px",
    background: "#ffffff",
    padding: "48px 52px",
    margin: "0 auto",
    boxSizing: "border-box",
    border: "0.5px solid #e5e7eb",
    borderRadius: "2px",
    color: "#1a1a2e",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },

  // ── Header ──────────────────────────────────────────────
  headerName: {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#0f2a5e",
    marginBottom: "6px",
  },
  headerDivider: {
    width: "100%",
    height: "2px",
    background: "#0f2a5e",
    margin: "8px 0 10px",
  },
  contactRow: {
    fontSize: "12.5px",
    color: "#3a3a5c",
    display: "flex",
    flexWrap: "wrap",
    gap: "0",
  },
  contactLink: {
    color: "#185FA5",
    textDecoration: "none",
  },
  contactSep: {
    color: "#aaa",
    margin: "0 8px",
  },

  // ── Section ──────────────────────────────────────────────
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#0f2a5e",
    marginBottom: "6px",
    paddingBottom: "4px",
    borderBottom: "1px solid #c9d6ea",
  },

  // ── Summary ──────────────────────────────────────────────
  summaryText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#2c2c3e",
    margin: 0,
  },

  // ── Experience ───────────────────────────────────────────
  expItem: {
    marginBottom: "14px",
  },
  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  expRole: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f2a5e",
  },
  expDate: {
    fontSize: "12px",
    color: "#6b7280",
    whiteSpace: "nowrap",
  },
  expCompany: {
    fontSize: "13px",
    color: "#185FA5",
    marginBottom: "5px",
  },
  expBulletList: {
    paddingLeft: "0",
    listStyle: "none",
    margin: 0,
  },
  expBullet: {
    fontSize: "12.5px",
    lineHeight: "1.55",
    color: "#2c2c3e",
    marginBottom: "3px",
    paddingLeft: "16px",
    position: "relative",
  },

  // ── Projects ─────────────────────────────────────────────
  projItem: {
    marginBottom: "12px",
  },
  projName: {
    fontSize: "13.5px",
    fontWeight: "700",
    color: "#0f2a5e",
  },
  projDesc: {
    fontSize: "12.5px",
    lineHeight: "1.5",
    color: "#2c2c3e",
    margin: "3px 0",
  },
  projStack: {
    fontSize: "12px",
    color: "#6b7280",
  },
  projStackBold: {
    color: "#0f2a5e",
    fontWeight: "700",
  },

  // ── Education ────────────────────────────────────────────
  eduItem: {
    marginBottom: "6px",
  },
  eduInstitution: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f2a5e",
  },
  eduDetail: {
    fontSize: "12px",
    color: "#6b7280",
  },

  // ── Skills ───────────────────────────────────────────────
  skillRow: {
    fontSize: "12.5px",
    color: "#2c2c3e",
    lineHeight: "1.7",
  },
  skillBold: {
    color: "#0f2a5e",
    fontWeight: "700",
  },
};

// Bullet arrow rendered as a pseudo-element substitute
const Bullet = ({ children }) => (
  <li style={styles.expBullet}>
    <span
      style={{
        position: "absolute",
        left: 0,
        color: "#0f2a5e",
        fontSize: "10px",
        top: "2px",
      }}
    >
      ▸
    </span>
    {children}
  </li>
);

const Preview = ({
  handlePrev,
  downloadResume,
  setPreviewFill,
  handleSubmit,
  handleUpdate,
  isLoading,
  isUpdateLoading,
  personalInfo,
  summary,
  experiences,
  projects,
  education,
  skills,
  editMode,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#f9fafb",
          border: "0.5px solid #e5e7eb",
          borderRadius: "8px",
          marginBottom: "16px",
          width: "83%",
          marginLeft: "82px",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "#111" }}>
            Resume Preview
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            {personalInfo.fullName || "John Doe"} — Classic Navy Blue
          </div>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "9px 18px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onClick={async () => {
            await downloadResume();
          }}
        >
          {/* Download icon */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {"Download PDF"}
        </button>
      </div>
      <div id="resume-container" style={styles.page}>
        {/* ── Header ── */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={styles.headerName}>
            {personalInfo.fullName || "John Doe"}
          </h1>
          <div style={styles.headerDivider} />
          <div style={styles.contactRow}>
            <a
              href={`mailto:${personalInfo.email || "john.doe@email.com"}`}
              style={styles.contactLink}
            >
              {personalInfo.email || "john.doe@email.com"}
            </a>
            <span style={styles.contactSep}>|</span>
            <span>+91 {personalInfo.phone || "1234567890"}</span>
            <span style={styles.contactSep}>|</span>
            <a
              href={
                personalInfo.linkedin?.startsWith("http")
                  ? personalInfo.linkedin
                  : `https://${personalInfo.linkedin || "linkedin.com/in/johndo"}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactLink}
            >
              {personalInfo.linkedin || "linkedin.com/in/johndo"}
            </a>
            <span style={styles.contactSep}>|</span>
            <a
              href={
                personalInfo.github?.startsWith("http")
                  ? personalInfo.github
                  : `https://${personalInfo.github || "github.com/johndo"}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactLink}
            >
              {personalInfo.github || "github.com/johndo"}
            </a>
          </div>
        </div>

        {/* ── Summary ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Summary</div>
          <p style={styles.summaryText}>
            {summary.summary ||
              "Detail-oriented React Developer with 1 year of experience in building dynamic web applications and logistics solutions."}
          </p>
        </div>

        {/* ── Experience ── */}
        {experiences.experiences.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Experience</div>
            {experiences.experiences.map((exp, index) => (
              <div key={index} style={styles.expItem}>
                <div style={styles.expHeader}>
                  <div style={styles.expRole}>{exp.position}</div>
                  <div style={styles.expDate}>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
                <div style={styles.expCompany}>
                  {exp.company} — Dwarka, Delhi
                </div>
                <ul style={styles.expBulletList}>
                  {exp.responsibilities?.map((resp, idx) => (
                    <Bullet key={idx}>{resp}</Bullet>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ── Projects ── */}
        {projects.projects.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Projects</div>
            {projects.projects.map((proj, index) => (
              <div key={index} style={styles.projItem}>
                <div style={styles.projName}>{proj.name}</div>
                <p style={styles.projDesc}>{proj.description}</p>
                <div style={styles.projStack}>
                  <span style={styles.projStackBold}>Tech Stack:</span>{" "}
                  {proj.techStack}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Education ── */}
        {education.education.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Education</div>
            {education.education.map((edu, index) => (
              <div key={index} style={styles.eduItem}>
                <div style={styles.eduInstitution}>{edu.institution}</div>
                <div style={styles.eduDetail}>
                  B.E. Computer Science &nbsp;|&nbsp; 2019 – 2023 &nbsp;|&nbsp;
                  CGPA: 8.14
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Skills & Certifications ── */}
        {Object.keys(skills).length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Skills &amp; Certifications</div>
            {Object.entries(skills).map(([key, value], index) => (
              <div key={index} style={styles.skillRow}>
                <span style={styles.skillBold}>{key}:</span> {value}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`bg-gray-50 py-6 flex justify-between`}>
        <button
          type="button"
          onClick={() => handlePrev()}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={async () => {
            !editMode ? handleSubmit() : handleUpdate();
          }}
          style={{
            padding: "10px 16px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          {`${
            isUpdateLoading || isLoading
              ? "Loading..."
              : editMode
                ? "Update"
                : "Submit"
          }`}
        </button>
      </div>
    </>
  );
};

export default Preview;
