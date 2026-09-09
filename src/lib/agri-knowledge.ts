// AgriShield Knowledge Base of Crop Diseases & Stress conditions for AI-assisted Screening
// Realistic Indian agriculture context: Wheat, Rice, Cotton, Maize, Mustard, Tomato, Potato, Sugarcane

export interface DiseaseKnowledge {
  key: string;
  nameEn: string;
  nameHi: string;
  crop: string;
  baseRisk: "LOW" | "MODERATE" | "HIGH";
  typicalConfidenceRange: [number, number];
  symptoms: string[];
  weatherTriggers: {
    tempMin: number;
    tempMax: number;
    humidityMin: number;
    rainSensitivity: boolean;
  };
  guidanceEn: string;
  guidanceHi: string;
  actionPlanEn: string[];
  actionPlanHi: string[];
  scientificName: string;
  sampleImageUrl: string;
}

export const CROP_DISEASES: Record<string, DiseaseKnowledge[]> = {
  Wheat: [
    {
      key: "wheat_yellow_rust",
      nameEn: "Possible Yellow (Stripe) Rust",
      nameHi: "संभावित पीला रतुआ (येलो रस्ट)",
      crop: "Wheat",
      baseRisk: "HIGH",
      typicalConfidenceRange: [88, 96],
      symptoms: ["Yellow powder pustules in linear rows on leaf blades", "Stunted growth", "Chlorotic stripes"],
      weatherTriggers: { tempMin: 10, tempMax: 22, humidityMin: 70, rainSensitivity: true },
      guidanceEn: "Stripe rust spreads rapidly under cool, high-moisture conditions. Early containment is critical to prevent yield collapse.",
      guidanceHi: "ठंडे और नमी वाले मौसम में पीला रतुआ तेजी से फैलता है। फसल के बचाव के लिए तुरंत निरीक्षण जरूरी है।",
      actionPlanEn: [
        "Isolate severely affected patch and avoid overhead sprinkling",
        "Monitor adjacent wheat fields within 5 km radius",
        "Consult KVK or local agriculture development officer for approved systemic fungicide recommendation (e.g., Propiconazole 25% EC as per package of practices)",
        "Log follow-up photo after 7 days to verify condition stability"
      ],
      actionPlanHi: [
        "प्रभावित हिस्से को अलग रखें व ऊपर से अतिरिक्त पानी का छिड़काव रोकें",
        "5 किमी के दायरे में नजदीकी गेहूं के खेतों पर नजर रखें",
        "कृषि विज्ञान केंद्र (KVK) अथवा कृषि अधिकारी से सलाह लें",
        "7 दिनों बाद पुनः स्थिति की जांच के लिए फोटो लें"
      ],
      scientificName: "Puccinia striiformis",
      sampleImageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "wheat_powdery_mildew",
      nameEn: "Possible Powdery Mildew",
      nameHi: "संभावित चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
      crop: "Wheat",
      baseRisk: "MODERATE",
      typicalConfidenceRange: [82, 91],
      symptoms: ["White talcum-like patches on lower leaves and stems", "Leaves turning chlorotic brown"],
      weatherTriggers: { tempMin: 15, tempMax: 25, humidityMin: 65, rainSensitivity: false },
      guidanceEn: "Fungal coating limits photosynthesis. Common in dense crop stands with excessive nitrogen application.",
      guidanceHi: "पत्तियों पर सफेद चूर्ण जमने से प्रकाश संश्लेषण बाधित होता है। अधिक नाइट्रोजन व घनी बुवाई में यह अधिक दिखता है।",
      actionPlanEn: [
        "Improve air circulation through canopy where possible",
        "Avoid late urea top-dressing",
        "Seek advice on sulfur or recommended triazole sprays from your local agri officer",
        "Maintain balanced potassium nutrition"
      ],
      actionPlanHi: [
        "खेत में हवा का संचलन सुगम रखें",
        "अधिक यूरिया डालने से बचें",
        "कृषि विशेषज्ञ से अनुशंसित दवा का परामर्श लें",
        "संतुलित पोटाश पोषण बनाए रखें"
      ],
      scientificName: "Blumeria graminis f. sp. tritici",
      sampleImageUrl: "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "wheat_healthy",
      nameEn: "Healthy Foliage (No Significant Pathogen Detected)",
      nameHi: "स्वस्थ फसल (कोई प्रमुख रोग संकेत नहीं)",
      crop: "Wheat",
      baseRisk: "LOW",
      typicalConfidenceRange: [91, 98],
      symptoms: ["Vibrant green canopy", "Uniform tillering", "Absence of pustules or lesions"],
      weatherTriggers: { tempMin: 12, tempMax: 28, humidityMin: 40, rainSensitivity: false },
      guidanceEn: "Crop foliage displays robust vigor and normal leaf coloration. Continue regular monitoring during heading stage.",
      guidanceHi: "फसल के पत्ते स्वस्थ और हरे हैं। नियमित देखभाल और समय पर सिंचाई जारी रखें।",
      actionPlanEn: [
        "Continue scheduled irrigation at crown root initiation and flowering",
        "Maintain routine scouting every 4-5 days",
        "Keep records of localized weather variations"
      ],
      actionPlanHi: [
        "समय पर सिंचाई जारी रखें",
        "हर 4-5 दिन में खेत की सामान्य निगरानी करें",
        "मौसम पूर्वानुमान के अनुसार ही खाद व पानी दें"
      ],
      scientificName: "Triticum aestivum - Vigorous",
      sampleImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Rice: [
    {
      key: "rice_bacterial_blight",
      nameEn: "Possible Bacterial Leaf Blight",
      nameHi: "संभावित जीवाणु पत्ती झुलसा (बैक्टीरियल ब्लाइट)",
      crop: "Rice",
      baseRisk: "HIGH",
      typicalConfidenceRange: [86, 95],
      symptoms: ["Water-soaked yellowish stripes with wavy margins", "Wilting of tillers (Kresek stage)"],
      weatherTriggers: { tempMin: 25, tempMax: 34, humidityMin: 80, rainSensitivity: true },
      guidanceEn: "Common during rainy/monsoon season with stormy winds. Pathogen enters through hydathodes or mechanical wounds.",
      guidanceHi: "वर्षा ऋतु में तेज हवाओं के दौरान यह रोग तेजी से फैलता है। जलजमाव नियंत्रित करें।",
      actionPlanEn: [
        "Drain standing water temporarily if feasible to slow field spread",
        "Suspend nitrogen application until disease stabilizes",
        "Consult state agricultural extension service for recommended bactericide combinations",
        "Sanitize farm tools between fields"
      ],
      actionPlanHi: [
        "खेत से जरूरत से ज्यादा भरा पानी निकालें",
        "नाइट्रोजन खाद का उपयोग तुरंत रोकें",
        "स्थानीय कृषि विस्तार अधिकारी से परामर्श लें",
        "कृषि यंत्रों की सफाई रखें"
      ],
      scientificName: "Xanthomonas oryzae pv. oryzae",
      sampleImageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "rice_brown_spot",
      nameEn: "Possible Brown Spot Disease",
      nameHi: "संभावित भूरा धब्बा रोग (ब्राउन स्पॉट)",
      crop: "Rice",
      baseRisk: "MODERATE",
      typicalConfidenceRange: [80, 92],
      symptoms: ["Oval, brown lesions with grey center on leaf blades", "Poor grain filling"],
      weatherTriggers: { tempMin: 20, tempMax: 30, humidityMin: 75, rainSensitivity: true },
      guidanceEn: "Frequently associated with nutrient-deficient soil (especially potassium, silicon, or zinc) and drought stress.",
      guidanceHi: "यह रोग अक्सर मिट्टी में पोषक तत्वों (पोटाश, जिंक) की कमी या सूखे के तनाव से जुड़ा होता है।",
      actionPlanEn: [
        "Conduct soil test to evaluate micronutrient and potassium status",
        "Ensure steady soil moisture; avoid acute dry spells",
        "Seek agronomist advice on seed treatment and foliar nutrition"
      ],
      actionPlanHi: [
        "मिट्टी की जांच कराकर जिंक व पोटाश की स्थिति देखें",
        "खेत में नमी बनाए रखें, सूखा न पड़ने दें",
        "कृषि वैज्ञानिक की सलाह से पर्णीय पोषण दें"
      ],
      scientificName: "Bipolaris oryzae",
      sampleImageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "rice_healthy",
      nameEn: "Healthy Paddy Crop",
      nameHi: "स्वस्थ धान की फसल",
      crop: "Rice",
      baseRisk: "LOW",
      typicalConfidenceRange: [90, 97],
      symptoms: ["Deep emerald green tillers", "Intact leaf margins", "Strong root anchorage"],
      weatherTriggers: { tempMin: 22, tempMax: 32, humidityMin: 60, rainSensitivity: false },
      guidanceEn: "Paddy crop displays optimal physiological vigor. Maintain appropriate water management per growth stage.",
      guidanceHi: "धान की फसल उत्तम अवस्था में है। कल्ले फूटने व बालियां निकलने की अवस्था में उचित जल प्रबंधन रखें।",
      actionPlanEn: ["Continue alternate wetting and drying (AWD) water management", "Scout weekly for stem borer or leaf folder activity"],
      actionPlanHi: ["उचित जल प्रबंधन बनाए रखें", "सप्ताह में एक बार तना छेदक या कीटों की जांच करें"],
      scientificName: "Oryza sativa - Vigorous",
      sampleImageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Cotton: [
    {
      key: "cotton_leaf_curl",
      nameEn: "Possible Cotton Leaf Curl Virus (CLCuV)",
      nameHi: "संभावित कपास पत्ती मरोड़ विषाणु (लीफ कर्ल)",
      crop: "Cotton",
      baseRisk: "HIGH",
      typicalConfidenceRange: [85, 94],
      symptoms: ["Upward/downward cupping of leaves", "Enation (leaf-like outgrowths) under veins", "Stunted plants"],
      weatherTriggers: { tempMin: 28, tempMax: 40, humidityMin: 55, rainSensitivity: false },
      guidanceEn: "Vectored by whitefly (Bemisia tabaci). High temperatures and dry spells accelerate whitefly population explosion.",
      guidanceHi: "यह सफेद मक्खी द्वारा फैलता है। गर्मी और सूखे मौसम में सफेद मक्खी की रोकथाम अति आवश्यक है।",
      actionPlanEn: [
        "Deploy yellow sticky traps (10-12 per acre) to monitor whitefly vector",
        "Rogue out and safely bury severely affected solitary plants in early stages",
        "Consult Krishi Vigyan Kendra for recommended integrated pest management (IPM) insecticides",
        "Refrain from synthetic pyrethroid overuse which flares up whitefly populations"
      ],
      actionPlanHi: [
        "पीले चिपचिपे जाल (येलो स्टिकी ट्रैप) लगाएं",
        "शुरुआती संक्रमित पौधों को खेत से उखाड़कर नष्ट करें",
        "सफेद मक्खी नियंत्रण हेतु विशेषज्ञ अनुशंसित दवा का छिड़काव करें"
      ],
      scientificName: "Cotton leaf curl begomovirus",
      sampleImageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "cotton_healthy",
      nameEn: "Healthy Cotton Crop",
      nameHi: "स्वस्थ कपास की फसल",
      crop: "Cotton",
      baseRisk: "LOW",
      typicalConfidenceRange: [92, 98],
      symptoms: ["Broad flat leaves", "Uniform square formation", "No vector infestation"],
      weatherTriggers: { tempMin: 24, tempMax: 36, humidityMin: 50, rainSensitivity: false },
      guidanceEn: "Plant architecture and reproductive branch development are proceeding normally.",
      guidanceHi: "पौधे स्वस्थ रूप से बढ़ रहे हैं। समय पर सिंचाई और कीट निगरानी जारी रखें।",
      actionPlanEn: ["Monitor square retention", "Maintain weed-free border bunds"],
      actionPlanHi: ["फूल-डोडे झड़ने से रोकें", "खेत की मेड़ को खरपतवार मुक्त रखें"],
      scientificName: "Gossypium hirsutum - Healthy",
      sampleImageUrl: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Tomato: [
    {
      key: "tomato_early_blight",
      nameEn: "Possible Early Blight (Alternaria)",
      nameHi: "संभावित अगेती झुलसा (अल्टरनेरिया ब्लाइट)",
      crop: "Tomato",
      baseRisk: "HIGH",
      typicalConfidenceRange: [87, 95],
      symptoms: ["Concentric rings like a target board on older leaves", "Yellow halo surrounding lesions", "Defoliation"],
      weatherTriggers: { tempMin: 22, tempMax: 30, humidityMin: 75, rainSensitivity: true },
      guidanceEn: "Soil-borne fungal pathogen triggered by fluctuating moisture and warm humid spells. Can cause severe fruit damage if unchecked.",
      guidanceHi: "गरम व सीलन भरे मौसम में पत्तों पर छल्लेनुमा धब्बे बनते हैं। तुरंत रोकथाम आवश्यक है।",
      actionPlanEn: [
        "Prune bottom 12 inches of leaves to prevent soil splash transmission",
        "Apply organic mulch around plants",
        "Consult agriculture officer for copper-based or Mancozeb preventative sprays"
      ],
      actionPlanHi: [
        "जमीन से सटे निचले पत्तों को काटकर हटाएं",
        "पौधों के चारों ओर मल्चिंग करें",
        "कृषि केंद्र से अनुशंसित कवकनाशी स्प्रे की जानकारी लें"
      ],
      scientificName: "Alternaria solani",
      sampleImageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
    },
    {
      key: "tomato_healthy",
      nameEn: "Healthy Tomato Vines",
      nameHi: "स्वस्थ टमाटर की फसल",
      crop: "Tomato",
      baseRisk: "LOW",
      typicalConfidenceRange: [93, 99],
      symptoms: ["Crisp deep-green foliage", "Sturdy stems", "Clean flower clusters"],
      weatherTriggers: { tempMin: 18, tempMax: 28, humidityMin: 55, rainSensitivity: false },
      guidanceEn: "Tomato foliage exhibits healthy cell turgor and no symptoms of blight or virus.",
      guidanceHi: "पौधे स्वस्थ हैं। नियमित पोषण और उचित ड्रेनेज व्यवस्था बनाए रखें।",
      actionPlanEn: ["Maintain consistent drip irrigation", "Support vines with stakes or trellising"],
      actionPlanHi: ["ड्रिप से नियमित पानी दें", "पौधों को सहारा (स्टेकिंग) दें"],
      scientificName: "Solanum lycopersicum - Vigorous",
      sampleImageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Potato: [
    {
      key: "potato_late_blight",
      nameEn: "Possible Late Blight (Phytophthora)",
      nameHi: "संभावित पछेती झुलसा (लेट ब्लाइट)",
      crop: "Potato",
      baseRisk: "HIGH",
      typicalConfidenceRange: [89, 97],
      symptoms: ["Dark water-soaked lesions expanding rapidly", "White downy mildew on leaf underside in morning dew", "Tuber rot"],
      weatherTriggers: { tempMin: 10, tempMax: 20, humidityMin: 85, rainSensitivity: true },
      guidanceEn: "Devastating oomycete pathogen capable of destroying potato crops within 7-10 days under persistent fog/mist conditions.",
      guidanceHi: "घने कोहरे व उच्च आर्द्रता में यह रोग अत्यंत तेजी से फैलता है और कंदों को सड़ा देता है।",
      actionPlanEn: [
        "Inspect field immediately early morning for white fungal growth underneath leaves",
        "Stop furrow irrigation during overcast or foggy spells",
        "Apply recommended systemic fungicide advisory from local horticulture department without delay"
      ],
      actionPlanHi: [
        "सुबह के समय पत्तों के नीचे सफेद फफूंद की तुरंत जांच करें",
        "कोहरे के मौसम में अतिरिक्त पानी न दें",
        "उद्यान विभाग की सलाह पर अनुशंसित फफूंदनाशक का तुरंत छिड़काव करें"
      ],
      scientificName: "Phytophthora infestans",
      sampleImageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Maize: [
    {
      key: "maize_fall_armyworm",
      nameEn: "Possible Fall Armyworm (FAW) Damage",
      nameHi: "संभावित फॉल आर्मीवर्म कीट प्रकोप",
      crop: "Maize",
      baseRisk: "HIGH",
      typicalConfidenceRange: [84, 93],
      symptoms: ["Shot-holes and windowing on leaves", "Sawdust-like frass inside leaf whorls", "Damaged growing tip"],
      weatherTriggers: { tempMin: 22, tempMax: 35, humidityMin: 60, rainSensitivity: false },
      guidanceEn: "Invasive pest Spodoptera frugiperda feeding voraciously inside the central whorl of maize plants.",
      guidanceHi: "मक्के के पौधे के बीच (गोभ) में कीड़े द्वारा पत्तियों को काटा जाना। तुरंत कीटनाशक या जैविक घोल जरूरी।",
      actionPlanEn: [
        "Apply sand-sawdust or neem cake slurry into central whorl for physical deterrence",
        "Install pheromone traps (5 per acre) for moth monitoring",
        "Apply recommended bio-pesticide (Metarhizium anisopliae) or contact agro-extension officer for approved control"
      ],
      actionPlanHi: [
        "गोभ के अंदर नीम का अर्क या जैविक नियंत्रक डालें",
        "फेरोमोन ट्रैप लगाएं",
        "कृषि विशेषज्ञ से अनुशंसित दवा की मात्रा जानें"
      ],
      scientificName: "Spodoptera frugiperda",
      sampleImageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80"
    }
  ],
  Mustard: [
    {
      key: "mustard_aphids",
      nameEn: "Possible Aphid Infestation (Lipaphis erysimi)",
      nameHi: "संभावित सरसों माहू (चेपा / एफिड)",
      crop: "Mustard",
      baseRisk: "MODERATE",
      typicalConfidenceRange: [83, 92],
      symptoms: ["Clusters of tiny green/brown insects on inflorescence and pods", "Curled leaves with sticky honeydew"],
      weatherTriggers: { tempMin: 12, tempMax: 24, humidityMin: 65, rainSensitivity: false },
      guidanceEn: "Aphids suck plant sap leading to pod curl and empty seeds. Cloudy weather accelerates multiplication.",
      guidanceHi: "सरसों की बालियों व फलियों से रस चूसने वाले कीट। बादल छाए रहने पर इनका प्रकोप बढ़ता है।",
      actionPlanEn: [
        "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil (3ml/L) at initial stage",
        "Conserve natural predators like ladybird beetles",
        "Consult local agriculture desk for economic threshold spray recommendations"
      ],
      actionPlanHi: [
        "नीम तेल (3 मिली/लीटर) का शुरुआती छिड़काव करें",
        "मित्र कीटों (लेडीबर्ड बीटल) की रक्षा करें",
        "गंभीर स्थिति में कृषि विशेषज्ञ की सलाह अनुसार दवा दें"
      ],
      scientificName: "Lipaphis erysimi",
      sampleImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// Realistic mock weather lookup by district in India
export interface LocationWeather {
  area: string;
  state: string;
  latitude: number;
  longitude: number;
  temp: number;
  humidity: number;
  rainProbability: number;
  condition: "Sunny" | "Partly Cloudy" | "Cloudy" | "Light Rain" | "High Humidity / Mist" | "Foggy";
  windKph: number;
  highRiskCondition: boolean;
}

export const INDIAN_AGRI_LOCATIONS: LocationWeather[] = [
  { area: "Karnal", state: "Haryana", latitude: 29.6857, longitude: 76.9905, temp: 21, humidity: 84, rainProbability: 60, condition: "High Humidity / Mist", windKph: 12, highRiskCondition: true },
  { area: "Ludhiana", state: "Punjab", latitude: 30.901, longitude: 75.8573, temp: 20, humidity: 88, rainProbability: 70, condition: "High Humidity / Mist", windKph: 14, highRiskCondition: true },
  { area: "Meerut", state: "Uttar Pradesh", latitude: 28.9845, longitude: 77.7064, temp: 23, humidity: 76, rainProbability: 40, condition: "Partly Cloudy", windKph: 10, highRiskCondition: false },
  { area: "Bhatinda", state: "Punjab", latitude: 30.211, longitude: 74.9455, temp: 22, humidity: 82, rainProbability: 55, condition: "Cloudy", windKph: 16, highRiskCondition: true },
  { area: "Indore", state: "Madhya Pradesh", latitude: 22.7196, longitude: 75.8577, temp: 28, humidity: 54, rainProbability: 15, condition: "Sunny", windKph: 9, highRiskCondition: false },
  { area: "Nagpur", state: "Maharashtra", latitude: 21.1458, longitude: 79.0882, temp: 31, humidity: 62, rainProbability: 25, condition: "Partly Cloudy", windKph: 11, highRiskCondition: false },
  { area: "Guntur", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365, temp: 32, humidity: 78, rainProbability: 65, condition: "Light Rain", windKph: 18, highRiskCondition: true },
  { area: "Coimbatore", state: "Tamil Nadu", latitude: 11.0168, longitude: 76.9558, temp: 29, humidity: 71, rainProbability: 35, condition: "Partly Cloudy", windKph: 13, highRiskCondition: false },
  { area: "Nashik", state: "Maharashtra", latitude: 19.9975, longitude: 73.7898, temp: 27, humidity: 68, rainProbability: 30, condition: "Partly Cloudy", windKph: 12, highRiskCondition: false },
  { area: "Samastipur", state: "Bihar", latitude: 25.8629, longitude: 85.7811, temp: 24, humidity: 86, rainProbability: 65, condition: "High Humidity / Mist", windKph: 8, highRiskCondition: true },
];

export function findWeatherByLocation(locationInput: string): LocationWeather {
  const norm = locationInput.toLowerCase();
  const match = INDIAN_AGRI_LOCATIONS.find(loc => norm.includes(loc.area.toLowerCase()) || norm.includes(loc.state.toLowerCase()));
  if (match) return match;
  return INDIAN_AGRI_LOCATIONS[0];
}