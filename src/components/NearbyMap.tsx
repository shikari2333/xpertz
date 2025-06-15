
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
    
    // Trigger animations after mount with delay
    const timer = setTimeout(() => setAnimateIn(true), 500);
    
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
      <section className="nearby-map bg-gradient-to-br from-slate-50 via-emerald-50 to-amber-50 py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
              Discover Kerala's Gems
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Journey through the enchanting destinations around Nedumkandam
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 sm:p-8 transition-all duration-700 hover:-translate-y-2 border border-white/50 transform ${
                  animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animation: animateIn ? `slideInUp 0.8s ease-out ${index * 150}ms both` : 'none'
                }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500 ${
                    activity.id === "nedum" 
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
                      : "bg-gradient-to-br from-amber-500 to-orange-500"
                  }`}>
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                      {activity.label}
                    </h3>
                    {activity.id === "nedum" && (
                      <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-100 px-2 sm:px-3 py-1 rounded-full">
                        Your Base
                      </span>
                    )}
                  </div>
                </div>
                
                {activity.distance && activity.time && (
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl group-hover:from-emerald-50 group-hover:to-amber-50 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-600">
                        {activity.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="text-sm font-medium text-slate-600">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-bold text-slate-700 mb-3 sm:mb-4 text-base sm:text-lg">Experience Highlights</h4>
                  <div className="grid gap-2 sm:gap-3">
                    {activity.highlights.map((highlight, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-2 sm:p-3 bg-white/60 rounded-xl group-hover:bg-white/80 transition-all duration-300 transform hover:translate-x-1"
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex-shrink-0 animate-pulse"></div>
                        <span className="text-sm sm:text-base text-slate-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {activity.id !== "nedum" && (
                  <a
                    href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-center font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
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
    <section className="nearby-map relative w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden min-h-screen">
      {/* Animated wave background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,200 Q250,150 500,200 T1000,200 L1000,0 L0,0 Z" fill="url(#waveGradient1)" className="animate-wave-slow" />
          <path d="M0,600 Q250,550 500,600 T1000,600 L1000,400 Q750,450 500,400 T0,400 Z" fill="url(#waveGradient2)" className="animate-wave-slower" />
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
        <div className={`relative z-10 text-center py-12 md:py-16 transition-all duration-1200 ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-700 mb-4 animate-text-glow">
            Kerala's Hidden Treasures
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-6 px-4">
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam.
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-expand"></div>
        </div>

        <div className="relative w-full h-[80vh] md:h-[90vh] bg-transparent">
          {/* SVG Path Layer with enhanced animations */}
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
                  opacity={hoveredPath === destination.id ? 0.9 : animateIn ? 0.6 : 0}
                  style={{
                    transition: "all 0.6s cubic-bezier(.6,.2,.4,1)",
                    strokeDasharray: "0.5 0.75",
                    transitionDelay: `${idx * 300 + 800}ms`
                  }}
                  className="animate-draw-path"
                  onMouseEnter={() => setHoveredPath(destination.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                />
              </g>
            ))}
          </svg>

          {/* Main Node (Nedumkandam) with enhanced animations */}
          {nedumNode && (
            <div
              className={`absolute z-30 transition-all duration-1000 ${
                animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ 
                top: "60%", 
                left: "50%", 
                transform: "translate(-50%, -50%)",
                transitionDelay: '600ms'
              }}
            >
              <div
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full shadow-xl bg-white border border-emerald-200 flex items-center justify-center transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:scale-110">
                  {/* Enhanced pulsing waves for the root node */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <img
                    src={nedumNode.icon}
                    alt={nedumNode.label}
                    className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="block text-lg md:text-xl font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">{nedumNode.label}</span>
                  <span className="text-xs text-emerald-500 font-medium animate-pulse">Your Gateway</span>
                </div>
              </div>
            </div>
          )}

          {/* Destination Nodes with staggered animations */}
          {destinationNodes.map((activity, idx) => {
            const position = getNodePosition(activity.id);
            return (
              <div
                key={activity.id}
                className={`absolute z-20 cursor-pointer group transition-all duration-800 ${
                  animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${idx * 200 + 1000}ms`,
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-md bg-white border border-amber-100 hover:shadow-lg transition-all duration-500 overflow-hidden group-hover:scale-125 group-active:scale-95">
                  {/* Enhanced pulsing waves for destination nodes */}
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center mt-1">
                  <span className="block font-medium text-slate-800 group-hover:text-amber-700 transition-colors duration-300 text-sm md:text-base">{activity.label}</span>
                  {activity.distance && (
                    <span className="inline-block text-xs mt-1 text-amber-500 rounded-md px-2 py-0.5 bg-amber-100/60 group-hover:bg-amber-200/80 transition-colors duration-300">{activity.distance}</span>
                  )}
                </div>
                {activeNode === activity.id && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50 w-52 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-xl p-4 animate-fade-in-up select-none">
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

          {/* Enhanced Legend with animations */}
          <div className={`absolute top-4 md:top-10 right-4 md:right-8 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 px-4 md:px-6 py-3 md:py-4 shadow-lg z-30 transition-all duration-1000 ${
            animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '1400ms' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-slate-700 font-medium">Your Location</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white border border-amber-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-xs md:text-sm text-slate-700 font-medium">Destinations</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="28" height="10" className="md:w-8 md:h-3">
                <path d="M1 5 Q 7 2 14 5 Q 21 8 27 5" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="1 1.5" className="animate-pulse" />
              </svg>
              <span className="text-xs md:text-sm text-slate-700 font-medium">Scenic Route</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(14px) scale(0.97);
          }
          to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { text-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        
        @keyframes wave-slower {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(15px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(.4,2,.1,.9) both;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1.5s ease-out 0.8s both;
        }
        
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
        
        .animate-wave-slower {
          animation: wave-slower 12s ease-in-out infinite;
        }
        
        .animate-draw-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-path 2s ease-out forwards;
        }
        
        @keyframes draw-path {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
