
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
  const destinationNodes = activities.filter(a => a.id !== "nedum");

  // Generate organic Bezier curve paths from Nedumkandam to each destination
  const generatePath = (destination: any) => {
    if (!nedumNode) return "";
    
    const startX = parseFloat(nedumNode.left);
    const startY = parseFloat(nedumNode.top);
    const endX = parseFloat(destination.left);
    const endY = parseFloat(destination.top);
    
    // Create organic curves with different control points for each destination
    let cp1x, cp1y, cp2x, cp2y;
    
    switch (destination.id) {
      case "munnar":
        cp1x = startX - 100; cp1y = startY - 150;
        cp2x = endX + 80; cp2y = endY + 100;
        break;
      case "thekkady":
        cp1x = startX + 120; cp1y = startY - 50;
        cp2x = endX - 60; cp2y = endY - 80;
        break;
      case "ramakkalmedu":
        cp1x = startX + 60; cp1y = startY - 40;
        cp2x = endX - 40; cp2y = endY + 20;
        break;
      case "vagamon":
        cp1x = startX - 80; cp1y = startY + 20;
        cp2x = endX + 60; cp2y = endY - 60;
        break;
      case "idukki-dam":
        cp1x = startX - 150; cp1y = startY - 120;
        cp2x = endX + 100; cp2y = endY + 60;
        break;
      default:
        cp1x = startX; cp1y = startY;
        cp2x = endX; cp2y = endY;
    }
    
    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
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
    <section className="nearby-map relative w-full bg-[#F5F3F1] py-16 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative px-4">
        <h2 className="text-5xl font-serif text-[#8B5E3C] text-center mb-3">
          NEARBY EXPERIENCES
        </h2>
        <p className="text-center text-xl text-[#8B5E3C]/80 mb-12">
          Explore destinations around Nedumkandam
        </p>
        
        <div className="relative w-full h-[700px] bg-gradient-to-br from-[#F5F3F1] via-[#F0EDE8] to-[#E8E6E3] rounded-3xl shadow-xl overflow-hidden border border-[#E0DDD8]">
          
          {/* Organic SVG Paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 800"
            style={{ zIndex: 1 }}
          >
            <defs>
              <style>
                {`
                  .path-line {
                    stroke: #8B5E3C;
                    stroke-width: 2.5;
                    stroke-dasharray: 4 4;
                    stroke-linecap: round;
                    fill: none;
                    opacity: 0.8;
                    animation: ${animateIn ? 'pathDraw 2s ease-out forwards, pathFlow 3s ease-in-out infinite' : 'none'};
                  }
                  
                  @keyframes pathDraw {
                    from { stroke-dashoffset: 100; opacity: 0; }
                    to { stroke-dashoffset: 0; opacity: 0.8; }
                  }
                  
                  @keyframes pathFlow {
                    0%, 100% { stroke-dashoffset: 0; }
                    50% { stroke-dashoffset: 8; }
                  }
                `}
              </style>
            </defs>
            
            {destinationNodes.map((destination, index) => (
              <path
                key={destination.id}
                d={generatePath(destination)}
                className="path-line"
                style={{ 
                  animationDelay: `${index * 300}ms`,
                }}
              />
            ))}
          </svg>

          {/* Activity Nodes with Animations */}
          {activities.map((activity, index) => (
            <div key={activity.id}>
              {/* Visual Anchor Image */}
              <div
                className={`absolute z-10 transition-all duration-700 ${
                  animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  top: `calc(${activity.top} - 60px)`,
                  left: `calc(${activity.left} + 40px)`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="bg-white rounded-xl shadow-lg p-3 border border-[#E0DDD8]">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F5F3F1] to-[#E8E6E3] rounded-lg mb-2 flex items-center justify-center">
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className="w-8 h-8"
                    />
                  </div>
                  <p className="text-xs font-serif text-[#8B5E3C] text-center font-medium">
                    {activity.label}
                  </p>
                </div>
              </div>

              {/* Interactive Node */}
              <div
                className={`absolute z-20 cursor-pointer transition-all duration-700 ${
                  animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  top: activity.top,
                  left: activity.left,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${index * 200 + 100}ms`
                }}
                onClick={() => handleNodeClick(activity.id)}
                onMouseEnter={() => setActiveNode(activity.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Pulsing Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`anm-layer1 absolute rounded-full border-2 ${
                    activity.id === "nedum" 
                      ? "border-[#176F4A]/30 w-20 h-20" 
                      : "border-[#8B5E3C]/30 w-16 h-16"
                  }`} />
                  <div className={`anm-layer2 absolute rounded-full border-2 ${
                    activity.id === "nedum" 
                      ? "border-[#176F4A]/20 w-24 h-24" 
                      : "border-[#8B5E3C]/20 w-20 h-20"
                  }`} />
                </div>

                {/* Main Node */}
                <div
                  className={`relative rounded-full shadow-lg transition-transform duration-200 ${
                    activity.id === "nedum"
                      ? "w-16 h-16 bg-[#176F4A] border-4 border-white"
                      : "w-12 h-12 bg-white border-3 border-[#8B5E3C]"
                  } ${activeNode === activity.id ? 'scale-110' : 'scale-100'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={activity.icon}
                      alt={activity.label}
                      className={`w-6 h-6 ${activity.id === "nedum" ? "filter invert" : ""}`}
                    />
                  </div>
                  
                  {activity.id === "nedum" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5E3C] rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Premium Tooltip */}
                {activeNode === activity.id && (
                  <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in">
                    <div className="bg-white/95 backdrop-blur-sm border border-[#E0DDD8] shadow-2xl rounded-2xl px-6 py-4 w-72">
                      <h3 className="font-serif text-xl text-[#8B5E3C] font-bold mb-2">
                        {activity.label}
                      </h3>
                      
                      {activity.distance && activity.time && (
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Distance:</span> 
                          <span className="text-[#176F4A] ml-1">{activity.distance}</span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">Time:</span>
                          <span className="text-[#176F4A] ml-1">{activity.time}</span>
                        </p>
                      )}
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-[#8B5E3C] mb-2">Highlights:</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {activity.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#176F4A] mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {activity.id !== "nedum" && (
                        <a
                          href={`https://wa.me/919495107933?text=${encodeURIComponent(`Planning to visit ${activity.label}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 rounded-xl bg-[#176F4A] hover:bg-[#14573a] text-white text-center font-medium transition-all duration-200 hover:shadow-lg"
                        >
                          Plan Visit
                        </a>
                      )}
                      
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

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

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        .anm-layer1 {
          animation: pulse-ring-1 2s infinite ease-out;
        }
        
        .anm-layer2 {
          animation: pulse-ring-2 2s infinite ease-out 0.5s;
        }
        
        @keyframes pulse-ring-1 {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.6; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        @keyframes pulse-ring-2 {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
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
