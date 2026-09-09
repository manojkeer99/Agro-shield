"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  MapPin,
  ExternalLink,
  Info,
} from "lucide-react";

export function DemoStoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setActiveTab, setUser, triggerRefresh } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const runStepOne = () => {
    // 1. Select Farmer
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
    setCurrentStep(2);
  };

  const runStepTwo = async () => {
    // 2. Run AI Screening
    setIsRunning(true);
    try {
      await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropType: "Wheat",
          cropAgeDays: 65,
          farmLocation: "Karnal, Haryana",
          symptoms: "Linear yellow powder pustules on upper flag leaf and tillers",
          irrigationStatus: "Canal irrigated 4 days ago",
          imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
          userId: 1,
          isDemo: 1,
          forceDiseaseKey: "wheat_yellow_rust",
        }),
      });
      triggerRefresh();
      setCurrentStep(3);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  const runStepThree = () => {
    // Switch to Map to see early warning alert
    setActiveTab("map");
    setCurrentStep(4);
  };

  const runStepFour = () => {
    // Switch to Authority Portal
    const demoAdmin = {
      id: 2,
      name: "Dr. Sunita Sharma (Chief Plant Protection Officer)",
      email: "admin@agrishield.gov.in",
      phone: "+91 94140 12345",
      role: "admin" as const,
      location: "Krishi Bhavan, New Delhi",
    };
    setUser(demoAdmin);
    localStorage.setItem("agrishield_user", JSON.stringify(demoAdmin));
    setActiveTab("admin");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                SIH Presentation Flow (2–3 Minutes)
              </h3>
              <p className="text-[11px] text-slate-500">
                End-to-end simulated live narrative for hackathon jury
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Steps visual */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span className={currentStep >= 1 ? "text-emerald-700 font-black" : ""}>1. Farmer</span>
            <span>→</span>
            <span className={currentStep >= 2 ? "text-emerald-700 font-black" : ""}>2. AI Screening</span>
            <span>→</span>
            <span className={currentStep >= 3 ? "text-emerald-700 font-black" : ""}>3. Risk & Map</span>
            <span>→</span>
            <span className={currentStep >= 4 ? "text-emerald-700 font-black" : ""}>4. Authority Desk</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            {currentStep === 1 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Step 1: Farmer Persona Selection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start story with smallholder farmer <strong>Ramesh Patel</strong> in Karnal, Haryana. His wheat crop is entering heading stage during misty weather.
                </p>
                <button
                  onClick={runStepOne}
                  className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Select Ramesh Patel & Proceed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Step 2: Crop Leaf AI Screening</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ramesh snaps a photo of wheat leaf with yellow pustules. The AI Vision interface flags <strong>Possible Yellow Rust (93% confidence)</strong> and triggers multi-signal risk calculation (89/100 HIGH).
                </p>
                <button
                  disabled={isRunning}
                  onClick={runStepTwo}
                  className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <span>{isRunning ? "Simulating AI Vision & Multi-Signal Score..." : "Trigger AI Crop Analysis"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Step 3: Cluster Detected & Early Warning</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  With 18 similar reports in Taraori-Karnal agro-zone under 84% humidity, AgriShield automatically raises an <strong>Early Warning Advisory</strong> on the National Risk Map.
                </p>
                <button
                  onClick={runStepThree}
                  className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Open Risk Map to View Cluster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Step 4: Authority Mitigation Command</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Switch to <strong>Dr. Sunita Sharma (Chief Officer)</strong> on the Authority Portal to review the incident report, verify symptoms, and coordinate KVK field scout dispatch.
                </p>
                <button
                  onClick={runStepFour}
                  className="mt-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Switch to Authority Portal & Finish Demo</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-[11px] text-slate-500 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          <strong>Hackathon Note:</strong> All demo predictions and alerts are transparently labeled as simulated early warning tests for academic review.
        </div>
      </div>
    </div>
  );
}