# AgriShield: AI-Powered Smart Crop Health & Early Warning System
> **Smart India Hackathon (SIH) Prototype** • Designed for smallholder farmers and agriculture department authorities.

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle%20ORM-blue?style=flat-square&logo=postgresql)](https://orm.drizzle.team)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![FastAPI Ready](https://img.shields.io/badge/AI%20Microservice-FastAPI%20%2F%20PyTorch-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)

---

## 1. Problem Statement
Every year, Indian smallholder farmers lose 15% to 25% of their crop yield to preventable fungal, bacterial, and pest outbreaks. Existing solutions either require lab samples with 10-day turnaround times or offer generic, blind image classifiers that generate high false alarm rates without taking into account localized microclimates or regional disease clusters.

## 2. The AgriShield Solution
**AgriShield** combines mobile camera leaf imagery with real-time agro-meteorological indices (humidity, temperature, mist) and cluster density heuristics to provide:
1. **Farmer Portal**: Fast, mobile-first, bilingual (English + Hindi) crop health screening with actionable crop-care steps.
2. **Authority Surveillance Command**: Macro-level epidemiological maps for KVK scientists and district agriculture officers to track emerging problem zones before outbreaks turn catastrophic.

---

## 3. Core Product Principle (Non-Diagnostic AI)
AgriShield enforces strict ethical AI compliance:
- Results are always labeled as **"AI-Assisted Screening"**, **"Possible Condition Detected"**, and **"Estimated Confidence"**.
- The system prominently urges farmers to confirm with certified Krishi Vigyan Kendra (KVK) agronomists before purchasing expensive chemical inputs.

---

## 4. Multi-Signal Risk Scoring Architecture
Unlike simple classifiers, AgriShield evaluates four distinct signals:
- **Image Vision Analysis (50%)**: Leaf pustule, lesion, and chlorosis pattern detection.
- **Agro-Weather Conditions (20%)**: Atmospheric humidity, temperature ranges, and dew point fungal triggers.
- **Reported Symptoms (15%)**: Farmer-reported physical observations.
- **Cluster Density Factor (15%)**: Density of similar symptoms within a 10 km geographic radius.

---

## 5. Technology Stack
- **Frontend & App Router**: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend APIs**: Next.js Server Route Handlers (`/api/analyze`, `/api/weather`, `/api/alerts`, `/api/reports`, `/api/auth`).
- **Database**: PostgreSQL with Drizzle ORM.
- **AI Microservice Interface**: Modular Python FastAPI service (`ai-service/api/main.py`) prepared for PyTorch/ONNX runtime weights.
- **Charts & Maps**: Recharts & Leaflet-ready OpenStreetMap geospatial grid.

---

## 6. Demo Accounts (Built-in for SIH Presentation)
- **Farmer Persona**: `farmer@agrishield.gov.in` / `agrishield2025` (Ramesh Patel, Karnal)
- **Authority Persona**: `admin@agrishield.gov.in` / `agrishield2025` (Dr. Sunita Sharma, Chief Plant Protection Officer)

---

## 7. 2–3 Minute Presentation Flow
1. Open the floating **"SIH Presentation Demo Mode"** button.
2. Select **Ramesh Patel** (Karnal, Haryana).
3. Upload/Select the wheat leaf sample showing yellow pustules.
4. Run AI Screening → View **Possible Yellow Rust (93% confidence)** and **Composite Risk Score (89/100 HIGH)**.
5. Notice how 18 reports trigger an **Early Warning Advisory** on the **Agricultural Risk Map**.
6. Switch to the **Authority Dashboard** to review the ticket, assign an officer, and update status to **"Verified"**.

---

## 8. Deployment Setup
```bash
# Install dependencies
npm install

# Run database push (Drizzle)
npx drizzle-kit push

# Start fullstack Next.js production build
npm run build
npm start
```
