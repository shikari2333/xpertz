import React, { useState, useEffect } from "react";
import { activities } from "../data/activities";

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

  const nedumNode = activities.find(a => a.id === "nedum");
  const destinationNodes = activities.filter(a => a.id !== "nedum");

  // === Enhanced path generation with more realistic curves ===
  const generatePath = (destination: any) => {
    if (!nedumNode || destination.id === "nedum") return "";
    // Re-center curves for more 'organic' and realistic feel
    const startX = 50;
    const startY = 60;
    let end, curve1, curve2;

    switch (destination.id) {
      case "munnar":
        end = { x: 25, y: 20 };
        curve1 = { x: 42, y: 45 };
        curve2 = { x: 30, y: 30 };
        break;
      case "thekkady":
        end = { x: 78, y: 75 };
        curve1 = { x: 60, y: 65 };
        curve2 = { x: 74, y: 58 };
        break;
      case "ramakkalmedu":
        end = { x: 72, y: 50 };
        curve1 = { x: 56, y: 56 };
        curve2 = { x: 68, y: 54 };
        break;
      case "vagamon":
        end = { x: 30, y: 85 };
        curve1 = { x: 44, y: 70 };
        curve2 = { x: 34, y: 77 };
        break;
      case "idukki-dam":
        end = { x: 20, y: 45 };
        curve1 = { x: 39, y: 59 };
        curve2 = { x: 26, y: 50 };
        break;
      default:
        return "";
    }
    // Cubic Bezier for smooth, realistic path
    return `M ${startX} ${startY} C ${curve1.x} ${curve1.y}, ${curve2.x} ${curve2.y}, ${end.x} ${end.y}`;
  };

  const getNodePosition = (activityId: string) => {
    switch (activityId) {
      case "nedum":
        return { top: "60%", left: "50%" };
      case "munnar":
        return { top: "20%", left: "25%" };
      case "thekkady":
        return { top: "75%", left: "78%" };
      case "ramakkalmedu":
        return { top: "50%", left: "72%" };
      case "vagamon":
        return { top: "85%", left: "30%" };
      case "idukki-dam":
        return { top: "45%", left: "20%" };
      default:
        return { top: "50%", left: "50%" };
    }
  };

  const getVisualImage = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    return activity ? activity.icon : null;
  };

  const handleNodeClick = (nodeId: string) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
    }
  };

  if (isMobile) {
    return (
      <section className="nearby-map bg-gradient-to-br from-slate-50 via-emerald-50 to-amber-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent mb-4">
              Discover Kerala's Gems
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Journey through the enchanting destinations around Nedumkandam
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-700 hover:-translate-y-2 border border-white/50 ${
                  animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500 ${
                    activity.id === "nedum" 
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
                      : "bg-gradient-to-br from-amber-500 to-orange-500"
                  }`}>
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className={`${activity.id === "nedum" ? "w-full h-full object-cover" : "w-10 h-10 filter brightness-0 invert"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">
                      {activity.label}
                    </h3>
                    {activity.id === "nedum" && (
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        Your Base
                      </span>
                    )}
                  </div>
                </div>
                
                {activity.distance && activity.time && (
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-600">
                        {activity.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-600">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className="font-bold text-slate-700 mb-4 text-lg">Experience Highlights</h4>
                  <div className="grid gap-3">
                    {activity.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {activity.id !== "nedum" && (
                  <a
                    href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-center font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Plan Your Journey
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nearby-map relative w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* much subtler background */}
        <div className="absolute top-28 left-12 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-12 w-56 h-56 bg-amber-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative">
        <div className="relative z-10 text-center py-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-emerald-700 mb-4">
            Kerala's Hidden Treasures
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam.
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"></div>
        </div>

        <div className="relative w-full h-[90vh] bg-transparent">
          {/* --- Smoothed SVG Path Layer --- */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="pathGradientAesthetic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="pathSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {destinationNodes.map((destination, idx) => (
              <path
                key={destination.id}
                d={generatePath(destination)}
                stroke="url(#pathGradientAesthetic)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#pathSoftGlow)"
                strokeLinecap="round"
                opacity={hoveredPath === destination.id ? 0.95 : 0.65}
                style={{
                  transition: "opacity 0.3s cubic-bezier(.6,.2,.4,1)",
                  strokeDasharray: "3 2",
                }}
                onMouseEnter={() => setHoveredPath(destination.id)}
                onMouseLeave={() => setHoveredPath(null)}
              />
            ))}
          </svg>

          {/* --- Main Node (Nedumkandam) --- */}
          {nedumNode && (
            <div
              className="absolute z-30"
              style={{ top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div
                className="flex flex-col items-center group"
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="w-36 h-36 rounded-full shadow-xl bg-white border border-emerald-200 flex items-center justify-center transition-all duration-300">
                  <img
                    src={nedumNode.icon}
                    alt={nedumNode.label}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <span className="block text-xl font-semibold text-emerald-700">{nedumNode.label}</span>
                  <span className="text-xs text-emerald-500 font-medium">Your Gateway</span>
                </div>
              </div>
            </div>
          )}

          {/* --- Destination Nodes (detailed, modern, but subtle) --- */}
          {destinationNodes.map((activity, idx) => {
            const position = getNodePosition(activity.id);
            return (
              <div
                key={activity.id}
                className="absolute z-20 cursor-pointer group"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${idx * 200 + 400}ms`,
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md bg-white border border-amber-100 hover:shadow-lg transition-all duration-300`}>
                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                </div>
                {/* Label */}
                <div className="text-center mt-1">
                  <span className="block font-medium text-slate-800">{activity.label}</span>
                  {activity.distance && (
                    <span className="inline-block text-xs mt-1 text-amber-500 rounded-md px-2 py-0.5 bg-amber-100/60">{activity.distance}</span>
                  )}
                </div>
                {/* --- Minimal Card Tooltip, but with better detail --- */}
                {activeNode === activity.id && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-4 animate-fade-in select-none">
                    <div className="font-semibold text-slate-900 mb-2">{activity.label}</div>
                    {activity.highlights && (
                      <div className="text-sm text-slate-700 mb-1">{activity.highlights[0]}</div>
                    )}
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                      {activity.distance && <span>📏 {activity.distance}</span>}
                      {activity.time && <span>⏱ {activity.time}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* --- Modern Legend (simpler, clear) --- */}
          <div className="absolute top-10 right-8 bg-white/95 rounded-xl border border-slate-100 px-6 py-4 shadow-lg z-30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 rounded-full bg-emerald-400"></div>
              <span className="text-sm text-slate-700 font-medium">Your Location</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 rounded-full bg-white border border-amber-200"></div>
              <span className="text-sm text-slate-700 font-medium">Destinations</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="32" height="12"><path d="M1 6 Q 12 1 31 6" stroke="#fbbf24" strokeWidth="2" fill="none" /></svg>
              <span className="text-sm text-slate-700 font-medium">Scenic Route</span>
            </div>
          </div>
        </div>
      </div>
      {/* --- Minimal animation overrides --- */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.3s cubic-bezier(.4,2,.1,.9) both;
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateX(-50%) translateY(14px) scale(0.97);}
          to   { opacity:1; transform:translateX(-50%) translateY(0) scale(1);}
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
