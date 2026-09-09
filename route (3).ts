import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "agrishield-super-secret-key-2025-sih";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password, location, preferredLanguage } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [existing] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await db.insert(users).values({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash,
      role: "farmer",
      location: location || "Karnal, Haryana",
      latitude: 29.6857,
      longitude: 76.9905,
      preferredLanguage: preferredLanguage || "en",
    }).returning();

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        location: newUser.location,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      location: newUser.location,
      preferredLanguage: newUser.preferredLanguage,
    };

    return NextResponse.json({
      success: true,
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error during registration" }, { status: 500 });
  }
}
