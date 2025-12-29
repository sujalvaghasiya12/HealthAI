
import { PredictionResponse, Language } from "../types";
import { getPredictionFromAI } from "./aiService";

/**
 * Service wrapper that utilizes OpenRouter for consistency across the application.
 */
export const predictDisease = async (symptoms: string, lang: Language): Promise<PredictionResponse> => {
  // Directly utilize the AI service which is already configured for OpenRouter and process.env.API_KEY
  return getPredictionFromAI(symptoms, lang);
};
