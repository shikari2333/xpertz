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

  // === Enhanced path generation with realistic curved roads ===
  const generatePath = (destination: any) => {
    if (!nedumNode || destination.id === "nedum") return "";
    const startX = 50;
    const startY = 60;
    let pathString = "";

    switch (destination.id) {
      case "munnar":
        // Complex S-curve going up and left like a mountain road
        pathString = `M ${startX} ${startY} 
                     Q 45 50, 40 40 
                     Q 35 30, 30 25 
                     Q 25 20, 15 15`;
        break;
      case "thekkady":
        // Winding path going down and right with multiple curves
        pathString = `M ${startX} ${startY} 
                     Q 60 65, 65 70 
                     Q 70 75, 75 78 
                     Q 80 82, 85 85`;
        break;
      case "ramakkalmedu":
        // Gentle arc going right with slight elevation changes
        pathString = `M ${startX} ${startY} 
                     Q 58 58, 65 55 
                     Q 72 52, 78 48 
                     Q 82 46, 85 45`;
        break;
      case "vagamon":
        // Curved descent going down and left
        pathString = `M ${startX} ${startY} 
                     Q 45 68, 38 75 
                     Q 32 82, 28 86 
                     Q 24 88, 20 90`;
        break;
      case "idukki-dam":
        // Winding path going left with natural curves
        pathString = `M ${startX} ${startY} 
                     Q 42 58, 35 55 
                     Q 28 52, 22 48 
                     Q 16 44, 10 40`;
        break;
      default:
        return "";
    }
    
    return pathString;
  };

  const getNodePosition = (activityId: string) => {
    switch (activityId) {
      case "nedum":
        return { top: "60%", left: "50%" };
      case "munnar":
        return { top: "15%", left: "15%" };
      case "thekkady":
        return { top: "85%", left: "85%" };
      case "ramakkalmedu":
        return { top: "45%", left: "85%" };
      case "vagamon":
        return { top: "90%", left: "20%" };
      case "idukki-dam":
        return { top: "40%", left: "10%" };
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
        <div className={`relative z-10 text-center ${isMobile ? 'py-4' : 'py-8 md:py-16'} transition-all duration-1200 ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-4xl lg:text-5xl xl:text-6xl'} font-extrabold tracking-tight text-emerald-700 ${isMobile ? 'mb-1' : 'mb-2 md:mb-4'} animate-text-glow px-4`}>
            Kerala's Hidden Treasures
          </h2>
          <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-lg lg:text-xl'} text-slate-600 max-w-3xl mx-auto ${isMobile ? 'mb-2' : 'mb-4 md:mb-6'} px-4`}>
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam.
          </p>
          <div className={`mx-auto ${isMobile ? 'w-12 h-0.5' : 'w-16 md:w-24 h-1'} bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-expand`}></div>
        </div>

        <div className={`relative w-full ${isMobile ? 'h-[75vh]' : 'h-[60vh] md:h-[80vh] lg:h-[90vh]'} bg-transparent`}>
          {/* SVG Path Layer with enhanced curved paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="brownRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b7355" />
                <stop offset="50%" stopColor="#6b5b47" />
                <stop offset="100%" stopColor="#5d4037" />
              </linearGradient>
              <filter id="pathSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pathShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.2"/>
              </filter>
            </defs>
            {destinationNodes.map((destination, idx) => (
              <g key={destination.id}>
                {/* Path shadow for depth */}
                <path
                  d={generatePath(destination)}
                  stroke="#00000010"
                  strokeWidth={isMobile ? "0.8" : "1.0"}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.6 1.0" : "0.7 1.2"}
                  transform="translate(0.3, 0.3)"
                  opacity={animateIn ? 0.2 : 0}
                  style={{
                    transition: "all 0.6s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 300 + 600}ms`
                  }}
                />
                {/* Main dotted path */}
                <path
                  d={generatePath(destination)}
                  stroke="url(#brownRouteGradient)"
                  strokeWidth={isMobile ? "0.7" : "0.8"}
                  fill="none"
                  filter="url(#pathSoftGlow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.6 1.0" : "0.7 1.2"}
                  opacity={hoveredPath === destination.id ? 0.95 : animateIn ? 0.75 : 0}
                  style={{
                    transition: "all 0.6s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 300 + 800}ms`
                  }}
                  className="animate-draw-path"
                  onMouseEnter={() => setHoveredPath(destination.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                />
                {/* Fine highlight dots */}
                <path
                  d={generatePath(destination)}
                  stroke="#ffffff60"
                  strokeWidth={isMobile ? "0.3" : "0.35"}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.4 1.2" : "0.5 1.4"}
                  opacity={animateIn ? 0.8 : 0}
                  style={{
                    transition: "all 0.6s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 300 + 1000}ms`
                  }}
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
                onClick={() => handleNodeClick("nedum")}
              >
                <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-32 h-32 md:w-36 md:h-36'} rounded-full shadow-xl bg-white border border-emerald-200 flex items-center justify-center transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:scale-110`}>
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
                <div className="mt-1 text-center">
                  <span className={`block ${isMobile ? 'text-sm' : 'text-lg md:text-xl'} font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300`}>{nedumNode.label}</span>
                  <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-emerald-500 font-medium animate-pulse`}>Your Gateway</span>
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
                <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-20 h-20 md:w-24 md:h-24'} rounded-full flex items-center justify-center shadow-md bg-white border border-amber-100 hover:shadow-lg transition-all duration-500 overflow-hidden group-hover:scale-125 group-active:scale-95`}>
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
                  <span className={`block font-medium text-slate-800 group-hover:text-amber-700 transition-colors duration-300 ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>{activity.label}</span>
                  {activity.distance && (
                    <span className={`inline-block ${isMobile ? 'text-xs' : 'text-xs'} mt-1 text-amber-500 rounded-md px-1 md:px-2 py-0.5 bg-amber-100/60 group-hover:bg-amber-200/80 transition-colors duration-300`}>{activity.distance}</span>
                  )}
                </div>
                
                {/* Mobile-optimized popup */}
                {activeNode === activity.id && (
                  <div className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50 ${isMobile ? 'w-44' : 'w-52'} bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-xl p-3 md:p-4 animate-fade-in-up select-none`}>
                    <div className={`font-semibold text-slate-900 mb-2 ${isMobile ? 'text-sm' : ''}`}>{activity.label}</div>
                    {activity.highlights && (
                      <div className={`text-slate-700 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>{activity.highlights[0]}</div>
                    )}
                    <div className={`flex items-center justify-between text-slate-500 mt-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      {activity.distance && <span>📏 {activity.distance}</span>}
                      {activity.time && <span>⏱ {activity.time}</span>}
                    </div>
                    {activity.id !== "nedum" && (
                      <a
                        href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full ${isMobile ? 'py-2 text-xs' : 'py-2 text-sm'} mt-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-center font-bold transition-all duration-300 transform hover:scale-105 active:scale-95`}
                      >
                        Plan Journey
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Enhanced Legend with mobile responsiveness */}
          <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 md:top-10 right-4 md:right-8'} bg-white/95 backdrop-blur-sm rounded-xl border border-slate-100 ${isMobile ? 'px-2 py-1' : 'px-4 md:px-6 py-3 md:py-4'} shadow-lg z-30 transition-all duration-1000 ${
            animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '1400ms' }}>
            <div className={`flex items-center gap-2 md:gap-3 ${isMobile ? 'mb-1' : 'mb-2'}`}>
              <div className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4 md:w-5 md:h-5'} bg-emerald-400 rounded-full animate-pulse`}></div>
              <span className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-slate-700 font-medium`}>Your Location</span>
            </div>
            <div className={`flex items-center gap-2 md:gap-3 ${isMobile ? 'mb-1' : 'mb-2'}`}>
              <div className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4 md:w-5 md:h-5'} bg-white border border-amber-200 rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
              <span className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-slate-700 font-medium`}>Destinations</span>
            </div>
            <div className={`flex items-center gap-2 md:gap-3`}>
              <svg width={isMobile ? "16" : "28"} height={isMobile ? "6" : "10"} className="md:w-8 md:h-3">
                <path d={isMobile ? "M1 3 Q 4 1 8 3 Q 12 5 15 3" : "M1 5 Q 7 2 14 5 Q 21 8 27 5"} stroke="#8b7355" strokeWidth="1" fill="none" strokeDasharray="0.6 1.0" className="animate-pulse" />
              </svg>
              <span className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-slate-700 font-medium`}>Route</span>
            </div>
          </div>
        </div>

        {/* Mobile-specific additional info section - moved below map */}
        {isMobile && (
          <div className="px-4 pb-4">
            <div className="grid gap-3 mt-4">
              {activities.slice(0, 3).map((activity, index) => (
                <div
                  key={activity.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-3 transition-all duration-700 transform ${
                    animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 1600}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full overflow-hidden shadow-md ${
                      activity.id === "nedum" 
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
                        : "bg-gradient-to-br from-amber-500 to-orange-500"
                    }`}>
                      <img
                        src={activity.icon}
                        alt={activity.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-slate-800">
                        {activity.label}
                      </h3>
                      {activity.distance && activity.time && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-emerald-600">{activity.distance}</span>
                          <span className="text-xs text-amber-600">{activity.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ... keep existing code (styles section) */}
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
