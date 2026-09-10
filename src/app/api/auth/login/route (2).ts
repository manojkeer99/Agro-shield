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
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials. Please register or use demo accounts." }, { status: 401 });
    }

    // Role check if logging in to authority portal
    if (role === "admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: This account does not have Agriculture Authority privileges." }, { status: 403 });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        location: user.location,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      latitude: user.latitude,
      longitude: user.longitude,
      preferredLanguage: user.preferredLanguage,
    };

    return NextResponse.json({
      success: true,
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error during authentication" }, { status: 500 });
  }
}