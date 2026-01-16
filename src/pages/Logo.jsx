import React, { useEffect, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

// `start` prop controls when the animation sequence should begin.
const Logo = ({ start }) => {
  const [stage, setStage] = useState("initial"); // 'initial' -> show big Warehousity; 'compact' -> shrink and show Last Miles
  const [visible, setVisible] = useState(false); // for initial fade-in

  useEffect(() => {
    // Respect users who prefer reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof start === "boolean" && start === false) {
      // Show full Warehousity while loading; don't animate yet.
      setVisible(true);
      setStage("initial");
      return;
    }

    // At this point, either start is true or undefined (no parent control) -> run animation.
    if (prefersReducedMotion) {
      // skip animations for reduced motion: show final compact state when started
      setVisible(true);
      setStage("compact");
      return;
    }

    // trigger fade-in on next tick
    const v = setTimeout(() => setVisible(true), 20);
    // then move to compact after a short delay
    const t = setTimeout(() => setStage("compact"), 500);
    return () => {
      clearTimeout(v);
      clearTimeout(t);
    };
  }, [start]);

  // Styles for animated text. We animate with transform & opacity to avoid layout jank.
  const warehousityStyle = {
    transform:
      stage === "initial"
        ? "translateY(5px) scale(1.4)"
        : "translate(0px) scale(1)",
    transformOrigin: "left top",
    transition: "transform 1000ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease",
    opacity: visible ? 1 : 0,
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
  };

  const lastMilesStyle = {
    opacity: stage === "compact" ? 1 : 0,
    transform: stage === "compact" ? "translateY(2px)" : "translateY(6px)",
    transition: "opacity 360ms ease, transform 360ms ease",
    marginTop: "-3px",
    fontSize: "12px",
    color: "#4B5563",
  };

  return (
    <div className="flex items-center gap-3">
      {/* Hexagon logo container (static) */}
      <div
        style={{
          width: 55,
          height: 60,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        className="flex items-center justify-center bg-yellow-400 text-white shadow-md flex-shrink-0"
        aria-hidden="true"
      >
        <span className="text-[28px] font-bold">R</span>
      </div>

      {/* Text block with animation */}
      <div className="flex flex-col">
        <h4 style={warehousityStyle} aria-label="Warehousity">
          Resume Builder
        </h4>
        <p style={lastMilesStyle} aria-hidden={stage !== "compact"}>
          Last Miles
        </p>
      </div>
    </div>
  );
};

export default Logo;
