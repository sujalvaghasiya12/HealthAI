import { PredictionResponse, Language } from "../types";

<<<<<<< HEAD
=======
/**
 * Service to handle disease prediction using OpenRouter API only.
 * API key is securely loaded from .env.local
 */
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
export const getPredictionFromAI = async (
  symptoms: string,
  lang: Language
): Promise<PredictionResponse> => {
<<<<<<< HEAD
  const languageNames: Record<Language, string> = {
    en: "English",
    hi: "Hindi",
    gu: "Gujarati",
=======

  const languageNames = {
    en: "English",
    hi: "Hindi",
    gu: "Gujarati"
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  };

  const targetLang = languageNames[lang];

  const prompt = `
<<<<<<< HEAD
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
=======
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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
{
  "disease": "string",
  "confidence": number,
  "description": "string",
<<<<<<< HEAD
  "aiInsights": ["string"],
=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
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
<<<<<<< HEAD
  "urgency": "Low",
=======
  "urgency": "Low" | "Moderate" | "High",
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  "disclaimer": "string"
}
`;

<<<<<<< HEAD
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
=======
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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
<<<<<<< HEAD
      errorData?.error?.message || "Groq API request failed"
=======
      errorData?.error?.message || "OpenRouter API request failed"
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
<<<<<<< HEAD
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
=======
    throw new Error("Empty response from OpenRouter AI");
  }

  try {
    return JSON.parse(content) as PredictionResponse;
  } catch (error) {
    console.error("Invalid JSON from OpenRouter:", content);
    throw new Error("Failed to parse AI response");
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  }
};
