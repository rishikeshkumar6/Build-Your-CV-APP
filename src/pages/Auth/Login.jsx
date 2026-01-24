import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { loginSchema } from "./userAuthSchema";
import * as Yup from "yup";
const Login = ({ login, setLogin, handleLogin }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={login}
      validationSchema={loginSchema}
      onSubmit={(fields) => {
        handleLogin(fields);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, touched, isSubmitting, values }) => (
        <Form className="flex gap gap-4 flex-col">
          <div>
            {" "}
            <label htmlFor="email-address" className="sr-only">
              {" "}
              Email address{" "}
            </label>{" "}
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
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password (min 8 characters)"
            />
            <ErrorMessage
              name="password"
              component={"div"}
              className="text-red-600 text-sm mt-1"
            />
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              Sign in
            </button>
          </div>
          {console.log("errors", errors)}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
