import type { SignalGrade } from "@/lib/scoring/dividend-score";

export type SignalDefinition = {
  grade: SignalGrade;
  label: string;
  color: string;
  meaning: string;
};

export const signalDefinitions: SignalDefinition[] = [
  {
    grade: "High Coverage",
    label: "High Coverage",
    color: "#64f5c8",
    meaning: "Coverage metrics look comparatively strong. Still verify live data and source filings."
  },
  {
    grade: "Monitor",
    label: "Monitor",
    color: "#45b7ff",
    meaning: "Several metrics look workable, but assumptions need monitoring."
  },
  {
    grade: "Risk Flags",
    label: "Risk Flags",
    color: "#ffbf47",
    meaning: "Income may be attractive, but one or more metrics need deeper review."
  },
  {
    grade: "Needs Review",
    label: "Needs Review",
    color: "#ff5c7a",
    meaning: "Risk flags are elevated. This is not a buy/sell instruction."
  }
];

export const signalColorByGrade = Object.fromEntries(signalDefinitions.map((signal) => [signal.grade, signal.color])) as Record<SignalGrade, string>;
