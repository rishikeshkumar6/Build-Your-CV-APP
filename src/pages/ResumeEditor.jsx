import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ResumeEditor() {
  const location = useLocation();
  const analysis = location.state?.analysis;

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com",
    },
    summary:
      "Experienced software engineer with 5+ years of experience in web development.",
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Developer",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "Led development of web applications using React and Node.js.",
      },
    ],
    education: [
      {
        id: 1,
        school: "University of California",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2014",
        endDate: "2018",
        gpa: "3.8",
      },
    ],
    skills: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "React" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "Python" },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform",
        technologies: "React, Node.js, MongoDB",
        link: "github.com/johndoe/ecommerce",
      },
    ],
  });

  const [selectedSection, setSelectedSection] = useState(null);

  const getSectionScore = (sectionName) => {
    if (!analysis?.sections) return null;
    const section = analysis.sections[sectionName];
    return section ? section.score : null;
  };

  const getSectionFeedback = (sectionName) => {
    if (!analysis?.sections) return null;
    const section = analysis.sections[sectionName];
    return section || null;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const updateField = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value,
      },
    });
  };

  const updateArrayItem = (section, id, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addArrayItem = (section, template) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], { ...template, id: Date.now() }],
    });
  };

  const removeArrayItem = (section, id) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter((item) => item.id !== id),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
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
            <div className="flex space-x-4">
              <Link
                to="/analyzer"
                className="text-gray-600 hover:text-primary-600 transition"
              >
                Back to Analysis
              </Link>
              <button className="btn-primary">Save & Download</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Your Resume
          </h1>
          <p className="text-gray-600">
            Make improvements based on the analysis feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>
                {getSectionScore("personalInfo") && (
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-12 h-12 rounded-full ${getScoreColor(
                        getSectionScore("personalInfo")
                      )} flex items-center justify-center text-white font-bold`}
                    >
                      {getSectionScore("personalInfo")}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    updateField("personalInfo", "fullName", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    updateField("personalInfo", "email", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    updateField("personalInfo", "phone", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    updateField("personalInfo", "location", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    updateField("personalInfo", "linkedin", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) =>
                    updateField("personalInfo", "website", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Professional Summary
                </h2>
                {getSectionScore("summary") && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setSelectedSection(
                          selectedSection === "summary" ? null : "summary"
                        )
                      }
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        />
                      </svg>
                      Tips
                    </button>
                    <div
                      className={`w-12 h-12 rounded-full ${getScoreColor(
                        getSectionScore("summary")
                      )} flex items-center justify-center text-white font-bold`}
                    >
                      {getSectionScore("summary")}
                    </div>
                  </div>
                )}
              </div>

              {selectedSection === "summary" &&
                getSectionFeedback("summary") && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      {getSectionFeedback("summary").feedback}
                    </p>
                    {getSectionFeedback("summary").suggestions.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {getSectionFeedback("summary").suggestions.map(
                          (suggestion, index) => (
                            <li
                              key={index}
                              className="text-gray-700 flex items-start"
                            >
                              <span className="text-primary-600 mr-2">•</span>
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )}

              <textarea
                placeholder="Write a compelling professional summary..."
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData({ ...resumeData, summary: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Work Experience
                </h2>
                <div className="flex items-center space-x-2">
                  {getSectionScore("experience") && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedSection(
                            selectedSection === "experience"
                              ? null
                              : "experience"
                          )
                        }
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          />
                        </svg>
                        Tips
                      </button>
                      <div
                        className={`w-12 h-12 rounded-full ${getScoreColor(
                          getSectionScore("experience")
                        )} flex items-center justify-center text-white font-bold`}
                      >
                        {getSectionScore("experience")}
                      </div>
                    </>
                  )}
                  <button
                    onClick={() =>
                      addArrayItem("experience", {
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      })
                    }
                    className="btn-primary text-sm"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {selectedSection === "experience" &&
                getSectionFeedback("experience") && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      {getSectionFeedback("experience").feedback}
                    </p>
                    {getSectionFeedback("experience").suggestions.length >
                      0 && (
                      <ul className="text-sm space-y-1">
                        {getSectionFeedback("experience").suggestions.map(
                          (suggestion, index) => (
                            <li
                              key={index}
                              className="text-gray-700 flex items-start"
                            >
                              <span className="text-primary-600 mr-2">•</span>
                              {suggestion}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )}

              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "company",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeArrayItem("experience", exp.id)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) =>
                        updateArrayItem(
                          "experience",
                          exp.id,
                          "position",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "experience",
                          exp.id,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                <div className="flex items-center space-x-2">
                  {getSectionScore("education") && (
                    <div
                      className={`w-12 h-12 rounded-full ${getScoreColor(
                        getSectionScore("education")
                      )} flex items-center justify-center text-white font-bold`}
                    >
                      {getSectionScore("education")}
                    </div>
                  )}
                  <button
                    onClick={() =>
                      addArrayItem("education", {
                        school: "",
                        degree: "",
                        field: "",
                        startDate: "",
                        endDate: "",
                        gpa: "",
                      })
                    }
                    className="btn-primary text-sm"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "school",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeArrayItem("education", edu.id)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          edu.id,
                          "degree",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          edu.id,
                          "field",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Start"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="End"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="GPA"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "gpa",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                <div className="flex items-center space-x-2">
                  {getSectionScore("skills") && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedSection(
                            selectedSection === "skills" ? null : "skills"
                          )
                        }
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          />
                        </svg>
                        Tips
                      </button>
                      <div
                        className={`w-12 h-12 rounded-full ${getScoreColor(
                          getSectionScore("skills")
                        )} flex items-center justify-center text-white font-bold`}
                      >
                        {getSectionScore("skills")}
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => {
                      const skill = prompt("Enter skill name:");
                      if (skill) addArrayItem("skills", { name: skill });
                    }}
                    className="btn-primary text-sm"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {selectedSection === "skills" && getSectionFeedback("skills") && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    {getSectionFeedback("skills").feedback}
                  </p>
                  {getSectionFeedback("skills").suggestions.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {getSectionFeedback("skills").suggestions.map(
                        (suggestion, index) => (
                          <li
                            key={index}
                            className="text-gray-700 flex items-start"
                          >
                            <span className="text-primary-600 mr-2">•</span>
                            {suggestion}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => removeArrayItem("skills", skill.id)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                <div className="flex items-center space-x-2">
                  {getSectionScore("projects") && (
                    <div
                      className={`w-12 h-12 rounded-full ${getScoreColor(
                        getSectionScore("projects")
                      )} flex items-center justify-center text-white font-bold`}
                    >
                      {getSectionScore("projects")}
                    </div>
                  )}
                  <button
                    onClick={() =>
                      addArrayItem("projects", {
                        name: "",
                        description: "",
                        technologies: "",
                        link: "",
                      })
                    }
                    className="btn-primary text-sm"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {resumeData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) =>
                          updateArrayItem(
                            "projects",
                            proj.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeArrayItem("projects", proj.id)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      placeholder="Description"
                      value={proj.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "projects",
                          proj.id,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Technologies"
                      value={proj.technologies}
                      onChange={(e) =>
                        updateArrayItem(
                          "projects",
                          proj.id,
                          "technologies",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={proj.link}
                      onChange={(e) =>
                        updateArrayItem(
                          "projects",
                          proj.id,
                          "link",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            {analysis && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Tips
                </h3>
                <div className="space-y-3">
                  {analysis.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <span className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-primary-50 to-cyan-50 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Editing Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Sections Completed</span>
                  <span className="font-bold text-gray-900">6/6</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Keep refining your content to improve your score!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
