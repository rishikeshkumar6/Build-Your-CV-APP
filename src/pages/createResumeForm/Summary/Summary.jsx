import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { summarySchema } from "./Summary_Schema";
const Summary = ({
  summary,
  setSummary,
  handlePrev,
  handleNext,
  setSummaryFill,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={summary}
      validationSchema={summarySchema}
      onSubmit={(fields) => {
        setSummary(fields);
        handleNext();
        setSummaryFill(true);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Professional Summary
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Summary *
              </label>
              <Field
                name="summary"
                as="textarea"
                rows={6}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                  errors?.summary ? "border-red-600" : ""
                }`}
                placeholder="Write a compelling professional summary highlighting your experience, skills, and career goals..."
              />
              <ErrorMessage
                name="summary"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: Keep it concise (3-4 sentences) and focus on your unique
                value proposition.
              </p>
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
        </Form>
      )}
    </Formik>
  );
};

export default Summary;
