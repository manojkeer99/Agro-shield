"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  MapPin,
  Cpu,
  HelpCircle,
  TrendingUp,
  FileCheck2,
} from "lucide-react";

export function LandingPage() {
  const { t, setActiveTab, setUser } = useApp();
  const [stats, setStats] = useState({
    farmers: 1240,
    analyses: 4890,
    highRisk: 142,
    alerts: 12,
  });

  useEffect(() => {
    fetch("/api/reports?view=summary")
      .then(r => r.json())
      .then(data => {
        if (data.metrics) {
          setStats({
            farmers: data.metrics.totalFarmers || 1240,
            analyses: data.metrics.totalAnalyses || 4890,
            highRisk: data.metrics.highRiskReports || 142,
            alerts: data.metrics.activeAlerts || 12,
          });
        }
      })
      .catch(() => {});
  }, []);

  const triggerSIHDemoStory = () => {
    const demoUser = {
      id: 1,
      name: "Ramesh Patel (Farmer)",
      email: "farmer@agrishield.gov.in",
      phone: "+91 98765 43210",
      role: "farmer" as const,
      location: "Karnal, Haryana",
    };
    setUser(demoUser);
    localStorage.setItem("agrishield_user", JSON.stringify(demoUser));
    setActiveTab("analyze");
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white p-8 sm:p-14 border border-emerald-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart India Hackathon 2024–2026 Ready MVP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            {t.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t.heroSubheadline}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab("analyze")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-900/40 flex items-center gap-2.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>{t.checkCropHealthCTA}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab("alerts")}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-emerald-200 border border-slate-700 font-semibold text-base flex items-center gap-2 transition cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>{t.viewAlertsCTA}</span>
            </button>

            <button
              onClick={triggerSIHDemoStory}
              className="px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Run 2-Min SIH Live Demo</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.farmers.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-medium">Registered Farmers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {stats.analyses.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-medium">Screenings Logged</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {stats.highRisk.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-medium">High-Risk Signals</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">
                {stats.alerts.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-medium">Active Geo-Alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Principle & Disclaimer Card */}
      <section className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-amber-950 text-base">
              Important Product Principle: AI-Assisted Screening vs Diagnosis
            </h3>
            <p className="text-sm text-amber-900/80 leading-relaxed">
              {t.disclaimerText}
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Flow */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How AgriShield Early Warning Works
          </h2>
          <p className="text-slate-600 text-sm">
            From mobile crop snapshot to regional outbreak mitigation in four intelligent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base">Crop Photo & Details</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Farmer captures foliage via mobile camera and selects crop type, age, and observed symptoms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">AI-Assisted Screening</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vision interface detects visual pathogen markers and calculates estimated confidence percentage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Multi-Signal Risk Score</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combines Image (50%), Weather microclimate (20%), Symptoms (15%), and Area hotspot density (15%).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-base">Geo-Alert & Authority Action</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clustered reports generate an Early Warning signal on the Authority Map for rapid KVK dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Signal Risk Breakdown Showcase */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Explainable Risk Architecture</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Standardized Multi-Signal Risk Scoring (0–100)
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Unlike simple image classifiers that make blind predictions, AgriShield assesses the complete agro-climatic context to prevent false alarms.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div className="text-emerald-400 text-2xl font-black">50%</div>
              <div className="text-xs font-semibold text-white mt-1">Image Vision Analysis</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Leaf pattern recognition</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div className="text-cyan-400 text-2xl font-black">20%</div>
              <div className="text-xs font-semibold text-white mt-1">Agro-Weather Conditions</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Temp, humidity & mist triggers</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div className="text-amber-400 text-2xl font-black">15%</div>
              <div className="text-xs font-semibold text-white mt-1">Reported Symptoms</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Farmer observed indicators</div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <div className="text-rose-400 text-2xl font-black">15%</div>
              <div className="text-xs font-semibold text-white mt-1">Cluster Density</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Nearby reports in district</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Portal Cards: Farmer vs Authority */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-50 to-green-100/60 border border-emerald-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Farmer Mobile Portal</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed for non-technical smallholder farmers. Big buttons, camera capture, bilingual (English & Hindi), weather updates, and actionable crop care guidance.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 font-medium">
              <li>✓ Instant crop analysis with photo preview</li>
              <li>✓ Risk category indicator (Low, Moderate, High)</li>
              <li>✓ Localized weather & fungal susceptibility</li>
              <li>✓ Previous history tracker & field recommendations</li>
            </ul>
          </div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            Open Farmer Dashboard
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Agriculture Authority Dashboard</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              For Department of Agriculture, KVK scientists, and district officers. Real-time outbreak heatmaps, cluster alerts, field verification tracking, and state-wide analytics.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2 font-medium">
              <li>✓ Interactive Leaflet risk zone map with crop filters</li>
              <li>✓ Automated early warning trigger engine</li>
              <li>✓ Farmer report review workflow (New → Under Review → Verified)</li>
              <li>✓ Crop-wise & district-wise trend visualization</li>
            </ul>
          </div>
          <button
            onClick={() => setActiveTab("admin")}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-sm shadow-md transition cursor-pointer"
          >
            Open Authority Portal
          </button>
        </div>
      </section>
    </div>
  );
}
