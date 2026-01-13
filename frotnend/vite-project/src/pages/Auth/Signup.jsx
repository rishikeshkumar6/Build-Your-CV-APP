import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { signupSchema } from "./userAuthSchema";
const Signup = ({ signup, setSignup, handleSignup }) => {
  console.log("<<<<<signup Form>>>>>", signup);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={signup}
      validationSchema={signupSchema}
      onSubmit={(fields) => {
        alert(JSON.stringify(fields));
        console.log("fields", fields);
        handleSignup(fields);
      }}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className="flex gap gap-4 flex-col">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Field
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
            <ErrorMessage
              name="email"
              component={"div"}
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Field
              name="password"
              type="password"
              required
              className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password (min 8 characters)"
            />
          </div>
          <ErrorMessage
            name="password"
            component={"div"}
            className="text-red-600 text-sm mt-1"
          />
          <div>
            <button
              type="submit"
              disabled={false}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              Sign up
            </button>
          </div>
          {console.log("values", values, "errors", errors)}
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
