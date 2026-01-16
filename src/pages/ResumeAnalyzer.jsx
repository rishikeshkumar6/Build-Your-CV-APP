import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setAnalysis(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const analyzeResume = () => {
    if (!file) return;

    setAnalyzing(true);

    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 75,
        sections: {
          personalInfo: {
            score: 90,
            status: "good",
            feedback:
              "Contact information is complete and professional. All essential details are present.",
            suggestions: [],
          },
          summary: {
            score: 70,
            status: "needs-improvement",
            feedback: "Your summary is present but could be more impactful.",
            suggestions: [
              "Make it more concise (aim for 3-4 sentences)",
              "Add specific metrics or achievements",
              "Include your unique value proposition",
            ],
          },
          experience: {
            score: 65,
            status: "needs-improvement",
            feedback:
              "Work experience section needs more detail and better formatting.",
            suggestions: [
              "Start each bullet point with strong action verbs",
              "Add quantifiable achievements (numbers, percentages)",
              "Include relevant technologies and tools used",
              "Focus on impact rather than just responsibilities",
            ],
          },
          education: {
            score: 85,
            status: "good",
            feedback: "Education section is well-structured and informative.",
            suggestions: [
              "Consider adding relevant coursework if you are a recent graduate",
            ],
          },
          skills: {
            score: 60,
            status: "needs-improvement",
            feedback: "Skills section exists but could be better organized.",
            suggestions: [
              "Categorize skills (Technical, Soft Skills, Tools, etc.)",
              "Remove outdated or basic skills",
              "Add proficiency levels for key skills",
              "Ensure skills match job descriptions you are targeting",
            ],
          },
          projects: {
            score: 80,
            status: "good",
            feedback:
              "Projects section showcases your practical experience well.",
            suggestions: [
              "Add links to live projects or GitHub repositories",
              "Highlight the business impact of your projects",
            ],
          },
        },
        strengths: [
          "Well-organized layout",
          "Good use of white space",
          "Professional formatting",
          "Clear section divisions",
        ],
        weaknesses: [
          "Lacks quantifiable achievements",
          "Could benefit from more action verbs",
          "Skills section needs categorization",
          "Summary could be more compelling",
        ],
        atsCompatibility: 72,
        recommendations: [
          "Use more industry-specific keywords",
          "Add measurable outcomes to work experience",
          "Improve summary to be more impactful",
          "Reorganize skills by relevance and proficiency",
        ],
      };

      setAnalysis(mockAnalysis);
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getStatusIcon = (status) => {
    if (status === "good") {
      return (
        <svg
          className="w-6 h-6 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-6 h-6 text-yellow-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!analysis ? (
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
                  onClick={analyzeResume}
                  disabled={analyzing}
                  className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
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
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Analysis Results
              </h1>
              <button
                onClick={() => navigate("/editor", { state: { analysis } })}
                className="btn-primary"
              >
                Edit Resume
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Overall Score
                  </h2>
                  <p className="text-gray-600">
                    Your resume scored {analysis.overallScore} out of 100
                  </p>
                </div>
                <div
                  className={`text-6xl font-bold ${getScoreColor(
                    analysis.overallScore
                  )}`}
                >
                  {analysis.overallScore}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div
                  className={`h-4 rounded-full ${
                    analysis.overallScore >= 80
                      ? "bg-green-600"
                      : analysis.overallScore >= 60
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${analysis.overallScore}%` }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start"
                      >
                        <span className="text-green-600 mr-2">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      />
                    </svg>
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start"
                      >
                        <span className="text-yellow-600 mr-2">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ATS Compatibility Score: {analysis.atsCompatibility}%
                    </h4>
                    <p className="text-sm text-gray-700">
                      Your resume has a {analysis.atsCompatibility}% chance of
                      passing Applicant Tracking Systems (ATS).
                      {analysis.atsCompatibility < 80 &&
                        " Consider the recommendations below to improve this score."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Section-by-Section Analysis
              </h2>
              {Object.entries(analysis.sections).map(
                ([sectionName, sectionData]) => (
                  <div
                    key={sectionName}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(sectionData.status)}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 capitalize mb-1">
                            {sectionName.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <p className="text-gray-700">
                            {sectionData.feedback}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${getScoreBgColor(
                          sectionData.score
                        )}`}
                      >
                        <span
                          className={`text-2xl font-bold ${getScoreColor(
                            sectionData.score
                          )}`}
                        >
                          {sectionData.score}
                        </span>
                      </div>
                    </div>
                    {sectionData.suggestions.length > 0 && (
                      <div className="ml-9 mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Suggestions:
                        </h4>
                        <ul className="space-y-1">
                          {sectionData.suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="text-gray-700 flex items-start text-sm"
                            >
                              <span className="text-primary-600 mr-2">→</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Top Recommendations
              </h3>
              <ul className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setFile(null);
                  setAnalysis(null);
                }}
                className="btn-secondary"
              >
                Analyze Another Resume
              </button>
              <button
                onClick={() => navigate("/editor", { state: { analysis } })}
                className="btn-primary"
              >
                Edit Resume Based on Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
