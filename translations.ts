export type Language = "en" | "hi";

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  checkCropHealthCTA: string;
  viewAlertsCTA: string;
  authorityPortalCTA: string;
  aiAssistedScreeningNotice: string;
  disclaimerText: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  analyzeCrop: string;
  riskMap: string;
  reports: string;
  authorityDashboard: string;
  demoMode: string;
  confidence: string;
  riskLevel: string;
  riskScore: string;
  high: string;
  moderate: string;
  low: string;
  weatherTitle: string;
  temp: string;
  humidity: string;
  rainProb: string;
  wind: string;
  selectCrop: string;
  uploadCropImage: string;
  dragOrClick: string;
  analyzingImage: string;
  approxAge: string;
  symptomsOptional: string;
  irrigationType: string;
  farmLocation: string;
  recentAnalyses: string;
  actionPlan: string;
  earlyWarning: string;
  totalFarmers: string;
  totalAnalyses: string;
  highRiskReports: string;
  activeAlerts: string;
  status: string;
  action: string;
  consultExpertWarning: string;
  sampleDemoFarmer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "AgriShield",
    tagline: "AI-Powered Smart Crop Health & Early Warning System",
    heroHeadline: "Protect Your Crops with Smarter, Earlier Insights.",
    heroSubheadline: "Use AI-assisted crop screening, weather information and location-based risk insights to monitor crop health.",
    checkCropHealthCTA: "Check Crop Health",
    viewAlertsCTA: "View Agriculture Alerts",
    authorityPortalCTA: "Authority / Admin Portal",
    aiAssistedScreeningNotice: "AI-Assisted Screening (Non-diagnostic estimation)",
    disclaimerText: "Important Product Principle: AgriShield provides AI-assisted screening and early risk alerts. It does not replace certified agronomist diagnosis. Always consult a qualified agricultural officer or KVK specialist before applying regulated agrochemicals.",
    login: "Farmer Login",
    register: "Register Farmer",
    logout: "Log Out",
    dashboard: "Farmer Portal",
    analyzeCrop: "Analyze Crop",
    riskMap: "Risk Map",
    reports: "Reports",
    authorityDashboard: "Authority Dashboard",
    demoMode: "SIH Demo Mode (One-Click)",
    confidence: "Estimated Confidence",
    riskLevel: "Risk Level",
    riskScore: "Overall Risk Score",
    high: "HIGH RISK",
    moderate: "MODERATE RISK",
    low: "LOW RISK",
    weatherTitle: "Microclimate & Agro-Weather",
    temp: "Temperature",
    humidity: "Humidity",
    rainProb: "Rain Probability",
    wind: "Wind Speed",
    selectCrop: "Select Crop",
    uploadCropImage: "Upload Crop / Leaf Photo",
    dragOrClick: "Take photo with phone camera or upload a JPG/PNG (max 5MB)",
    analyzingImage: "Running AI-assisted crop screening & multi-signal risk calculation...",
    approxAge: "Crop Age (days from sowing)",
    symptomsOptional: "Observed Symptoms (optional)",
    irrigationType: "Irrigation Method",
    farmLocation: "Farm Location / District",
    recentAnalyses: "Recent Crop Analyses History",
    actionPlan: "Recommended General Crop-Care Steps",
    earlyWarning: "EARLY WARNING ADVISORY",
    totalFarmers: "Registered Farmers",
    totalAnalyses: "Screenings Performed",
    highRiskReports: "High-Risk Signals",
    activeAlerts: "Active Geo-Alerts",
    status: "Status",
    action: "Action",
    consultExpertWarning: "Please consult a qualified agricultural expert for confirmation before making high-value treatment decisions.",
    sampleDemoFarmer: "Demo Farmer: Ramesh Patel (Karnal)",
  },
  hi: {
    appName: "एग्रीशील्ड (AgriShield)",
    tagline: "एआई-सक्षम स्मार्ट फसल स्वास्थ्य एवं पूर्व चेतावनी प्रणाली",
    heroHeadline: "समय रहते पाएं फसल स्वास्थ्य की सटीक जानकारी।",
    heroSubheadline: "एआई-सहायता प्राप्त फसल जांच, स्थानीय मौसम और जोखिम आंकलन से अपनी फसल को रोगों से सुरक्षित रखें।",
    checkCropHealthCTA: "फसल स्वास्थ्य की जांच करें",
    viewAlertsCTA: "कृषि चेतावनियां देखें",
    authorityPortalCTA: "कृषि अधिकारी / प्रशासन पोर्टल",
    aiAssistedScreeningNotice: "एआई-सहायता प्राप्त प्राथमिक जांच (गैर-नैदानिक आंकलन)",
    disclaimerText: "महत्वपूर्ण सूचना: एग्रीशील्ड एक एआई-सहायता प्राप्त प्राथमिक जांच एवं पूर्व चेतावनी प्रणाली है। यह किसी प्रमाणित कृषि विशेषज्ञ या प्रयोगशाला जांच का विकल्प नहीं है। किसी भी रासायनिक छिड़काव से पहले स्थानीय कृषि अधिकारी अथवा कृषि विज्ञान केंद्र (KVK) से परामर्श अवश्य लें।",
    login: "किसान लॉगिन",
    register: "किसान पंजीकरण",
    logout: "लॉगआउट",
    dashboard: "किसान पोर्टल",
    analyzeCrop: "फसल जांचें",
    riskMap: "जोखिम मानचित्र (Map)",
    reports: "रिपोर्ट्स",
    authorityDashboard: "प्रशासनिक डैशबोर्ड",
    demoMode: "स्मार्ट इंडिया हैकथॉन डेमो मोड",
    confidence: "अनुमानित सटीकता (Confidence)",
    riskLevel: "जोखिम स्तर",
    riskScore: "समग्र जोखिम स्कोर",
    high: "उच्च जोखिम (HIGH)",
    moderate: "मध्यम जोखिम (MODERATE)",
    low: "कम जोखिम (LOW)",
    weatherTitle: "खेत का स्थानीय मौसम",
    temp: "तापमान",
    humidity: "नमी (आर्द्रता)",
    rainProb: "बारिश की संभावना",
    wind: "हवा की गति",
    selectCrop: "फसल चुनें",
    uploadCropImage: "पत्ती अथवा पौधे की फोटो लें/अपलोड करें",
    dragOrClick: "कैमरा से फोटो खींचें या गैलरी से अपलोड करें (अधिकतम 5MB)",
    analyzingImage: "एआई द्वारा पत्ती की जांच एवं बहु-संकेतक जोखिम विश्लेषण जारी है...",
    approxAge: "फसल की आयु (बुवाई से दिन)",
    symptomsOptional: "दिखने वाले लक्षण (वैकल्पिक)",
    irrigationType: "सिंचाई का तरीका",
    farmLocation: "खेत का स्थान / जिला",
    recentAnalyses: "पिछली फसल जांचों का विवरण",
    actionPlan: "अनुशंसित सामान्य कृषि-देखभाल के कदम",
    earlyWarning: "क्षेत्रीय पूर्व चेतावनी",
    totalFarmers: "पंजीकृत किसान",
    totalAnalyses: "कुल फसल जांचें",
    highRiskReports: "उच्च जोखिम रिपोर्ट",
    activeAlerts: "सक्रिय भू-चेतावनियां",
    status: "स्थिति",
    action: "कार्रवाई",
    consultExpertWarning: "रासायनिक उपचार करने से पूर्व नजदीकी कृषि विशेषज्ञ या कृषि विज्ञान केंद्र से पुष्टि अवश्य कराएं।",
    sampleDemoFarmer: "डेमो किसान: रमेश पटेल (करनाल)",
  }
};
