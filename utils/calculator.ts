import { Question, HangoverType, Scores, SurveyResult } from '@/types/survey';
import { questions } from '@/data/questions';

function getCharacteristics(type: HangoverType): string[] {
  const characteristics = {
    ALDH2_SINGLE: ['얼굴 홍조가 빠르게 나타남', '심장 박동이 빨라짐', '즉각적인 반응'],
    ALDH2_ADH1B: ['복합적인 증상', '홍조와 구토 동반', '심한 두통'],
    ADH1B_HIGH: ['빠른 취기', '두통이 주요 증상', '홍조가 적음'],
    CYP2E1_LOW: ['피로감이 주요 증상', '지연성 숙취', '간 기능 저하'],
    GST_NULL: ['부종이 주요 증상', '간 관련 증상', '해독 능력 저하'],
    CYP2E1_GST: ['복합적 해독 장애', '장기 지속형 숙취', '심한 피로와 부종']
  };
  
  return characteristics[type];
}

function getRecommendations(type: HangoverType): string[] {
  const recommendations = {
    ALDH2_SINGLE: ['NAC 600mg', '글루타치온 200mg', 'DHM 300mg', '비타민C 500mg'],
    ALDH2_ADH1B: ['NAC 600mg', '글루타치온 300mg', '비타민B6 50mg', '마그네슘 300mg'],
    ADH1B_HIGH: ['비타민B6 50mg', '마그네슘 300mg', 'CoQ10 100mg', '타우린 500mg'],
    CYP2E1_LOW: ['BCAA 5000mg', '타우린 1000mg', '종합 비타민B군', '코엔자임Q10 100mg'],
    GST_NULL: ['오르니틴 400mg', 'NAC 300mg', '칼륨 200mg', '마그네슘 150mg'],
    CYP2E1_GST: ['BCAA 5000mg', '오르니틴 400mg', 'NAC 300mg', '타우린 1000mg']
  };
  
  return recommendations[type];
}

function calculateBonusScores(answers: Record<string, number>, scores: Scores): void {
  // 보너스 점수 로직 구현
  // 예: ALDH2 관련 보너스 - 얼굴홍조 + 빠른 심장박동
  if (answers['q1'] === 0 && answers['q4'] === 0) {
    scores.ALDH2_SINGLE += 2;
    scores.ALDH2_ADH1B += 2;
  }
}

export function calculateResult(answers: Record<string, number>): SurveyResult {
  const scores: Scores = {
    ALDH2_SINGLE: 0,
    ALDH2_ADH1B: 0,
    ADH1B_HIGH: 0,
    CYP2E1_LOW: 0,
    GST_NULL: 0,
    CYP2E1_GST: 0
  };

  // 각 답변에 대한 점수 계산
  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const selectedOption = question.options[optionIndex];
    selectedOption.scores.forEach(score => {
      scores[score.type as HangoverType] += score.score;
    });
  });

  // 보너스 점수 계산
  calculateBonusScores(answers, scores);

  // 가장 높은 점수의 유형 찾기
  const [maxType] = Object.entries(scores).reduce((a, b) => 
    b[1] > a[1] ? b : a
  );

  return {
    type: maxType as HangoverType,
    score: scores[maxType as HangoverType],
    characteristics: getCharacteristics(maxType as HangoverType),
    recommendations: getRecommendations(maxType as HangoverType)
  };
} 