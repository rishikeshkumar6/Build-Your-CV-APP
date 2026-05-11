import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  Code2,
  Database,
  LayoutTemplate,
  Wrench,
  MoreVertical,
  Download,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeCard({
  id,
  deleteResume,
  isLoading,
  isSuccess,
  data,
  isError,
  error,
  handleDelete,
  resume,
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group relative">
      {/* Header Section */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-600 rounded-full transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <button
              onClick={() => {
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <Link to={`/templates/${id}`}>
                {" "}
                <div className="flex justify-start items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </div>
              </Link>
            </button>
            <button
              onClick={async () => {
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              <Edit className="w-4 h-4" />
              <Link to={`/builder/${id}`}>Edit Resume</Link>
            </button>
            <button
              onClick={() => {
                handleDelete(id);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              {isLoading ? "Deleting..." : "Delete Resume"}
            </button>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {resume?.full_name || "John Doe"}
            </h2>
            <p className="text-slate-300 font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {resume?.title || "Software Developer"}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          {resume?.email && (
            <a
              href={`mailto:${resume?.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          )}
          {resume?.github && (
            <a
              href={resume?.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {resume?.linkedin && (
            <a
              href={resume?.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
          {resume?.portfolio && (
            <a
              href={resume?.portfolio}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" /> Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow gap-6">
        {/* Summary */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            About
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {resume?.summary ||
              `A curious thinker with a passion for exploring ideas, blending creativity with analytical reasoning to solve unexpected challenges. Continuously learning and adapting, they thrive in fast-moving environments where innovation meets practicality. Whether experimenting with new tools, collaborating on complex projects, or refining small details, they bring energy, clarity, and a forward-looking mindset to every endeavor.`}
          </p>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Latest Experience */}

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Latest Role
            </h3>
            <p className="font-semibold text-slate-800 text-sm">
              {resume?.experiences[0]?.position || "Software Engineer"}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">
              {resume?.experiences[0]?.company || "Tech Solutions Inc."}
            </p>
          </div>

          {/* Latest Education */}

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Education
            </h3>
            <p
              className="font-semibold text-slate-800 text-sm line-clamp-1"
              title={resume.education[0]?.institution || "XYZ University"}
            >
              {resume.education[0]?.degree ||
                "Bachelor of Technology in Computer Science"}
            </p>
            <p
              className="text-slate-500 text-xs mt-0.5 line-clamp-1"
              title={resume.education[0]?.institution || "XYZ University"}
            >
              {resume.education[0]?.institution || "XYZ University"}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Core Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
              <LayoutTemplate className="w-3 h-3" />
              <span
                className="truncate max-w-[120px]"
                title={resume.frontend || `Frontend`}
              >
                {resume.frontend || `Frontend`}
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-100">
              <Code2 className="w-3 h-3" />
              <span
                className="truncate max-w-[120px]"
                title={resume.backend || `Backend`}
              >
                {resume.backend || `Backend`}
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
              <Database className="w-3 h-3" />
              <span
                className="truncate max-w-[120px]"
                title={resume.database || `Database`}
              >
                {resume.database || `Postgresql MongoDB`}
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-medium border border-orange-100">
              <Wrench className="w-3 h-3" />
              <span
                className="truncate max-w-[120px]"
                title={resume.other || `Other`}
              >
                {resume.other || `Git Github Docker`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
