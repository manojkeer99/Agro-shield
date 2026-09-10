import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { alerts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const crop = searchParams.get("crop");
    const risk = searchParams.get("risk");

    let items = await db.select().from(alerts).orderBy(desc(alerts.updatedAt));

    if (crop && crop !== "all") {
      items = items.filter(a => a.cropType.toLowerCase() === crop.toLowerCase());
    }
    if (risk && risk !== "all") {
      items = items.filter(a => a.riskLevel.toLowerCase() === risk.toLowerCase());
    }

    return NextResponse.json({ success: true, alerts: items });
  } catch (error) {
    console.error("Alerts error:", error);
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}