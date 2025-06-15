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

  // === Enhanced path generation with wave-like curves ===
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
                  <div className={`relative w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500 ${
                    activity.id === "nedum" 
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
                      : "bg-gradient-to-br from-amber-500 to-orange-500"
                  }`}>
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className="w-full h-full object-cover"
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
      {/* Wave background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,200 Q250,150 500,200 T1000,200 L1000,0 L0,0 Z" fill="url(#waveGradient1)" />
          <path d="M0,600 Q250,550 500,600 T1000,600 L1000,400 Q750,450 500,400 T0,400 Z" fill="url(#waveGradient2)" />
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#fef3e2" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#fefce8" />
            </linearGradient>
          </defs>
        </svg>
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
          {/* SVG Path Layer with wave patterns */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="brownRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#886052" />
                <stop offset="100%" stopColor="#5d3a1a" />
              </linearGradient>
              <filter id="pathSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Root node background waves */}
              <pattern id="rootNodeWaves" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" strokeDasharray="3 6">
                  <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" strokeDasharray="2 4">
                  <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="6s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50%" cy="50%" r="20%" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="0.8" strokeDasharray="1 3">
                  <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="10s" repeatCount="indefinite"/>
                </circle>
              </pattern>
              
              {/* Destination node background waves */}
              <pattern id="destNodeWaves" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" strokeDasharray="2 4">
                  <animate attributeName="r" values="30%;40%;30%" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="rgba(251, 146, 60, 0.2)" strokeWidth="0.8" strokeDasharray="1.5 3">
                  <animate attributeName="r" values="20%;30%;20%" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50%" cy="50%" r="15%" fill="none" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="0.5" strokeDasharray="1 2">
                  <animate attributeName="r" values="10%;20%;10%" dur="4s" repeatCount="indefinite"/>
                </circle>
              </pattern>
            </defs>
            
            {destinationNodes.map((destination, idx) => (
              <g key={destination.id}>
                <path
                  d={generatePath(destination)}
                  stroke="url(#brownRouteGradient)"
                  strokeWidth="0.5"
                  fill="none"
                  filter="url(#pathSoftGlow)"
                  strokeLinecap="round"
                  opacity={hoveredPath === destination.id ? 0.9 : 0.6}
                  style={{
                    transition: "opacity 0.3s cubic-bezier(.6,.2,.4,1)",
                    strokeDasharray: "0.5 0.75",
                  }}
                  onMouseEnter={() => setHoveredPath(destination.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                />
              </g>
            ))}
          </svg>

          {/* Main Node (Nedumkandam) with unique wave background */}
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
                <div className="relative w-36 h-36 rounded-full shadow-xl bg-white border border-emerald-200 flex items-center justify-center transition-all duration-300 overflow-hidden group-hover:shadow-2xl">
                  {/* Root node background waves */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-60"
                    style={{ background: 'url(#rootNodeWaves)' }}
                  ></div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
                    <circle cx="72" cy="72" fill="url(#rootNodeWaves)" r="72" opacity="0.8"/>
                  </svg>
                  <img
                    src={nedumNode.icon}
                    alt={nedumNode.label}
                    className="w-full h-full object-cover rounded-full relative z-10"
                  />
                </div>
                <div className="mt-3">
                  <span className="block text-xl font-semibold text-emerald-700">{nedumNode.label}</span>
                  <span className="text-xs text-emerald-500 font-medium">Your Gateway</span>
                </div>
              </div>
            </div>
          )}

          {/* Destination Nodes with different wave backgrounds */}
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
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-md bg-white border border-amber-100 hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-110">
                  {/* Destination node background waves */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  ></div>
                  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-40 transition-opacity duration-300" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" fill="url(#destNodeWaves)" r="48"/>
                  </svg>
                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className="w-full h-full object-cover rounded-full relative z-10"
                  />
                </div>
                <div className="text-center mt-1">
                  <span className="block font-medium text-slate-800">{activity.label}</span>
                  {activity.distance && (
                    <span className="inline-block text-xs mt-1 text-amber-500 rounded-md px-2 py-0.5 bg-amber-100/60">{activity.distance}</span>
                  )}
                </div>
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

          {/* Legend with wave styling */}
          <div className="absolute top-10 right-8 bg-white/95 rounded-xl border border-slate-100 px-6 py-4 shadow-lg z-30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 bg-emerald-400 rounded-full"></div>
              <span className="text-sm text-slate-700 font-medium">Your Location</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 bg-white border border-amber-200 rounded-full"></div>
              <span className="text-sm text-slate-700 font-medium">Destinations</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="32" height="12">
                <path d="M1 6 Q 8 2 16 6 Q 24 10 31 6" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="1 1.5" />
              </svg>
              <span className="text-sm text-slate-700 font-medium">Scenic Route</span>
            </div>
          </div>
        </div>
      </div>

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
