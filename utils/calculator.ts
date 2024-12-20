import { Question, HangoverType, Scores, SurveyResult, Symptom } from '@/types/survey';
import { questions, symptoms } from '@/data/questions';

function getCharacteristics(type: HangoverType): string[] {
  const characteristics = {
    IMMEDIATE_REACTION: [
      '얼굴 홍조가 빠르게 나타남',
      '메스꺼움/구토',
      '두통',
      '심한 심장 박동 증가'
    ],
    RAPID_INTOXICATION: [
      '빠른 취기',
      '두통이 주요 증상',
      '약간의 얼굴 홍조',
      '약간의 심장 박동 증가'
    ],
    DELAYED_DETOX: [
      '피로',
      '부종',
      '지연성 숙취',
      '느린 회복'
    ]
  };
  
  return characteristics[type];
}

function getRecommendations(type: HangoverType): string[] {
  const recommendations = {
    IMMEDIATE_REACTION: [
      'NAC (N-Acetylcysteine) 600mg',
      '글루타치온 200-300mg',
      'DHM (Dihydromyricetin) 300mg',
      '비타민C 500mg',
      '비타민B6 50mg (추가 보충)'
    ],
    RAPID_INTOXICATION: [
      '비타민B6 50mg (추가 보충)',
      '마그네슘 300mg',
      'CoQ10 100mg',
      '타우린 500mg (추가 보충)'
    ],
    DELAYED_DETOX: [
      'BCAA (분지 사슬 아미노산) 5000mg',
      '오르니틴 400mg',
      '밀크시슬 추출물 150-200mg',
      'NAC 300mg',
      '글루타치온 200-300mg'
    ]
  };
  
  return recommendations[type];
}

function calculateBonusScores(
  selectedSymptoms: string[],
  answers: Record<string, number>,
  scores: Scores
): void {
  // 즉각적 반응형 보너스
  if (
    selectedSymptoms.includes('flushing') &&
    selectedSymptoms.includes('nausea')
  ) {
    scores.IMMEDIATE_REACTION += 2;
  }

  // 빠른 취기형 보너스
  if (
    selectedSymptoms.includes('headache') &&
    answers['q3'] === 1 // 몇 시간 후 시작
  ) {
    scores.RAPID_INTOXICATION += 2;
  }

  // 지연성 해독 장애형 보너스
  if (
    selectedSymptoms.includes('fatigue') &&
    selectedSymptoms.includes('swelling')
  ) {
    scores.DELAYED_DETOX += 2;
  }
}

export function calculateResult(
  selectedSymptoms: string[],
  answers: Record<string, number>
): SurveyResult {
  const scores: Scores = {
    IMMEDIATE_REACTION: 0,
    RAPID_INTOXICATION: 0,
    DELAYED_DETOX: 0
  };

  // 증상 점수 계산
  selectedSymptoms.forEach(symptomId => {
    const symptom = symptoms.find(s => s.id === symptomId);
    if (!symptom) return;
    
    symptom.scores.forEach(score => {
      scores[score.type] += score.score;
    });
  });

  // 질문 점수 계산
  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const selectedOption = question.options[optionIndex];
    selectedOption.scores.forEach(score => {
      scores[score.type] += score.score;
    });
  });

  // 보너스 점수 계산
  calculateBonusScores(selectedSymptoms, answers, scores);

  // 가장 높은 점수의 유형 찾기
  const [maxType] = Object.entries(scores).reduce((a, b) => 
    b[1] > a[1] ? b : a
  );

  // 최소 점수 기준 확인
  const minScores = {
    IMMEDIATE_REACTION: 15,
    RAPID_INTOXICATION: 12,
    DELAYED_DETOX: 15
  };

  const finalType = scores[maxType as HangoverType] >= minScores[maxType as HangoverType]
    ? maxType as HangoverType
    : 'RAPID_INTOXICATION'; // 기본값

  return {
    type: finalType,
    score: scores[finalType],
    characteristics: getCharacteristics(finalType),
    recommendations: getRecommendations(finalType)
  };
} 