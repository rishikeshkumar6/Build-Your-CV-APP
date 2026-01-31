import { useState } from "react";
import { MoreVertical, Download, Edit, Trash2 } from "lucide-react";
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
  console.log("ResumeCard resume data:", resume);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
              <Download className="w-4 h-4" />
              Download Resume
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

      <h2 className="text-2xl font-bold text-gray-800 mb-1">{`${resume?.full_name}`}</h2>
      <p className="text-lg text-blue-600 mb-2">{`${resume?.title}`}</p>
      <p className="text-sm text-gray-600 mb-4">{`${resume?.email}`}</p>

      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-3">{`${resume?.summary}`}</p>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Experience:</span>
            <span className="text-gray-600 ml-1">
              {`${resume?.experiences?.length || 0}`} roles
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Projects:</span>
            <span className="text-gray-600 ml-1">
              {`${resume?.projects?.length || 0}`} items
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Education:</span>
            <span className="text-gray-600 ml-1">
              {`${resume?.education?.length || 0}`} entries
            </span>
          </div>
        </div>
      </div>

      {((
        <span className="text-xs text-blue-600 hover:underline">GitHub</span>
      ) || (
          <span className="text-xs text-blue-600 hover:underline">
            LinkedIn
          </span>
        ) || (
          <span className="text-xs text-blue-600 hover:underline">
            Portfolio
          </span>
        )) && (
        <div className="mt-4 pt-4 border-t flex gap-3">
          {(
            <span className="text-xs text-blue-600 hover:underline">
              GitHub
            </span>
          ) && (
            <a
              href={`${resume?.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {(
            <span className="text-xs text-blue-600 hover:underline">
              LinkedIn
            </span>
          ) && (
            <a
              href={`${resume?.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {(
            <span className="text-xs text-blue-600 hover:underline">
              Portfolio
            </span>
          ) && (
            <a
              href={`${resume?.portfolio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
      )}
    </div>
  );
}
