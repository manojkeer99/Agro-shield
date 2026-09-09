"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  ShieldAlert,
  Sprout,
  MapPin,
  Bell,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Languages,
  LogOut,
  User,
  Zap,
  Menu,
  X,
  Building2,
} from "lucide-react";

export function Header() {
  const { lang, setLang, t, user, setUser, logout, activeTab, setActiveTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  const switchToDemoFarmer = () => {
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
    setActiveTab("dashboard");
  };

  const switchToDemoAdmin = () => {
    const demoAdmin = {
      id: 2,
      name: "Dr. Sunita Sharma (Chief Agri Officer)",
      email: "admin@agrishield.gov.in",
      phone: "+91 94140 12345",
      role: "admin" as const,
      location: "Krishi Bhavan, New Delhi",
    };
    setUser(demoAdmin);
    localStorage.setItem("agrishield_user", JSON.stringify(demoAdmin));
    setActiveTab("admin");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
      {/* Top Advisory Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium">
            Smart India Hackathon 2024–2026 Prototype • ICAR & KVK Integrated Framework
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 hover:text-white font-medium bg-emerald-800/80 px-2 py-0.5 rounded cursor-pointer transition"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "हिंदी (Hindi)" : "English"}</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 border-l border-emerald-700 pl-3">
            <span className="text-emerald-300">Quick Switch:</span>
            <button
              onClick={switchToDemoFarmer}
              className="hover:underline text-emerald-200 hover:text-white cursor-pointer"
            >
              Farmer View
            </button>
            <span>|</span>
            <button
              onClick={switchToDemoAdmin}
              className="hover:underline text-emerald-200 hover:text-white cursor-pointer"
            >
              Authority View
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setActiveTab("landing")}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900">Agri<span className="text-emerald-600">Shield</span></span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                AI MVP
              </span>
            </div>
            <p className="text-[10px] text-slate-500 -mt-0.5 font-medium hidden sm:block">
              Smart Crop Health & Early Warning System
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab("landing")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "landing"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.dashboard}</span>
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "analyze"
                ? "bg-emerald-600 text-white shadow-xs font-semibold"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold"
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{t.analyzeCrop}</span>
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "map"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t.riskMap}</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "alerts"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "admin" || activeTab === "reports" || activeTab === "analytics"
                ? "bg-slate-900 text-white font-semibold shadow-xs"
                : "text-slate-700 hover:bg-slate-100 font-medium"
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Authority Portal</span>
          </button>
        </nav>

        {/* User Session / Switch Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                  {user.name}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium capitalize">
                  {user.role === "admin" ? "Official / Officer" : "Farmer (Karnal)"}
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={switchToDemoFarmer}
              className="text-xs font-semibold px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                switchToDemoFarmer();
                setMobileMenuOpen(false);
              }}
              className="text-xs py-2 px-3 bg-emerald-50 text-emerald-800 rounded font-medium text-center"
            >
              🌾 Farmer Mode
            </button>
            <button
              onClick={() => {
                switchToDemoAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-xs py-2 px-3 bg-slate-900 text-white rounded font-medium text-center"
            >
              🏛️ Authority Mode
            </button>
          </div>
          <button
            onClick={() => {
              setActiveTab("landing");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-600" />
            {t.dashboard}
          </button>
          <button
            onClick={() => {
              setActiveTab("analyze");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg bg-emerald-50 text-emerald-800 flex items-center gap-2"
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            {t.analyzeCrop}
          </button>
          <button
            onClick={() => {
              setActiveTab("map");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            {t.riskMap}
          </button>
          <button
            onClick={() => {
              setActiveTab("alerts");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-emerald-600" />
            Alerts
          </button>
          <button
            onClick={() => {
              setActiveTab("admin");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg bg-slate-900 text-white flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            Authority Portal
          </button>
        </div>
      )}
    </header>
  );
}
