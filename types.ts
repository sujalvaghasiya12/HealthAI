
export type Language = 'en' | 'hi' | 'gu';

export interface Symptom {
  id: string;
  label: Record<Language, string>;
  category: string;
}

export interface RecoveryPlan {
  diet: string[];
  rest: string;
  hygiene: string[];
  dos: string[];
  donts: string[];
}

export interface PredictionResponse {
  disease: string;
  confidence: number;
  description: string;
  symptoms?: string[];
<<<<<<< HEAD
  aiInsights?: string[];
=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  homeRemedies: string[];
  yogaAndExercise: {
    yogaPoses: string[];
    exercises: string[];
    precautions: string[];
  };
  recoveryPlan: RecoveryPlan;
  urgency: 'Low' | 'Moderate' | 'High';
  disclaimer: string;
}

export enum AppStep {
  HOME,
  SYMPTOMS_SELECTION,
  COMMON_DISEASES,
  EXERCISES,
  ABOUT,
  DISCLAIMER,
  PREDICTING,
  RESULTS
}

export interface UIStrings {
  // Brand & Nav
  brandName: string;
  navHome: string;
  navPredict: string;
  navCommon: string;
  navExercises: string;
  navAbout: string;
  navDisclaimer: string;
  navLangLabel: string;

  // Home Page
  homeWelcome: string;
  homeSubtitle1: string;
  homeSubtitle2: string;
  homeDesc: string;
  homeStartBtn: string;
  homeCommonBtn: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;

  // Symptom Selection
  symptomPickerTitle: string;
  symptomPickerDesc: string;
  symptomSelectedCount: string;
  categoryLabels: Record<string, string>;

  // Predict Page
  predictTitle: string;
  predictDesc: string;
  inputLabel: string;
  inputPlaceholder: string;
  predictButton: string;
  popularSearches: string;
  examples: { label: string; text: string }[];

  // Loading State
  loadingMessages: string[];
  loadingSub: string;

  // Result View
  resultPriority: string;
  resultConfidence: string;
  resultSymptoms: string;
  resultRemedies: string;
  resultYoga: string;
  resultDiet: string;
  resultRecovery: string;
  resultRest: string;
  resultHygiene: string;
  resultDos: string;
  resultDonts: string;
  resultReset: string;
  resultYogaPoses: string;
  resultExercises: string;
  resultDisclaimer: string;
  urgencyLabels: Record<string, string>;

  // Common Diseases
  commonTitle: string;
  commonDesc: string;
  commonQuickView: string;
  commonStaticData: string;

  // Exercises & Yoga Page
  exercisePageTitle: string;
  exercisePageDesc: string;
  exercisePrecautionTitle: string;
  exercisePrecautions: string[];
  yogaList: { name: string; desc: string; benefit: string }[];

  // About Page
  aboutPageTitle: string;
  aboutContent1: string;
  aboutContent2: string;
  aboutMissionTitle: string;
  aboutMissionContent: string;
  aboutTechTitle: string;
  aboutTechTitle2: string;
  aboutTechList: string[];

  // Disclaimer Page
  disclaimerPageTitle: string;
  disclaimerWarning: string;
  disclaimerContent1: string;
  disclaimerContent2: string;
  disclaimerContent3: string;
  disclaimerEmergency: string;

  // Footer
  footerTagline: string;
  footerNavHeader: string;
  footerSupportHeader: string;
  footerSafetyDocs: string;
  footerCopyright: string;
  footerStatus: string;

  // Errors
  errorGeneric: string;
  errorCommonLoad: string;
  errorAiTimeout: string;
}

export interface CommonDisease {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  symptoms: Record<Language, string[]>;
  fullData: Record<Language, PredictionResponse>;
}
