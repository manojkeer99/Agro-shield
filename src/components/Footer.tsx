import React from "react";
import { ShieldCheck, ArrowRight, Sparkles, AlertCircle, HeartHandshake, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tight">Agri<span className="text-emerald-400">Shield</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-Powered Smart Crop Health & Regional Early Warning System designed for Smart India Hackathon.
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">
              National Agro-Meteorological Core v2.4
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Key Features
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-emerald-400 transition cursor-pointer">AI-Assisted Crop Screening</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Multi-Signal Risk Index (50/20/15/15)</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Agro-Weather Microclimate Modeling</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Outbreak Clustering & Geo-Map</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Authority Incident Workflow</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              National Helplines & KVK
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kisan Call Center: <strong>1800-180-1551</strong></span>
              </li>
              <li>ICAR - National Research Centre</li>
              <li>Krishi Vigyan Kendra Network</li>
              <li>Pradhan Mantri Fasal Bima Yojana (PMFBY)</li>
            </ul>
          </div>

          {/* Col 4 - Regulatory Principle */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Ethical AI Product Principle
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
              AgriShield predictions represent probabilistic screening estimates. All agrochemical prescriptions require verification by qualified agronomists or certified plant protection officers.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2025–2026 AgriShield System. Built for Smart India Hackathon (SIH). Open Source Agritech Architecture.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Data Governance</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Farmer Data Protection Act</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">FastAPI & PyTorch Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}