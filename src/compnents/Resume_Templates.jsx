import React, { useRef, useState } from "react";
import { useGetSingleResumeQuery } from "../Redux/services/userService";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// ─────────────────────────────────────────────
// Utility: triggers browser print-to-PDF dialog
// Pass the id of the resume container element
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Download Button Component
// ─────────────────────────────────────────────
export function DownloadButton({ resumeContainerId }) {
  const [loading, setLoading] = useState(false);
  const downloadResume = async () => {
    const resume = document.getElementById("resume-container");

    resume.style.width = "794px";
    resume.style.height = "auto"; // IMPORTANT // enforce one page

    const canvas = await html2canvas(resume, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.55);

    const pdf = new jsPDF("p", "px", [794, 1123]);
    pdf.addImage(imgData, "JPEG", 0, 0, 794, 1123);

    pdf.save("Resume.pdf");
  };

  return (
    <button
      onClick={async () => {
        await downloadResume();
      }}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        background: loading ? "#6b7280" : "#0f2a5e",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "9px 18px",
        fontSize: "13px",
        fontWeight: "500",
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
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
      {loading ? "Preparing..." : "Download PDF"}
    </button>
  );
}

// ─────────────────────────────────────────────
// Full Resume Page with Download Button
// ─────────────────────────────────────────────

const S = {
  page: {
    width: "794px",
    minHeight: "1123px",
    background: "#ffffff",
    padding: "46px 52px",
    margin: "0 auto",
    boxSizing: "border-box",
    border: "0.5px solid #e5e7eb",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a2e",
  },
  name: {
    fontSize: "27px",
    fontWeight: "700",
    color: "#0f2a5e",
    letterSpacing: "0.4px",
    marginBottom: "4px",
  },
  titleTag: { fontSize: "13px", color: "#185FA5", marginBottom: "5px" },
  divider: {
    width: "100%",
    height: "2px",
    background: "#0f2a5e",
    margin: "7px 0 9px",
  },
  contact: {
    fontSize: "12px",
    color: "#3a3a5c",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactLink: { color: "#185FA5", textDecoration: "none" },
  sep: { color: "#bbb", margin: "0 7px" },
  section: { marginBottom: "18px" },
  secTitle: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.6px",
    textTransform: "uppercase",
    color: "#0f2a5e",
    paddingBottom: "4px",
    borderBottom: "1px solid #c9d6ea",
    marginBottom: "8px",
  },
  summary: {
    fontSize: "12.5px",
    lineHeight: "1.6",
    color: "#2c2c3e",
    margin: 0,
  },
  expItem: { marginBottom: "13px" },
  expHdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  expRole: { fontSize: "13.5px", fontWeight: "700", color: "#0f2a5e" },
  expDate: { fontSize: "11.5px", color: "#6b7280", whiteSpace: "nowrap" },
  expCompany: { fontSize: "12.5px", color: "#185FA5", marginBottom: "4px" },
  bullets: { listStyle: "none", padding: 0, margin: 0 },
  bullet: {
    fontSize: "12px",
    lineHeight: "1.55",
    color: "#2c2c3e",
    marginBottom: "3px",
    paddingLeft: "14px",
    position: "relative",
  },
  bulletArrow: {
    position: "absolute",
    left: 0,
    color: "#0f2a5e",
    fontSize: "9px",
    top: "2px",
  },
  projItem: { marginBottom: "11px" },
  projName: { fontSize: "13px", fontWeight: "700", color: "#0f2a5e" },
  projLink: {
    fontSize: "11px",
    color: "#185FA5",
    textDecoration: "none",
    marginLeft: "8px",
  },
  projDesc: {
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#2c2c3e",
    margin: "3px 0",
  },
  projStack: { fontSize: "11.5px", color: "#6b7280" },
  projStackBold: { color: "#0f2a5e", fontWeight: "700" },
  eduItem: { marginBottom: "8px" },
  eduDeg: { fontSize: "13.5px", fontWeight: "700", color: "#0f2a5e" },
  eduInst: { fontSize: "12px", color: "#6b7280" },
  skillRow: { fontSize: "12px", color: "#2c2c3e", lineHeight: "1.8" },
  skillBold: { color: "#0f2a5e", fontWeight: "700" },
};

const Bullet = ({ children }) => (
  <li style={S.bullet}>
    <span style={S.bulletArrow}>▸</span>
    {children}
  </li>
);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

export default function ResumeTemplate() {
  const { id } = useParams();
  const { isSuccess, isLoading, isError, error, data } =
    useGetSingleResumeQuery(id);
  // Inject a temporary <style> that hides everything except the resume
  const CONTAINER_ID = "resume-container";

  // Support both a flat data object (like your API response) or separate props

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ── Toolbar ── */}
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
        }}
      >
        <div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "#111" }}>
            Resume Preview
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            {data?.data[0]?.full_name} — Classic Navy Blue
          </div>
        </div>
        <DownloadButton resumeContainerId={CONTAINER_ID} />
      </div>

      {/* ── Resume Page ── */}
      <div id={CONTAINER_ID} style={S.page}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <div style={S.name}>{data?.data[0]?.full_name}</div>
          {data?.data[0]?.title && (
            <div style={S.titleTag}>{data?.data[0]?.title}</div>
          )}
          <div style={S.divider} />
          <div style={S.contact}>
            {data?.data[0]?.email && (
              <a href={`mailto:${data?.data[0]?.email}`} style={S.contactLink}>
                {data?.data[0]?.email}
              </a>
            )}
            {data?.data[0]?.github && (
              <>
                <span style={S.sep}>|</span>
                <a
                  href={data?.data[0]?.github}
                  target="_blank"
                  rel="noreferrer"
                  style={S.contactLink}
                >
                  {data?.data[0]?.github.replace("https://www.", "")}
                </a>
              </>
            )}
            {data?.data[0]?.linkedin && (
              <>
                <span style={S.sep}>|</span>
                <a
                  href={data?.data[0]?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={S.contactLink}
                >
                  {data?.data[0]?.linkedin.replace("https://www.", "")}
                </a>
              </>
            )}
            {data?.data[0]?.portfolio && (
              <>
                <span style={S.sep}>|</span>
                <a
                  href={data?.data[0]?.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  style={S.contactLink}
                >
                  {data?.data[0]?.portfolio.replace("https://www.", "")}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        {data?.data[0]?.summary && (
          <div style={S.section}>
            <div style={S.secTitle}>Summary</div>
            <p style={S.summary}>{data?.data[0]?.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data?.data[0]?.experiences?.length > 0 && (
          <div style={S.section}>
            <div style={S.secTitle}>Experience</div>
            {data?.data[0]?.experiences?.map((exp, i) => (
              <div key={i} style={S.expItem}>
                <div style={S.expHdr}>
                  <div style={S.expRole}>{exp.position}</div>
                  <div style={S.expDate}>
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </div>
                </div>
                <div style={S.expCompany}>{exp.company}</div>
                <ul style={S.bullets}>
                  {exp.responsibilities?.map((r, j) => (
                    <Bullet key={j}>{r}</Bullet>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data?.data[0]?.projects?.length > 0 && (
          <div style={S.section}>
            <div style={S.secTitle}>Projects</div>
            {data?.data[0]?.projects?.map((proj, i) => (
              <div key={i} style={S.projItem}>
                <span style={S.projName}>{proj.name}</span>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    style={S.projLink}
                  >
                    GitHub ↗
                  </a>
                )}
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    style={S.projLink}
                  >
                    Live ↗
                  </a>
                )}
                <p style={S.projDesc}>{proj.description}</p>
                <div style={S.projStack}>
                  <span style={S.projStackBold}>Tech Stack:</span>{" "}
                  {proj.techStack}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data?.data[0]?.education?.length > 0 && (
          <div style={S.section}>
            <div style={S.secTitle}>Education</div>
            {data?.data[0]?.education?.map((edu, i) => (
              <div key={i} style={S.eduItem}>
                <div style={S.eduDeg}>{edu.degree}</div>
                <div style={S.eduInst}>
                  {edu.institution} &nbsp;|&nbsp; {formatDate(edu.startYear)} –{" "}
                  {formatDate(edu.endYear)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        <div style={S.section}>
          <div style={S.secTitle}>Skills &amp; Technologies</div>
          {data?.frontend && (
            <div style={S.skillRow}>
              <span style={S.skillBold}>Frontend:</span> {data.frontend}
            </div>
          )}
          {data?.data[0]?.backend && (
            <div style={S.skillRow}>
              <span style={S.skillBold}>Backend:</span> {data?.data[0]?.backend}
            </div>
          )}
          {data?.data[0]?.database && (
            <div style={S.skillRow}>
              <span style={S.skillBold}>Database:</span>{" "}
              {data?.data[0]?.database}
            </div>
          )}
          {data?.data[0]?.other && (
            <div style={S.skillRow}>
              <span style={S.skillBold}>Tools:</span> {data?.data[0]?.other}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Usage Example:
//
// import ResumeTemplate from "./ResumeDownload";
//
// const resumeData = { ...your API response object... };
//
// <ResumeTemplate data={resumeData} />
//
// The Download PDF button is built-in.
// It triggers window.print() with print styles that
// isolate only the resume — save as PDF from the dialog.
// ─────────────────────────────────────────────
