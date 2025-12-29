
import { Symptom, UIStrings, Language, CommonDisease, PredictionResponse } from './types';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
];

const DEFAULT_DISCLAIMER = {
  en: "This information is for educational purposes only. Consult a doctor for medical advice.",
  hi: "यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। चिकित्सा सलाह के लिए डॉक्टर से परामर्श करें।",
  gu: "આ માહિતી માત્ર શૈક્ષણિક હેતુઓ માટે છે. તબીબી સલાહ માટે ડૉક્ટરની સલાહ લો."
};

const createStaticData = (disease: string, desc: string, remedies: string[], yoga: string[], exercises: string[], diet: string[], lang: Language): PredictionResponse => ({
  disease,
  confidence: 1.0,
  description: desc,
  homeRemedies: remedies,
  yogaAndExercise: {
    yogaPoses: yoga,
    exercises: exercises,
    precautions: lang === 'en' ? ["Don't overexert yourself", "Stop if pain increases"] : 
                 lang === 'hi' ? ["अपने आप को ज्यादा न थकाएं", "दर्द बढ़ने पर रुकें"] :
                 ["તમારી જાતને વધારે ન થકવો", "જો દુખાવો વધે તો રોકાઈ જાઓ"]
  },
  recoveryPlan: {
    diet: diet,
    rest: lang === 'en' ? "Get at least 8 hours of sleep." : 
          lang === 'hi' ? "कम से कम 8 घंटे की नींद लें।" : 
          "ઓછામાં ઓછી 8 કલાકની ઊંઘ લો.",
    hygiene: lang === 'en' ? ["Wash hands frequently", "Keep surroundings clean"] : 
             lang === 'hi' ? ["हाथ बार-बार धोएं", "आसपास सफाई रखें"] :
             ["વારંવાર હાથ ધોવા", "આસપાસ સફાઈ રાખો"],
    dos: lang === 'en' ? ["Drink warm fluids", "Rest well"] : 
         lang === 'hi' ? ["गर्म तरल पदार्थ पिएं", "अच्छी तरह आराम करें"] :
         ["ગરમ પ્રવાહી પીવો", "સારો આરામ કરો"],
    donts: lang === 'en' ? ["Avoid cold drinks", "Don't skip meals"] : 
           lang === 'hi' ? ["ठंडे पेय पदार्थों से बचें", "खाना न छोड़ें"] :
           ["ઠંડા પીણા ટાળો", "જમવાનું છોડશો નહીં"]
  },
  urgency: 'Low',
  disclaimer: DEFAULT_DISCLAIMER[lang]
});

export const UI_TRANSLATIONS: Record<Language, UIStrings> = {
  en: {
    brandName: "HealAI",
    navHome: "Home",
    navPredict: "Predict",
    navCommon: "Common Diseases",
    navExercises: "Exercises & Yoga",
    navAbout: "About",
    navDisclaimer: "Disclaimer",
    navLangLabel: "Choose Language",
    homeWelcome: "AI Health Companion",
    homeSubtitle1: "Identify Conditions.",
    homeSubtitle2: "Heal Naturally.",
    homeDesc: "Our advanced AI analyzes your symptoms against verified medical patterns to suggest potential conditions and safe, non-medical home recovery plans.",
    homeStartBtn: "Start Symptom Check",
    homeCommonBtn: "View Common Diseases",
    feature1Title: "Non-Medical Care",
    feature1Desc: "Purely natural home remedies focusing on hydration and rest.",
    feature2Title: "Yoga Focus",
    feature2Desc: "Movement as medicine. Safe asanas for quick recovery.",
    feature3Title: "Localized",
    feature3Desc: "Language support for English, Hindi, and Gujarati communities.",
    symptomPickerTitle: "What are your symptoms?",
    symptomPickerDesc: "Select all that apply to help us identify potential conditions and suggest home care.",
    symptomSelectedCount: "symptoms selected",
    categoryLabels: {
      General: "General",
      Respiratory: "Respiratory",
      Neurological: "Neurological",
      Digestive: "Digestive",
      Musculoskeletal: "Musculoskeletal"
    },
    predictTitle: "Symptom Checker",
    predictDesc: "Tell us how you feel. Use your preferred language (English, Hindi, or Gujarati).",
    inputLabel: "Describe your symptoms",
    inputPlaceholder: "Describe your symptoms (e.g., 'fever and headache for 2 days')...",
    predictButton: "Predict & Get Recovery Plan",
    popularSearches: "Try these:",
    examples: [
      { label: "Cold & Cough", text: "High fever, headache, body pain" },
      { label: "Mild Headache", text: "Mild Headache" },
      { label: "Body Pain & Fatigue", text: "Body Pain & Fatigue" }
    ],
    loadingMessages: [
      "Analyzing your symptoms...",
      "Consulting AI Engine...",
      "Developing a safe recovery plan...",
      "Ensuring safety guidelines..."
    ],
    loadingSub: "This usually takes about 5-10 seconds",
    resultPriority: "Priority",
    resultConfidence: "Confidence",
    resultSymptoms: "Symptoms",
    resultRemedies: "Natural Remedies",
    resultYoga: "Yoga & Exercise",
    resultDiet: "Veg-Friendly Diet",
    resultRecovery: "Personalized Recovery Guide",
    resultRest: "Rest",
    resultHygiene: "Hygiene",
    resultDos: "Do's",
    resultDonts: "Don'ts",
    resultReset: "Start Over",
    resultYogaPoses: "Yoga Poses",
    resultExercises: "Exercises",
    resultDisclaimer: "Medical Disclaimer",
    urgencyLabels: { Low: "Low", Moderate: "Moderate", High: "High" },
    commonTitle: "Common Diseases",
    commonDesc: "Quickly access verified home care plans for frequent health issues.",
    commonQuickView: "QUICK VIEW",
    commonStaticData: "STATIC DATA",
    exercisePageTitle: "Exercises & Yoga",
    exercisePageDesc: "Safe, gentle movements designed to support your body's natural healing process.",
    exercisePrecautionTitle: "Precautions",
    exercisePrecautions: [
      "Always perform exercises on an empty or light stomach.",
      "Stop immediately if you feel sharp pain or dizziness."
    ],
    yogaList: [
      { name: "Pranayama", desc: "Deep breathing exercises.", benefit: "Lung Capacity" },
      { name: "Savasana", desc: "Corpse pose for total body relaxation.", benefit: "Stress Relief" }
    ],
    aboutPageTitle: "About HealAI",
    aboutContent1: "HealAI uses nature's wisdom and modern AI.",
    aboutContent2: "Our project provides language-accessible health guidance.",
    aboutMissionTitle: "Our Mission",
    aboutMissionContent: "To provide safe healthcare information.",
    aboutTechTitle: "Core Values",
    aboutTechTitle2: "Core Technology",
    aboutTechList: ["Gemini 3 Pro API Integration", "Multilingual Support", "React Frontend"],
    disclaimerPageTitle: "Safety & Disclaimer",
    disclaimerWarning: "HEALAI IS NOT A MEDICAL PROVIDER.",
    disclaimerContent1: "Educational purposes only.",
    disclaimerContent2: "Always seek physician advice.",
    disclaimerContent3: "No liability assumed.",
    disclaimerEmergency: "In emergency, call local emergency services.",
    footerTagline: "Advanced AI insights for symptom identification and natural recovery.",
    footerNavHeader: "Navigation",
    footerSupportHeader: "Support",
    footerSafetyDocs: "Safety Docs",
    footerCopyright: "ALL SYSTEMS GO.",
    footerStatus: "AI Engine Connected",
    errorGeneric: "Unable to process request. Please check your connection.",
    errorAiTimeout: "The AI took too long to respond. Please try again.",
    errorCommonLoad: "Unable to load guidance for this condition."
  },
  hi: {
    brandName: "HealAI",
    navHome: "होम",
    navPredict: "भविष्यवाणी",
    navCommon: "सामान्य बीमारियां",
    navExercises: "व्यायाम और योग",
    navAbout: "बारे में",
    navDisclaimer: "अस्वीकरण",
    navLangLabel: "भाषा चुनें",
    homeWelcome: "AI स्वास्थ्य साथी",
    homeSubtitle1: "स्थितियों को पहचानें।",
    homeSubtitle2: "स्वाभाविक रूप से ठीक हों।",
    homeDesc: "हमारा उन्नत AI आपके लक्षणों का विश्लेषण करता है और घरेलू रिकवरी योजनाओं का सुझाव देता है।",
    homeStartBtn: "जांच शुरू करें",
    homeCommonBtn: "बीमारियां देखें",
    feature1Title: "प्राकृतिक देखभाल",
    feature1Desc: "शुद्ध प्राकृतिक घरेलू उपचार।",
    feature2Title: "योग",
    feature2Desc: "त्वरित वसूली के लिए सुरक्षित आसन।",
    feature3Title: "स्थानीय",
    feature3Desc: "हिंदी और अन्य भाषाओं का समर्थन।",
    symptomPickerTitle: "आपके लक्षण क्या हैं?",
    symptomPickerDesc: "संभावित स्थितियों की पहचान करने और घरेलू देखभाल का सुझाव देने में हमारी सहायता के लिए वे सभी चुनें जो लागू हों।",
    symptomSelectedCount: "लक्षण चुने गए",
    categoryLabels: {
      General: "सामान्य",
      Respiratory: "श्वसन",
      Neurological: "तंत्रिका संबंधी",
      Digestive: "पाचन",
      Musculoskeletal: "मस्कुलोस्केलेटल"
    },
    predictTitle: "लक्षण जांचकर्ता",
    predictDesc: "हमें बताएं कि आप कैसा महसूस करते हैं।",
    inputLabel: "अपने लक्षणों का वर्णन करें",
    inputPlaceholder: "जैसे, '2 दिनों से बुखार और सिरदर्द'...",
    predictButton: "रिकवरी प्लान प्राप्त करें",
    popularSearches: "इन्हें आज़माएं:",
    examples: [
      { label: "सर्दी और खांसी", text: "बुखार, सिरदर्द और शरीर में दर्द" },
      { label: "सिरदर्द", text: "हल्का सिरदर्द" },
      { label: "शरीर में दर्द", text: "शरीर में दर्द और थकान" }
    ],
    loadingMessages: ["लक्षणों का विश्लेषण कर रहा है...", "AI से संपर्क कर रहा है...", "योजना बना रहा है..."],
    loadingSub: "इसमें आमतौर पर 5-10 सेकंड लगते हैं",
    resultPriority: "प्राथमिकता",
    resultConfidence: "आत्मविश्वास",
    resultSymptoms: "लक्षण",
    resultRemedies: "प्राकृतिक उपचार",
    resultYoga: "योग और व्यायाम",
    resultDiet: "शाकाहारी आहार",
    resultRecovery: "रिकवरी गाइड",
    resultRest: "आराम",
    resultHygiene: "स्वच्छता",
    resultDos: "क्या करें",
    resultDonts: "क्या न करें",
    resultReset: "फिर से शुरू करें",
    resultYogaPoses: "योग मुद्राएं",
    resultExercises: "व्यायाम",
    resultDisclaimer: "अस्वीकरण",
    urgencyLabels: { Low: "कम", Moderate: "मध्यम", High: "उच्च" },
    commonTitle: "सामान्य बीमारियां",
    commonDesc: "घरेलू देखभाल योजनाओं तक त्वरित पहुंच।",
    commonQuickView: "त्वरित दृश्य",
    commonStaticData: "स्थिर डेटा",
    exercisePageTitle: "व्यायाम और योग",
    exercisePageDesc: "कोमल हलचलें।",
    exercisePrecautionTitle: "सावधानियां",
    exercisePrecautions: ["खाली पेट व्यायाम करें।", "दर्द होने पर तुरंत रुकें।"],
    yogaList: [{ name: "प्राणायाम", desc: "साँस लेने के व्यायाम।", benefit: "फेफड़े" }],
    aboutPageTitle: "HealAI के बारे में",
    aboutContent1: "प्रकृति और AI का संगम।",
    aboutContent2: "बुनियादी देखभाल की जानकारी।",
    aboutMissionTitle: "हमारा मिशन",
    aboutMissionContent: "सुरक्षित स्वास्थ्य जानकारी।",
    aboutTechTitle: "मूल्य",
    aboutTechTitle2: "तकनीक",
    aboutTechList: ["Gemini AI", "बहुभाषी", "React"],
    disclaimerPageTitle: "अस्वीकरण",
    disclaimerWarning: "HealAI चिकित्सा प्रदाता नहीं है।",
    disclaimerContent1: "केवल शैक्षिक उद्देश्य।",
    disclaimerContent2: "चिकित्सक से सलाह लें।",
    disclaimerContent3: "कोई दायित्व नहीं।",
    disclaimerEmergency: "आपातकाल में 102/108 डायल करें।",
    footerTagline: "प्राकृतिक वसूली के लिए AI।",
    footerNavHeader: "नेविगेशन",
    footerSupportHeader: "सहायता",
    footerSafetyDocs: "सुरक्षा दस्तावेज",
    footerCopyright: "सभी सिस्टम चालू हैं।",
    footerStatus: "AI कनेक्टेड",
    errorGeneric: "अनुरोध संसाधित करने में असमर्थ।",
    errorAiTimeout: "AI ने उत्तर देने में बहुत समय लिया।",
    errorCommonLoad: "लोड करने में असमर्थ।"
  },
  gu: {
    brandName: "HealAI",
    navHome: "હોમ",
    navPredict: "અનુમાન",
    navCommon: "સામાન્ય રોગો",
    navExercises: "વ્યાયામ અને યોગ",
    navAbout: "વિશે",
    navDisclaimer: "અસ્વીકરણ",
    navLangLabel: "ભાષા પસંદ કરો",
    homeWelcome: "AI હેલ્થ સાથી",
    homeSubtitle1: "સ્થિતિઓ ઓળખો.",
    homeSubtitle2: "કુદરતી રીતે સાજા થાઓ.",
    homeDesc: "અમારું અદ્યતન AI તમારા લક્ષણોનું વિશ્લેષણ કરે છે અને રિકવરી પ્લાન સૂચવે છે.",
    homeStartBtn: "તપાસ શરૂ કરો",
    homeCommonBtn: "સામાન્ય રોગો જુઓ",
    feature1Title: "કુદરતી સંભાળ",
    feature1Desc: "શુદ્ધ કુદરતી ઘરગથ્થુ ઉપચારો.",
    feature2Title: "યોગ",
    feature2Desc: "ઝડપી સાજા થવા માટે સુરક્ષિત આસનો.",
    feature3Title: "સ્થાનિક",
    feature3Desc: "ગુજરાતી ભાષા સપોર્ટ.",
    symptomPickerTitle: "તમારા લક્ષણો શું છે?",
    symptomPickerDesc: "સંભવિત પરિસ્થિતિઓને ઓળખવામાં અને ઘરની સંભાળ સૂચવવામાં અમારી સહાય કરવા માટે લાગુ પડતા તમામ લક્ષણો પસંદ કરો.",
    symptomSelectedCount: "લક્ષણો પસંદ કર્યા",
    categoryLabels: {
      General: "સામાન્ય",
      Respiratory: "શ્વસન",
      Neurological: "ચેતાતંત્ર",
      Digestive: "પાચન",
      Musculoskeletal: "સ્નાયુબદ્ધ"
    },
    predictTitle: "લક્ષણ તપાસનાર",
    predictDesc: "તમે કેવું અનુભવો છો તે અમને જણાવો.",
    inputLabel: "તમારા લક્ષણોનું વર્ણન કરો",
    inputPlaceholder: "દા.ત., '2 દિવસથી તાવ અને માથાનો દુખાવો'...",
    predictButton: "રિકવરી પ્લાન મેળવો",
    popularSearches: "આ અજમાવી જુઓ:",
    examples: [
      { label: "શરદી અને ખાંસી", text: "તાવ, માથાનો દુખાવો અને શરીરનો દુખાવો" },
      { label: "માથાનો દુખાવો", text: "સામાન્ય માથાનો દુખાવો" },
      { label: "શરીરનો દુખાવો", text: "શરીરનો દુખાવો અને થાક" }
    ],
    loadingMessages: ["લક્ષણોનું વિશ્લેષણ થઈ રહ્યું છે...", "AI સાથે કનેક્શન...", "પ્લાન તૈયાર થઈ રહ્યો છે..."],
    loadingSub: "આમાં સામાન્ય રીતે 5-10 સેકન્ડ લાગે છે",
    resultPriority: "તાકીદ",
    resultConfidence: "આત્મવિશ્વાસ",
    resultSymptoms: "લક્ષણો",
    resultRemedies: "કુદરતી ઉપાયો",
    resultYoga: "યોગ અને વ્યાયામ",
    resultDiet: "શાકાહારી આહાર",
    resultRecovery: "રિકવરી ગાઈડ",
    resultRest: "આરામ",
    resultHygiene: "સ્વચ્છતા",
    resultDos: "શું કરવું",
    resultDonts: "શું ના કરવું",
    resultReset: "ફરીથી શરૂ કરો",
    resultYogaPoses: "યોગ મુદ્રાઓ",
    resultExercises: "વ્યાયામ",
    resultDisclaimer: "અસ્વીકરણ",
    urgencyLabels: { Low: "ઓછી", Moderate: "મધ્યમ", High: "વધારે" },
    commonTitle: "સામાન્ય રોગો",
    commonDesc: "ઘરગથ્થુ સંભાળ યોજનાઓ સુધી ઝડપી પહોંચ.",
    commonQuickView: "ઝડપી જુઓ",
    commonStaticData: "ડેટાબેઝ",
    exercisePageTitle: "વ્યાયામ અને યોગ",
    exercisePageDesc: "સૌમ્ય હલનચલન.",
    exercisePrecautionTitle: "સાવચેતીઓ",
    exercisePrecautions: ["ખાલી પેટે કસરત કરો.", "દુખાવો થાય તો તરત જ અટકી જાવ."],
    yogaList: [{ name: "પ્રાણાયામ", desc: "ઊંડા શ્વાસ લેવાની કસરતો.", benefit: "ફેફસાં" }],
    aboutPageTitle: "HealAI વિશે",
    aboutContent1: "કુદરત અને AI નો સંગમ.",
    aboutContent2: "ભાષા-સુલભ હેલ્થ માર્ગદર્શન.",
    aboutMissionTitle: "અમારું મિશન",
    aboutMissionContent: "સુરક્ષિત માહિતી.",
    aboutTechTitle: "મૂલ્યો",
    aboutTechTitle2: "ટેકનોલોજી",
    aboutTechList: ["Gemini AI", "બહુભાષી", "React"],
    disclaimerPageTitle: "અસ્વીકરણ",
    disclaimerWarning: "HealAI તબીબી સંસ્થા નથી.",
    disclaimerContent1: "માત્ર શૈક્ષણિક હેતુ.",
    disclaimerContent2: "ડૉક્ટરની સલાહ લો.",
    disclaimerContent3: "જવાબદારી નથી.",
    disclaimerEmergency: "ઇમરજન્સીમાં 108 ડાયલ કરો.",
    footerTagline: "કુદરતી પુનઃપ્રાપ્તિ માટે AI.",
    footerNavHeader: "નેવિગેશન",
    footerSupportHeader: "સપોર્ટ",
    footerSafetyDocs: "સુરક્ષા દસ્તાવેજો",
    footerCopyright: "બધી સિસ્ટમ ચાલુ છે.",
    footerStatus: "AI કનેક્ટેડ",
    errorGeneric: "વિનંતી પર પ્રક્રિયા કરવામાં અસમર્થ.",
    errorAiTimeout: "AI એ જવાબ આપવામાં વધુ સમય લીધો.",
    errorCommonLoad: "લોડ કરવામાં અસમર્થ."
  }
};

export const SYMPTOMS: Symptom[] = [
  { id: 'fever', label: { en: 'Fever', hi: 'बुखार', gu: 'તાવ' }, category: 'General' },
  { id: 'cough', label: { en: 'Cough', hi: 'खांसी', gu: 'ખાંસી' }, category: 'Respiratory' },
  { id: 'fatigue', label: { en: 'Fatigue', hi: 'थकान', gu: 'થાક' }, category: 'General' },
  { id: 'sore_throat', label: { en: 'Sore Throat', hi: 'गले में खराश', gu: 'ગળામાં સોજો' }, category: 'Respiratory' },
  { id: 'headache', label: { en: 'Headache', hi: 'सिरदर्द', gu: 'માથાનો દુખાવો' }, category: 'Neurological' },
  { id: 'runny_nose', label: { en: 'Runny Nose', hi: 'बहती नाक', gu: 'વહેતું નાક' }, category: 'Respiratory' },
  { id: 'muscle_pain', label: { en: 'Muscle Pain', hi: 'मांसपेशियों में दर्द', gu: 'સ્નાયુનો દુખાવો' }, category: 'Musculoskeletal' },
  { id: 'nausea', label: { en: 'Nausea', hi: 'जी मिचलाना', gu: 'ઉબકા' }, category: 'Digestive' },
  { id: 'stomach_ache', label: { en: 'Stomach Ache', hi: 'पेट दर्द', gu: 'પેટનો દુખાવો' }, category: 'Digestive' },
  { id: 'dizziness', label: { en: 'Dizziness', hi: 'चक्कर आना', gu: 'ચક્કર આવવા' }, category: 'Neurological' },
  { id: 'sneezing', label: { en: 'Sneezing', hi: 'छींक आना', gu: 'છીંક આવવી' }, category: 'Respiratory' },
];

export const CATEGORIES = Array.from(new Set(SYMPTOMS.map(s => s.category)));

export const COMMON_DISEASES: CommonDisease[] = [
  {
    id: 'cold',
    name: { en: 'Common Cold', hi: 'सामान्य जुकाम', gu: 'સામાન્ય શરદી' },
    description: { en: 'Viral infection of nose and throat.', hi: 'नाक और गले का वायरल संक्रमण।', gu: 'નાક અને ગળાનો વાયરલ ચેપ.' },
    symptoms: { en: ['Runny nose', 'Sneezing', 'Congestion'], hi: ['बहती नाक', 'छींक आना', 'जकड़न'], gu: ['વહેતું નાક', 'છીંક આવવી', 'ભરાવો'] },
    fullData: {
      en: createStaticData('Common Cold', 'A viral infection of nose and throat.', ['Steam inhalation', 'Warm salt water gargle', 'Ginger tea'], ['Pranayama'], ['Light walking'], ['Warm soups', 'Ginger-honey mix'], 'en'),
      hi: createStaticData('सामान्य जुकाम', 'नाक और गले का वायरल संक्रमण।', ['भाप लेना', 'गर्म नमक के पानी के गरारे', 'अदरक की चाय'], ['प्राणायाम'], ['हल्का टहलना'], ['गर्म सूप', 'अदरक-शहद मिश्रण'], 'hi'),
      gu: createStaticData('સામાન્ય શરદી', 'નાક અને ગળાનો વાયરલ ચેપ.', ['વરાળ લેવી', 'ગરમ મીઠાના પાણીના કોગળા', 'આદુની ચા'], ['પ્રાણાયામ'], ['હળવું ચાલવું'], ['ગરમ સૂપ', 'આદુ-મધ મિશ્રણ'], 'gu')
    }
  },
  {
    id: 'fever',
    name: { en: 'Fever', hi: 'बुखार', gu: 'તાવ' },
    description: { en: 'Increase in body temperature.', hi: 'शरीर के तापमान में वृद्धि।', gu: 'શરીરના તાપમાનમાં વધારો.' },
    symptoms: { en: ['High temp', 'Chills', 'Sweating'], hi: ['उच्च तापमान', 'ठंड लगना', 'पसीना आना'], gu: ['ઉચ્ચ તાપમાન', 'ધ્રુજારી', 'પરસેવો'] },
    fullData: {
      en: createStaticData('Fever', 'Temporary increase in body temperature.', ['Stay hydrated', 'Cold compress', 'Rest'], ['Savasana'], ['Complete rest'], ['Light porridge', 'Fruit juices'], 'en'),
      hi: createStaticData('बुखार', 'शरीर के तापमान में अस्थायी वृद्धि।', ['हाइड्रेटेड रहें', 'ठंडी पट्टी', 'आराम'], ['शवासन'], ['पूर्ण आराम'], ['हल्का दलिया', 'फलों का रस'], 'hi'),
      gu: createStaticData('તાવ', 'શરીરના તાપમાનમાં અસ્થાયી વધારો.', ['હાઇડ્રેટેડ રહો', 'ઠંડા પોતા', 'આરામ'], ['શવાસન'], ['પૂર્ણ આરામ'], ['હળવી રાબ', 'ફળોના રસ'], 'gu')
    }
  },
  {
    id: 'flu',
    name: { en: 'Flu (Influenza)', hi: 'फ्लू (इन्फ्लुएंजा)', gu: 'ફ્લૂ (ઇન્ફલ્યુએન્ઝા)' },
    description: { en: 'Contagious respiratory illness caused by influenza viruses.', hi: 'इन्फ्लुएंजा वायरस के कारण होने वाली संक्रामक श्वसन बीमारी।', gu: 'ઈન્ફલ્યુએન્ઝા વાયરસને કારણે થતો ચેપી શ્વસન રોગ.' },
    symptoms: { en: ['Fever', 'Body ache', 'Fatigue'], hi: ['बुखार', 'शरीर में दर्द', 'थकान'], gu: ['તાવ', 'શરીરનો દુખાવો', 'થાક'] },
    fullData: {
      en: createStaticData('Flu', 'Contagious respiratory illness.', ['Stay warm', 'Chicken soup', 'Rest'], ['Kapalbhati'], ['Deep breathing'], ['Nutrient rich diet', 'Fluids'], 'en'),
      hi: createStaticData('फ्लू', 'संक्रामक श्वसन बीमारी।', ['गर्म रहें', 'चिकन सूप (या गर्म सूप)', 'आराम'], ['कपलाभाति'], ['गहरी सांस लेना'], ['पोषक तत्वों से भरपूर आहार', 'तरल पदार्थ'], 'hi'),
      gu: createStaticData('ફ્લૂ', 'ચેપી શ્વસન રોગ.', ['ગરમ રહો', 'ગરમ સૂપ', 'આરામ'], ['કપાલભાતિ'], ['ઊંડા શ્વાસ'], ['પોષક તત્વોથી ભરપૂર આહાર', 'પ્રવાહી'], 'gu')
    }
  },
  {
    id: 'constipation',
    name: { en: 'Constipation', hi: 'कब्ज', gu: 'કબજિયાત' },
    description: { en: 'Difficulty in emptying the bowels.', hi: 'मल त्याग में कठिनाई।', gu: 'મળ ત્યાગમાં મુશ્કેલી.' },
    symptoms: { en: ['Stomach bloating', 'Hard stools', 'Infrequent bowel movements'], hi: ['पेट फूलना', 'कड़ा मल', 'कम मल त्याग'], gu: ['પેટ ફૂલવું', 'કઠણ મળ', 'ઓછો મળ ત્યાગ'] },
    fullData: {
      en: createStaticData('Constipation', 'Difficulty in emptying the bowels.', ['High fiber diet', 'Drink water', 'Papaya'], ['Pavanamuktasana'], ['Yoga squats'], ['Fruits and vegetables', 'Whole grains'], 'en'),
      hi: createStaticData('कब्ज', 'मल त्याग में कठिनाई।', ['उच्च फाइबर आहार', 'पानी पिएं', 'पपीता'], ['पवनमुक्तासन'], ['योग स्क्वैट्स'], ['फल और सब्जियां', 'साबुत अनाज'], 'hi'),
      gu: createStaticData('કબજિયાત', 'મળ ત્યાગમાં મુશ્કેલી.', ['ઉચ્ચ ફાઈબર ખોરાક', 'પાણી પીવો', 'પપૈયું'], ['પવનમુક્તાસન'], ['યોગ સ્ક્વોટ્સ'], ['ફળો અને શાકભાજી', 'આખા અનાજ'], 'gu')
    }
  }
];
