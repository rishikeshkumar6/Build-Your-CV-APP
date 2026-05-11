import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { exprienceSchema } from "./Exprience_Schema";
const Exprience = ({
  experiences,
  setExperiences,
  handlePrev,
  handleNext,
  addExperience,
  removeExperience,
  addResponsibility,
  removeResponsibility,
  setExprienceFill,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={experiences}
      onSubmit={(fields) => {
        handleNext();
        setExperiences(fields);
        setExprienceFill(true);
      }}
      validationSchema={exprienceSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Work Experience
              </h2>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => addExperience(values, setFieldValue)}
              >
                <Plus size={18} />
                Add Experience
              </button>
            </div>
            {values?.experiences?.map((exp, expIndex) => (
              <div
                key={expIndex}
                className="p-6 border-2 border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Experience #{expIndex + 1}
                  </h3>
                  {values?.experiences?.length > 1 && (
                    <button
                      className="text-red-600 hover:text-red-700 p-2"
                      type="button"
                      onClick={() =>
                        removeExperience(expIndex, values, setFieldValue)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Position *
                    </label>
                    <Field
                      name={`experiences[${expIndex}].position`}
                      type="text"
                      className={`${
                        errors?.experiences &&
                        errors?.experiences[expIndex]?.position
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="Software Developer"
                    />
                    <ErrorMessage
                      name={`experiences[${expIndex}].position`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company *
                    </label>
                    <Field
                      name={`experiences[${expIndex}].company`}
                      type="text"
                      className={`${
                        errors?.experiences &&
                        errors?.experiences[expIndex]?.company
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="Company Name"
                    />
                    <ErrorMessage
                      name={`experiences[${expIndex}].company`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <Field
                      name={`experiences[${expIndex}].startDate`}
                      type="date"
                      className={`${
                        errors?.experiences &&
                        errors?.experiences[expIndex]?.startDate
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="January 2024"
                    />
                    <ErrorMessage
                      name={`experiences[${expIndex}].startDate`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date *
                    </label>
                    <Field
                      name={`experiences[${expIndex}].endDate`}
                      type="date"
                      className={`${
                        errors?.experiences &&
                        errors?.experiences[expIndex]?.endDate
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="Present"
                    />
                    <ErrorMessage
                      name={`experiences[${expIndex}].endDate`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Responsibilities *
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      onClick={() =>
                        addResponsibility(expIndex, values, setFieldValue)
                      }
                    >
                      <Plus size={16} />
                      Add Point
                    </button>
                  </div>

                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex}>
                      <div className="flex gap-2 mb-2">
                        <Field
                          name={`experiences[${expIndex}].responsibilities[${respIndex}]`}
                          rows={2}
                          className={`${
                            errors?.experiences &&
                            errors?.experiences[expIndex]?.responsibilities[
                              respIndex
                            ]
                              ? "border-red-600"
                              : ""
                          } flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none`}
                          placeholder="Describe your achievement or responsibility..."
                        />
                        {exp.responsibilities.length > 1 && (
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-700 px-2"
                            onClick={() =>
                              removeResponsibility(
                                expIndex,
                                respIndex,
                                values,
                                setFieldValue,
                              )
                            }
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      <ErrorMessage
                        name={`experiences[${expIndex}].responsibilities[${respIndex}]`}
                        component={"div"}
                        className="text-red-600 text-sm my-2"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Stack
                  </label>
                  <Field
                    name={`experiences[${expIndex}].techStack`}
                    type="text"
                    className={`${
                      errors?.experiences &&
                      errors?.experiences[expIndex]?.techStack
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="React, Node.js, PostgreSQL, etc."
                  />
                  <ErrorMessage
                    name={`experiences[${expIndex}].techStack`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
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

export default Exprience;
