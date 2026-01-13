import React, { useState } from "react";
//Router imports
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
//components
import UserList from "../compnents/UserList";
import FileUpload from "../compnents/image";
import Login from "../pages/Auth/UserAuthentication";
import CreateUser from "../compnents/CreateUser";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import ResumeBuilder from "../pages/ResumeBuilder";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import ResumeEditor from "../pages/ResumeEditor";
import SidebarTesting from "../pages/SidebarTesting";
import Resume from "../pages/Resume";
import ResumeCard from "../pages/Resume_List";
import { useGetUserQuery } from "../Redux/services/userService";
const Router = () => {
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token"),
  });
  //public route

  const PublicRoutes = () => {
    console.log(localStorage.getItem("token") && isSuccess);
    if (localStorage.getItem("token")) {
      return <Navigate to="/resume_list" />;
    }
    return <Outlet />;
  };
  //private route
  const PrivateRoutes = () => {
    //check for token is exist or not in local storage
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }
    if (
      isError &&
      error?.status === 401 &&
      (error?.data?.detail === "Token has expired" ||
        error?.data?.detail === "Invalid token")
    ) {
      console.log("Unauthorized, logging out user.");
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/usermanagement" element={<CreateUser />} />
          <Route path="/resume_list" element={<ResumeCard />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/builder/:id" element={<ResumeBuilder />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
        </Route>
        <Route path="/imgupload" element={<FileUpload />} />
        <Route path="/userlist" element={<UserList />} />

        <Route path="/resume" element={<Resume />} />

        <Route path="/sidebar" element={<SidebarTesting />} />
        <Route path="/editor" element={<ResumeEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
