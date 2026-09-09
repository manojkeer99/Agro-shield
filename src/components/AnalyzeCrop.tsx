"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Info,
  Calendar,
  MapPin,
  Droplet,
} from "lucide-react";
import { CROP_DISEASES, INDIAN_AGRI_LOCATIONS } from "@/lib/agri-knowledge";
import { WeatherWidget } from "./WeatherWidget";

const SAMPLE_CROPS = [
  { name: "Wheat", icon: "🌾", sampleImg: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80", sampleDisease: "wheat_yellow_rust", desc: "Yellow powder pustules along leaf veins" },
  { name: "Rice", icon: "🌱", sampleImg: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80", sampleDisease: "rice_bacterial_blight", desc: "Wavy yellow stripes along leaf blades" },
  { name: "Cotton", icon: "☁️", sampleImg: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80", sampleDisease: "cotton_leaf_curl", desc: "Upward leaf cupping and thickened veins" },
  { name: "Tomato", icon: "🍅", sampleImg: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80", sampleDisease: "tomato_early_blight", desc: "Concentric target rings on leaves" },
  { name: "Potato", icon: "🥔", sampleImg: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80", sampleDisease: "potato_late_blight", desc: "Dark damp rot spots with morning white fuzz" },
  { name: "Maize", icon: "🌽", sampleImg: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80", sampleDisease: "maize_fall_armyworm", desc: "Shot-holes and frass in leaf whorl" },
  { name: "Mustard", icon: "🌼", sampleImg: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", sampleDisease: "mustard_aphids", desc: "Curled flowering tips with tiny aphids" },
];

export function AnalyzeCrop() {
  const { t, user, setActiveTab, triggerRefresh } = useApp();

  // Wizard state
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [imagePreview, setImagePreview] = useState<string | null>(SAMPLE_CROPS[0].sampleImg);
  const [imageSource, setImageSource] = useState<"upload" | "sample">("sample");
  const [cropAgeDays, setCropAgeDays] = useState<number>(65);
  const [farmLocation, setFarmLocation] = useState<string>(user?.location || "Karnal, Haryana");
  const [symptoms, setSymptoms] = useState<string>("Yellow linear powder on flag leaves and tillers");
  const [irrigationStatus, setIrrigationStatus] = useState<string>("Canal - 3 days ago");
  const [selectedPresetDisease, setSelectedPresetDisease] = useState<string>("wheat_yellow_rust");

  // Analysis result state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [generatedAlert, setGeneratedAlert] = useState<any | null>(null);

  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
    const preset = SAMPLE_CROPS.find(c => c.name === cropName);
    if (preset) {
      setImagePreview(preset.sampleImg);
      setSelectedPresetDisease(preset.sampleDisease);
      setSymptoms(preset.desc);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAnalysisError("Please select a valid image file (JPG, PNG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAnalysisError("Image size must be less than 5MB.");
      return;
    }

    setAnalysisError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setImageSource("upload");
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    if (!imagePreview) {
      setAnalysisError("Please upload or select a crop photo first.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    setGeneratedAlert(null);

    try {
      // Simulate realistic AI model inference latency (1.8s)
      await new Promise(r => setTimeout(r, 1400));

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropType: selectedCrop,
          cropAgeDays,
          farmLocation,
          symptoms,
          irrigationStatus,
          imageUrl: imagePreview,
          userId: user?.id || 1,
          isDemo: 1,
          forceDiseaseKey: imageSource === "sample" ? selectedPresetDisease : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysisResult(data.data);
      if (data.alert) {
        setGeneratedAlert(data.alert);
      }
      triggerRefresh();
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || "Failed to analyze crop. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            Dedicated Screening Engine
          </span>
          <span className="text-xs text-slate-500">• SIH Interactive Demo Ready</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.analyzeCrop}
        </h1>
        <p className="text-sm text-slate-600">
          Upload or capture a crop leaf photo to run AI-assisted screening, multi-signal risk calculation, and localized weather assessment.
        </p>
      </div>

      {/* AI screening disclaimer note */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Product Principle:</span> AgriShield provides AI-assisted screening and early risk estimation. It does not present results as guaranteed diagnoses. Please consult a qualified agricultural expert or KVK scientist for confirmation.
        </div>
      </div>

      {/* Step 1: Select Crop */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            {t.selectCrop}
          </h2>
          <span className="text-xs text-slate-500">Supported: Major Indian Kharif & Rabi staples</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {SAMPLE_CROPS.map(c => {
            const isSelected = selectedCrop === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => handleCropSelect(c.name)}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 font-bold text-emerald-900"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-xs font-semibold">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Upload Image */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            {t.uploadCropImage}
          </h2>
          <span className="text-xs text-slate-500">Camera / Gallery (JPG, PNG &lt; 5MB)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition bg-emerald-50/30 group">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800 mt-3">
                Click to Take Photo or Upload File
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Works seamlessly with mobile device cameras
              </p>
            </label>

            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-medium">Or use preset demo sample:</span>
              <button
                type="button"
                onClick={() => {
                  const preset = SAMPLE_CROPS.find(c => c.name === selectedCrop) || SAMPLE_CROPS[0];
                  setImagePreview(preset.sampleImg);
                  setImageSource("sample");
                }}
                className="text-emerald-700 hover:underline font-bold cursor-pointer"
              >
                Reset to {selectedCrop} Sample
              </button>
            </div>
          </div>

          {/* Image Preview Box */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-56 flex items-center justify-center">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="Selected crop preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                <span>No crop image selected yet</span>
              </div>
            )}
            {imagePreview && (
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                {imageSource === "upload" ? "Uploaded Camera Photo" : `Verified SIH Sample (${selectedCrop})`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 3: Crop Details & Location Context */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
          Crop Details & Contextual Factors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {t.approxAge}
            </label>
            <input
              type="number"
              value={cropAgeDays}
              onChange={(e) => setCropAgeDays(Number(e.target.value))}
              placeholder="e.g. 65"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {t.farmLocation}
            </label>
            <select
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {INDIAN_AGRI_LOCATIONS.map(loc => (
                <option key={loc.area} value={`${loc.area}, ${loc.state}`}>
                  {loc.area}, {loc.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-slate-500" />
              {t.irrigationType}
            </label>
            <input
              type="text"
              value={irrigationStatus}
              onChange={(e) => setIrrigationStatus(e.target.value)}
              placeholder="e.g. Canal irrigated 3 days ago / Drip / Tube well"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.symptomsOptional}
            </label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Yellow powdery spots, curling, wilting"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Live Agro-Weather context for this farm location */}
      <WeatherWidget location={farmLocation} onLocationChange={(l) => setFarmLocation(l)} />

      {/* Error state */}
      {analysisError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{analysisError}</span>
        </div>
      )}

      {/* Step 4: Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-3 transition transform active:scale-98 cursor-pointer disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>{t.analyzingImage}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-emerald-200" />
              <span>Run AI-Assisted Screening & Multi-Signal Risk Assessment</span>
            </>
          )}
        </button>
      </div>

      {/* STEP 5: RESULTS DISPLAY */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI-Assisted Screening Result (Estimated)</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Crop: {analysisResult.cropType}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Screening ID: #{analysisResult.id}</div>
              <div className="text-xs font-medium text-slate-700">
                {new Date(analysisResult.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Condition & Confidence Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Possible Condition Detected
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                {analysisResult.aiResult}
              </div>
              <p className="text-xs text-slate-600 italic">
                {analysisResult.guidance}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Estimated Confidence
              </span>
              <div>
                <div className="text-4xl font-black text-emerald-700">
                  {analysisResult.confidence}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Vision pattern matching probability
                </div>
              </div>
            </div>
          </div>

          {/* Risk Level & Multi-Signal Score Indicator */}
          <div className="rounded-2xl p-6 border space-y-4 bg-gradient-to-r from-slate-50 to-slate-100/70 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Overall Risk Level
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-extrabold uppercase tracking-wider ${
                      analysisResult.riskLevel === "HIGH"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : analysisResult.riskLevel === "MODERATE"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {analysisResult.riskLevel === "HIGH"
                      ? t.high
                      : analysisResult.riskLevel === "MODERATE"
      