
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

  // Enhanced path generation with smoother curves
  const generatePath = (destination: any) => {
    if (!nedumNode || destination.id === "nedum") return "";
    
    const startX = 50;
    const startY = 60;
    
    let pathSegments;
    
    switch (destination.id) {
      case "munnar":
        pathSegments = [
          { x: 48, y: 50 },
          { x: 45, y: 40 },
          { x: 40, y: 30 },
          { x: 35, y: 25 },
          { x: 25, y: 20 }
        ];
        break;
      case "thekkady":
        pathSegments = [
          { x: 55, y: 65 },
          { x: 65, y: 68 },
          { x: 72, y: 72 },
          { x: 78, y: 75 }
        ];
        break;
      case "ramakkalmedu":
        pathSegments = [
          { x: 55, y: 58 },
          { x: 62, y: 55 },
          { x: 68, y: 52 },
          { x: 72, y: 50 }
        ];
        break;
      case "vagamon":
        pathSegments = [
          { x: 45, y: 65 },
          { x: 40, y: 72 },
          { x: 35, y: 78 },
          { x: 30, y: 85 }
        ];
        break;
      case "idukki-dam":
        pathSegments = [
          { x: 42, y: 55 },
          { x: 35, y: 50 },
          { x: 28, y: 48 },
          { x: 20, y: 45 }
        ];
        break;
      default:
        return "";
    }

    let path = `M ${startX} ${startY}`;
    pathSegments.forEach((point, index) => {
      if (index === 0) {
        const controlX = (startX + point.x) / 2 + Math.sin(index) * 2;
        const controlY = (startY + point.y) / 2 + Math.cos(index) * 2;
        path += ` Q ${controlX} ${controlY}, ${point.x} ${point.y}`;
      } else {
        const prevPoint = pathSegments[index - 1];
        const controlX = (prevPoint.x + point.x) / 2 + Math.sin(index) * 1.5;
        const controlY = (prevPoint.y + point.y) / 2 + Math.cos(index) * 1.5;
        path += ` Q ${controlX} ${controlY}, ${point.x} ${point.y}`;
      }
    });
    
    return path;
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
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-emerald-100/20 to-transparent rounded-full"></div>
      </div>

      <div className="w-full relative">
        {/* Enhanced Header */}
        <div className="relative z-10 text-center py-16">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent mb-6">
            Kerala's Hidden Treasures
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-pulse"></div>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="relative w-full h-[120vh] bg-transparent">
          
          {/* Enhanced Path SVG Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {destinationNodes.map((destination, index) => (
              <g key={`${destination.id}-road`}>
                <path
                  d={generatePath(destination)}
                  stroke="url(#pathGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#pathGlow)"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  strokeOpacity={hoveredPath === destination.id ? 1 : 0.7}
                  style={{ 
                    animation: `pathDraw 3s ease-out forwards`,
                    animationDelay: `${index * 400}ms`,
                    transition: 'stroke-opacity 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredPath(destination.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                />
                <path
                  d={generatePath(destination)}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  style={{ 
                    animation: `pathDraw 3s ease-out forwards`,
                    animationDelay: `${index * 400 + 200}ms`,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Enhanced Central Nedumkandam Node */}
          {nedumNode && (
            <div
              className="absolute z-30 translate-x-[-50%] translate-y-[-50%]"
              style={{ top: "60%", left: "50%" }}
            >
              <div
                className={`transition-all duration-700 group ${
                  activeNode === "nedum" ? 'scale-110' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative">
                  {/* Enhanced Root Node Effects */}
                  <div className="absolute inset-0 -m-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Enhanced Main Circle */}
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl z-10 ring-4 ring-white/50 group-hover:ring-emerald-400/50 transition-all duration-500">
                    <img
                      src={nedumNode.icon}
                      alt={nedumNode.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30"></div>
                    <div className="absolute inset-0 border-4 border-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Enhanced Label */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap mb-1">
                      {nedumNode.label}
                    </p>
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-4 py-1 rounded-full">
                      Your Gateway
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Destination Nodes */}
          {destinationNodes.map((activity, index) => {
            const position = getNodePosition(activity.id);
            const visualImage = getVisualImage(activity.id);
            
            return (
              <div
                key={activity.id}
                className={`absolute z-20 cursor-pointer transition-all duration-1000 ${
                  animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 300 + 500}ms`
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Enhanced Wave Effect */}
                <div className="absolute inset-0 -m-6 flex items-center justify-center">
                  <div
                    className="absolute w-full h-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full transition-all duration-700"
                    style={{
                      transform: activeNode === activity.id ? 'scale(2.5)' : 'scale(1)',
                      opacity: activeNode === activity.id ? 0.6 : 0
                    }}
                  />
                </div>

                {/* Enhanced Destination Node */}
                <div
                  className={`relative rounded-full shadow-xl transition-all duration-700 group hover:shadow-2xl overflow-hidden
                    w-36 h-36 bg-white ring-4 ring-white/70 hover:ring-amber-400/70 ${
                    activeNode === activity.id ? 'scale-110 ring-amber-500/80' : 'scale-100 hover:scale-105'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                    {visualImage ? (
                      <img
                        src={visualImage}
                        alt={activity.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={activity.icon}
                        alt={activity.label}
                        className="w-18 h-18 group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30 group-hover:to-white/50 transition-all duration-500"></div>
                  </div>
                  
                  {/* Distance Badge */}
                  {activity.distance && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {activity.distance}
                    </div>
                  )}
                </div>

                {/* Enhanced Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                  <p className="text-lg font-bold text-slate-800 whitespace-nowrap mb-1">
                    {activity.label}
                  </p>
                  {activity.time && (
                    <span className="text-sm text-slate-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                      {activity.time}
                    </span>
                  )}
                </div>

                {/* Enhanced Tooltip */}
                {activeNode === activity.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-16 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/50 animate-fade-in z-40">
                    <h3 className="font-bold text-xl text-slate-800 mb-3">{activity.label}</h3>
                    {activity.distance && activity.time && (
                      <div className="flex justify-between items-center mb-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
                        <span className="text-sm font-medium text-slate-600">
                          <span className="text-amber-600">Distance:</span> {activity.distance}
                        </span>
                        <span className="text-sm font-medium text-slate-600">
                          <span className="text-emerald-600">Time:</span> {activity.time}
                        </span>
                      </div>
                    )}
                    <div className="mb-4">
                      <h4 className="font-bold text-slate-700 mb-3">Highlights</h4>
                      <div className="space-y-2">
                        {activity.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-white/60 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm font-medium text-slate-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-center font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Plan Your Visit
                    </a>
                  </div>
                )}
              </div>
            );
          })}

          {/* Enhanced Legend */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl px-8 py-6 shadow-2xl z-30">
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
              Map Legend
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-white shadow-lg" />
                <span className="font-medium text-slate-700">Your Current Location</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white border-4 border-amber-400 rounded-full shadow-lg" />
                <span className="font-medium text-slate-700">Tourist Destinations</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="24" height="12" className="flex-shrink-0">
                  <defs>
                    <linearGradient id="legendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path d="M2 6 L22 6" stroke="url(#legendGradient)" strokeWidth="3" strokeDasharray="6 3" strokeLinecap="round" />
                </svg>
                <span className="font-medium text-slate-700">Scenic Routes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes pathDraw {
          0% {
            stroke-dasharray: 0 1000;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 1000 0;
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1); 
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
