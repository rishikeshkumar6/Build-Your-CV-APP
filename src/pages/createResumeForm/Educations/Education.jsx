import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import educationSchema from "./Educations_Schema";
const Education = ({
  education,
  setEducation,
  handlePrev,
  handleNext,
  setEducationFill,
  addEducation,
  removeEducation,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={education}
      validationSchema={educationSchema}
      onSubmit={(fields) => {
        handleNext();
        setEducation(fields);
        setEducationFill(true);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => addEducation(values, setFieldValue)}
              >
                <Plus size={18} />
                Add Education
              </button>
            </div>

            {values?.education?.map((edu, eduIndex) => (
              <div
                key={eduIndex}
                className="p-6 border-2 border-gray-200 rounded-lg  space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Education #{eduIndex + 1}
                  </h3>
                  {values?.education?.length > 1 && (
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 p-2"
                      onClick={() =>
                        removeEducation(eduIndex, values, setFieldValue)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Degree *
                  </label>
                  <Field
                    name={`education[${eduIndex}].degree`}
                    type="text"
                    className={`${
                      errors?.education && errors?.education[eduIndex]?.degree
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="B.Tech - Computer Science Engineering"
                  />
                  <ErrorMessage
                    name={`education[${eduIndex}].degree`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Institution *
                  </label>
                  <Field
                    name={`education[${eduIndex}].institution`}
                    type="text"
                    className={`${
                      errors?.education &&
                      errors?.education[eduIndex]?.institution
                        ? "border-red-600"
                        : ""
                    } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    placeholder="University Name, City"
                  />
                  <ErrorMessage
                    name={`education[${eduIndex}].institution`}
                    component={"div"}
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Year *
                    </label>
                    <Field
                      name={`education[${eduIndex}].startYear`}
                      type="date"
                      className={`${
                        errors?.education &&
                        errors?.education[eduIndex]?.startYear
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="2019"
                    />
                    <ErrorMessage
                      name={`education[${eduIndex}].startYear`}
                      component={"div"}
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Year *
                    </label>
                    <Field
                      name={`education[${eduIndex}].endYear`}
                      type="date"
                      className={`${
                        errors?.education &&
                        errors?.education[eduIndex]?.endYear
                          ? "border-red-600"
                          : ""
                      } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      placeholder="2023"
                    />
                    <ErrorMessage
                      name={`education[${eduIndex}].endYear`}
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

export default Education;
