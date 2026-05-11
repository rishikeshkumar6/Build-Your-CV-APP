import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

const menuItems = [
  {
    id: "resume",
    label: "Resume",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    subItems: [
      {
        id: "add-resume",
        label: "Add Resume",
        to: "/builder",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        ),
      },
      {
        id: "explore-templates",
        label: "Explore Templates",
        to: "/resume-templates",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        ),
      },
      {
        id: "resume-list",
        label: "Resume List",
        to: "/resume_list",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        ),
      },
    ],
  },
  {
    id: "ai-resume",
    label: "AI Resume",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    subItems: [
      {
        id: "resume-parser",
        label: "Resume Parser",
        to: "/analyzer",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        ),
      },
      {
        id: "my-resume",
        label: "My Resume",
        to: "/ai_resume",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
      },
    ],
  },
  {
    id: "peer-to-peer",
    label: "Peer to Peer",
    to: "/peer-to-peer",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5V4h-5m-10 16H2V4h5m10 8H7m0 0l3-3m-3 3l3 3"
        />
      </svg>
    ),
    subItems: [],
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Tooltip({ label, collapsed }) {
  if (!collapsed) return null;
  return (
    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {label}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
      </div>
    </div>
  );
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({ resume: true });

  const toggleMenu = (id) => {
    if (collapsed) return;
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCollapse = () => {
    setCollapsed((c) => {
      if (!c) setOpenMenus({});
      return !c;
    });
  };

  const handleLogout = () => {
    localStorage.clear("token");
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  return (
    <aside
      className={`relative flex flex-col h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-4 border-b border-slate-100 min-h-[60px]">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 min-w-[32px] rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span
            className={`text-sm text-slate-800 tracking-tight whitespace-nowrap transition-all duration-200 ${
              collapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
            style={{ fontWeight: 700 }}
          >
            ResumeAI
          </span>
        </div>
        <button
          onClick={handleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-150 flex-shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-0.5">
        {!collapsed && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-2 pb-1 pt-1">
            Menus
          </p>
        )}

        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Parent item */}
            <div className="relative group">
              {item.subItems.length > 0 ? (
                // Has submenu — toggle button only, no route
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all duration-150"
                >
                  <span className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors duration-150">
                    {item.icon}
                  </span>
                  <span
                    className={`flex-1 text-left whitespace-nowrap transition-all duration-200 ${
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                  {!collapsed && (
                    <span className="text-slate-400">
                      <ChevronIcon open={!!openMenus[item.id]} />
                    </span>
                  )}
                </button>
              ) : (
                // Direct route link
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-violet-50 text-violet-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex-shrink-0 transition-colors duration-150 ${
                          isActive ? "text-violet-600" : "text-slate-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`flex-1 whitespace-nowrap transition-all duration-200 ${
                          collapsed
                            ? "opacity-0 w-0 overflow-hidden"
                            : "opacity-100"
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              )}
              <Tooltip label={item.label} collapsed={collapsed} />
            </div>

            {/* Submenu */}
            {item.subItems.length > 0 && !collapsed && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenus[item.id]
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 pl-3 border-l border-slate-100 mt-0.5 space-y-0.5 pb-1">
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.id}
                      to={sub.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 ${
                          isActive
                            ? "bg-violet-50 text-violet-700 font-medium"
                            : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`flex-shrink-0 ${
                              isActive ? "text-violet-500" : "text-slate-300"
                            }`}
                          >
                            {sub.icon}
                          </span>
                          {sub.label}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer — Logout */}
      {/* Footer — Logout */}
      <div className="mt-auto sticky bottom-0 bg-white px-2.5 py-3 border-t border-slate-100 bg-white">
        <div className="relative group">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
          >
            <span className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>

            <span
              className={`whitespace-nowrap transition-all duration-200 ${
                collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Logout
            </span>
          </button>

          <Tooltip label="Logout" collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
