import React from "react";
import ResumeCard from "../compnents/Resume_Card";
import {
  useDeleteResumeMutation,
  useGetAllResumeQuery,
} from "../Redux/services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Resume_List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteResume, { isLoading, isSuccess, data, isError, error }] =
    useDeleteResumeMutation();
  const {
    data: allResumes,
    isLoading: allResumesLoading,
    isSuccess: allResumesSuccess,
    isError: isAllResumesError,
    error: allResumesError,
  } = useGetAllResumeQuery();
  const handleDelete = async (id) => {
    if (isLoading) return;
    try {
      const response = await deleteResume(id);
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "Resume Deleted Successfully");
      }
    } catch (err) {
      console.log("Error deleting resume:", err);
    }
  };
  return (
    <div>
      <div
        className={`${allResumesSuccess ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-8" : ""} `}
      >
        {allResumesSuccess &&
          allResumes?.data?.map((resume) => (
            <ResumeCard
              id={resume.id}
              deleteResume={deleteResume}
              isLoading={isLoading}
              isSuccess={isSuccess}
              data={data}
              isError={isError}
              error={error}
              handleDelete={handleDelete}
              resume={resume}
            />
          ))}
      </div>
      {isAllResumesError && allResumesError?.status === 404 && (
        <div className="min-h-screen flex items-center justify-center  p-6">
          <div className="w-full max-w-xl bg-white   p-10 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H6.75A2.25 2.25 0 004.5 4.5v15A2.25 2.25 0 006.75 21.75h10.5A2.25 2.25 0 0019.5 19.5V18M13.5 3v4.125c0 .621.504 1.125 1.125 1.125H18"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              No Resume Found
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              You haven’t created any resume yet. Start building your
              professional resume or customize your template to stand out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/builder"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
              >
                Build Your Resume
              </Link>

              <Link
                to="/resume-templates"
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
              >
                Explore Templates
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume_List;
