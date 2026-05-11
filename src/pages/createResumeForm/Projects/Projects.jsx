import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ProjectsSchema } from "./Projects_Schema";
import { use } from "react";
const Projects = ({
  projects,
  setProjects,
  handlePrev,
  handleNext,
  setProjectFill,
  addProject,
  removeProject,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={projects}
      validationSchema={ProjectsSchema}
      onSubmit={(fields) => {
        handleNext();
        setProjects(fields);
        setProjectFill(true);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => addProject(values, setFieldValue)}
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>

            {values?.projects.map((proj, projIndex) => (
              <div
                key={projIndex}
                className="p-6 border-2 border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Project #{projIndex + 1}
                  </h3>
                  {values?.projects?.length > 1 && (
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 p-2"
                      onClick={() =>
                        removeProject(projIndex, values, setFieldValue)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <Field
                    name={`projects[${projIndex}].name`}
                    type="text"
                    className={`${
                      errors?.projects && errors?.projects[projIndex]?.name
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="Project Name"
                  />
                  <ErrorMessage
                    name={`projects[${projIndex}].name`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <Field
                    name={`projects[${projIndex}].description`}
                    as="textarea"
                    rows={3}
                    className={`${
                      errors?.projects &&
                      errors?.projects[projIndex]?.description
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
                    placeholder="Describe the project, its features, and your role..."
                  />
                  <ErrorMessage
                    name={`projects[${projIndex}].description`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Stack *
                  </label>
                  <Field
                    name={`projects[${projIndex}].techStack`}
                    type="text"
                    className={`${
                      errors?.projects && errors?.projects[projIndex]?.techStack
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="React, Node.js, MongoDB, etc."
                  />
                  <ErrorMessage
                    name={`projects[${projIndex}].techStack`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      GitHub Link
                    </label>
                    <Field
                      name={`projects[${projIndex}].github`}
                      type="text"
                      className={`${
                        errors?.projects && errors?.projects[projIndex]?.github
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="github.com/username/repo"
                    />
                    <ErrorMessage
                      name={`projects[${projIndex}].github`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Live Demo Link
                    </label>
                    <Field
                      name={`projects[${projIndex}].live`}
                      type="text"
                      className={`${
                        errors?.projects && errors?.projects[projIndex]?.live
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="project-demo.com"
                    />
                    <ErrorMessage
                      name={`projects[${projIndex}].live`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
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
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Projects;
