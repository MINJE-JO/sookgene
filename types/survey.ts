export type HangoverType = 
  | 'ALDH2_SINGLE'
  | 'ALDH2_ADH1B'
  | 'ADH1B_HIGH'
  | 'CYP2E1_LOW'
  | 'GST_NULL'
  | 'CYP2E1_GST';

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
}

export interface SurveyResult {
  type: HangoverType;
  score: number;
  characteristics: string[];
  recommendations: string[];
}

export type Scores = Record<HangoverType, number>;