import React from "react";

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
        id="resume-container"
        style={{
          width: "794px",
          minHeight: "1123px",
          background: "#ffffff",
          padding: "28px",
          margin: "0 auto",
          boxSizing: "border-box",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "18px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "12px",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              margin: "0 0 6px 0",
            }}
          >
            {personalInfo.fullName || "John Doe"}
          </h1>
          <div
            style={{
              fontSize: "13px",
              lineHeight: "1.4",
              color: "#374151",
            }}
          >
            {/* Email */}
            <a
              href={`mailto:${personalInfo.email || "john.doe@email.com"}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {personalInfo.email || "john.doe@email.com"}
            </a>

            {" | +91 "}
            {personalInfo.phone || "1234567890"}
            {" | "}

            {/* LinkedIn */}
            <a
              href={
                personalInfo.linkedin
                  ? personalInfo.linkedin.startsWith("http")
                    ? personalInfo.linkedin
                    : `${personalInfo.linkedin}`
                  : "https://linkedin.com/in/johndo"
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {personalInfo.linkedin || "linkedin.com/in/johndo"}
            </a>

            {" | "}

            {/* GitHub */}
            <a
              href={
                personalInfo.github
                  ? personalInfo.github.startsWith("http")
                    ? personalInfo.github
                    : `${personalInfo.github}`
                  : "https://github.com/johndo"
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {personalInfo.github || "github.com/johndo"}
            </a>
          </div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            Summary
          </h2>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            {summary.summary ||
              "Detail-oriented React Developer with 1 year of experience in building dynamic web applications and logistics solutions."}
          </p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            Experience
          </h2>
          {experiences.experiences.map((exp, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {exp.position} — {exp.company}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}
              >
                {exp.startDate} – {exp.endDate} | Dwarka, Delhi
              </div>

              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {exp.responsibilities &&
                  exp.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      style={{ fontSize: "13px", marginBottom: "4px" }}
                    >
                      {resp}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <h2
            style={{
              fontSize: "18px",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            Projects
          </h2>
          {projects.projects.map((proj, index) => (
            <div key={index}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {proj.name}
              </div>
              <p
                style={{
                  fontSize: "13px",
                  margin: "4px 0",
                  lineHeight: "1.4",
                }}
              >
                {proj.description}
              </p>

              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                <b>Tech Stack:</b> {proj.techStack}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: "18px" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            Education
          </h2>
          {education.education.map((edu, index) => (
            <div key={index}>
              <div style={{ fontSize: "15px", fontWeight: "600" }}>
                {edu.institution}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}
              >
                B.E. Computer Science | 2019 – 2023 | CGPA: 8.14
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            Skills & Certifications
          </h2>

          <div
            style={{
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {Object.entries(skills).map(([key, value], index) => (
              <div key={index}>
                <b>{key}:</b> {value}{" "}
              </div>
            ))}
          </div>
        </div>
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
            await downloadResume();
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
              ? "Updating..."
              : "Save And Download Resume"
          }`}
        </button>
      </div>
    </>
  );
};

export default Preview;
