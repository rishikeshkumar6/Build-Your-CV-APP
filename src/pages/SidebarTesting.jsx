import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHand,
  faCheck,
  faAngleRight,
  faUser,
  faInfoCircle,
  faBriefcase,
  faFolderOpen,
  faGraduationCap,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import Logo from "./Logo";

const SidebarTesting = ({
  currentStep,
  setCurrentStep,
  isFormSubmitted,
  isPersonalInfoFill,
  isSummaryFill,
  isExprienceFill,
  isProjectFill,
  isEducationFill,
  isSkillFill,
  isPreviewFill,
}) => {
  const mangeSidebar = (id, isFormSubmit) => {
    if (isFormSubmit) {
      setCurrentStep(id);
      return;
    }
    if (id === currentStep) {
      setCurrentStep(id);
      return;
    }
  };
  return (
    <div className="w-[30%] h-full bg-gray-50 border-r border-gray-200 flex flex-col gap-14 px-12 py-12">
      <Logo start={false} />

      {/* User Information */}
      <div>
        {false ? (
          <Skeleton count={1} height={50} />
        ) : (
          <>
            <h2 className="text-[20px] text font-semibold">
              Hi, {`Rishikesh`}
              <FontAwesomeIcon
                icon={faHand}
                className={`text-yellow-300 ml-3 hand-wave-animation rotate-[15deg]`}
              />
            </h2>
            <h3 className="text-[15px]">Please complete your KYC</h3>
          </>
        )}
      </div>

      <hr />

      <div className="flex-1">
        {false ? (
          <Skeleton count={3} height={45} className="my-2" />
        ) : (
          [
            {
              label: "Profile Information",
              icon: faUser,
              isFormSubmit: isPersonalInfoFill,
            },
            {
              label: "Summary",
              icon: faInfoCircle,
              isFormSubmit: isSummaryFill,
            },
            {
              label: "Experience",
              icon: faBriefcase,
              isFormSubmit: isExprienceFill,
            },
            {
              label: "Projects",
              icon: faFolderOpen,
              isFormSubmit: isProjectFill,
            },
            {
              label: "Education",
              icon: faGraduationCap,
              isFormSubmit: isEducationFill,
            },
            {
              label: "Skills & Certifications",
              icon: faCertificate,
              isFormSubmit: isSkillFill,
            },
            {
              label: "Preview",
              icon: faCertificate,
              isFormSubmit: isPreviewFill,
            },
          ].map((elem, index) => {
            return (
              <div className="flex flex-col h-full my-2" key={index}>
                {/* Scrollable content area for steps */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                  <div
                    className={`group relative gap-3 flex items-center py-4 px-6 rounded-lg transition-all duration-500 transform  translate-x-0 opacity-100 visible  ${
                      !elem.isFormSubmit
                        ? index === currentStep
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                        : "bg-green-100 hover:bg-green-100 cursor-pointer"
                    }  border-gray-100`}
                    role="button"
                    onClick={() => mangeSidebar(index, elem.isFormSubmit)}
                  >
                    {/* stepNumber=> {stepNumber} */}
                    {/* Step indicator circle with number or checkmark */}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full mr-3 transition-all font-medium text-sm  shadow-sm bg-secondary text-white shadow-sm  ${
                        !elem.isFormSubmit
                          ? index === currentStep
                            ? ""
                            : "bg-gray-300"
                          : "bg-green-600 text-white"
                      }  border-gray-100`}
                    >
                      {!elem.isFormSubmit ? (
                        index === currentStep ? (
                          <FontAwesomeIcon
                            icon={elem.icon}
                            className="text-[14px]"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={elem.icon}
                            className="text-[14px]"
                          />
                        )
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-[14px]"
                        />
                      )}
                    </div>
                    {/* Step label content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium truncate flex items-center justify-between ${
                          !elem.isFormSubmit
                            ? index === currentStep
                              ? ""
                              : ""
                            : "text-green-700"
                        }  border-gray-100 `}
                      >
                        <span>{`${elem.label}`}</span>

                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="px-6 flex justify-between gap-5 items-center">
        <button className="bg-gray-200 px-8 py-3 rounded-md font-bold">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarTesting;
