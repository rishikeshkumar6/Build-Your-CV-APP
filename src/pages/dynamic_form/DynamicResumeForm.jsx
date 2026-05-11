import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useUploadResumeImprovementMutation } from "../../Redux/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ─── Initial Data ─────────────────────────────────────────────────────────────
const initialValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: [],
  experience: [
    {
      title: "",
      company: "",
      duration: "",
      description: "",
    },
  ],
  education: [
    {
      degree: "",
      institution: "",
      year: "",
    },
    {
      degree: "",
      institution: "",
      year: "",
    },
  ],
  projects: [
    {
      name: "",
      description: "",
      technologies: "",
    },
    {
      name: "",
      description: "",
      technologies: "",
    },
  ],
  certifications: [""],
  newSkill: "",
};

// ─── Validation Schema ────────────────────────────────────────────────────────
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  location: Yup.string().required("Location is required"),
  summary: Yup.string().required("Summary is required"),
  skills: Yup.array().of(Yup.string()),
  experience: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Job title required"),
      company: Yup.string().required("Company required"),
      duration: Yup.string().required("Duration required"),
      description: Yup.string().required("Description required"),
    }),
  ),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree required"),
      institution: Yup.string().required("Institution required"),
      year: Yup.string().required("Year required"),
    }),
  ),
  projects: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Project name required"),
      description: Yup.string().required("Description required"),
      technologies: Yup.string().required("Technologies required"),
    }),
  ),
  certifications: Yup.array().of(Yup.string()),
});

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionHeader = ({ icon, title, children }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2">
      <span className="text-slate-400 text-base">{icon}</span>
      <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const FieldInput = ({ label, name, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-xs text-red-500 mt-0.5"
    />
  </div>
);

const FieldTextarea = ({ label, name, placeholder, rows = 4 }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <Field
      as="textarea"
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-y leading-relaxed"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-xs text-red-500 mt-0.5"
    />
  </div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border border-slate-100 rounded-xl p-5 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const ItemBlock = ({ children, onRemove, canRemove }) => (
  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3 last:mb-0 group relative">
    {canRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 text-slate-300 hover:text-red-400 text-lg leading-none transition-colors"
        title="Remove"
      >
        ×
      </button>
    )}
    {children}
  </div>
);

const AddButton = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full mt-3 py-2 text-xs font-medium text-indigo-500 border border-dashed border-indigo-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all"
  >
    + {label}
  </button>
);

// ─── Main Form Component ──────────────────────────────────────────────────────
export default function ResumeForm({ data, id }) {
  const [uploadResumeImprovement] = useUploadResumeImprovementMutation();
  const navigate = useNavigate();
  //redux state
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

  const downloadResume = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}resume/api/download-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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

  const handleSubmit = async (values) => {
    try {
      const { newSkill, ...formData } = values;
      const response = await uploadResumeImprovement({
        id: id,
        formData,
      });
      toast.success(
        response?.data?.message || "Resume improvement uploaded successfully!",
      );
      navigate("/ai_resume");
    } catch (err) {
      console.error("Error uploading resume improvement:", err);
      toast.error("Failed to upload resume improvement.");
    }
    // await downloadResume(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-1">
            Resume Builder
          </p>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Edit your profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            All changes are reflected in your generated resume
          </p>
        </div>

        <Formik
          initialValues={formData ? formData : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-5">
              {/* ── Personal Details ── */}
              <Card>
                <SectionHeader icon="👤" title="Personal details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FieldInput
                    label="Full name"
                    name="name"
                    placeholder="Your full name"
                  />
                  <FieldInput
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                  />
                  <FieldInput
                    label="Phone number"
                    name="phone"
                    placeholder="+91 98765 43210"
                  />
                  <FieldInput
                    label="Location"
                    name="location"
                    placeholder="City, Country"
                  />
                </div>
                <FieldTextarea
                  label="Professional summary"
                  name="summary"
                  placeholder="A concise overview of your expertise and goals..."
                  rows={4}
                />
              </Card>

              {/* ── Skills ── */}
              <Card>
                <SectionHeader icon="⚡" title="Skills" />
                <FieldArray name="skills">
                  {({ remove }) => (
                    <>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {values.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-medium"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              className="text-indigo-300 hover:text-red-400 leading-none text-sm transition-colors"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a skill and press Enter..."
                          value={values.newSkill}
                          onChange={(e) =>
                            setFieldValue("newSkill", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const v = values.newSkill.trim();
                              if (v && !values.skills.includes(v)) {
                                setFieldValue("skills", [...values.skills, v]);
                                setFieldValue("newSkill", "");
                              }
                            }
                          }}
                          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const v = values.newSkill.trim();
                            if (v && !values.skills.includes(v)) {
                              setFieldValue("skills", [...values.skills, v]);
                              setFieldValue("newSkill", "");
                            }
                          }}
                          className="px-4 py-2 text-xs font-semibold bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </Card>

              {/* ── Experience ── */}
              <Card>
                <SectionHeader icon="💼" title="Work experience" />
                <FieldArray name="experience">
                  {({ push, remove }) => (
                    <>
                      {values.experience.map((_, idx) => (
                        <ItemBlock
                          key={idx}
                          onRemove={() => remove(idx)}
                          canRemove={values.experience.length > 0}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 pr-6">
                            <FieldInput
                              label="Job title"
                              name={`experience.${idx}.title`}
                              placeholder="e.g. Software Developer"
                            />
                            <FieldInput
                              label="Company"
                              name={`experience.${idx}.company`}
                              placeholder="Company name"
                            />
                            <div className="sm:col-span-2">
                              <FieldInput
                                label="Duration"
                                name={`experience.${idx}.duration`}
                                placeholder="e.g. June 2024 – Present"
                              />
                            </div>
                          </div>
                          <FieldTextarea
                            label="Description"
                            name={`experience.${idx}.description`}
                            placeholder="Key responsibilities, achievements, and impact..."
                            rows={4}
                          />
                        </ItemBlock>
                      ))}
                      <AddButton
                        onClick={() =>
                          push({
                            title: "",
                            company: "",
                            duration: "",
                            description: "",
                          })
                        }
                        label="Add experience"
                      />
                    </>
                  )}
                </FieldArray>
              </Card>

              {/* ── Education ── */}
              <Card>
                <SectionHeader icon="🎓" title="Education" />
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <>
                      {values.education.map((_, idx) => (
                        <ItemBlock
                          key={idx}
                          onRemove={() => remove(idx)}
                          canRemove={values.education.length > 1}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">
                            <div className="sm:col-span-2">
                              <FieldInput
                                label="Degree / qualification"
                                name={`education.${idx}.degree`}
                                placeholder="e.g. B.Tech – Computer Science"
                              />
                            </div>
                            <FieldInput
                              label="Year"
                              name={`education.${idx}.year`}
                              placeholder="2019–2023"
                            />
                            <div className="sm:col-span-3">
                              <FieldInput
                                label="Institution"
                                name={`education.${idx}.institution`}
                                placeholder="University / college name"
                              />
                            </div>
                          </div>
                        </ItemBlock>
                      ))}
                      <AddButton
                        onClick={() =>
                          push({ degree: "", institution: "", year: "" })
                        }
                        label="Add education"
                      />
                    </>
                  )}
                </FieldArray>
              </Card>

              {/* ── Projects ── */}
              <Card>
                <SectionHeader icon="🚀" title="Projects" />
                <FieldArray name="projects">
                  {({ push, remove }) => (
                    <>
                      {values.projects.map((_, idx) => (
                        <ItemBlock
                          key={idx}
                          onRemove={() => remove(idx)}
                          canRemove={values.projects.length > 0}
                        >
                          <div className="pr-6 space-y-3">
                            <FieldInput
                              label="Project name"
                              name={`projects.${idx}.name`}
                              placeholder="Project title"
                            />
                            <FieldTextarea
                              label="Description"
                              name={`projects.${idx}.description`}
                              placeholder="What it does and the impact..."
                              rows={3}
                            />
                            <FieldInput
                              label="Technologies used"
                              name={`projects.${idx}.technologies`}
                              placeholder="React, Node.js, PostgreSQL..."
                            />
                          </div>
                        </ItemBlock>
                      ))}
                      <AddButton
                        onClick={() =>
                          push({ name: "", description: "", technologies: "" })
                        }
                        label="Add project"
                      />
                    </>
                  )}
                </FieldArray>
              </Card>

              {/* ── Certifications ── */}
              <Card>
                <SectionHeader icon="🏅" title="Certifications" />
                <FieldArray name="certifications">
                  {({ push, remove }) => (
                    <>
                      <div className="space-y-2 mb-2">
                        {values.certifications.map((_, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Field
                              name={`certifications.${idx}`}
                              placeholder="e.g. AWS Certified Developer"
                              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              disabled={values.certifications.length === 1}
                              className="px-3 py-2 text-slate-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <AddButton
                        onClick={() => push("")}
                        label="Add certification"
                      />
                    </>
                  )}
                </FieldArray>
              </Card>

              {/* ── Submit ── */}
              <div className="flex items-center justify-between pt-2 pb-8">
                <p className="text-xs text-slate-400">
                  All fields are saved on submit
                </p>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200"
                >
                  Save &amp; generate resume
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
