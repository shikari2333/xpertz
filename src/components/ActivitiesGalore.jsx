
import React, { useEffect, useRef, useState } from 'react';
import { activities } from '../data/activities';

export default function ActivitiesGalore() {
  const mapRef = useRef(null);
  const pathRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate nodes
            const nodes = entry.target.querySelectorAll('.activity-node');
            nodes.forEach((node, i) => {
              setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'translate(-50%, -50%) scale(1)';
              }, i * 200);
            });

            // Animate path
            const path = entry.target.querySelector('.path-line');
            if (path) {
              path.style.strokeDashoffset = '0';
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNodeClick = (activity) => {
    setActiveNode(activeNode === activity.id ? null : activity.id);
  };

  const handlePlanVisit = (activity) => {
    const message = `Planning to visit ${activity.label}`;
    const whatsappUrl = `https://wa.me/919495107933?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      ref={mapRef}
      className="activities-galore bg-[#F5F3F1] py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-[#8B5E3C] text-center mb-2">ACTIVITIES GALORE</h2>
        <p className="text-center text-lg text-[#8B5E3C]/70 mb-12">Your hub to explore the wonders of Nedumkandam</p>
        
        {/* Map Canvas */}
        <div className="relative w-full h-[600px] bg-gradient-to-br from-[#F5F3F1] to-[#E8E6E3] rounded-lg overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-[#8B5E3C]/20 to-[#176F4A]/20 relative">
              <div className="absolute top-16 left-16 w-24 h-24 bg-[#8B5E3C] rounded-full opacity-20"></div>
              <div className="absolute top-32 right-20 w-32 h-32 bg-[#176F4A] rounded-full opacity-15"></div>
              <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#8B5E3C] rounded-full opacity-25"></div>
              <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-[#176F4A] rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Dotted path SVG */}
          <svg className="path-svg absolute inset-0 w-full h-full pointer-events-none">
            <path
              className="path-line"
              d="M 180 120 Q 300 180 300 210 Q 300 270 240 330 Q 360 360 270 390 Q 270 450 300 480"
              stroke="#8B5E3C"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              style={{
                strokeDashoffset: '1000',
                transition: 'stroke-dashoffset 2s ease-in-out'
              }}
            />
          </svg>

          {/* Activity Nodes */}
          {activities.map((activity, i) => (
            <div
              key={activity.id}
              className={`activity-node node-${i} absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                activity.id === 'nedum' ? 'z-20' : 'z-10'
              }`}
              style={{ 
                top: activity.top, 
                left: activity.left,
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(0.8)'
              }}
              onClick={() => handleNodeClick(activity)}
            >
              {/* Node Icon */}
              <div className={`relative ${
                activity.id === 'nedum' 
                  ? 'w-14 h-14 bg-[#176F4A] border-4 border-white' 
                  : 'w-12 h-12 bg-white border-2 border-[#8B5E3C] hover:bg-[#176F4A] hover:border-white'
              } rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}>
                <span className="text-xl">{activity.icon}</span>
                {activity.id === 'nedum' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B5E3C] rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Node Label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <p className="text-sm font-semibold text-[#8B5E3C] whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm">
                  {activity.label}
                </p>
              </div>

              {/* Tooltip */}
              {activeNode === activity.id && (
                <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-60 p-4 bg-white shadow-xl rounded-lg border border-gray-200 z-30 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
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

                  <div className="mb-4">
                    <h4 className="font-medium text-[#8B5E3C] mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {activity.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#176F4A] rounded-full"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activity.id !== 'nedum' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanVisit(activity);
                      }}
                      className="w-full bg-[#176F4A] hover:bg-[#176F4A]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>📱</span>
                      Plan Visit via WhatsApp
                    </button>
                  )}

                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
            <h3 className="font-semibold text-[#8B5E3C] mb-2 text-sm">Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#176F4A] rounded-full border border-white"></div>
                <span className="text-[#8B5E3C]">Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-[#8B5E3C] rounded-full"></div>
                <span className="text-[#8B5E3C]">Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5" style={{ borderTop: '2px dashed #8B5E3C' }}></div>
                <span className="text-[#8B5E3C]">Routes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
