import React, { useState, useEffect } from "react";
import { activities } from "../data/activities";

const NearbyMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

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
  const destinationNodes = activities.filter(a => a.id !== "nedum");  // Generate natural road-like paths with multiple curve segments
  const generatePath = (destination: any) => {
    if (!nedumNode || destination.id === "nedum") return ""; // Don't generate paths for Nedumkandam itself
    
    // Use percentage-based coordinates for better responsiveness
    const startX = 50; // Center position for Nedumkandam
    const startY = 60;
    
    let pathSegments;
    
    switch (destination.id) {
      case "munnar":
        // Path to Munnar with winding mountain road effect
        pathSegments = [
          { x: 45, y: 45 },  // First curve through
          { x: 40, y: 35 },  // Second bend
          { x: 35, y: 30 },  // Mountain curve
          { x: 25, y: 20 }   // Final destination
        ];
        break;
      case "thekkady":
        // Path to Thekkady with forest route curves
        pathSegments = [
          { x: 55, y: 65 },
          { x: 65, y: 68 },
          { x: 70, y: 70 },
          { x: 75, y: 75 }
        ];
        break;
      case "ramakkalmedu":
        // Path to Ramakkalmedu with hillside curves
        pathSegments = [
          { x: 55, y: 58 },
          { x: 60, y: 55 },
          { x: 65, y: 52 },
          { x: 70, y: 50 }
        ];
        break;
      case "vagamon":
        // Path to Vagamon with valley curves
        pathSegments = [
          { x: 45, y: 65 },
          { x: 40, y: 75 },
          { x: 35, y: 80 },
          { x: 30, y: 85 }
        ];
        break;
      case "idukki-dam":
        // Path to Idukki Dam with reservoir curves
        pathSegments = [
          { x: 40, y: 55 },
          { x: 35, y: 50 },
          { x: 25, y: 48 },
          { x: 20, y: 45 }
        ];
        break;
      default:
        return "";
    }

    // Create a natural path using multiple quadratic curves
    let path = `M ${startX} ${startY}`;
    pathSegments.forEach((point, index) => {
      if (index === 0) {
        // First curve from start point
        const controlX = (startX + point.x) / 2;
        const controlY = (startY + point.y) / 2;
        path += ` Q ${controlX} ${controlY}, ${point.x} ${point.y}`;
      } else {
        // Subsequent curves between segments
        const prevPoint = pathSegments[index - 1];
        const controlX = (prevPoint.x + point.x) / 2;
        const controlY = (prevPoint.y + point.y) / 2;
        path += ` T ${point.x} ${point.y}`;
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
        return { top: "75%", left: "75%" };
      case "ramakkalmedu":
        return { top: "50%", left: "70%" };
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
      <section className="nearby-map bg-[#F5F3F1] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-[#8B5E3C] text-center mb-2">
            NEARBY EXPERIENCES
          </h2>
          <p className="text-center text-lg text-[#8B5E3C]/80 mb-8">
            Explore destinations around Nedumkandam
          </p>
          
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-500 ${
                  animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    activity.id === "nedum" ? "bg-[#176F4A]" : "bg-[#8B5E3C]"
                  }`}>
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className="w-7 h-7 filter invert"
                    />
                  </div>
                  <h3 className="ml-4 font-serif text-xl text-[#8B5E3C] font-bold">
                    {activity.label}
                  </h3>
                </div>
                
                {activity.distance && activity.time && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Distance:</span> {activity.distance} | 
                    <span className="font-medium"> Time:</span> {activity.time}
                  </p>
                )}
                
                <div className="mb-4">
                  <h4 className="font-medium text-[#8B5E3C] mb-2">Highlights:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                    {activity.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                {activity.id !== "nedum" && (
                  <a
                    href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-lg bg-[#176F4A] hover:bg-[#14573a] text-white text-center font-medium transition-colors"
                  >
                    Plan Visit
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
    <section className="nearby-map relative w-full bg-[#FFFFFF] overflow-hidden">
      <div className="w-full relative">
        <div className="relative w-full h-[100vh] bg-white">
          
          {/* Path SVG Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <style>
                {`
                  .path-road {
                    stroke: #8B5E3C;
                    stroke-width: 0.6;
                    fill: none;
                    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.05));
                    animation: pathDraw 2.5s ease-out forwards;
                  }
                `}
              </style>
            </defs>
            
            {destinationNodes.map((destination, index) => (
              <path
                key={`${destination.id}-road`}
                d={generatePath(destination)}
                className="path-road"
                style={{ 
                  animationDelay: `${index * 300}ms`,
                }}
              />
            ))}
          </svg>

          {/* Central Nedumkandam Node */}
          {nedumNode && (
            <div
              className="absolute z-30 translate-x-[-50%] translate-y-[-50%]"
              style={{
                top: "60%",
                left: "50%",
              }}
            >
              <div
                className={`transition-all duration-500 group ${
                  activeNode === "nedum" ? 'scale-105' : 'hover:scale-102'
                }`}
                onMouseEnter={() => setActiveNode("nedum")}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative">
                  {/* Root Node Wave Effects */}
                  <div className="absolute inset-0">
                    <div className="root-wave absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"></div>
                    <div className="root-pulse absolute inset-0 rounded-full"></div>
                  </div>
                  
                  {/* Main Circle */}
                  <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg z-10">
                    <img
                      src={nedumNode.icon}
                      alt={nedumNode.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Label */}
                  <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-base font-serif text-[#8B5E3C] text-center font-medium whitespace-nowrap">
                    {nedumNode.label}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Destination Nodes */}
          {destinationNodes.map((activity, index) => {
            const position = getNodePosition(activity.id);
            const visualImage = getVisualImage(activity.id);
            
            return (
              <div
                key={activity.id}
                className={`absolute z-20 cursor-pointer transition-all duration-700 ${
                  animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 200 + 100}ms`
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Modern Wave Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="modern-wave absolute bg-[#8B5E3C]"
                    style={{
                      opacity: activeNode === activity.id ? 0.12 : 0
                    }}
                  />
                </div>

                {/* Destination Node */}
                <div
                  className={`relative rounded-full shadow-lg transition-all duration-500 group hover:shadow-xl overflow-hidden
                    w-32 h-32 bg-white border-2 border-[#8B5E3C]/50 ${
                    activeNode === activity.id ? 'scale-105' : 'scale-100 hover:scale-102'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                    {visualImage ? (
                      <img
                        src={visualImage}
                        alt={activity.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={activity.icon}
                        alt={activity.label}
                        className="w-16 h-16"
                      />
                    )}
                  </div>
                </div>

                {/* Label */}
                <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-serif text-[#8B5E3C] text-center font-medium whitespace-nowrap">
                  {activity.label}
                </p>
              </div>
            );
          })}

          {/* Enhanced Legend */}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm border border-[#E0DDD8] rounded-2xl px-5 py-4 shadow-lg z-30">
            <h3 className="font-serif text-[#8B5E3C] mb-3 font-bold">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#176F4A] rounded-full border-2 border-white mr-3" />
                <span className="text-[#8B5E3C]">You Are Here</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border-2 border-[#8B5E3C] rounded-full mr-3" />
                <span className="text-[#8B5E3C]">Destinations</span>
              </div>
              <div className="flex items-center">
                <svg width="20" height="8" className="mr-3">
                  <path d="M2 4 L18 4" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                </svg>
                <span className="text-[#8B5E3C]">Routes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}      <style>{`
        .modern-wave {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: modernWave 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
          transition: opacity 0.5s ease-in-out;
        }
        
        .root-wave {
          background: radial-gradient(circle, rgba(23,111,74,0.1) 0%, rgba(23,111,74,0) 70%);
          transform-origin: center;
          animation: rootWave 3s infinite ease-out;
          transition: opacity 0.5s ease-in-out;
        }

        .root-pulse {
          border: 2px solid rgba(23,111,74,0.2);
          animation: rootPulse 2.5s infinite ease-out;
        }

        @keyframes rootWave {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes rootPulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        
        @keyframes modernWave {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            opacity: 0.05;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .group:hover .modern-wave {
          opacity: 0.08 !important;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .anm-layer1, .anm-layer2, .path-line, .animate-fade-in {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NearbyMap;
