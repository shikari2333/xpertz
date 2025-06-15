
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
    const timer = setTimeout(() => setAnimateIn(true), 300);
    
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
        // Path going up and left to match node position
        pathString = `M ${startX} ${startY} 
                     Q 45 50, 40 40 
                     Q 35 30, 30 25 
                     Q 25 20, 20 15`;
        break;
      case "thekkady":
        // Path going down and right to match node position
        pathString = `M ${startX} ${startY} 
                     Q 60 65, 70 70 
                     Q 75 75, 80 80 
                     Q 82 82, 85 85`;
        break;
      case "ramakkalmedu":
        // Path going right and slightly up to match node position
        pathString = `M ${startX} ${startY} 
                     Q 58 58, 65 55 
                     Q 72 52, 78 48 
                     Q 82 46, 85 45`;
        break;
      case "vagamon":
        // Path going down and left to match node position
        pathString = `M ${startX} ${startY} 
                     Q 42 68, 35 75 
                     Q 28 82, 22 88 
                     Q 18 90, 15 92`;
        break;
      case "idukki-dam":
        // Path going left and slightly up to match node position
        pathString = `M ${startX} ${startY} 
                     Q 42 58, 35 55 
                     Q 28 52, 22 48 
                     Q 18 44, 15 40`;
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
        return { top: "15%", left: "20%" }; // Matches path endpoint
      case "thekkady":
        return { top: "85%", left: "85%" }; // Matches path endpoint
      case "ramakkalmedu":
        return { top: "45%", left: "85%" }; // Matches path endpoint
      case "vagamon":
        return { top: "92%", left: "15%" }; // Matches path endpoint
      case "idukki-dam":
        return { top: "40%", left: "15%" }; // Matches path endpoint
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
      {/* Enhanced animated background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,200 Q250,150 500,200 T1000,200 L1000,0 L0,0 Z" fill="url(#waveGradient1)" className="animate-wave-slow" />
          <path d="M0,600 Q250,550 500,600 T1000,600 L1000,400 Q750,450 500,400 T0,400 Z" fill="url(#waveGradient2)" className="animate-wave-slower" />
          <path d="M0,800 Q200,750 400,800 T800,800 L800,600 Q600,650 400,600 T0,600 Z" fill="url(#waveGradient3)" className="animate-wave-medium" />
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="50%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#fef3e2" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="50%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="50%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-300/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full relative">
        <div className={`relative z-10 text-center ${isMobile ? 'py-6' : 'py-12 md:py-20'} transition-all duration-1500 ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}>
          <div className="mb-4">
            <span className={`inline-block ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-semibold text-emerald-600 tracking-wider uppercase mb-2 animate-fade-in-up`}>
              Discover Kerala
            </span>
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl'} font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent ${isMobile ? 'mb-2' : 'mb-4 md:mb-6'} animate-text-glow px-4`}>
            Hidden Treasures Await
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-base md:text-xl lg:text-2xl'} text-slate-600 max-w-4xl mx-auto ${isMobile ? 'mb-3' : 'mb-6 md:mb-8'} px-4 leading-relaxed`}>
            Embark on an extraordinary journey through the mystical landscapes around Nedumkandam, where every destination tells a story of natural wonder.
          </p>
          <div className={`mx-auto ${isMobile ? 'w-16 h-1' : 'w-24 md:w-32 h-1.5'} bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 rounded-full animate-expand shadow-lg`}></div>
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
                <stop offset="30%" stopColor="#6b5b47" />
                <stop offset="70%" stopColor="#5d4037" />
                <stop offset="100%" stopColor="#4a2c2a" />
              </linearGradient>
              <filter id="pathSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="glow" />
                <feColorMatrix type="matrix" values="1 0 0 0 0.2  0 1 0 0 0.4  0 0 1 0 0.8  0 0 0 1 0" result="glowColor"/>
                <feMerge>
                  <feMergeNode in="glowColor" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pathShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0.8" dy="0.8" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.15"/>
              </filter>
            </defs>
            {destinationNodes.map((destination, idx) => (
              <g key={destination.id}>
                {/* Enhanced path shadow for depth */}
                <path
                  d={generatePath(destination)}
                  stroke="#00000015"
                  strokeWidth={isMobile ? "2.2" : "2.4"}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.6 0.8" : "0.7 0.9"}
                  transform="translate(0.4, 0.4)"
                  opacity={animateIn ? 0.3 : 0}
                  style={{
                    transition: "all 0.8s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 250 + 700}ms`
                  }}
                />
                {/* Main enhanced dotted path */}
                <path
                  d={generatePath(destination)}
                  stroke="url(#brownRouteGradient)"
                  strokeWidth={isMobile ? "1.6" : "1.8"}
                  fill="none"
                  filter="url(#pathSoftGlow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.5 0.7" : "0.6 0.8"}
                  opacity={hoveredPath === destination.id ? 1 : animateIn ? 0.85 : 0}
                  style={{
                    transition: "all 0.8s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 250 + 900}ms`
                  }}
                  className="animate-draw-path"
                  onMouseEnter={() => setHoveredPath(destination.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                />
                {/* Enhanced highlight dots */}
                <path
                  d={generatePath(destination)}
                  stroke="#ffffff80"
                  strokeWidth={isMobile ? "0.5" : "0.6"}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isMobile ? "0.3 0.9" : "0.4 1.0"}
                  opacity={animateIn ? 0.9 : 0}
                  style={{
                    transition: "all 0.8s cubic-bezier(.6,.2,.4,1)",
                    transitionDelay: `${idx * 250 + 1100}ms`
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Enhanced Main Node (Nedumkandam) */}
          {nedumNode && (
            <div
              className={`absolute z-30 transition-all duration-1200 ${
                animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ 
                top: "60%", 
                left: "50%", 
                transform: "translate(-50%, -50%)",
                transitionDelay: '800ms'
              }}
            >
              <div
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => handleNodeClick("nedum")}
              >
                <div className={`relative ${isMobile ? 'w-20 h-20' : 'w-36 h-36 md:w-40 md:h-40'} rounded-full shadow-2xl bg-gradient-to-br from-white via-emerald-50 to-white border-2 border-emerald-200 flex items-center justify-center transition-all duration-700 overflow-hidden group-hover:shadow-3xl group-hover:scale-115 group-hover:border-emerald-300`}>
                  {/* Enhanced pulsing waves for the root node */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/15 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  <img
                    src={nedumNode.icon}
                    alt={nedumNode.label}
                    className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="mt-2 text-center">
                  <span className={`block ${isMobile ? 'text-base' : 'text-xl md:text-2xl'} font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent group-hover:from-emerald-800 group-hover:to-emerald-700 transition-all duration-300`}>{nedumNode.label}</span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-500 font-semibold animate-pulse`}>✨ Your Gateway ✨</span>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Destination Nodes */}
          {destinationNodes.map((activity, idx) => {
            const position = getNodePosition(activity.id);
            return (
              <div
                key={activity.id}
                className={`absolute z-20 cursor-pointer group transition-all duration-1000 ${
                  animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-12'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${idx * 200 + 1200}ms`,
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`relative ${isMobile ? 'w-14 h-14' : 'w-24 h-24 md:w-28 md:h-28'} rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-white via-amber-50 to-white border-2 border-amber-200 hover:shadow-2xl transition-all duration-700 overflow-hidden group-hover:scale-130 group-hover:border-amber-300 group-active:scale-95`}>
                  {/* Enhanced pulsing waves for destination nodes */}
                  <div className="absolute inset-0 rounded-full bg-amber-400/15 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-400/25 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-400/15 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="text-center mt-2">
                  <span className={`block font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent group-hover:from-amber-700 group-hover:to-amber-600 transition-all duration-300 ${isMobile ? 'text-sm' : 'text-base md:text-lg'}`}>{activity.label}</span>
                  {activity.distance && (
                    <span className={`inline-block ${isMobile ? 'text-xs' : 'text-sm'} mt-1 text-amber-600 rounded-lg px-2 md:px-3 py-1 bg-gradient-to-r from-amber-100/80 to-amber-200/60 group-hover:from-amber-200/90 group-hover:to-amber-300/70 transition-all duration-300 shadow-sm`}>{activity.distance}</span>
                  )}
                </div>
                
                {/* Enhanced mobile-optimized popup */}
                {activeNode === activity.id && (
                  <div className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 z-50 ${isMobile ? 'w-48' : 'w-56'} bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-2xl p-4 md:p-5 animate-fade-in-up select-none`}>
                    <div className={`font-bold text-slate-900 mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>{activity.label}</div>
                    {activity.highlights && (
                      <div className={`text-slate-700 mb-3 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>{activity.highlights[0]}</div>
                    )}
                    <div className={`flex items-center justify-between text-slate-500 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {activity.distance && <span className="flex items-center gap-1">📏 {activity.distance}</span>}
                      {activity.time && <span className="flex items-center gap-1">⏱ {activity.time}</span>}
                    </div>
                    {activity.id !== "nedum" && (
                      <a
                        href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full ${isMobile ? 'py-3 text-sm' : 'py-3 text-base'} mt-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 text-white text-center font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                      >
                        🚀 Plan Journey
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Enhanced Legend with premium styling */}
          <div className={`absolute ${isMobile ? 'top-3 right-3' : 'top-6 md:top-12 right-6 md:right-10'} bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/60 ${isMobile ? 'px-3 py-2' : 'px-6 md:px-8 py-4 md:py-5'} shadow-xl z-30 transition-all duration-1200 ${
            animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`} style={{ transitionDelay: '1600ms' }}>
            <div className={`flex items-center gap-3 md:gap-4 ${isMobile ? 'mb-2' : 'mb-3'}`}>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-5 h-5 md:w-6 md:h-6'} bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse shadow-lg`}></div>
              <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-slate-800 font-semibold`}>Your Location</span>
            </div>
            <div className={`flex items-center gap-3 md:gap-4 ${isMobile ? 'mb-2' : 'mb-3'}`}>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-5 h-5 md:w-6 md:h-6'} bg-gradient-to-r from-white to-amber-100 border-2 border-amber-300 rounded-full animate-pulse shadow-lg`} style={{ animationDelay: '0.5s' }}></div>
              <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-slate-800 font-semibold`}>Destinations</span>
            </div>
            <div className={`flex items-center gap-3 md:gap-4`}>
              <svg width={isMobile ? "20" : "32"} height={isMobile ? "8" : "12"} className="md:w-10 md:h-4">
                <path d={isMobile ? "M1 4 Q 5 2 10 4 Q 15 6 19 4" : "M1 6 Q 8 3 16 6 Q 24 9 31 6"} stroke="url(#brownRouteGradient)" strokeWidth="1.5" fill="none" strokeDasharray="0.5 0.7" className="animate-pulse" />
              </svg>
              <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-slate-800 font-semibold`}>Journey Route</span>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile-specific additional info section */}
        {isMobile && (
          <div className="px-4 pb-6">
            <div className="grid gap-4 mt-6">
              {activities.slice(0, 3).map((activity, index) => (
                <div
                  key={activity.id}
                  className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 p-4 transition-all duration-900 transform ${
                    animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 1800}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl overflow-hidden shadow-lg ${
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
                      <h3 className="text-sm font-bold text-slate-900 mb-1">
                        {activity.label}
                      </h3>
                      {activity.distance && activity.time && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-emerald-600 font-medium">📏 {activity.distance}</span>
                          <span className="text-xs text-amber-600 font-medium">⏱ {activity.time}</span>
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

      {/* Enhanced styles section */}
      <style>{`
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3)) drop-shadow(0 0 40px rgba(245, 158, 11, 0.2));
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5)) drop-shadow(0 0 60px rgba(245, 158, 11, 0.3));
          }
        }
        
        @keyframes expand {
          from { width: 0; transform: scaleX(0); }
          to { width: 8rem; transform: scaleX(1); }
        }
        
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0) rotateY(0deg); }
          50% { transform: translateX(-15px) rotateY(1deg); }
        }
        
        @keyframes wave-slower {
          0%, 100% { transform: translateX(0) rotateY(0deg); }
          50% { transform: translateX(20px) rotateY(-1deg); }
        }
        
        @keyframes wave-medium {
          0%, 100% { transform: translateX(0) rotateY(0deg); }
          50% { transform: translateX(10px) rotateY(0.5deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) translateX(5px) scale(1.1);
            opacity: 0.6;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(.4,2,.1,.9) both;
        }
        
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 2s ease-out 1s both;
        }
        
        .animate-wave-slow {
          animation: wave-slow 10s ease-in-out infinite;
        }
        
        .animate-wave-slower {
          animation: wave-slower 15s ease-in-out infinite;
        }
        
        .animate-wave-medium {
          animation: wave-medium 12s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-draw-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-path 2.5s ease-out forwards;
        }
        
        @keyframes draw-path {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .group:hover .group-hover\\:scale-115 {
          transform: scale(1.15);
        }
        
        .group:hover .group-hover\\:scale-130 {
          transform: scale(1.30);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
