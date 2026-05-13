import { Language } from "../types";

export type PoseType =
  | "seated-breath"
  | "deep-rest"
  | "active-breath"
  | "reclined-knee"
  | "child-rest"
  | "standing-align"
  | "tabletop-flow";

export interface WellnessItem {
  name: string;
  desc: string;
  benefit: string;
  duration?: string;
  bestFor?: string;
  cue?: string;
  steps?: string[];
  poseType?: PoseType;
}

const WELLNESS_CONTENT: Record<
  Language,
  { poses: WellnessItem[]; exercises: WellnessItem[] }
> = {
  en: {
    poses: [
      {
        name: "Pranayama",
        desc: "Controlled breathing practice that calms the nervous system and improves oxygen flow.",
        benefit: "Improves lung capacity",
      },
      {
        name: "Savasana",
        desc: "Full relaxation pose that eases tension and allows the body to recover.",
        benefit: "Deep relaxation",
      },
      {
        name: "Kapalbhati",
        desc: "Rhythmic breathing practice that feels energizing and helps clear chest heaviness.",
        benefit: "Boosts breathing rhythm",
      },
      {
        name: "Pavanamuktasana",
        desc: "Gentle reclined pose that supports digestion and can reduce bloating.",
        benefit: "Supports digestion",
      },
      {
        name: "Balasana",
        desc: "Restful forward-fold pose that softens the back, shoulders, and mind.",
        benefit: "Relieves body tension",
      },
      {
        name: "Tadasana",
        desc: "Grounding standing pose that improves posture and steady breathing.",
        benefit: "Builds body balance",
      },
      {
        name: "Cat-Cow Stretch",
        desc: "Slow spinal movement between arching and rounding to release stiffness.",
        benefit: "Loosens the spine",
      },
    ],
    exercises: [
      {
        name: "Light Walking",
        desc: "Short, easy-paced walking to keep circulation active without strain.",
        benefit: "Builds gentle stamina",
      },
      {
        name: "Deep Breathing",
        desc: "Slow inhale and exhale cycles to settle the nervous system.",
        benefit: "Reduces stress",
      },
      {
        name: "Neck Rolls",
        desc: "Soft neck mobility work to release tightness from stress or fatigue.",
        benefit: "Releases stiffness",
      },
      {
        name: "Yoga Squats",
        desc: "Controlled squats done slowly to activate the lower body and core.",
        benefit: "Supports mobility",
      },
    ],
  },
  hi: {
    poses: [
      {
        name: "Pranayama",
        desc: "Controlled breathing practice that calms the body and supports better oxygen flow.",
        benefit: "Supports breathing",
      },
      {
        name: "Savasana",
        desc: "Relaxation pose that helps the whole body slow down and recover.",
        benefit: "Deep relaxation",
      },
      {
        name: "Kapalbhati",
        desc: "Active breathing pattern that can feel energizing when done gently.",
        benefit: "Breath rhythm support",
      },
      {
        name: "Pavanamuktasana",
        desc: "Gentle reclined pose often used for digestion support and bloating relief.",
        benefit: "Digestive comfort",
      },
      {
        name: "Balasana",
        desc: "Calming folded pose that relaxes the back, shoulders, and mind.",
        benefit: "Tension relief",
      },
      {
        name: "Tadasana",
        desc: "Simple standing pose that improves posture and body awareness.",
        benefit: "Posture support",
      },
      {
        name: "Cat-Cow Stretch",
        desc: "Slow spinal movement that helps loosen stiffness in the back.",
        benefit: "Spine mobility",
      },
    ],
    exercises: [
      {
        name: "Light Walking",
        desc: "Easy walking for a few minutes to keep the body active without overexertion.",
        benefit: "Gentle stamina",
      },
      {
        name: "Deep Breathing",
        desc: "Slow breathing cycles that help calm the body and mind.",
        benefit: "Stress relief",
      },
      {
        name: "Neck Rolls",
        desc: "Gentle neck movement to reduce tightness and stiffness.",
        benefit: "Neck relief",
      },
      {
        name: "Yoga Squats",
        desc: "Slow controlled squats that support hip and leg mobility.",
        benefit: "Mobility support",
      },
    ],
  },
  gu: {
    poses: [
      {
        name: "Pranayama",
        desc: "Controlled breathing practice that helps calm the body and improve oxygen flow.",
        benefit: "Breathing support",
      },
      {
        name: "Savasana",
        desc: "Relaxing pose that helps the body rest deeply and recover.",
        benefit: "Deep relaxation",
      },
      {
        name: "Kapalbhati",
        desc: "Active breathing pattern that can feel energizing when done softly.",
        benefit: "Breath rhythm support",
      },
      {
        name: "Pavanamuktasana",
        desc: "Gentle reclined pose that may support digestion and ease bloating.",
        benefit: "Digestive comfort",
      },
      {
        name: "Balasana",
        desc: "Restful folded pose that relaxes the back, shoulders, and mind.",
        benefit: "Tension relief",
      },
      {
        name: "Tadasana",
        desc: "Simple standing pose that supports posture and steady balance.",
        benefit: "Posture support",
      },
      {
        name: "Cat-Cow Stretch",
        desc: "Slow spinal movement that helps the back feel more open and free.",
        benefit: "Spine mobility",
      },
    ],
    exercises: [
      {
        name: "Light Walking",
        desc: "Easy walking for a short time to keep circulation active without strain.",
        benefit: "Gentle stamina",
      },
      {
        name: "Deep Breathing",
        desc: "Slow inhale and exhale cycles that help calm the body and mind.",
        benefit: "Stress relief",
      },
      {
        name: "Neck Rolls",
        desc: "Gentle neck movement to ease tightness and stiffness.",
        benefit: "Neck relief",
      },
      {
        name: "Yoga Squats",
        desc: "Slow controlled squats that support hip and leg mobility.",
        benefit: "Mobility support",
      },
    ],
  },
};

const WELLNESS_META = {
  poses: [
    {
      duration: "5-10 minutes",
      bestFor: "Stress relief, breath control, low energy",
      cue: "Sit tall, relax the jaw, and keep the breath smooth through the nose.",
      poseType: "seated-breath" as PoseType,
      steps: [
        "Sit comfortably with a straight spine.",
        "Rest the hands on the knees and relax the shoulders.",
        "Inhale and exhale slowly through the nose for several rounds.",
      ],
    },
    {
      duration: "5-12 minutes",
      bestFor: "Fatigue, tension, recovery days",
      cue: "Let the shoulders, belly, and legs go soft while the breath settles naturally.",
      poseType: "deep-rest" as PoseType,
      steps: [
        "Lie flat on the back with legs relaxed apart.",
        "Keep the arms slightly away from the body with palms open.",
        "Close the eyes and stay still while breathing gently.",
      ],
    },
    {
      duration: "1-3 minutes",
      bestFor: "Morning activation, chest openness",
      cue: "Use short active exhales and stop right away if you feel dizzy or strained.",
      poseType: "active-breath" as PoseType,
      steps: [
        "Sit upright and take one calm breath in.",
        "Exhale sharply through the nose while drawing the belly inward.",
        "Repeat at an easy pace and pause if the breath feels forced.",
      ],
    },
    {
      duration: "30-60 seconds each side",
      bestFor: "Bloating, light back tension, digestion",
      cue: "Draw one knee in at a time and keep the lower back comfortable throughout.",
      poseType: "reclined-knee" as PoseType,
      steps: [
        "Lie on the back and bend one knee toward the chest.",
        "Hold the shin gently while the other leg stays relaxed.",
        "Breathe steadily, then switch sides or hug both knees lightly.",
      ],
    },
    {
      duration: "1-3 minutes",
      bestFor: "Mental calm, shoulder release, gentle recovery",
      cue: "Let the hips sink back only as far as comfortable and soften the neck.",
      poseType: "child-rest" as PoseType,
      steps: [
        "Kneel down and bring the big toes close together.",
        "Sit the hips back and fold the chest forward.",
        "Rest the forehead down and stretch the arms forward or back.",
      ],
    },
    {
      duration: "45-90 seconds",
      bestFor: "Posture awareness, balance, grounding",
      cue: "Press evenly through both feet and lengthen upward without locking the knees.",
      poseType: "standing-align" as PoseType,
      steps: [
        "Stand tall with feet hip-width apart.",
        "Lift the chest gently and keep the shoulders relaxed.",
        "Breathe steadily while reaching the crown of the head upward.",
      ],
    },
    {
      duration: "6-10 slow rounds",
      bestFor: "Back stiffness, mobility, posture reset",
      cue: "Move slowly with the breath and keep the neck long instead of forcing range.",
      poseType: "tabletop-flow" as PoseType,
      steps: [
        "Come onto hands and knees with wrists under shoulders.",
        "Inhale to lift the chest and tailbone into Cow pose.",
        "Exhale to round the spine gently into Cat pose and repeat slowly.",
      ],
    },
  ],
  exercises: [
    {
      duration: "10-20 minutes",
      bestFor: "Low stamina, circulation, gentle recovery",
      cue: "Keep a relaxed pace and stop before your breathing feels heavy.",
    },
    {
      duration: "3-5 minutes",
      bestFor: "Anxiety, chest tightness, mental calm",
      cue: "Breathe in slowly for four counts and let the exhale stay slightly longer.",
    },
    {
      duration: "30-45 seconds each side",
      bestFor: "Desk tension, stress stiffness",
      cue: "Make small circles and keep the shoulders loose instead of lifting them.",
    },
    {
      duration: "8-12 reps",
      bestFor: "Hip mobility, leg activation, digestion",
      cue: "Lower with control, keep the heels grounded, and rise without rushing.",
    },
  ],
} satisfies Record<
  "poses" | "exercises",
  Array<
    Required<Pick<WellnessItem, "duration" | "bestFor" | "cue">> &
      Partial<Pick<WellnessItem, "steps" | "poseType">>
  >
>;

const enrichWellnessItems = (
  items: WellnessItem[],
  meta: Array<
    Required<Pick<WellnessItem, "duration" | "bestFor" | "cue">> &
      Partial<Pick<WellnessItem, "steps" | "poseType">>
  >
) =>
  items.map((item, index) => ({
    ...meta[index],
    ...item,
  }));

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\u0a80-\u0aff]+/g, "");

export const getWellnessContent = (lang: Language) => {
  const content = WELLNESS_CONTENT[lang];

  return {
    poses: enrichWellnessItems(content.poses, WELLNESS_META.poses),
    exercises: enrichWellnessItems(content.exercises, WELLNESS_META.exercises),
  };
};

export const findWellnessItem = (
  lang: Language,
  list: "poses" | "exercises",
  value: string
) => {
  const normalizedValue = normalize(value);
  const items = getWellnessContent(lang)[list];

  return items.find((item) => {
    const itemName = normalize(item.name);

    return (
      normalizedValue === itemName ||
      normalizedValue.includes(itemName) ||
      itemName.includes(normalizedValue)
    );
  });
};
