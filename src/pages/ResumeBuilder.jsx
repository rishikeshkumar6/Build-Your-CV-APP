//hooks
import React, { useState, useRef, useEffect } from "react";
//icons
import { Plus, Trash2 } from "lucide-react";
//steps data
import { steps } from "../compnents/staticData/StepperData";
//component
import SidebarTesting from "./SidebarTesting";
import Personal_Info from "./createResumeForm/Personal_Info/Personal_Info";
import Summary from "./createResumeForm/Summary/Summary";
import Exprience from "./createResumeForm/Exprience/Exprience";
import Projects from "./createResumeForm/Projects/Projects";
import Education from "./createResumeForm/Educations/Education";
import Skill from "./createResumeForm/Skill/Skill";
//external library
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Preview from "./createResumeForm/Preview/Preview";
import { toast } from "react-toastify";
//redux service
import {
  useCreateResumeMutation,
  useGetSingleResumeQuery,
  useDeleteResumeMutation,
  useUpdateResumeMutation,
} from "../Redux/services/userService";
//react router dom
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  //id get from url params
  const { id } = useParams();
  const nav = useNavigate();
  //create resume mutation hook
  const [createResume, { data, isLoading, isError, isSuccess, error }] =
    useCreateResumeMutation(id);

  const [
    updateResume,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      data: updateResumeData,
      error: updateResumeError,
    },
  ] = useUpdateResumeMutation();
  //get single resume query hook
  const {
    isLoading: isSingleResumeLoading,
    isSuccess: isSingleResumeSuccess,
    data: singleResumeData,
    error: singleResumeError,
  } = useGetSingleResumeQuery(id, { skip: !id });

  //stepper state and form submission state
  const [currentStep, setCurrentStep] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isPersonalInfoFill, setPersonalInfoFill] = useState(false);
  const [isSummaryFill, setSummaryFill] = useState(false);
  const [isExprienceFill, setExprienceFill] = useState(false);
  const [isProjectFill, setProjectFill] = useState(false);
  const [isEducationFill, setEducationFill] = useState(false);
  const [isSkillFill, setSKillFill] = useState(false);
  const [isPreviewFill, setPreviewFill] = useState(false);
  const [editMode, setEditMode] = useState(id ? true : false);

  //Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    title: "",
    email: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  //Summary State
  const [summary, setSummary] = useState({
    summary: "",
  });

  //Experience State
  const [experiences, setExperiences] = useState({
    experiences: [
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
        techStack: "",
      },
    ],
  });

  //Projects State
  const [projects, setProjects] = useState({
    projects: [
      {
        name: "",
        description: "",
        techStack: "",
        github: "",
        live: "",
      },
    ],
  });

  //Education State
  const [education, setEducation] = useState({
    education: [
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
      },
    ],
  });

  //Skills State
  const [skills, setSkills] = useState({
    frontend: "",
    backend: "",
    database: "",
    other: "",
  });

  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "RISHIKESH KUMAR SINGH",
    title:
      "Software Developer | React.js | Node.js | PostgreSQL | FastApi | Express.js",
    email: "",
    github: "",
    linkedin: "",

    // Summary
    summary:
      "Passionate Software Developer with 1.11 years of experience in building scalable React.js and Node.js applications. Skilled in developing logistics and real-time tracking systems using Redux Toolkit, FastAPI, and PostgreSQL. Focused on creating performant, user-centric solutions for e-commerce and last-mile delivery platforms.",

    // Experience
    experiences: [
      {
        id: 1,
        position: "Software Developer",
        company: "Omneelab Software Solutions",
        startDate: "January 2024",
        endDate: "Present",
        responsibilities: [
          "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
          "Implemented features for manual, single, and bulk order creation, enabling sellers to manage all courier services on one platform.",
          "Integrated webhook-based automation to fetch and display real-time orders from multiple marketplaces.",
          "Built responsive UI components using React Hooks, Redux Toolkit Query, and Tailwind CSS, connected to a FastAPI + PostgreSQL backend for seamless data flow and performance.",
        ],
        techStack:
          "HTML/Tailwind CSS, JavaScript, React, Redux Toolkit, Redux Toolkit Query, Node.js, Express.js, JWT, PostgreSQL, Sequelize",
      },
    ],

    // Projects
    projects: [
      {
        id: 1,
        name: "Logistic-Solutions",
        description:
          "Comprehensive logistics management platform for e-commerce order tracking and management.",
        techStack: "React, Node.js, PostgreSQL, FastAPI",
        github: "",
        live: "",
      },
      {
        id: 2,
        name: "Build-Your-CV",
        description:
          "Users can create and customize their resumes by filling in personal information, work experience, education, skills, achievements, and projects. Users can choose from a variety of templates to style their resumes according to their preferences.",
        techStack:
          "HTML5, CSS3, JavaScript, React, Redux, Material UI, React-Router-Dom",
        github: "",
        live: "",
      },
    ],

    // Education
    education: [
      {
        id: 1,
        degree: "B.Tech – Computer Science Engineering",
        institution: "Rabindranath Tagore University, Bhopal",
        startYear: "2019",
        endYear: "2023",
      },
      {
        id: 2,
        degree: "Intermediate Of Science (I.S.C)",
        institution: "Narayan Yadav Inter College Munjhgai, Bihar",
        startYear: "2017",
        endYear: "2019",
      },
    ],

    // Skills
    skills: {
      frontend:
        "React.js, Redux Toolkit, RTK Query, JavaScript (ES6+), Tailwind CSS, Material UI",
      backend: "Node.js, Express.js, FastAPI",
      database: "PostgreSQL, MongoDB, Sequelize",
      other: "REST APIs, JWT, Git/GitHub, Agile, UI/UX Design",
    },
  });

  //useEffect for error handling
  useEffect(() => {
    if (isError && error?.status === 422) {
      const errorMessages = error?.data?.detail
        ?.map((err) => `${err.loc[1]}: ${err.msg}`)
        .join(", ");
      toast.error("An Internal Server Error Occurred");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSingleResumeSuccess && singleResumeData?.statusCode === 200) {
      setPersonalInfoFill(
        singleResumeData?.data[0]?.is_personalinfo_fill || false,
      );
      setSummaryFill(singleResumeData?.data[0]?.is_summary_fill || false);
      setExprienceFill(singleResumeData?.data[0]?.is_experience_fill || false);
      setProjectFill(singleResumeData?.data[0]?.is_project_fill || false);
      setEducationFill(singleResumeData?.data[0]?.is_education_fill || false);
      setSKillFill(singleResumeData?.data[0]?.is_skills_fill || false);
      setPreviewFill(singleResumeData?.data[0]?.is_preview_fill || false);
      //personal info data populate
      setPersonalInfo({
        fullName: singleResumeData?.data[0].full_name || "",
        title: singleResumeData?.data[0].title || "",
        email: singleResumeData?.data[0].email || "",
        github: singleResumeData?.data[0].github || null,
        linkedin: singleResumeData?.data[0].linkedin || null,
        portfolio: singleResumeData?.data[0].portfolio || null,
      });
      //experience data populate
      setExperiences({
        experiences: singleResumeData?.data[0]?.experiences || [],
      });
      //education data populate
      setEducation({
        education: singleResumeData?.data[0]?.education || [],
      });
      //projects data populate
      setProjects({
        projects: singleResumeData?.data[0]?.projects || [],
      });
      //skills data populate
      setSkills({
        frontend: singleResumeData?.data[0]?.frontend || "",
        backend: singleResumeData?.data[0]?.backend || "",
        database: singleResumeData?.data[0]?.database || "",
        other: singleResumeData?.data[0]?.other || "",
      });
      //summary data populate
      setSummary({
        summary: singleResumeData?.data[0].summary || "",
      });
    }
  }, [isSingleResumeSuccess, singleResumeData]);
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const obj = {
        ...personalInfo,
        ...summary,
        ...experiences,
        ...projects,
        ...education,
        ...skills,
      };
      setIsFormSubmitted(true);
      const response = await createResume(obj);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "Resume Created Successfully");
        nav("/resume_list");
      }
      if (response?.error && response?.error?.status === 401) {
        localStorage.clear("token");
        nav("/login");
      }
    } catch (err) {
      toast.error("An Internal Server Error Occurred");
    }
  };

  const handleUpdate = async () => {
    try {
      const obj = {
        ...personalInfo,
        ...summary,
        ...experiences,
        ...projects,
        ...education,
        ...skills,
        id: id,
      };
      setIsFormSubmitted(true);
      const response = await updateResume(obj);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "Resume Updated Successfully");
        nav("/resume_list");
      }
      if (response?.error && response?.error?.status === 401) {
        localStorage.clear("token");
        nav("/login");
      }
    } catch (err) {
      toast.error("An Internal Server Error Occurred");
    }
  };

  const addExperience = (values, setFieldValue) => {
    const exprince = { ...values };
    exprince.experiences.push({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
      techStack: "",
    });
    setFieldValue("experiences", exprince.experiences);
  };

  const removeExperience = (id, values, setFieldValue) => {
    let value = { ...values };
    value.experiences = value?.experiences?.filter(
      (elem, index) => index !== id,
    );
    setFieldValue("experiences", value?.experiences);
  };

  const updateExperience = (id, field, value) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const addResponsibility = (expId, values, setFieldValue) => {
    const responsibility = JSON.parse(JSON.stringify(values));
    responsibility.experiences[expId].responsibilities.push("");
    setFieldValue("experiences", responsibility.experiences);
  };

  const updateResponsibility = (expId, index, value) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((resp, i) =>
                i === index ? value : resp,
              ),
            }
          : exp,
      ),
    });
  };

  const removeResponsibility = (expId, id, values, setFieldValue) => {
    const deleteResponsibility = JSON.parse(JSON.stringify(values));
    deleteResponsibility.experiences[expId].responsibilities =
      deleteResponsibility.experiences[expId].responsibilities.filter(
        (elem, index) => index !== id,
      );
    setFieldValue("experiences", deleteResponsibility.experiences);
  };

  const addProject = (values, setFieldValue) => {
    const project = { ...values };
    project.projects.push({
      name: "",
      description: "",
      techStack: "",
      github: "",
      live: "",
    });
    setFieldValue("projects", project.projects);
  };

  const removeProject = (projIndex, values, setFieldValue) => {
    const project = { ...values };
    project.projects = project.projects.filter(
      (proj, index) => index !== projIndex,
    );
    setFieldValue("projects", project.projects);
  };

  const updateProject = (id, field, value) => {
    setFormData({
      ...formData,
      projects: formData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    });
  };

  const addEducation = (values, setFieldValue) => {
    const education = { ...values };
    education.education.push({
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
    });
    setFieldValue("education", education.education);
  };

  const removeEducation = (eduIndex, values, setFieldValue) => {
    const education = { ...values };
    education.education = education.education.filter(
      (edu, index) => index !== eduIndex,
    );
    setFieldValue("education", education.education);
  };

  const updateEducation = (id, field, value) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  /* ---------------- PDF GENERATE FUNCTION ---------------- */
  const downloadResume = async () => {
    const resume = document.getElementById("resume-container");

    resume.style.width = "794px";
    resume.style.height = "auto"; // enforce one page

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
    <div className="">
      <div className="flex flex-col md:flex-row">
        {true && (
          <SidebarTesting
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isFormSubmitted={isFormSubmitted}
            isPersonalInfoFill={isPersonalInfoFill}
            isSummaryFill={isSummaryFill}
            isExprienceFill={isExprienceFill}
            isProjectFill={isProjectFill}
            isEducationFill={isEducationFill}
            isSkillFill={isSkillFill}
            isPreviewFill={isPreviewFill}
          />
        )}

        <div className="bg-white overflow-hidden w-[70%]">
          {/* Progress Stepper */}

          {/* Form Content */}
          <div className="px-12 py-12">
            <div className="mx-auto">
              {/*Personal Info*/}
              {currentStep === 0 && (
                <Personal_Info
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  handleNext={handleNext}
                  setPersonalInfoFill={setPersonalInfoFill}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*Professional Summary*/}
              {currentStep === 1 && (
                <Summary
                  summary={summary}
                  setSummary={setSummary}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  setSummaryFill={setSummaryFill}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*Work Experience*/}
              {currentStep === 2 && (
                <Exprience
                  experiences={experiences}
                  setExperiences={setExperiences}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  addExperience={addExperience}
                  removeExperience={removeExperience}
                  addResponsibility={addResponsibility}
                  removeResponsibility={removeResponsibility}
                  setExprienceFill={setExprienceFill}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*Projects*/}
              {currentStep === 3 && (
                <Projects
                  projects={projects}
                  setProjects={setProjects}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  setProjectFill={setProjectFill}
                  addProject={addProject}
                  removeProject={removeProject}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*Education*/}
              {currentStep === 4 && (
                <Education
                  education={education}
                  setEducation={setEducation}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  setEducationFill={setEducationFill}
                  addEducation={addEducation}
                  removeEducation={removeEducation}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*Skills*/}
              {currentStep === 5 && (
                <Skill
                  skills={skills}
                  setSkills={setSkills}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  setSKillFill={setSKillFill}
                  isSingleResumeSuccess={isSingleResumeSuccess}
                  singleResumeData={singleResumeData}
                  editMode={editMode}
                />
              )}
              {/*resume preview*/}
              {currentStep === 6 && (
                <Preview
                  handlePrev={handlePrev}
                  downloadResume={downloadResume}
                  setPreviewFill={setPreviewFill}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                  isLoading={isLoading}
                  isUpdateLoading={isUpdateLoading}
                  personalInfo={personalInfo}
                  summary={summary}
                  experiences={experiences}
                  projects={projects}
                  education={education}
                  skills={skills}
                  editMode={editMode}
                />
              )}
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
