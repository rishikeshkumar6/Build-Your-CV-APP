import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { personalInfoSchema } from "./Personal_Info_Schema";
const Personal_Info = ({
  personalInfo,
  setPersonalInfo,
  handleNext,
  setPersonalInfoFill,
  isSingleResumeSuccess,
  singleResumeData,
}) => {
  //populate form if single resume data is available
  useEffect(() => {
    if (isSingleResumeSuccess && singleResumeData?.statusCode === 200) {
      setPersonalInfo({
        fullName: singleResumeData?.data[0].full_name || "",
        title: singleResumeData?.data[0].title || "",
        email: singleResumeData?.data[0].email || "",
        github: singleResumeData?.data[0].github || null,
        linkedin: singleResumeData?.data[0].linkedin || null,
        portfolio: singleResumeData?.data[0].portfolio || null,
      });
    }
  }, [isSingleResumeSuccess, singleResumeData]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={personalInfo}
      validationSchema={personalInfoSchema}
      onSubmit={(fields) => {
        alert(JSON.stringify(fields));
        handleNext();
        setPersonalInfo(fields);
        setPersonalInfoFill(true);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="space-y-6">
            {console.log("<<<<errors>>>", errors)}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <Field
                name="fullName"
                type="text"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors?.fullName ? "border-red-600" : ""
                }`}
                placeholder="Enter your full name"
              />
              <ErrorMessage
                name="fullName"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Professional Title *
              </label>
              <Field
                name="title"
                type="text"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors?.title ? "border-red-600" : ""
                }`}
                placeholder="e.g., Software Developer | React.js | Node.js"
              />
              <ErrorMessage
                name="title"
                component={"div"}
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors?.email ? "border-red-600" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                <ErrorMessage
                  name="email"
                  component={"div"}
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub
                </label>
                <Field
                  name="github"
                  type="text"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors?.github ? "border-red-600" : ""
                  }`}
                  placeholder="github.com/username"
                />
                <ErrorMessage
                  name="github"
                  component={"div"}
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn
                </label>
                <Field
                  name="linkedin"
                  type="text"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors?.linkedin ? "border-red-600" : ""
                  }`}
                  placeholder="linkedin.com/in/username"
                />
                <ErrorMessage
                  name="linkedin"
                  component={"div"}
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio
                </label>
                <Field
                  name="portfolio"
                  type="text"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    errors?.portfolio ? "border-red-600" : ""
                  }`}
                  placeholder="https://yourportfolio.com"
                />
                <ErrorMessage
                  name="portfolio"
                  component={"div"}
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>
          </div>
          <div className={`bg-gray-50  py-6 flex justify-end`}>
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

export default Personal_Info;
