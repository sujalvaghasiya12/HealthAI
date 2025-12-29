import { PredictionResponse, Language } from "../types";

/**
 * Service to handle disease prediction using OpenRouter API only.
 * API key is securely loaded from .env.local
 */
export const getPredictionFromAI = async (
  symptoms: string,
  lang: Language
): Promise<PredictionResponse> => {

  const languageNames = {
    en: "English",
    hi: "Hindi",
    gu: "Gujarati"
  };

  const targetLang = languageNames[lang];

  const prompt = `
Act as a highly accurate multilingual healthcare diagnostic assistant.

Analyze the following symptoms provided in ${targetLang} and provide a probable disease prediction and a safe home recovery plan.

Symptoms: ${symptoms}
Target Language: ${targetLang}

CRITICAL SAFETY RULES:
1. Respond ENTIRELY in ${targetLang}.
2. Only provide safe, non-medical home remedies (herbs, hydration, rest, steam).
3. DO NOT provide medical prescriptions or drug dosages.
4. Include specific Yoga poses and light exercises suitable for this condition.
5. Include a clear medical disclaimer in ${targetLang}.
6. Provide a structured recovery plan including diet (vegetarian friendly), rest, and hygiene.
7. Assign an urgency level: "Low", "Moderate", or "High".

Return ONLY valid JSON in this exact structure:
{
  "disease": "string",
  "confidence": number,
  "description": "string",
  "homeRemedies": ["string"],
  "yogaAndExercise": {
    "yogaPoses": ["string"],
    "exercises": ["string"],
    "precautions": ["string"]
  },
  "recoveryPlan": {
    "diet": ["string"],
    "rest": "string",
    "hygiene": ["string"],
    "dos": ["string"],
    "donts": ["string"]
  },
  "urgency": "Low" | "Moderate" | "High",
  "disclaimer": "string"
}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "HealAI Healthcare Assistant"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: `You are a healthcare assistant. Respond only in ${targetLang}. Never provide medicines or dosages.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || "OpenRouter API request failed"
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from OpenRouter AI");
  }

  try {
    return JSON.parse(content) as PredictionResponse;
  } catch (error) {
    console.error("Invalid JSON from OpenRouter:", content);
    throw new Error("Failed to parse AI response");
  }
};
