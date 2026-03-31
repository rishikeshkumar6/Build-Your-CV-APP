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
//rtk query hook
import { useGetUserQuery } from "../Redux/services/userService";
//react-redux hook
import { useDispatch } from "react-redux";
//api reducer of rtk query
import { api } from "../Redux/services/userService";
import Websocket from "../pages/Websocket";
import PrivateWebSocket from "../pages/PrivateWebSocket";
import Chat from "../pages/chat/Chat";
import ResumeTemplate from "../compnents/Resume_Templates";
const Router = () => {
  const dispatch = useDispatch();
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token"),
    refetchOnMountOrArgChange: true,
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
    //check if our token is invalid or expire then it is remove the token on our local storage and navigate to login
    if (
      isError &&
      error?.status === 401 &&
      (error?.data?.detail === "Token has expired" ||
        error?.data?.detail === "Invalid token")
    ) {
      console.log("Unauthorized, logging out user.");
      localStorage.removeItem("token");
      dispatch(api.util.removeQueryResult("getResume", undefined));
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
          <Route
            path="/templates/:id"
            element={
              <ResumeTemplate
                data={{
                  id: 5,
                  full_name: "Rishikesh Kumar Singh",
                  email: "rishikeshkumarsingh810@gmail.com",
                  summary:
                    "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                  experiences: [
                    {
                      position: "Software Developer",
                      company: "Omneelab Software Solutions",
                      startDate: "2026-01-24",
                      endDate: "2026-01-24",
                      techStack:
                        "HTML/Tailwind CSS, JavaScript, React, Redux Toolkit, Redux Toolkit Query, Node.js, Express.js, JWT, PostgreSQL, Sequelize",
                      responsibilities: [
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                        "Implemented features for manual, single, and bulk order creation, enabling sellers to manage all courier services on one platform.",
                        "Integrated webhook-based automation to fetch and display real-time orders from multiple marketplaces.",
                        "Built responsive UI components using React Hooks, Redux Toolkit Query, and Tailwind CSS, connected to a FastAPI + PostgreSQL backend for seamless data flow and performance.",
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                      ],
                    },
                    {
                      position: "Frontend Developer Trainee",
                      company: "Example Pvt Ltd",
                      startDate: "2026-03-30",
                      endDate: "2026-03-30",
                      techStack:
                        "HTML/Tailwind CSS, JavaScript, React, Redux Toolkit, Redux Toolkit Query, Node.js, Express.js, JWT, PostgreSQL, Sequelize",
                      responsibilities: [
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                      ],
                    },
                  ],
                  projects: [
                    {
                      name: "Logistic-Solutions",
                      description:
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                      techStack: "React, Node.js, PostgreSQL, FastAPI",
                      github: "https://www.github.com/rishikesh86",
                      live: "https://www.livedemolink.com/",
                    },
                    {
                      name: "Example Project",
                      description:
                        "Contributed to developing the Order Management module in a last-mile logistics web app that consolidates orders from platforms like Flipkart, Amazon, and other major e-commerce sellers into a single dashboard.",
                      techStack: "React, Node.js, PostgreSQL, FastAPI",
                      github: "https://www.github.com/rishikesh86",
                      live: "https://www.livedemolink.com/",
                    },
                  ],
                  education: [
                    {
                      degree: "Intermediate Of Science",
                      institution:
                        "Narayan Yadav Inter College Rampur Nahamore",
                      startYear: "2026-03-30",
                      endYear: "2026-03-30",
                    },
                    {
                      degree: "B.Tech – Computer Science Engineering",
                      institution: "Rabindranath Tagore University, Bhopal",
                      startYear: "2026-01-24",
                      endYear: "2026-01-24",
                    },
                  ],
                  frontend: "HTML CSS Javascript React Redux Talwind CSS",
                  backend: "Node, Express, Fastapi",
                  database: "Postgresql, Mongodb",
                  other: "git github",
                  title: "Software Developer",
                  github: "https://www.github.com/rishikesh86",
                  linkedin: "https://www.linkedin.com/rishikesh86",
                  portfolio: "https://www.portfolio.com/",
                }}
              />
            }
          />
          <Route path="/resume_list" element={<ResumeCard />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/builder/:id" element={<ResumeBuilder />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
          <Route path="/private_ws" element={<PrivateWebSocket />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/imgupload" element={<FileUpload />} />
        <Route path="/userlist" element={<UserList />} />

        <Route path="/resume" element={<Resume />} />

        <Route path="/sidebar" element={<SidebarTesting />} />
        <Route path="/editor" element={<ResumeEditor />} />
        <Route path="/ws" element={<Websocket />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
