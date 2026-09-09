"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "./translations";

export interface UserSession {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "farmer" | "admin" | "expert";
  location: string;
  preferredLanguage?: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  user: UserSession | null;
  setUser: (u: UserSession | null) => void;
  logout: () => void;
  activeTab: "landing" | "dashboard" | "analyze" | "map" | "alerts" | "admin" | "reports" | "analytics";
  setActiveTab: (tab: "landing" | "dashboard" | "analyze" | "map" | "alerts" | "admin" | "reports" | "analytics") => void;
  demoModeNotice: boolean;
  setDemoModeNotice: (val: boolean) => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<
    "landing" | "dashboard" | "analyze" | "map" | "alerts" | "admin" | "reports" | "analytics"
  >("landing");
  const [demoModeNotice, setDemoModeNotice] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Seed DB automatically in background on mount
    fetch("/api/seed", { method: "POST" }).catch(() => {});

    // Check stored user & language in localStorage
    try {
      const storedLang = localStorage.getItem("agrishield_lang") as Language;
      if (storedLang === "en" || storedLang === "hi") {
        setLangState(storedLang);
      }
      const storedUser = localStorage.getItem("agrishield_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Default demo session for quick testing if wanted
        const demoUser: UserSession = {
          id: 1,
          name: "Ramesh Patel (Farmer)",
          email: "farmer@agrishield.gov.in",
          phone: "+91 98765 43210",
          role: "farmer",
          location: "Karnal, Haryana",
        };
        setUser(demoUser);
        localStorage.setItem("agrishield_user", JSON.stringify(demoUser));
      }
    } catch {
      // ignore SSR storage issues
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("agrishield_lang", newLang);
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("agrishield_user");
      localStorage.removeItem("agrishield_token");
    } catch {}
    setActiveTab("landing");
  };

  const triggerRefresh = () => setRefreshKey(k => k + 1);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        user,
        setUser,
        logout,
        activeTab,
        setActiveTab,
        demoModeNotice,
        setDemoModeNotice,
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
