
import React, { useEffect, useRef, useState } from 'react';
import { nearby } from '../data/nearby';

export default function NearbyMap() {
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

  const handleNodeClick = (place) => {
    setActiveNode(activeNode === place.id ? null : place.id);
  };

  const handlePlanVisit = (place) => {
    const message = `Hello R J Hotel, I would like to plan a visit to ${place.name}`;
    const whatsappUrl = `https://wa.me/919495107933?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      ref={mapRef}
      className="nearby-map relative w-full h-[800px] bg-gradient-to-br from-amber-50 to-green-50 overflow-hidden"
    >
      {/* Background Map */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100 relative">
          {/* Decorative map elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-amber-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-100 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-amber-100 rounded-full opacity-30"></div>
        </div>
      </div>

      {/* Connecting Path SVG */}
      <svg className="path-svg absolute inset-0 w-full h-full pointer-events-none">
        <path
          className="path-line"
          d="M 200 120 Q 320 200 320 240 Q 320 280 240 360 Q 280 440 440 480 Q 400 520 400 560"
          stroke="#8B5E3C"
          strokeWidth="2"
          strokeDasharray="8 4"
          fill="none"
          style={{
            strokeDashoffset: '1000',
            transition: 'stroke-dashoffset 2s ease-in-out'
          }}
        />
      </svg>

      {/* Activity Nodes */}
      {nearby.map((place, i) => (
        <div
          key={place.id}
          className={`activity-node absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
            place.id === 'nedumkandam' ? 'z-20' : 'z-10'
          }`}
          style={{ 
            top: place.coords.top, 
            left: place.coords.left,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.8)'
          }}
          onClick={() => handleNodeClick(place)}
        >
          {/* Node Icon */}
          <div className={`relative ${
            place.id === 'nedumkandam' 
              ? 'w-16 h-16 bg-green-600 border-4 border-white' 
              : 'w-12 h-12 bg-white border-2 border-green-600'
          } rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
            <span className="text-2xl">{place.icon}</span>
            {place.id === 'nedumkandam' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {/* Node Label */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm">
              {place.name.replace(' (You Are Here)', '')}
            </p>
            {place.id === 'nedumkandam' && (
              <p className="text-xs text-green-600 font-medium">(You Are Here)</p>
            )}
          </div>

          {/* Tooltip */}
          {activeNode === place.id && (
            <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 p-4 bg-white shadow-xl rounded-lg border border-gray-200 z-30 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{place.name.replace(' (You Are Here)', '')}</h3>
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
              
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  📍 {place.distance}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {place.time}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Highlights:</h4>
                <ul className="space-y-1">
                  {place.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {place.id !== 'nedumkandam' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanVisit(place);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
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

      {/* Section Header */}
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Nearby Experiences</h2>
        <p className="text-gray-600">Discover amazing places around Nedumkandam</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg z-10">
        <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-green-600 rounded-full"></div>
            <span>Nearby Attractions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-amber-700" style={{ borderTop: '2px dashed #8B5E3C' }}></div>
            <span>Travel Routes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
