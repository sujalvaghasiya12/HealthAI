import { PredictionResponse, Language } from "../types";

export const getPredictionFromAI = async (
  symptoms: string,
  lang: Language
): Promise<PredictionResponse> => {
  const languageNames: Record<Language, string> = {
    en: "English",
    hi: "Hindi",
    gu: "Gujarati",
  };

  const targetLang = languageNames[lang];

  const prompt = `
You are a careful multilingual healthcare triage assistant.

User symptoms:
${symptoms}

Target language: ${targetLang}

Important rules:
- Respond completely in ${targetLang}.
- Do NOT claim final diagnosis.
- Give the most probable condition only based on symptoms.
- If symptoms are unclear, mention uncertainty.
- Do NOT prescribe medicines, tablets, injections, or dosages.
- Give only safe home care, hydration, rest, steam, hygiene, vegetarian diet advice.
- Add red-flag warning signs.
- Yoga/exercise must be gentle and condition-safe.
- Confidence must be realistic between 40 and 85 only.
- Urgency must be Low, Moderate, or High.
- Return ONLY valid JSON.

JSON format:
{
  "disease": "string",
  "confidence": number,
  "description": "string",
  "aiInsights": ["string"],
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
  "urgency": "Low",
  "disclaimer": "string"
}
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a safe healthcare triage assistant. Always answer in ${targetLang}. Never provide medicine names or dosages. Output only valid JSON.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 1800,
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || "Groq API request failed"
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from Groq API");
  }

  try {
    const parsed = JSON.parse(content) as PredictionResponse;

    if (!parsed.disease || !parsed.description || !parsed.disclaimer) {
      throw new Error("Incomplete AI response");
    }

    parsed.confidence = Math.min(Math.max(Number(parsed.confidence) || 50, 40), 85);
    parsed.aiInsights = Array.isArray(parsed.aiInsights)
      ? parsed.aiInsights
          .map((item) => String(item).trim())
          .filter(Boolean)
          .slice(0, 4)
      : [];

    if (!["Low", "Moderate", "High"].includes(parsed.urgency)) {
      parsed.urgency = "Moderate";
    }

    return parsed;
  } catch (error) {
    console.error("Invalid JSON from Groq:", content);
    throw new Error("Failed to parse Groq AI response");
  }
};
