import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
//redux reducer
import { useUploadResumeMutation } from "../Redux/services/userService";
import { useDispatch } from "react-redux";
import { setResumeData } from "../Redux/services/resumeService";

export default function ResumeAnalyzer() {
  //dispatch
  const dispatch = useDispatch();
  //state sections
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  //router sections
  const navigate = useNavigate();
  //redux sections
  const [uploadResume, { isLoading, isSuccess, data, isError, error }] =
    useUploadResumeMutation();
  // file input handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  // Drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setAnalysis(null);
    }
  };
  // Prevent default behavior for drag over to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //file upload handler
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadResume(formData).unwrap();
      if (res) {
        toast.success("Resume analyzed successfully!");
        dispatch(setResumeData(res));
        navigate(`/resume_improvements_details/${res.id}`);
      }
    } catch (err) {
      console.log("<<<error checking>>>", err);
      toast.error(
        "An error occurred while analyzing your resume. Please try again later.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xl font-bold text-gray-900">
                ResumeBuilder Pro
              </span>
            </Link>
            <Link
              to="/builder"
              className="text-gray-600 hover:text-primary-600 transition"
            >
              Create New Resume
            </Link>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Resume Analysis
            </h1>
            <p className="text-xl text-gray-600">
              Upload your resume and get instant AI-powered feedback
            </p>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-white rounded-xl shadow-lg p-12 border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors"
          >
            <div className="text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {file ? file.name : "Drop your resume here"}
              </h3>
              <p className="text-gray-600 mb-6">or</p>
              <label className="btn-primary cursor-pointer inline-block">
                Browse Files
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>

          {file && (
            <div className="text-center">
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
