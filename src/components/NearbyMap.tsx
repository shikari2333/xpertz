
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

  const handleNodeClick = (nodeId: string) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
    }
  };

  if (isMobile) {
    return (
      <section className="nearby-map bg-gradient-to-br from-slate-50 via-emerald-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full tracking-wide uppercase">
                Premium Destinations
              </span>
            </div>
            <h2 className="text-6xl font-black bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
              Discover Kerala's
              <br />
              Hidden Gems
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Journey through the enchanting destinations around Nedumkandam, where every path leads to extraordinary experiences
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 mx-auto rounded-full shadow-lg"></div>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl p-8 transition-all duration-700 hover:-translate-y-3 border border-white/60 overflow-hidden ${
                  animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                
                <div className="relative flex items-center mb-8">
                  <div className={`relative w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-500 ${
                    activity.id === "nedum" 
                      ? "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700" 
                      : "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
                  }`}>
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className={`${activity.id === "nedum" ? "w-full h-full object-cover" : "w-12 h-12 filter brightness-0 invert"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30"></div>
                    {activity.id === "nedum" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-xs">⭐</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-8">
                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                      {activity.label}
                    </h3>
                    {activity.id === "nedum" ? (
                      <span className="text-sm font-bold text-emerald-700 bg-gradient-to-r from-emerald-100 to-emerald-200 px-4 py-2 rounded-full shadow-md">
                        🏠 Your Base Camp
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-amber-700 bg-gradient-to-r from-amber-100 to-orange-200 px-4 py-2 rounded-full shadow-md">
                        🗺️ Adventure Awaits
                      </span>
                    )}
                  </div>
                </div>
                
                {activity.distance && activity.time && (
                  <div className="relative mb-8 p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl border border-slate-200/50 shadow-inner">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm"></div>
                        <span className="text-base font-bold text-slate-700">
                          {activity.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"></div>
                        <span className="text-base font-bold text-slate-700">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="font-black text-slate-800 mb-6 text-xl tracking-tight">✨ Experience Highlights</h4>
                  <div className="grid gap-4">
                    {activity.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/80 to-white/60 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full flex-shrink-0 shadow-sm"></div>
                        <span className="text-slate-800 font-semibold text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {activity.id !== "nedum" && (
                  <a
                    href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white text-center font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative">🚀 Plan Your Journey</span>
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
    <section className="nearby-map relative w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden min-h-screen">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative">
        <div className="relative z-10 text-center py-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-bold text-emerald-700 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full tracking-wider uppercase shadow-lg">
              ✨ Premium Destinations
            </span>
          </div>
          <h2 className="text-7xl font-black tracking-tight bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
            Kerala's Hidden
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Treasures
            </span>
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam,
            <br />
            where every path leads to extraordinary experiences.
          </p>
          <div className="mx-auto w-40 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full shadow-xl"></div>
        </div>

        <div className="relative w-full h-[90vh] bg-transparent">
          {/* Enhanced SVG paths with premium styling */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="premiumRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5a3c" />
                <stop offset="50%" stopColor="#a0522d" />
                <stop offset="100%" stopColor="#5d3a1a" />
              </linearGradient>
              <filter id="premiumPathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="glow" />
                <feColorMatrix in="glow" values="1 0 0 0 0.5  0 0.7 0 0 0.3  0 0 0.4 0 0.1  0 0 0 0.8 0" result="coloredGlow" />
                <feMerge>
                  <feMergeNode in="coloredGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {destinationNodes.map((destination) => (
              <path
                key={destination.id}
                d={generatePath(destination)}
                stroke="url(#premiumRouteGradient)"
                strokeWidth="1"
                fill="none"
                filter="url(#premiumPathGlow)"
                strokeLinecap="round"
                opacity={hoveredPath === destination.id ? 1 : 0.8}
                style={{
                  transition: "all 0.4s cubic-bezier(.6,.2,.4,1)",
                  strokeDasharray: "1 2",
                }}
                onMouseEnter={() => setHoveredPath(destination.id)}
                onMouseLeave={() => setHoveredPath(null)}
              />
            ))}
          </svg>

          {/* Premium Main Node (Nedumkandam) */}
          {nedumNode && (
            <div
              className="absolute z-30"
              style={{ top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative w-44 h-44 rounded-full shadow-2xl bg-gradient-to-br from-white via-emerald-50 to-white border-4 border-emerald-200 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-3xl">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5"></div>
                  <img
                    src={nedumNode.icon}
                    alt={nedumNode.label}
                    className="w-36 h-36 rounded-full object-cover shadow-lg ring-4 ring-white/50"
                  />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-xl">⭐</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <span className="block text-2xl font-black text-emerald-800 tracking-tight">{nedumNode.label}</span>
                  <span className="text-base text-emerald-600 font-bold bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mt-2 inline-block shadow-md">
                    🏠 Your Gateway to Adventure
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Premium Destination Nodes */}
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
                <div className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-white via-amber-50 to-white border-4 border-amber-200 hover:shadow-2xl transition-all duration-500 hover:scale-110">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/5"></div>
                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className="w-20 h-20 object-cover rounded-full shadow-lg ring-4 ring-white/50"
                  />
                </div>
                
                <div className="text-center mt-4">
                  <span className="block font-black text-slate-900 text-lg tracking-tight">{activity.label}</span>
                  {activity.distance && (
                    <span className="inline-block text-sm mt-2 text-amber-700 rounded-full px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 font-bold shadow-md">
                      📍 {activity.distance}
                    </span>
                  )}
                </div>
                
                {/* Premium tooltip */}
                {activeNode === activity.id && (
                  <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 z-50 w-72 bg-white/95 backdrop-blur-xl border-2 border-slate-200/50 rounded-3xl shadow-2xl p-6 animate-fade-in select-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl pointer-events-none"></div>
                    <div className="relative">
                      <div className="font-black text-slate-900 mb-3 text-xl tracking-tight">{activity.label}</div>
                      {activity.highlights && (
                        <div className="text-base text-slate-700 mb-4 font-medium leading-relaxed">{activity.highlights[0]}</div>
                      )}
                      <div className="flex items-center justify-between text-sm text-slate-600 bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-2xl">
                        {activity.distance && (
                          <span className="flex items-center gap-2 font-semibold">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {activity.distance}
                          </span>
                        )}
                        {activity.time && (
                          <span className="flex items-center gap-2 font-semibold">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            {activity.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Premium Legend */}
          <div className="absolute top-12 right-12 bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 px-8 py-6 shadow-2xl z-30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl pointer-events-none"></div>
            <div className="relative">
              <h3 className="font-black text-slate-900 mb-4 text-lg tracking-tight">🗺️ Map Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md"></div>
                  <span className="text-sm text-slate-700 font-bold">Your Base Camp</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-md"></div>
                  <span className="text-sm text-slate-700 font-bold">Destinations</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg width="40" height="16" className="shadow-sm">
                    <path d="M4 8 Q 20 4 36 8" stroke="url(#premiumRouteGradient)" strokeWidth="2" fill="none" strokeDasharray="1 2" />
                  </svg>
                  <span className="text-sm text-slate-700 font-bold">Adventure Routes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-fade-in {
          animation: premiumFadeIn 0.5s cubic-bezier(.4,2,.1,.9) both;
        }
        @keyframes premiumFadeIn {
          from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
