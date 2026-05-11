import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetResumeImprovementQuery } from "../../Redux/services/userService";
import { motion, AnimatePresence } from "framer-motion";
import Preview from "./Preview";
import ResumeForm from "./DynamicResumeForm";

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ImprovementDetails() {
  // State to manage active tab (preview or edit)
  const [activeTab, setActiveTab] = useState("preview");

  // Get resume ID from URL params and fetch improvement data
  const { id } = useParams();
  // Fetch improvement data using RTK Query, skipping if no ID is present
  const { data, error, isLoading } = useGetResumeImprovementQuery(id, {
    skip: !id,
  });

  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No resume ID provided.</p>
      </div>
    );
  }
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  // Display error message if data fetching fails
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading data.</p>
      </div>
    );
  }

  // Render the Preview component with the fetched improvement data
  return (
    <div className="w-full max-w-3xl mx-auto mt-5">
      {/* Toggle Switch */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full flex bg-gray-100 p-1 rounded-2xl shadow-inner overflow-hidden">
          {/* Sliding Background */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute top-1 bottom-1 w-1/2 rounded-xl bg-white shadow-md ${
              activeTab === "preview" ? "left-1" : "left-[50%]"
            }`}
          />

          {/* Buttons */}
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 text-center relative z-10 px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
              activeTab === "preview"
                ? "text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Preview Improvement Resume
          </button>

          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 text-center relative z-10 px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
              activeTab === "edit"
                ? "text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Edit Resume
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Preview data={data} />
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ResumeForm data={data} id={id} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
