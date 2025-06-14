
import React, { useEffect, useState } from "react";
import type { Activity } from "../data/activities";
import { activities } from "../data/activities";

const NEDUM_ID = "nedum";

// Helper to get Nedumkandam's position as a number for SVG calculations
const getNedumkandamPos = (allActivities: Activity[]) => {
  const nedum = allActivities.find((act) => act.id === NEDUM_ID);
  if (!nedum) {
    console.error("Nedumkandam not found in activities data!");
    return { x: 500, y: 650 };
  }
  return { x: parseFloat(nedum.left), y: parseFloat(nedum.top) };
};

// Helper to get an activity's position as a number for SVG calculations
const getNumericPosition = (activity: Activity) => ({
  x: parseFloat(activity.left),
  y: parseFloat(activity.top),
});

const formatActivity = (
  act: Activity,
  activeNode: string | null,
  setActiveNode: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const isNedum = act.id === NEDUM_ID;

  return (
    <div
      key={act.id}
      className={`activity-node absolute flex flex-col items-center z-20 group`}
      style={{
        top: act.top,
        left: act.left,
        transform: "translate(-50%, -50%)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      tabIndex={0}
      role="button"
      aria-label={act.label}
      onMouseEnter={() => setActiveNode(act.id)}
      onFocus={() => setActiveNode(act.id)}
      onMouseLeave={() => setActiveNode(null)}
      onBlur={() => setActiveNode(null)}
      onClick={() => setActiveNode((prev) => (prev === act.id ? null : act.id))}
    >
      {/* Node circle */}
      <div
        className={`relative flex items-center justify-center shadow-lg
          ${
            isNedum
              ? "w-16 h-16 bg-[#176F4A] border-[4px] border-white animate-pulse-glow"
              : "w-14 h-14 bg-white border-2 border-[#8B5E3C] hover:border-[#176F4A]"
          }
        rounded-full cursor-pointer transition-transform duration-200 touch-manipulation`}
        style={{
          boxShadow: isNedum
            ? "0 0 0 8px rgba(23,111,74,0.15), 0 2px 4px rgba(0,0,0,0.10)"
            : "0 2px 8px rgba(139,94,60,0.12)",
          transform: activeNode === act.id ? "scale(1.13)" : "scale(1)",
        }}
      >
        <img
          src={act.icon}
          alt={act.label}
          className={`w-7 h-7 ${isNedum ? "filter invert brightness-0" : ""}`}
          loading="lazy"
        />
        {/* Emerald dot for "You Are Here" */}
        {isNedum && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8B5E3C] rounded-full shadow-sm border-2 border-white" />
        )}
      </div>
      {/* Label */}
      <span
        className={`mt-2 px-2 py-1 rounded bg-white text-[1rem] font-semibold font-sans text-[#222] shadow text-center w-max`}
      >
        {act.label}
      </span>

      {/* Tooltip */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-full
          mb-4 w-64 max-w-[90vw] bg-white bg-opacity-95 border border-gray-200 shadow-lg rounded-xl px-4 py-3
          z-30 text-left pointer-events-none group-hover:pointer-events-auto
          ${activeNode === act.id ? "visible opacity-100 animate-fade-in" : "invisible opacity-0"}
        `}
        style={{ transition: "opacity 0.22s" }}
      >
        <div className="flex justify-between items-center gap-2 mb-1">
          <p className="font-serif font-bold text-[#8B5E3C] text-xl">{act.label}</p>
          <button
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 text-lg"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setActiveNode(null);
            }}
            style={{ background: "none", border: "none" }}
          >
            ✕
          </button>
        </div>
        {act.id !== NEDUM_ID && (
          <p className="text-xs font-medium mb-1 text-[#333]">
            <span>Approx. Distance: </span>
            <span className="text-[#176F4A]">{act.distance || "—"}</span>
            <span> | Est. Time: </span>
            <span className="text-[#176F4A]">{act.time || "—"}</span>
          </p>
        )}
        <div className="mb-2">
          <h4 className="font-serif text-[#8B5E3C] text-base mb-1">Highlights:</h4>
          <ul className="pl-4 list-disc space-y-1 text-sm text-gray-700">
            {act.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        {act.id !== NEDUM_ID && (
          <a
            href={`https://wa.me/919495107933?text=${encodeURIComponent(
              "Planning to visit " + act.label
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 w-full max-w-xs py-2 rounded-lg bg-[#176F4A] hover:bg-[#14573a] text-white text-center font-medium transition-colors font-sans"
          >
            Plan Visit
          </a>
        )}
        <div className="absolute left-1/2 translate-x-[-50%] top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
      </div>
    </div>
  );
};

const LEGEND_ITEMS = [
  {
    icon: (
      <span className="inline-block w-5 h-5 rounded-full bg-[#176F4A] border-2 border-white mr-2" />
    ),
    label: "You Are Here",
  },
  {
    icon: (
      <span className="inline-block w-5 h-5 rounded-full bg-white border-2 border-[#8B5E3C] mr-2" />
    ),
    label: "Destinations",
  },
  {
    icon: (
      <svg width="26" height="9" className="inline-block align-middle mr-2" viewBox="0 0 26 9">
        <path d="M1 5 L25 5" stroke="#8B5E3C" strokeWidth="2.5" strokeDasharray="6 4" fill="none">
          <animate attributeName="stroke-dashoffset" values="18;0" dur="1.5s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    label: "Route",
  },
];

const NearbyMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const watcher = () => setIsMobile(window.innerWidth < 640);
    watcher();
    window.addEventListener("resize", watcher);
    return () => window.removeEventListener("resize", watcher);
  }, []);

  const nedumkandamPos = getNedumkandamPos(activities);
  const destinationActivities = activities.filter((act) => act.id !== NEDUM_ID);

  // Function to generate SVG path 'd' attribute for Bezier curves
  const getPathD = (destination: Activity) => {
    const dest = getNumericPosition(destination);

    let cp1x = nedumkandamPos.x;
    let cp1y = nedumkandamPos.y;
    let cp2x = dest.x;
    let cp2y = dest.y;

    switch (destination.id) {
      case "munnar":
        cp1x = nedumkandamPos.x - 150;
        cp1y = nedumkandamPos.y - 100;
        cp2x = dest.x + 100;
        cp2y = dest.y + 150;
        break;
      case "thekkady":
        cp1x = nedumkandamPos.x + 80;
        cp1y = nedumkandamPos.y;
        cp2x = dest.x - 50;
        cp2y = dest.y - 80;
        break;
      case "ramakkalmedu":
        cp1x = nedumkandamPos.x + 30;
        cp1y = nedumkandamPos.y - 30;
        cp2x = dest.x - 30;
        cp2y = dest.y + 30;
        break;
      case "vagamon":
        cp1x = nedumkandamPos.x - 50;
        cp1y = nedumkandamPos.y - 20;
        cp2x = dest.x + 50;
        cp2y = dest.y - 80;
        break;
      case "idukki-dam":
        cp1x = nedumkandamPos.x - 200;
        cp1y = nedumkandamPos.y - 100;
        cp2x = dest.x + 120;
        cp2y = dest.y + 80;
        break;
      default:
        return `M ${nedumkandamPos.x} ${nedumkandamPos.y} L ${dest.x} ${dest.y}`;
    }

    return `M ${nedumkandamPos.x} ${nedumkandamPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${dest.x} ${dest.y}`;
  };

  return (
    <section className="nearby-map relative w-full bg-[#F5F3F1] py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative px-4">
        <h2 className="text-4xl font-serif text-[#8B5E3C] text-center mb-2">
          NEARBY EXPERIENCES
        </h2>
        <p className="text-center text-lg text-[#8B5E3C]/80 mb-10">
          Explore destinations around Nedumkandam
        </p>
        <div className="relative w-full h-[800px] sm:h-[800px] bg-gradient-to-br from-[#F5F3F1] to-[#E8E6E3] rounded-3xl shadow-lg overflow-hidden border border-[#f0ece9]">
          {/* Decorative map outline */}
          <img
            src="/maps/region-outline.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          />
          {/* Flowing Route: Natural paths connecting all nodes */}
          <svg
            className="path-svg absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            viewBox="0 0 1000 800"
          >
            {destinationActivities.map((act) => (
              <path
                key={act.id}
                d={getPathD(act)}
                stroke="#8B5E3C"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                fill="none"
                opacity="0.8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="16;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </svg>

          {/* Responsive Layout */}
          {!isMobile ? (
            <>
              {activities.map((act) =>
                formatActivity(act, activeNode, setActiveNode)
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 py-8">
              {activities.map((act) => (
                <div key={act.id} className="flex flex-col items-center">
                  {formatActivity(act, activeNode, setActiveNode)}
                </div>
              ))}
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 bg-white/85 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-4 shadow-md z-40">
            <h3 className="font-serif text-[#8B5E3C] mb-2 font-bold text-base">Legend</h3>
            <ul className="space-y-2 text-sm">
              {LEGEND_ITEMS.map((item, i) => (
                <li key={i} className="flex items-center text-[#8B5E3C] font-sans">
                  {item.icon}
                  <span className="ml-1">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* CSS Keyframes */}
      <style>
        {`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 8px rgba(23,111,74,0.12),0 0 10px 6px #176F4A33; }
          50% { box-shadow: 0 0 0 16px rgba(23,111,74,0.22),0 0 20px 2px #176F4A55; }
          100% { box-shadow: 0 0 0 8px rgba(23,111,74,0.12),0 0 10px 6px #176F4A33; }
        }
        .animate-pulse-glow { animation: pulse-glow 1.6s infinite; }

        @media (max-width: 639px) {
          .nearby-map .activity-node {
            position: static !important;
            transform: none !important;
            margin-bottom: 1rem;
          }
          .nearby-map .path-svg {
            display: none;
          }
        }
      `}
      </style>
    </section>
  );
};

export default NearbyMap;
