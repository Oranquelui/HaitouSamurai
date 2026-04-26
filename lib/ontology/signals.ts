import type { SignalGrade } from "@/lib/scoring/dividend-score";

export type SignalDefinition = {
  grade: SignalGrade;
  label: string;
  color: string;
  meaning: string;
};

export const signalDefinitions: SignalDefinition[] = [
  {
    grade: "Strong",
    label: "Strong Signal",
    color: "#64f5c8",
    meaning: "Quality and coverage support the income story. Still verify live data."
  },
  {
    grade: "Watch",
    label: "Watch Signal",
    color: "#45b7ff",
    meaning: "Looks investable, but one or more assumptions need monitoring."
  },
  {
    grade: "Risk",
    label: "Risk Signal",
    color: "#ffbf47",
    meaning: "Income may be attractive, but fundamentals need deeper review."
  },
  {
    grade: "Avoid",
    label: "Avoid Signal",
    color: "#ff5c7a",
    meaning: "High yield may be masking weak coverage, leverage, or deteriorating earnings."
  }
];

export const signalColorByGrade = Object.fromEntries(signalDefinitions.map((signal) => [signal.grade, signal.color])) as Record<SignalGrade, string>;
