import React, { useState, useEffect } from "react";
import { activities } from "../data/activities";
import MapNode from "./MapNode";
import MapLegend from "./MapLegend";

const lineStyle = "stroke-emerald-100 stroke-[2]";

const NearbyMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Trigger animations after mount
    const timer = setTimeout(() => setAnimateIn(true), 300);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const nedumNode = activities.find((a) => a.id === "nedum");
  const destinationNodes = activities.filter((a) => a.id !== "nedum");

  // Soft, straight lines instead of animated curves
  const generateSimpleLine = (from: { top: string; left: string }, to: { top: string; left: string }) => {
    // Converts percent strings to numbers (e.g. "60%" -> 60)
    const percentToNum = (pct: string) => Number(pct.replace("%", ""));
    const fromX = percentToNum(from.left);
    const fromY = percentToNum(from.top);
    const toX = percentToNum(to.left);
    const toY = percentToNum(to.top);
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  };

  // Node positions for minimal layout (reuse your previous logic)
  const getNodePosition = (activityId: string) => {
    switch (activityId) {
      case "nedum":
        return { top: "60%", left: "50%" };
      case "munnar":
        return { top: "24%", left: "25%" };
      case "thekkady":
        return { top: "80%", left: "77%" };
      case "ramakkalmedu":
        return { top: "53%", left: "72%" };
      case "vagamon":
        return { top: "85%", left: "30%" };
      case "idukki-dam":
        return { top: "43%", left: "22%" };
      default:
        return { top: "50%", left: "50%" };
    }
  };

  const handleNodeHover = (id: string | null) => setActiveNode(id);
  const handleNodeClick = (id: string) => {
    setActiveNode((prev) => (prev === id ? null : id));
  };

  // Background is now white/minimal, elegant header
  return (
    <section className="relative w-full min-h-[88vh] bg-white pb-20">
      <div className="container mx-auto pt-12 pb-4">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-slate-900 mb-3 mx-auto">
          Explore Nearby Destinations
        </h2>
        <p className="text-center text-lg text-slate-500 mb-12 mx-auto max-w-xl">
          A minimal, premium map of top places around Nedumkandam
        </p>
        <div className="relative w-full max-w-5xl mx-auto h-[68vh] min-h-[400px] bg-slate-50 rounded-3xl border border-emerald-50 overflow-visible">
          {/* Minimal connection lines */}
          <svg
            className="absolute w-full h-full z-0 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {nedumNode &&
              destinationNodes.map((dest) => {
                const from = getNodePosition("nedum");
                const to = getNodePosition(dest.id);
                return (
                  <path
                    key={dest.id}
                    d={generateSimpleLine(from, to)}
                    className={lineStyle}
                    fill="none"
                  />
                );
              })}
          </svg>

          {/* Nodes */}
          {nedumNode && (
            <MapNode
              activity={nedumNode}
              position={getNodePosition(nedumNode.id)}
              active={activeNode === nedumNode.id}
              onHover={handleNodeHover}
              onClick={handleNodeClick}
            />
          )}
          {destinationNodes.map((activity) => (
            <MapNode
              key={activity.id}
              activity={activity}
              position={getNodePosition(activity.id)}
              active={activeNode === activity.id}
              onHover={handleNodeHover}
              onClick={handleNodeClick}
            />
          ))}
          <MapLegend />
        </div>
      </div>
    </section>
  );
};

export default NearbyMap;
