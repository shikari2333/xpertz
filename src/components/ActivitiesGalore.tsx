
import React, { useState } from "react";
import { activities } from "../data/activities";

const ActivitiesGalore: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="activities-galore bg-[#F5F3F1] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-[#8B5E3C] text-center mb-2">
          ACTIVITIES GALORE
        </h2>
        <p className="text-center text-lg text-[#8B5E3C]/70 mb-12">
          Your hub to explore the wonders of Nedumkandam
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveNode(activeNode === activity.id ? null : activity.id)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activity.id === "nedum" ? "bg-[#176F4A]" : "bg-[#8B5E3C]"
                }`}>
                  <img
                    src={activity.icon}
                    alt={activity.label}
                    className={`w-6 h-6 ${activity.id === "nedum" ? "filter invert" : "filter invert"}`}
                  />
                </div>
                <h3 className="ml-3 font-bold text-[#8B5E3C] text-lg">{activity.label}</h3>
              </div>
              
              {activity.distance && activity.time && (
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Distance:</span> {activity.distance} | 
                  <span className="font-medium"> Time:</span> {activity.time}
                </div>
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
                  className="block w-full py-2 rounded-lg bg-[#176F4A] hover:bg-[#14573a] text-white text-center font-medium transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
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
};

export default ActivitiesGalore;
