"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  Calendar,
  Filter,
  Send,
  RefreshCw,
} from "lucide-react";

export function AlertsView() {
  const { t, setActiveTab, refreshKey } = useApp();
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/alerts?risk=${filterRisk}`)
      .then(r => r.json())
      .then(data => {
        if (data.alerts) setAlertsList(data.alerts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filterRisk, refreshKey]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              National Agricultural Early Warning System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Active Geo-Alerts & Advisories
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated outbreak early warnings generated when multiple crop anomalies are detected in an area.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-semibold cursor-pointer"
          >
            <option value="all">All Risks</option>
            <option value="HIGH">High Risk Clusters</option>
            <option value="MODERATE">Moderate Risk</option>
          </select>
        </div>
      </div>

      {/* Early Warning Explainer */}
      <div className="bg-rose-500/10 border border-rose-300/60 rounded-2xl p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-rose-950">
          <span className="font-bold text-sm block">
            System Early-Warning Notice:
          </span>
          <p className="leading-relaxed">
            This is an early-warning signal, not confirmation of an outbreak. AgriShield correlates satellite microclimate triggers with farmer field screenings to alert neighboring blocks 7–10 days before widespread pathogen colonization.
          </p>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {alertsList.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    a.riskLevel === "HIGH"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {a.riskLevel} ALERT
                </span>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                  {a.reportCount} Correlated Reports
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {a.cropType} — {a.conditionName}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{a.area}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Advisory Note:
                </span>
                <p className="leading-relaxed italic">
                  &quot;{a.advisoryText}&quot;
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="font-semibold text-slate-700">Status:</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-medium">
                  {a.status}
                </span>
              </div>
              <button
                onClick={() => setActiveTab("map")}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Inspect on Map →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}