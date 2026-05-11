import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateModern from "./templates/TemplateModern";
import TemplateMinimal from "./templates/TemplateMinimal";

const resumeData = {
  name: "Rishikesh Kumar Singh",
  email: "rishikeshkumarsingh810@gmail.com",
  phone: "",
  location: "",
  summary:
    "Passionate Software Developer with 2.2 years of experience in building scalable React.js and Node.js applications. Skilled in developing logistics and real-time tracking systems using Redux Toolkit, FastAPI, and PostgreSQL. Focused on creating performant, user-centric solutions for e-commerce and last-mile delivery platforms.",
  skills: [
    "React.js",
    "Redux Toolkit",
    "RTK Query",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Material UI",
    "Node.js",
    "Express.js",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Sequelize",
    "REST APIs",
    "JWT",
    "Git/GitHub",
    "Agile",
    "UI/UX Design",
  ],
  experience: [
    {
      title: "Software Developer",
      company: "Omneelab Software Solutions",
      duration: "1 June 2024 - Present",
      description:
        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard. Implemented features for manual, single, and bulk order creation, enabling sellers to manage all courier services on one platform. Integrated webhook-based automation to fetch and display real-time orders from multiple marketplaces. Built responsive UI components using React Hooks, Redux Toolkit Query, and Tailwind CSS, connected to a FastAPI + PostgreSQL backend for seamless data flow and performance.",
    },
  ],
  education: [
    {
      degree: "B.Tech – Computer Science Engineering",
      institution: "Rabindranath Tagore University, Bhopal",
      year: "2019–2023",
    },
    {
      degree: "Intermediate Of Science (I.S.C)",
      institution: "Narayan Yadav Inter College Munjhgai, Bihar",
      year: "2017–2019",
    },
  ],
  projects: [
    {
      name: "Logistic-Solutions",
      description:
        "Developed a React/Redux-based system for real-time tracking of orders, courier details, payment status, and delivery timelines, improving operational transparency.",
      technologies:
        "React, Redux Toolkit, RTK Query, Node.js, Express.js, JWT, PostgreSQL, Sequelize, Tailwind CSS",
    },
    {
      name: "Build-Your-CV",
      description:
        "Users can create and customize their resumes by filling in personal information, work experience, education, skills, achievements, and projects.",
      technologies:
        "HTML5, CSS3, JavaScript, React, Redux, Material UI, React-Router-Dom, Node.js, PostgreSQL, FastAPI",
    },
  ],
};

const TEMPLATES = [
  { id: "classic", label: "Classic Elegant" },
  { id: "modern", label: "Modern Split" },
  { id: "minimal", label: "Minimal Line" },
];

export default function DynamicFormTemplates() {
  const { data } = useSelector((state) => state.resume);
  const [active, setActive] = useState("classic");
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef(null);

  const handleDownload = async () => {
    setDownloading(true);
    let clone = null;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = resumeRef.current;

      // --- 1. Deep-clone the resume element ---
      clone = element.cloneNode(true);

      // 🔥 Reset ALL inherited styles (important)
      clone.style.all = "initial";
      clone.style.fontFamily = "Arial, sans-serif";
      clone.style.backgroundColor = "#ffffff";
      clone.style.color = "#000000";

      // Then apply positioning styles
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = `${element.offsetWidth}px`;
      clone.style.pointerEvents = "none";

      // Finally append to DOM
      document.body.appendChild(clone);

      // --- 2. Inline ALL computed styles so html2canvas never sees oklch ---
      // getComputedStyle always resolves oklch → rgb(), so this is safe.
      const originalEls = [element, ...element.querySelectorAll("*")];
      const clonedEls = [clone, ...clone.querySelectorAll("*")];

      originalEls.forEach((orig, i) => {
        const cs = window.getComputedStyle(orig);
        const el = clonedEls[i];

        // Stamp every CSS property as an inline style.
        // This is intentionally exhaustive — it's the only reliable way
        // to strip oklch references that live anywhere in the cascade.
        const inlined = Array.from(cs).reduce((acc, prop) => {
          try {
            const val = cs.getPropertyValue(prop);
            // Skip custom properties (--tw-*) and empty values.
            // They're inherited by computed styles anyway.
            if (prop.startsWith("--") || !val) return acc;
            return acc + `${prop}:${val};`;
          } catch {
            return acc;
          }
        }, "");

        el.style.cssText = inlined;
      });

      // --- 3. Capture ---
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.offsetWidth,
        height: element.scrollHeight, // use scrollHeight to capture full content
      });

      // --- 4. Build PDF ---
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;

      // If content is taller than one A4 page, split across pages
      const a4HeightMm = pdf.internal.pageSize.getHeight();
      if (pdfH <= a4HeightMm) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      } else {
        let yOffset = 0;
        while (yOffset < pdfH) {
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, -yOffset, pdfW, pdfH);
          yOffset += a4HeightMm;
        }
      }

      pdf.save("Rishikesh_Kumar_Singh_Resume.pdf");
    } catch (err) {
      console.error(err);
      alert("Download failed: " + err.message);
    } finally {
      // Always clean up the clone even if an error occurred
      if (clone && document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
      setDownloading(false);
    }
  };

  const downloadResume = async (resumeData) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/resume/api/download-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "resume.pdf"; // you can also extract from header
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                active === t.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="ml-auto flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors duration-150"
          >
            {downloading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* Resume Preview */}
        <div className="shadow-2xl rounded-xl overflow-hidden">
          <div ref={resumeRef}>
            {active === "classic" && (
              <TemplateClassic
                data={data?.form_data}
                downloadResume={downloadResume}
              />
            )}
            {active === "modern" && (
              <TemplateModern
                data={data?.form_data}
                downloadResume={downloadResume}
              />
            )}
            {active === "minimal" && (
              <TemplateMinimal
                data={data?.form_data}
                downloadResume={downloadResume}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
