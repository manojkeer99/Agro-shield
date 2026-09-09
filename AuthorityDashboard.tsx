"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/lib/app-context";
import {
  Users,
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Filter,
  FileText,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AuthorityDashboard() {
  const { user, setUser, setActiveTab, refreshKey } = useApp();
  const [metrics, setMetrics] = useState<any>(null);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState("all");

  const isOfficial = user?.role === "admin";

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      fetch(`/api/reports?view=summary`).then(r => r.json()),
      fetch(`/api/reports?status=${selectedStatus}&crop=${selectedCrop}`).then(r => r.json()),
    ])
      .then(([summaryData, reportsData]) => {
        if (active) {
          if (summaryData.metrics) setMetrics(summaryData.metrics);
          if (reportsData.reports) setReportsList(reportsData.reports);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedStatus, selectedCrop, refreshKey]);

  const updateReportStatus = async (reportId: number, newStatus: string) => {
    setUpdatingId(reportId);
    try {
      const res = await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: reportId,
          status: newStatus,
          assignedOfficer: user?.name || "Dr. Sunita Sharma (Chief Officer)",
          authorityNotes: `Updated to ${newStatus} by ${user?.name || "Official"} on ${new Date().toLocaleDateString()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReportsList(prev =>
          prev.map(r => (r.id === reportId ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const switchToAdmin = () => {
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
  };

  // Prepare chart data
  const cropChartData = metrics?.cropStats
    ? Object.keys(metrics.cropStats).map(c => ({ name: c, count: metrics.cropStats[c] }))
    : [
        { name: "Wheat", count: 24 },
        { name: "Rice", count: 18 },
        { name: "Potato", count: 14 },
        { name: "Cotton", count: 11 },
        { name: "Tomato", count: 9 },
        { name: "Maize", count: 6 },
      ];

  const riskPieData = [
    { name: "High Risk", value: metrics?.riskStats?.HIGH || 14, color: "#ef4444" },
    { name: "Moderate", value: metrics?.riskStats?.MODERATE || 22, color: "#f59e0b" },
    { name: "Low Risk", value: metrics?.riskStats?.LOW || 45, color: "#10b981" },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Authority Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Ministry of Agriculture & Farmers Welfare Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Agriculture Authority Surveillance Command
          </h1>
          <p className="text-xs text-slate-400">
            Real-time multi-district crop health intelligence, early warnings & KVK response management.
          </p>
        </div>

        <div>
          {!isOfficial ? (
            <button
              onClick={switchToAdmin}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Switch to Authority Officer Mode</span>
            </button>
          ) : (
            <div className="text-right">
              <span className="text-[11px] text-emerald-400 block font-semibold uppercase tracking-wider">
                Authorized Session
              </span>
              <span className="text-sm font-bold text-white">{user?.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Registered Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.totalFarmers || 1240}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% this month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Screenings</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {metrics?.totalAnalyses || 4890}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Vision Net Inferences</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">High-Risk Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600">
            {metrics?.highRiskReports || 142}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold">Immediate attention</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Early Warnings</span>
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {metrics?.activeAlerts || 12}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">Geo-clusters flagged</div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop-wise Reports Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Crop-Wise Incident Distribution</h3>
              <p className="text-xs text-slate-500">Volume of AI-flagged screening reports per staple</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Live Aggregate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropChartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Risk Severity Breakdown</h3>
            <p className="text-xs text-slate-500">Multi-signal calculated distribution</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
            <div>
              <span className="block font-bold text-rose-600">{riskPieData[0].value}</span>
              <span className="text-[10px] text-slate-500">High</span>
            </div>
            <div>
              <span className="block font-bold text-amber-600">{riskPieData[1].value}</span>
              <span className="text-[10px] text-slate-500">Moderate</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-600">{riskPieData[2].value}</span>
              <span className="text-[10px] text-slate-500">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Management Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-black text-slate-900">
                Official Incident Reports & Verification Desk
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review incoming farmer field reports, assign extension officers, and update triage status.
            </p>
          </div>

          {/* Filter dropdowns */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-semibold cursor-pointer"
            >
              <option value="all">All Crops</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Potato">Potato</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-semibold cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Report ID</th>
                <th className="py-3 px-3">Crop</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3">AI Screening Result</th>
                <th className="py-3 px-3">Assigned Officer</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reportsList.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    #{r.id}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {r.cropType}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 max-w-[140px] truncate" title={r.location}>
                    {r.location}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        r.riskLevel === "HIGH"
                          ? "bg-rose-100 text-rose-800"
                          : r.riskLevel === "MODERATE"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {r.riskLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-800 max-w-[180px] truncate" title={r.aiResult}>
                    {r.aiResult || "Screening pending"}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {r.assignedOfficer || "Unassigned"}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        r.status === "Verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : r.status === "Under Review"
                          ? "bg-amber-100 text-amber-800"
                          : r.status === "Resolved"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <select
                      disabled={updatingId === r.id}
                      value={r.status}
                      onChange={(e) => updateReportStatus(r.id, e.target.value)}
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold rounded-lg px-2 py-1 text-[11px] cursor-pointer"
                    >
                      <option value="New">Mark New</option>
                      <option value="Under Review">Set Under Review</option>
                      <option value="Verified">Set Verified</option>
                      <option value="Resolved">Set Resolved</option>
                    </select>
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
