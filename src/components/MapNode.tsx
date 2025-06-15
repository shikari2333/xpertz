
import React from "react";
import { Activity } from "../data/activities";

interface MapNodeProps {
  activity: Activity;
  position: { top: string; left: string };
  active: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

const MapNode: React.FC<MapNodeProps> = ({
  activity,
  position,
  active,
  onHover,
  onClick,
}) => {
  return (
    <div
      className={`absolute transition-all duration-300`}
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        zIndex: active ? 30 : 10,
      }}
      onMouseEnter={() => onHover(activity.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(activity.id)}
      tabIndex={0}
      aria-label={activity.label}
    >
      <div
        className={`w-20 h-20 rounded-full bg-white border border-emerald-100 shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer relative ${
          active ? "ring-2 ring-emerald-400" : ""
        }`}
      >
        <img
          src={activity.icon}
          alt={activity.label}
          className="w-10 h-10 object-contain"
        />
      </div>
      <div className="mt-2 text-sm text-slate-700 font-semibold text-center whitespace-nowrap">
        {activity.label}
      </div>
      {/* Tooltip */}
      {active && (
        <div className="absolute left-1/2 top-[110%] -translate-x-1/2 w-48 bg-white rounded-xl border border-emerald-50 shadow-lg px-4 py-3 mt-2 z-50 animate-fade-in">
          <div className="font-bold text-emerald-700 mb-1">{activity.label}</div>
          <div className="text-slate-600 text-xs">{activity.highlights[0]}</div>
          {activity.distance && (
            <div className="mt-2 text-[13px] text-emerald-600">
              Distance: {activity.distance}
              {activity.time && (
                <span className="ml-2 text-slate-400">({activity.time})</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapNode;
