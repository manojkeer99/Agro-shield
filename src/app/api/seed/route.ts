import { NextRequest, NextResponse } from "next/server";
import  seedDatabaseIfEmpty  from "@/lib/seed";

export async function POST(req: NextRequest) {
  try {
    const result = await seedDatabaseIfEmpty();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
