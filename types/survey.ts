const HANGOVER_TYPES = ['IMMEDIATE_REACTION', 'RAPID_INTOXICATION', 'DELAYED_DETOX'] as const;
export type HangoverType = typeof HANGOVER_TYPES[number];

export interface Question {
  id: string;
  text: string;
  multipleChoice?: boolean;
  options: {
    text: string;
    scores: {
      type: HangoverType;
      score: number;
    }[];
  }[];
}

export interface SurveyResult {
  type: HangoverType;
  score: number;
  characteristics: string[];
  recommendations: string[];
}

export type Scores = Record<HangoverType, number>;

// Q1에서 사용할 증상 선택을 위한 인터페이스
export interface Symptom {
  id: string;
  text: string;
  scores: {
    type: HangoverType;
    score: number;
  }[];
}

export const MIN_SCORES: Record<HangoverType, number> = {
  IMMEDIATE_REACTION: 15,
  RAPID_INTOXICATION: 12,
  DELAYED_DETOX: 15
} as const;