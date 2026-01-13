import React from "react";
import ResumeCard from "../compnents/Resume_Card";
import {
  useDeleteResumeMutation,
  useGetAllResumeQuery,
} from "../Redux/services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Resume_List = () => {
  const [deleteResume, { isLoading, isSuccess, data, isError, error }] =
    useDeleteResumeMutation();
  const {
    data: allResumes,
    isLoading: allResumesLoading,
    isSuccess: allResumesSuccess,
    isError: isAllResumesError,
    error: allResumesError,
  } = useGetAllResumeQuery();
  console.log("All Resumes Data:", allResumes);
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {allResumesSuccess &&
          allResumes?.data?.map(
            (resume) => (
              console.log("resume data checking", resume),
              (
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
              )
            )
          )}
      </div>
      {isAllResumesError && allResumesError?.status === 404 && (
        <div className="flex flex-col gap-5  mt-30 items-center justify-center">
          <h1 className="col-span-full text-center text-5xl font-semibold text-gray-600">
            {allResumesError?.data?.detail}
          </h1>
          <div className="flex gap-5">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              <Link to="/builder">Add Resume</Link>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
            >
              <Link to="/resume">Select Template</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Resume_List;
