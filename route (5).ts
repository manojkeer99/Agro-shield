import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reports, cropAnalyses, alerts, users } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view"); // "summary" | "list"

    if (view === "summary") {
      const [farmersCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
      const [analysesCount] = await db.select({ count: sql<number>`count(*)` }).from(cropAnalyses);
      const [highRiskCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(cropAnalyses)
        .where(eq(cropAnalyses.riskLevel, "HIGH"));
      const [activeAlertsCount] = await db.select({ count: sql<number>`count(*)` }).from(alerts);

      const allAnalyses = await db.select().from(cropAnalyses).limit(100);

      // Crop distribution breakdown
      const cropStats: Record<string, number> = {};
      const riskStats = { HIGH: 0, MODERATE: 0, LOW: 0 };
      allAnalyses.forEach(a => {
        cropStats[a.cropType] = (cropStats[a.cropType] || 0) + 1;
        if (a.riskLevel === "HIGH") riskStats.HIGH += 1;
        else if (a.riskLevel === "MODERATE") riskStats.MODERATE += 1;
        else riskStats.LOW += 1;
      });

      return NextResponse.json({
        success: true,
        metrics: {
          totalFarmers: Number(farmersCount?.count || 0),
          totalAnalyses: Number(analysesCount?.count || 0),
          highRiskReports: Number(highRiskCount?.count || 0),
          activeAlerts: Number(activeAlertsCount?.count || 0),
          cropStats,
          riskStats,
        },
      });
    }

    // List reports with filters
    const crop = searchParams.get("crop");
    const status = searchParams.get("status");

    let items = await db.select().from(reports).orderBy(desc(reports.createdAt));

    if (crop && crop !== "all") {
      items = items.filter(r => r.cropType.toLowerCase() === crop.toLowerCase());
    }
    if (status && status !== "all") {
      items = items.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }

    return NextResponse.json({ success: true, reports: items });
  } catch (error) {
    console.error("Reports API error:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, assignedOfficer, authorityNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Report ID required" }, { status: 400 });
    }

    const [updated] = await db
      .update(reports)
      .set({
        status: status || undefined,
        assignedOfficer: assignedOfficer || undefined,
        authorityNotes: authorityNotes || undefined,
      })
      .where(eq(reports.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    console.error("Update report error:", error);
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}
