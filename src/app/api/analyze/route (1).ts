import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cropAnalyses, alerts, reports } from "@/db/schema";
import { evaluateCropRisk } from "@/lib/risk-engine";
import { eq, desc, and, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cropType,
      cropAgeDays,
      farmLocation,
      symptoms,
      irrigationStatus,
      imageUrl,
      userId,
      isDemo,
      forceDiseaseKey,
    } = body;

    if (!cropType) {
      return NextResponse.json({ error: "Crop type is required" }, { status: 400 });
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "Crop image is required for AI screening" }, { status: 400 });
    }

    const locationToUse = farmLocation || "Karnal, Haryana";

    // Multi-signal risk calculation engine
    const evaluation = evaluateCropRisk({
      crop: cropType,
      location: locationToUse,
      symptoms,
      cropAgeDays: cropAgeDays ? Number(cropAgeDays) : undefined,
      imageUrl,
      forceDiseaseKey,
    });

    // Save analysis to DB
    const [savedAnalysis] = await db.insert(cropAnalyses).values({
      userId: userId ? Number(userId) : null,
      cropType,
      cropAgeDays: cropAgeDays ? Number(cropAgeDays) : null,
      symptoms: symptoms || null,
      irrigationStatus: irrigationStatus || null,
      imageUrl,
      aiResult: evaluation.aiResult,
      aiDiseaseKey: evaluation.aiDiseaseKey,
      confidence: evaluation.confidence,
      riskLevel: evaluation.riskLevel,
      riskScore: evaluation.riskScore,
      riskBreakdown: evaluation.riskBreakdown,
      location: locationToUse,
      latitude: evaluation.weatherData.latitude,
      longitude: evaluation.weatherData.longitude,
      weatherData: evaluation.weatherData,
      guidance: evaluation.guidance,
      actionPlan: evaluation.actionPlan,
      isDemo: isDemo ? 1 : 0,
    }).returning();

    // Check / update or generate Early Warning Alert if high risk
    let triggeredAlert = null;
    if (evaluation.riskLevel === "HIGH" || evaluation.riskScore >= 65) {
      const existingAlert = await db
        .select()
        .from(alerts)
        .where(
          and(
            eq(alerts.cropType, cropType),
            sql`LOWER(${alerts.area}) LIKE ${`%${evaluation.weatherData.area.toLowerCase()}%`}`
          )
        )
        .limit(1);

      if (existingAlert.length > 0) {
        const [updated] = await db
          .update(alerts)
          .set({
            reportCount: existingAlert[0].reportCount + 1,
            updatedAt: new Date(),
          })
          .where(eq(alerts.id, existingAlert[0].id))
          .returning();
        triggeredAlert = updated;
      } else {
        const [newAlert] = await db
          .insert(alerts)
          .values({
            cropType,
            area: `${evaluation.weatherData.area} Agro-Zone, ${evaluation.weatherData.state}`,
            latitude: evaluation.weatherData.latitude,
            longitude: evaluation.weatherData.longitude,
            riskLevel: "HIGH",
            reportCount: 1,
            status: "Requires Investigation",
            conditionName: evaluation.aiResult,
            advisoryText: `Early cluster signal detected in ${evaluation.weatherData.area}. Multiple farmers reporting similar symptoms under high humidity conditions.`,
          })
          .returning();
        triggeredAlert = newAlert;
      }

      // Also create an authority review ticket
      await db.insert(reports).values({
        userId: userId ? Number(userId) : null,
        cropType,
        location: locationToUse,
        latitude: evaluation.weatherData.latitude,
        longitude: evaluation.weatherData.longitude,
        description: symptoms || `Farmer reported ${evaluation.aiResult} with score ${evaluation.riskScore}%`,
        imageUrl,
        riskLevel: evaluation.riskLevel,
        aiResult: evaluation.aiResult,
        status: "New",
      });
    }

    return NextResponse.json({
      success: true,
      data: savedAnalysis,
      alert: triggeredAlert,
      meta: {
        engine: "AgriShield VisionNet v2.4 (Simulated ML Interface)",
        confidenceDisclaimer: "AI-assisted screening only. Consult certified agronomist for confirmation.",
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to process crop analysis" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const limit = Number(searchParams.get("limit") || 10);

    let query = db.select().from(cropAnalyses).orderBy(desc(cropAnalyses.createdAt)).limit(limit);

    if (userId) {
      // @ts-expect-error drizzle where clause
      query = db.select().from(cropAnalyses).where(eq(cropAnalyses.userId, Number(userId))).orderBy(desc(cropAnalyses.createdAt)).limit(limit);
    }

    const items = await query;
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Fetch analyses error:", error);
    return NextResponse.json({ error: "Failed to fetch crop analyses" }, { status: 500 });
  }
}