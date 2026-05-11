import React, { useState } from "react";
import { useGetAllResumeImprovementQuery } from "../../Redux/services/userService";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDeleteResumeImprovementMutation } from "../../Redux/services/userService";
import { toast } from "react-toastify";

/* ── Toast ───────────────────────────────────────────────────────────────── */
function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 shadow-sm transition-all">
      <span className="text-green-500">✓</span>
      {message}
    </div>
  );
}

/* ── Score badge ─────────────────────────────────────────────────────────── */
function ScoreBadge({ score }) {
  const s = Math.round(score);
  const cls =
    s >= 80
      ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      : s >= 60
        ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${cls}`}
    >
      {s}
    </span>
  );
}

/* ── Stat chip ───────────────────────────────────────────────────────────── */
function Stat({ icon, label }) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
      <span>{icon}</span>
      {label}
    </span>
  );
}

/* ── Action button ───────────────────────────────────────────────────────── */
function ActionBtn({ label, icon, hoverClass, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-transparent transition-all hover:border-gray-300 ${hoverClass}`}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </button>
  );
}

/* ── Resume card ─────────────────────────────────────────────────────────── */
function ResumeCard({
  resume,
  onEdit,
  onDownload,
  onDelete,
  navigate,
  isDownloading,
}) {
  const initials = resume.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const shownSkills = resume.skills.slice(0, 5);
  const extraSkills = resume.skills.length - 5;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
      {/* Top row — avatar, meta, score */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-medium flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {resume.name}
          </p>
          {resume.email ? (
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {resume.email}
            </p>
          ) : (
            <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5 italic">
              No email
            </p>
          )}
          {resume.location && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              📍 {resume.location}
            </p>
          )}
        </div>
        <ScoreBadge score={resume.improvement.score} />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-1.5">
        <Stat icon="💼" label={`${resume.experiences.length} exp`} />
        <Stat icon="🎓" label={`${resume.educations.length} edu`} />
        <Stat icon="📁" label={`${resume.projects.length} proj`} />
        {resume.certifications > 0 && (
          <Stat icon="🏅" label={`${resume.certifications} cert`} />
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {shownSkills.map((s, i) => (
          <span
            key={i}
            className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full border border-gray-100 dark:border-gray-700"
          >
            {s.name}
          </span>
        ))}
        {extraSkills > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500 py-0.5">
            +{extraSkills} more
          </span>
        )}
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        {/* <span className="text-xs text-gray-300 dark:text-gray-600">
          ID #{resume.id}
        </span> */}
        <div className="flex gap-1.5">
          <ActionBtn
            label="Edit"
            icon="✎"
            hoverClass="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            onClick={() =>
              navigate(`/resume_improvements_details/${resume.id}`)
            }
          />
          <ActionBtn
            label="Download"
            icon="↓"
            hoverClass="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            onClick={() => onDownload(resume.id)}
            disabled={isDownloading}
          />
          <ActionBtn
            label="Delete"
            icon="✕"
            hoverClass="hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            onClick={() => onDelete(resume.id)}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */
export default function ResumeListPage() {
  const [isDownloading, setIsDownloading] = useState(null);
  const {
    data: resumes = [],
    isLoading,
    isError,
  } = useGetAllResumeImprovementQuery();
  const [deleteResumeImprovement] = useDeleteResumeImprovementMutation();
  const navigate = useNavigate();
  //   const [resumes, setResumes] = useState(initialResumes);
  const [search, setSearch] = useState("");
  //   const [toast, setToast] = useState({ show: false, message: "" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading resumes.</p>
      </div>
    );
  }

  if (resumes?.data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-6">
        <div className="w-full max-w-xl bg-white   p-10 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H6.75A2.25 2.25 0 004.5 4.5v15A2.25 2.25 0 006.75 21.75h10.5A2.25 2.25 0 0019.5 19.5V18M13.5 3v4.125c0 .621.504 1.125 1.125 1.125H18"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            No Resume Found
          </h1>

          <p className="text-gray-500 text-base leading-relaxed mb-8">
            You haven’t created any resume yet. Start building your professional
            resume or customize your template to stand out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyzer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
            >
              Analyze Your Resume
            </Link>

            <Link
              to="/resume-templates"
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filtered = resumes?.data?.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  );

  const downloadResume = async (data) => {
    setIsDownloading(true);
    const formData = {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      location: data?.location || "",
      summary: data?.summary || "",
      skills: data?.skills?.map((skill) => skill.name) || [],
      experience: data?.experiences || [],
      education: data?.educations || [],
      projects: data?.projects || [],
      certifications: data?.certifications || [],
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}resume/api/download-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
      toast.success("Resume downloaded successfully!");
      setIsDownloading(false);
      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download resume. Please try again.");
      setIsDownloading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteResumeImprovement(id);
      toast.success("Resume deleted successfully!");
    } catch (err) {
      console.error("Error deleting resume:", err);
      toast.error("Failed to delete resume. Please try again.");
    }

    // await fetch(`/ai_resumes/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            My resumes
          </h1>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2.5 py-0.5 rounded-full">
            {filtered.length} resume{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5">
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by name, skill, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 w-52"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-600">
          <p className="text-4xl mb-3">📄</p>
          <p className="text-sm">No resumes match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <ResumeCard
              key={r.id}
              resume={r}
              onDownload={() => downloadResume(r)}
              onDelete={() => handleDelete(r.id)}
              navigate={navigate}
              isDownloading={isDownloading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
