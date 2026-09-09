"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  Sprout,
  MapPin,
  Bell,
  ArrowRight,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";

export function FarmerDashboard() {
  const { t, user, setActiveTab, refreshKey } = useApp();
  const [history, setHistory] = useState<any[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      fetch(`/api/analyze?limit=5`).then(r => r.json()),
      fetch(`/api/alerts`).then(r => r.json()),
    ])
      .then(([analysesData, alertsData]) => {
        if (active) {
          if (analysesData.items) setHistory(analysesData.items);
          if (alertsData.alerts) setActiveAlerts(alertsData.alerts.slice(0, 3));
        }
      })
      .catch(console.error)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const latestScreening = history[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Farmer Dashboard Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Welcome back, {user?.name || "Ramesh Patel"}
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Farm Location: {user?.location || "Karnal, Haryana"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("analyze")}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Sprout className="w-4 h-4" />
            <span>{t.analyzeCrop}</span>
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>View Map</span>
          </button>
        </div>
      </div>

      {/* Weather Widget */}
      <WeatherWidget location={user?.location || "Karnal, Haryana"} />

      {/* Quick Status Cards: Latest Result vs Current Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Crop Screening Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Latest Crop-Health Screening
              </span>
              {latestScreening && (
                <span className="text-[11px] text-slate-400">
                  {new Date(latestScreening.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>

            {latestScreening ? (
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={latestScreening.imageUrl}
                      alt={latestScreening.cropType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Crop: <strong className="text-slate-800">{latestScreening.cropType}</strong>
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {latestScreening.aiResult}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Estimated Confidence: <strong className="text-emerald-700">{latestScreening.confidence}%</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Risk Assessment:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded font-extrabold text-[11px] ${
                      latestScreening.riskLevel === "HIGH"
                        ? "bg-rose-100 text-rose-800"
                        : latestScreening.riskLevel === "MODERATE"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {latestScreening.riskLevel} ({latestScreening.riskScore}/100)
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No analyses recorded yet. Click &quot;Analyze Crop&quot; to begin.
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab("analyze")}
            className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Run New Screening</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Localized Early Warnings Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-rose-600" />
                <span>Regional Early Warnings ({activeAlerts.length})</span>
              </span>
              <button
                onClick={() => setActiveTab("alerts")}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {activeAlerts.map(alert => (
                <div
                  key={alert.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{alert.cropType} — {alert.area}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-extrabold bg-rose-100 text-rose-800">
                      {alert.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {alert.conditionName}: {alert.advisoryText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab("map")}
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Explore Zone on Agricultural Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Analysis History Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              {t.recentAnalyses}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab("analyze")}
            className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            + New Analysis
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">AI Screening Result</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-500 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {item.cropType}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.aiResult}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    {item.confidence}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        item.riskLevel === "HIGH"
                          ? "bg-rose-100 text-rose-800"
                          : item.riskLevel === "MODERATE"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.riskLevel} ({item.riskScore})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Advisory logged
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
