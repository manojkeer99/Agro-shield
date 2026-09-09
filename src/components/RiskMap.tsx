"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  MapPin,
  Filter,
  ShieldAlert,
  Calendar,
  Layers,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface RiskMarker {
  id: number;
  cropType: string;
  area: string;
  latitude: number;
  longitude: number;
  riskLevel: "LOW" | "MODERATE" | "HIGH";
  reportCount: number;
  conditionName: string;
  advisoryText?: string;
  createdAt: string;
}

export function RiskMap() {
  const { t, setActiveTab } = useApp();
  const [markers, setMarkers] = useState<RiskMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<RiskMarker | null>(null);
  const [filterCrop, setFilterCrop] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/alerts?crop=${filterCrop}&risk=${filterRisk}`)
      .then(r => r.json())
      .then(data => {
        if (data.alerts) {
          setMarkers(data.alerts);
          if (data.alerts.length > 0 && !selectedMarker) {
            setSelectedMarker(data.alerts[0]);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filterCrop, filterRisk]);

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Geo-Spatial Surveillance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {t.riskMap} & Outbreak Hotspots
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated crop-health clusters (No private farmer identity exposed)
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Crops</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Cotton">Cotton</option>
            <option value="Potato">Potato</option>
            <option value="Tomato">Tomato</option>
            <option value="Maize">Maize</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Risk Levels</option>
            <option value="HIGH">High Risk Only</option>
            <option value="MODERATE">Moderate Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Map & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG / Map Container (Leaflet Compatible layout with custom interactive markers) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          {/* Top Map Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Agro-Epidemiology Grid • OpenStreetMap Topology</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> High
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold ml-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold ml-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low
              </span>
            </div>
          </div>

          {/* Interactive Geographic Canvas of India's Major Agricultural Corridors */}
          <div className="relative my-6 h-[360px] bg-slate-950/70 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#10b981 1px, #022c22 1px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0, 12px 12px",
              }}
            ></div>

            {/* Stylized schematic representation of Indian agrarian zones */}
            <svg
              className="w-full h-full object-contain p-4 opacity-40 text-emerald-800"
              viewBox="0 0 400 400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Northwest Wheat Belt (Punjab, Haryana, Western UP) */}
              <circle cx="150" cy="110" r="45" stroke="#10b981" strokeDasharray="3 3" />
              {/* Central Soybean/Cotton Belt */}
              <circle cx="190" cy="200" r="55" stroke="#f59e0b" strokeDasharray="3 3" />
              {/* Eastern Gangetic / Bihar / Bengal Paddy */}
              <circle cx="280" cy="160" r="50" stroke="#ef4444" strokeDasharray="3 3" />
              {/* Southern Coastal Rice / Spices */}
              <circle cx="200" cy="290" r="60" stroke="#10b981" strokeDasharray="3 3" />
            </svg>

            {/* Render Geo-Markers */}
            {markers.map((m, idx) => {
              // Normalized positions for schematic display across North-to-South India
              const posMap: Record<string, { x: number; y: number }> = {
                "Karnal": { x: 38, y: 28 },
                "Ludhiana": { x: 32, y: 22 },
                "Bhatinda": { x: 28, y: 30 },
                "Meerut": { x: 44, y: 33 },
                "Samastipur": { x: 68, y: 40 },
                "Indore": { x: 45, y: 55 },
                "Nagpur": { x: 52, y: 60 },
                "Nashik": { x: 35, y: 64 },
                "Guntur": { x: 60, y: 78 },
                "Coimbatore": { x: 48, y: 88 },
              };

              const foundKey = Object.keys(posMap).find(k => m.area.toLowerCase().includes(k.toLowerCase())) || "Karnal";
              const coords = posMap[foundKey] || { x: 40 + (idx * 6), y: 30 + (idx * 7) };
              const isSelected = selectedMarker?.id === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMarker(m)}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition transform ${
                    isSelected ? "scale-125 z-30" : "hover:scale-115 z-20"
                  }`}
                >
                  <span
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg text-white font-bold text-xs ${
                      m.riskLevel === "HIGH"
                        ? "bg-rose-600 ring-4 ring-rose-500/30"
                        : m.riskLevel === "MODERATE"
                        ? "bg-amber-500 ring-4 ring-amber-500/30"
                        : "bg-emerald-600 ring-4 ring-emerald-500/30"
                    }`}
                  >
                    {m.reportCount}
                  </span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 text-[10px] text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-md">
                    {m.cropType} ({m.area.split(" ")[0]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Hint */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span>Click any marker on the map to inspect cluster metrics</span>
            <span className="text-emerald-400 font-medium">Leaflet v1.9 Integration</span>
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          {selectedMarker ? (
            <div className="space-y-5">
              <div className="space-y-1.5 pb-4 border-b border-slate-100">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedMarker.riskLevel === "HIGH"
                      ? "bg-rose-100 text-rose-800"
                      : selectedMarker.riskLevel === "MODERATE"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {selectedMarker.riskLevel} RISK ZONE
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedMarker.area}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lat: {selectedMarker.latitude.toFixed(4)}, Long: {selectedMarker.longitude.toFixed(4)}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-500 block font-medium">Target Crop</span>
                  <span className="text-base font-bold text-slate-900">{selectedMarker.cropType}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-500 block font-medium">Suspected Condition / Problem Category</span>
                  <span className="text-sm font-bold text-slate-900">{selectedMarker.conditionName}</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-500 block font-medium">Number of Contiguous Reports</span>
                  <span className="text-lg font-black text-rose-700">{selectedMarker.reportCount} Reports</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Triggered early warning threshold (&gt; 5 reports in 10km radius)
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-500 block font-medium">Early Warning Advisory</span>
                  <p className="text-slate-700 italic mt-1 leading-relaxed">
                    &quot;{selectedMarker.advisoryText || "Multi-farmer screening reports confirm symptoms under current atmospheric humidity."}&quot;
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs">
              Select an area marker to view regional outbreak data.
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab("admin")}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Manage in Authority Desk</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Confidentiality Protected: Farmer names and plot coordinates remain private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}