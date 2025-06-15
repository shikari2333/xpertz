
import React from "react";

const MapLegend = () => {
  return (
    <div className="absolute top-6 right-6 bg-white rounded-xl shadow border border-emerald-50 px-6 py-4 z-20">
      <div className="font-semibold text-slate-700 mb-3">Legend</div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-4 h-4 rounded-full bg-emerald-400 border" />
        <span className="text-sm text-slate-600">Main Hub</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-4 h-4 rounded-full bg-white border border-emerald-200" />
        <span className="text-sm text-slate-600">Destination</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-1 rounded-full bg-emerald-100" />
        <span className="text-sm text-slate-600">Connection</span>
      </div>
    </div>
  );
};

export default MapLegend;
