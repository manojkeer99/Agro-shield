import { db } from "@/db";
import { users, cropAnalyses, alerts, reports } from "@/db/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";

export async function seedDatabaseIfEmpty() {
  try {
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      return { message: "Database already seeded." };
    }

    const hashedPassword = await bcrypt.hash("agrishield2025", 10);

    // 1. Create Default Users (Farmer & Admin)
    const [farmer1] = await db.insert(users).values({
      name: "Ramesh Patel",
      email: "farmer@agrishield.gov.in",
      phone: "+91 98765 43210",
      passwordHash: hashedPassword,
      role: "farmer",
      location: "Karnal, Haryana",
      latitude: 29.6857,
      longitude: 76.9905,
      preferredLanguage: "en",
    }).returning();

    const [adminUser] = await db.insert(users).values({
      name: "Dr. Sunita Sharma (Chief Plant Protection Officer)",
      email: "admin@agrishield.gov.in",
      phone: "+91 94140 12345",
      passwordHash: hashedPassword,
      role: "admin",
      location: "Krishi Bhavan, New Delhi",
      latitude: 28.6189,
      longitude: 77.2155,
      preferredLanguage: "en",
    }).returning();

    // 2. Create Realistic Alerts (Emerging clusters)
    await db.insert(alerts).values([
      {
        cropType: "Wheat",
        area: "Karnal District (Taraori & Nilokheri Belt)",
        latitude: 29.6857,
        longitude: 76.9905,
        riskLevel: "HIGH",
        reportCount: 18,
        status: "Requires Investigation",
        conditionName: "Possible Yellow Rust (Puccinia striiformis)",
        advisoryText: "Multi-village alert: Persistent morning fog and 84% humidity triggered clustered symptoms. Extension teams alerted."
      },
      {
        cropType: "Rice",
        area: "Guntur Delta Belt, Andhra Pradesh",
        latitude: 16.3067,
        longitude: 80.4365,
        riskLevel: "HIGH",
        reportCount: 14,
        status: "Field Team Dispatched",
        conditionName: "Possible Bacterial Leaf Blight",
        advisoryText: "Excessive precipitation in coastal zone. Temporary field drainage advisory sent to 1,200 farmers."
      },
      {
        cropType: "Cotton",
        area: "Bhatinda & Mansa Cotton Belt, Punjab",
        latitude: 30.211,
        longitude: 74.9455,
        riskLevel: "MODERATE",
        reportCount: 9,
        status: "Advisory Issued",
        conditionName: "Possible Whitefly Vector & Leaf Curl",
        advisoryText: "Yellow sticky trap installation recommended across 4 panchayats to halt viral vector surge."
      },
      {
        cropType: "Potato",
        area: "Samastipur, Bihar",
        latitude: 25.8629,
        longitude: 85.7811,
        riskLevel: "HIGH",
        reportCount: 22,
        status: "Field Team Dispatched",
        conditionName: "Possible Late Blight (Phytophthora infestans)",
        advisoryText: "Severe dew and overcast skies created critical late blight risk index. Preventative spray drive mobilized."
      },
      {
        cropType: "Tomato",
        area: "Nashik Greenhouses, Maharashtra",
        latitude: 19.9975,
        longitude: 73.7898,
        riskLevel: "MODERATE",
        reportCount: 7,
        status: "Requires Investigation",
        conditionName: "Possible Early Blight (Alternaria solani)",
        advisoryText: "Moderate localized infection observed in high-humidity microclimate."
      }
    ]);

    // 3. Create Crop Analyses History
    await db.insert(cropAnalyses).values([
      {
        userId: farmer1.id,
        cropType: "Wheat",
        cropAgeDays: 65,
        symptoms: "Linear yellow powder pustules on upper flag leaf and tillers",
        irrigationStatus: "Canal irrigated 4 days ago",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
        aiResult: "Possible Yellow (Stripe) Rust",
        aiDiseaseKey: "wheat_yellow_rust",
        confidence: 93,
        riskLevel: "HIGH",
        riskScore: 89,
        riskBreakdown: { imageScore: 46, weatherScore: 19, symptomsScore: 14, areaScore: 14 },
        location: "Karnal, Haryana",
        latitude: 29.6857,
        longitude: 76.9905,
        weatherData: { area: "Karnal", state: "Haryana", temp: 21, humidity: 84, rainProbability: 60, condition: "High Humidity / Mist", windKph: 12 },
        guidance: "Stripe rust spreads rapidly under cool, high-moisture conditions. Early containment is critical to prevent yield collapse.",
        actionPlan: [
          "Isolate severely affected patch and avoid overhead sprinkling",
          "Monitor adjacent wheat fields within 5 km radius",
          "Consult KVK Karnal for approved systemic fungicide recommendation (e.g. Propiconazole 25% EC)",
          "Log follow-up photo after 7 days"
        ],
        isDemo: 0,
      },
      {
        userId: farmer1.id,
        cropType: "Wheat",
        cropAgeDays: 45,
        symptoms: "Healthy vigorous vegetative canopy with minimal discoloration",
        irrigationStatus: "Tube well",
        imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        aiResult: "Healthy Foliage (No Significant Pathogen Detected)",
        aiDiseaseKey: "wheat_healthy",
        confidence: 96,
        riskLevel: "LOW",
        riskScore: 24,
        riskBreakdown: { imageScore: 11, weatherScore: 5, symptomsScore: 4, areaScore: 4 },
        location: "Karnal, Haryana",
        latitude: 29.6857,
        longitude: 76.9905,
        weatherData: { area: "Karnal", state: "Haryana", temp: 23, humidity: 55, rainProbability: 10, condition: "Sunny", windKph: 10 },
        guidance: "Crop foliage displays robust vigor and normal leaf coloration. Continue regular monitoring during heading stage.",
        actionPlan: [
          "Continue scheduled irrigation at crown root initiation and flowering",
          "Maintain routine scouting every 4-5 days"
        ],
        isDemo: 0,
      },
      {
        userId: farmer1.id,
        cropType: "Rice",
        cropAgeDays: 52,
        symptoms: "Yellow wavy lesions starting from leaf tips and drying downwards",
        irrigationStatus: "Flooded paddy",
        imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
        aiResult: "Possible Bacterial Leaf Blight",
        aiDiseaseKey: "rice_bacterial_blight",
        confidence: 89,
        riskLevel: "HIGH",
        riskScore: 82,
        riskBreakdown: { imageScore: 43, weatherScore: 17, symptomsScore: 12, areaScore: 10 },
        location: "Karnal, Haryana",
        latitude: 29.6857,
        longitude: 76.9905,
        weatherData: { area: "Karnal", state: "Haryana", temp: 29, humidity: 88, rainProbability: 75, condition: "Light Rain", windKph: 15 },
        guidance: "Bacterial leaf blight accelerates under warm wet conditions. Field drainage is recommended.",
        actionPlan: [
          "Drain field for 48 hours if possible",
          "Suspend additional urea application",
          "Verify with local agriculture development officer"
        ],
        isDemo: 0,
      }
    ]);

    // 4. Create Authority Reports Table Seed
    await db.insert(reports).values([
      {
        userId: farmer1.id,
        cropType: "Wheat",
        location: "Taraori, Karnal, Haryana",
        latitude: 29.8021,
        longitude: 76.9298,
        description: "Yellow linear powder on 2-acre plot. Spreading along the canal embankment.",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
        riskLevel: "HIGH",
        aiResult: "Possible Yellow (Stripe) Rust",
        status: "Under Review",
        assignedOfficer: "Dr. R. K. Malik (KVK Karnal)",
        authorityNotes: "Field scout dispatched to inspect seed source & variety resistance status."
      },
      {
        userId: null,
        cropType: "Potato",
        location: "Samastipur District, Bihar",
        latitude: 25.8629,
        longitude: 85.7811,
        description: "Leaves turning black with damp white fuzz on underside in morning fog.",
        imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
        riskLevel: "HIGH",
        aiResult: "Possible Late Blight (Phytophthora infestans)",
        status: "Verified",
        assignedOfficer: "Smt. Manju Verma (Horticulture Officer)",
        authorityNotes: "Subsidized fungicide distribution initiated across 3 cooperatives."
      },
      {
        userId: null,
        cropType: "Rice",
        location: "Tenali, Guntur, AP",
        latitude: 16.243,
        longitude: 80.64,
        description: "Wavy yellow stripes along leaf blades across 10 contiguous smallholder plots.",
        imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
        riskLevel: "HIGH",
        aiResult: "Possible Bacterial Leaf Blight",
        status: "New",
        assignedOfficer: "Unassigned",
        authorityNotes: "Pending satellite moisture cross-validation."
      },
      {
        userId: null,
        cropType: "Cotton",
        location: "Mansa, Punjab",
        latitude: 29.9881,
        longitude: 75.3941,
        description: "Leaves curling upwards with slight thickening of veins.",
        imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80",
        riskLevel: "MODERATE",
        aiResult: "Possible Cotton Leaf Curl Virus",
        status: "Under Review",
        assignedOfficer: "Harpreet Singh (ADO)",
        authorityNotes: "Advisory issued for whitefly monitoring."
      },
      {
        userId: null,
        cropType: "Maize",
        location: "Davanagere, Karnataka",
        latitude: 14.4644,
        longitude: 75.9218,
        description: "Young maize whorls chewed up with coarse sawdust frass.",
        imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
        riskLevel: "HIGH",
        aiResult: "Possible Fall Armyworm (FAW) Damage",
        status: "Resolved",
        assignedOfficer: "Dr. B. Gowda",
        authorityNotes: "Bio-agent distribution completed. Larval population dropped below economic threshold."
      }
    ]);

    return { message: "Seed data initialized successfully." };
  } catch (error) {
    console.error("Seed error:", error);
    return { message: "Seed failed or already populated", error: String(error) };
  }
}

