"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/lib/app-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";
import { FarmerDashboard } from "@/components/FarmerDashboard";
import { AnalyzeCrop } from "@/components/AnalyzeCrop";
import { RiskMap } from "@/components/RiskMap";
import { AlertsView } from "@/components/AlertsView";
import { AuthorityDashboard } from "@/components/AuthorityDashboard";
import { DemoStoryModal } from "@/components/DemoStoryModal";
import { Sparkles, Play } from "lucide-react";

function MainContent() {
  const { activeTab } = useApp();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      <Header />

      {/* Floating SIH 2-Min Demo Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setDemoModalOpen(true)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-xl shadow-amber-900/30 flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-amber-400/20"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>SIH Presentation Demo Mode</span>
        </button>
      </div>

      <DemoStoryModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "landing" && <LandingPage />}
        {activeTab === "dashboard" && <FarmerDashboard />}
        {activeTab === "analyze" && <AnalyzeCrop />}
        {activeTab === "map" && <RiskMap />}
        {activeTab === "alerts" && <AlertsView />}
        {activeTab === "admin" && <AuthorityDashboard />}
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
