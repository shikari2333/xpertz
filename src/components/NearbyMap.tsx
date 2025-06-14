
import React, { useState } from "react";
import { activities } from "../data/activities";

const NearbyMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  return (
    <section className="nearby-map relative w-full bg-[#F5F3F1] py-12 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative px-4">
        <h2 className="text-4xl font-serif text-[#8B5E3C] text-center mb-2">
          NEARBY EXPERIENCES
        </h2>
        <p className="text-center text-lg text-[#8B5E3C]/80 mb-10">
          Explore destinations around Nedumkandam
        </p>
        
        <div className="relative w-full h-[600px] bg-gradient-to-br from-[#F5F3F1] to-[#E8E6E3] rounded-3xl shadow-lg overflow-hidden">
          {/* Activity Nodes */}
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-node absolute flex flex-col items-center z-20 cursor-pointer"
              style={{
                top: activity.top,
                left: activity.left,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleNodeClick(activity.id)}
            >
              {/* Node Circle */}
              <div
                className={`relative flex items-center justify-center shadow-lg rounded-full transition-transform duration-200 ${
                  activity.id === "nedum"
                    ? "w-16 h-16 bg-[#176F4A] border-4 border-white"
                    : "w-14 h-14 bg-white border-2 border-[#8B5E3C] hover:border-[#176F4A]"
                }`}
                style={{
                  transform: activeNode === activity.id ? "scale(1.1)" : "scale(1)",
                }}
              >
                <img
                  src={activity.icon}
                  alt={activity.label}
                  className={`w-7 h-7 ${activity.id === "nedum" ? "filter invert" : ""}`}
                />
                {activity.id === "nedum" && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8B5E3C] rounded-full border-2 border-white" />
                )}
              </div>
              
              {/* Label */}
              <span className="mt-2 px-2 py-1 rounded bg-white text-sm font-semibold text-[#222] shadow text-center">
                {activity.label}
              </span>

              {/* Tooltip */}
              {activeNode === activity.id && (
                <div className="absolute bottom-full mb-4 w-64 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 z-30">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#8B5E3C]">{activity.label}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNode(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {activity.distance && activity.time && (
                    <p className="text-xs font-medium mb-2 text-[#333]">
                      Distance: <span className="text-[#176F4A]">{activity.distance}</span> | 
                      Time: <span className="text-[#176F4A]">{activity.time}</span>
                    </p>
                  )}
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-[#8B5E3C] mb-1">Highlights:</h4>
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
                      className="block w-full py-2 rounded-lg bg-[#176F4A] hover:bg-[#14573a] text-white text-center font-medium transition-colors text-sm"
                    >
                      Plan Visit
                    </a>
                  )}
                  
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              )}
            </div>
          ))}
          
          {/* Simple connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
            {activities.filter(a => a.id !== "nedum").map((activity) => (
              <line
                key={activity.id}
                x1="500"
                y1="650"
                x2={parseFloat(activity.left)}
                y2={parseFloat(activity.top)}
                stroke="#8B5E3C"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/90 border border-gray-200 rounded-lg px-3 py-2 shadow-md">
            <h3 className="font-semibold text-[#8B5E3C] mb-1 text-sm">Legend</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#176F4A] rounded-full"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-[#8B5E3C] rounded-full"></div>
                <span>Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyMap;
