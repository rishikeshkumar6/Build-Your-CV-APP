import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import skillsSchema from "./Skill_Schema";
const Skill = ({
  skills,
  setSkills,
  handlePrev,
  handleNext,
  handleSubmit,
  setSKillFill,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={skills}
      validationSchema={skillsSchema}
      onSubmit={(fields) => {
        setSkills(fields);
        handleNext();
        setSKillFill(true);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Technical Skills
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Frontend *
              </label>
              <Field
                name="frontend"
                type="text"
                className={`${
                  errors?.frontend ? "border-red-600" : ""
                } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="React.js, Redux, JavaScript, HTML, CSS, etc."
              />
              <ErrorMessage
                name="frontend"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Backend *
              </label>
              <Field
                name="backend"
                type="text"
                className={`${
                  errors?.backend ? "border-red-600" : ""
                } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Node.js, Express.js, Python, etc."
              />
              <ErrorMessage
                name="backend"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Database *
              </label>
              <Field
                name="database"
                type="text"
                className={`${
                  errors?.database ? "border-red-600" : ""
                } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="PostgreSQL, MongoDB, MySQL, etc."
              />
              <ErrorMessage
                name="database"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Other Skills
              </label>
              <Field
                name="other"
                type="text"
                className={`${
                  errors?.other ? "border-red-600" : ""
                } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Git, Docker, AWS, Agile, etc."
              />
              <ErrorMessage
                name="other"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>
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
          {console.log("errors checking", errors)}
        </Form>
      )}
    </Formik>
  );
};

export default Skill;
