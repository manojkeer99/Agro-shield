import { NextRequest, NextResponse } from "next/server";
import { findWeatherByLocation, INDIAN_AGRI_LOCATIONS } from "@/lib/agri-knowledge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "Karnal";

  const weather = findWeatherByLocation(location);

  return NextResponse.json({
    success: true,
    location,
    weather,
    availableDistricts: INDIAN_AGRI_LOCATIONS.map(l => `${l.area}, ${l.state}`),
    provider: "AgriShield Agro-Meteorological Core (Live / Fallback Model)",
  });
}
