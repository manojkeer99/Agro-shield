"use client";

import React, { useState, useEffect } from "react";
import { Cloud, Droplets, Wind, Thermometer, ShieldAlert, CheckCircle, RefreshCw } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { LocationWeather } from "@/lib/agri-knowledge";

interface WeatherWidgetProps {
  location?: string;
  onLocationChange?: (newLoc: string) => void;
}

export function WeatherWidget({ location = "Karnal", onLocationChange }: WeatherWidgetProps) {
  const { t } = useApp();
  const [weather, setWeather] = useState<LocationWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [selectedLoc, setSelectedLoc] = useState(location);

  useEffect(() => {
    setSelectedLoc(location);
  }, [location]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/weather?location=${encodeURIComponent(selectedLoc)}`)
      .then(res => res.json())
      .then(data => {
        if (active && data.success) {
          setWeather(data.weather);
          if (data.availableDistricts) setAvailableDistricts(data.availableDistricts);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedLoc]);

  const handleSelect = (val: string) => {
    const areaName = val.split(",")[0].trim();
    setSelectedLoc(areaName);
    if (onLocationChange) onLocationChange(val);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 shadow-lg border border-slate-700/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-base tracking-wide text-emerald-100">
              {t.weatherTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time agro-meteorological disease susceptibility index
          </p>
        </div>

        {/* Location selector */}
        <div className="flex items-center gap-2">
          <select
            value={availableDistricts.find(d => d.toLowerCase().includes(selectedLoc.toLowerCase())) || ""}
            onChange={(e) => handleSelect(e.target.value)}
            className="bg-slate-800/90 text-xs text-slate-200 border border-slate-600 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
          >
            {availableDistricts.length > 0 ? (
              availableDistricts.map(dist => (
                <option key={dist} value={dist}>
                  📍 {dist}
                </option>
              ))
            ) : (
              <option value="Karnal, Haryana">📍 Karnal, Haryana</option>
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Synchronizing agro-weather data...</span>
        </div>
      ) : weather ? (
        <div className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Temp */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">{t.temp}</div>
                <div className="text-lg font-bold text-white">{weather.temp}°C</div>
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">{t.humidity}</div>
                <div className="text-lg font-bold text-white">{weather.humidity}%</div>
              </div>
            </div>

            {/* Rain Prob */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">{t.rainProb}</div>
                <div className="text-lg font-bold text-white">{weather.rainProbability}%</div>
              </div>
            </div>

            {/* Wind */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">{t.wind}</div>
                <div className="text-lg font-bold text-white">{weather.windKph} km/h</div>
              </div>
            </div>
          </div>

          {/* Microclimate disease risk alert box */}
          <div className="mt-3.5 bg-slate-800/90 rounded-xl p-3 border border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Condition:</span>
              <span className="px-2 py-0.5 rounded bg-slate-700 text-emerald-300 font-medium">
                {weather.condition}
              </span>
            </div>
            {weather.highRiskCondition ? (
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Elevated fungal spore development trigger</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Atmospheric risk within safe vegetative limits</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
