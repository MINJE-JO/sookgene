export type HangoverType = 
  | 'IMMEDIATE_REACTION'    // 즉각적 반응형
  | 'RAPID_INTOXICATION'   // 빠른 취기형
  | 'DELAYED_DETOX';       // 지연성 해독 장애형

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    scores: {
      type: HangoverType;
      score: number;
    }[];
  }[];
  multipleChoice?: boolean;
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