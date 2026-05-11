import React, { useEffect, useState } from "react";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../Redux/services/userService";
import { auth, provider } from "./OAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useOauthLoginMutation } from "../../Redux/services/userService";

import Signup from "./Signup";
import Login from "./Login";
import { Fullscreen } from "lucide-react";

export default function AuthPanel({ onAuthSuccess }) {
  const navigate = useNavigate();
  //user create api mutation hook
  const [
    createUser,
    { isLoading: isCreateUserLoading, data, isSuccess, isError, error },
  ] = useCreateUserMutation();
  const [
    loginUser,
    {
      isLoading: isLoginUserLoading,
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [OauthLogin] = useOauthLoginMutation();

  //state to manage mode
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  //login payload
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //signup payload
  const [signup, setSignup] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  //handle signup fucntion
  const handleSignup = async (data) => {
    try {
      const response = await createUser(data).unwrap();
      if (response && response?.statusCode === 201) {
        toast.success("User created successfully! Please login.");
      }
    } catch (err) {
      if (err && err?.data?.detail) {
        toast.error(`${err?.data?.detail}`);
      }
    }
  };

  //handle login function
  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response && response?.token) {
        localStorage.setItem("token", response?.token);
        navigate("/resume_list");
      }
    } catch (err) {
      if (err?.status === "FETCH_ERROR") {
        toast.error("Network error. Please check your connection.");
        return;
      }
      if (err && err?.data?.detail) {
        toast.error(`${err?.data?.detail}`);
      }
    }
  };
  // basic validation helpers

  const handleOauthLogin = async () => {
    // Implementation for OAuth login
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const payload = {
        full_name: user.displayName,
        email: user.email,
        auth_provider: "google",
      };
      const response = await OauthLogin(payload).unwrap();

      if (response && response?.token) {
        localStorage.setItem("token", response?.token);
        toast.success("Login successful");
        navigate("/resume_list");
      }

      // OPTIONAL:
      // send user to backend

      // Example:
      // const response = await googleLogin(payload).unwrap();

      // TEMP LOGIN
      // localStorage.setItem("token", user.accessToken);

      // toast.success("Login successful");
      //  navigate("/resume_list");
    } catch (error) {
      toast.error("Google login failed");
      console.log(error);
      // toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Or create a new account —{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                  }}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                  }}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <div className="rounded-md shadow-sm -space-y-px bg-white p-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              title="coming soon"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
              onClick={() => handleOauthLogin()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.9 0 7 1.6 9.2 3.8l6.8-6.8C36.9 2.6 30.8 0 24 0 14.6 0 6.8 5.6 3 13.7l7.9 6.1C12.6 14 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h12.6c-.5 2.6-2 4.8-4.3 6.3l6.9 5.3c4-3.7 6.4-9.3 6.4-15.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.9 28.8C9.8 26.7 9.3 24.4 9.3 22c0-2.4.5-4.7 1.6-6.8L3 9.1C1.1 12.4 0 16.1 0 20c0 3.9 1.1 7.6 3 10.9l7.9-2.1z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.8 0 12.9-2.6 17.6-6.8l-7.9-6.2C31 36.8 27.9 38.5 24 38.5c-6.3 0-11.4-4.5-12.1-10.6L3 31.9C6.8 40 14.6 46.5 24 46.5z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center text-sm text-gray-400">
              <span className="px-2 bg-white">or</span>
            </div>

            {mode === "signup" && (
              <Signup
                signup={signup}
                setSignup={setSignup}
                handleSignup={handleSignup}
                isCreateUserLoading={isCreateUserLoading}
              />
            )}

            {mode === "login" && (
              <Login
                login={login}
                setLogin={setLogin}
                handleLogin={handleLogin}
                isLoginUserLoading={isLoginUserLoading}
              />
            )}

            <div className="text-xs text-gray-500">
              By continuing, you agree to our <a className="underline">Terms</a>{" "}
              and <a className="underline">Privacy Policy</a>.
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setMode("login");
                }}
                className={`px-3 py-1 rounded ${
                  mode === "login"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode("signup");
                }}
                className={`px-3 py-1 rounded ${
                  mode === "signup"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Need a demo account?{" "}
          <code className="bg-slate-100 px-1 rounded">
            demo@demo.com / demoPass123
          </code>
        </div>
      </div>
    </div>
  );
}
