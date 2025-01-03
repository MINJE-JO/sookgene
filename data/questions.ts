import { Question } from '@/types/survey';

export const TOTAL_QUESTIONS = 5;

export const questions: Question[] = [
  {
    id: 'q1',
    text: '음주 후 다음 중 어떤 증상이 나타나나요?',
    multipleChoice: true,
    options: [
      {
        text: '얼굴이 빨개진다',
        scores: [
          { type: 'IMMEDIATE_REACTION', score: 3 },
          { type: 'RAPID_INTOXICATION', score: 1 }
        ]
      },
      {
        text: '두통이 있다',
        scores: [
          { type: 'IMMEDIATE_REACTION', score: 2 },
          { type: 'RAPID_INTOXICATION', score: 2 },
          { type: 'DELAYED_DETOX', score: 1 }
        ]
      },
      {
        text: '피로감을 느낀다',
        scores: [
          { type: 'DELAYED_DETOX', score: 3 }
        ]
      },
      {
        text: '메스꺼움이나 구토가 있다',
        scores: [
          { type: 'IMMEDIATE_REACTION', score: 3 }
        ]
      },
      {
        text: '부종이 생긴다',
        scores: [
          { type: 'DELAYED_DETOX', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'q2',
    text: '숙취 증상이 얼마나 오래 지속되나요?',
    options: [
      {
        text: '하루 이내',
        scores: [
          { type: 'RAPID_INTOXICATION', score: 2 }
        ]
      },
      {
        text: '1-2일',
        scores: [
          { type: 'DELAYED_DETOX', score: 3 }
        ]
      },
      {
        text: '2일 이상',
        scores: [
          { type: 'DELAYED_DETOX', score: 4 }
        ]
      }
    ]
  },
  {
    id: 'q3',
    text: '술을 마신 후 증상이 언제 시작되나요?',
    options: [
      {
        text: '술을 마신 직후',
        scores: [
          { type: 'IMMEDIATE_REACTION', score: 3 }
        ]
      },
      {
        text: '몇 시간 후',
        scores: [
          { type: 'RAPID_INTOXICATION', score: 2 }
        ]
      },
      {
        text: '다음날 아침',
        scores: [
          { type: 'DELAYED_DETOX', score: 3 }
        ]
      }
    ]
  },
  {
    id: 'q4',
    text: '술을 마신 후 심장 박동이 빨라지나요?',
    options: [
      {
        text: '매우 심하게',
        scores: [
          { type: 'IMMEDIATE_REACTION', score: 3 }
        ]
      },
      {
        text: '약간',
        scores: [
          { type: 'RAPID_INTOXICATION', score: 1.5 }
        ]
      },
      {
        text: '거의 없음',
        scores: [
          { type: 'DELAYED_DETOX', score: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'q5',
    text: '숙취를 회복하는 데 얼마나 시간이 걸리나요?',
    options: [
      {
        text: '빠르게 회복 (하루 이내)',
        scores: [
          { type: 'RAPID_INTOXICATION', score: 2 }
        ]
      },
      {
        text: '보통 (1-2일)',
        scores: [
          { type: 'DELAYED_DETOX', score: 3 }
        ]
      },
      {
        text: '느리게 회복 (2일 이상)',
        scores: [
          { type: 'DELAYED_DETOX', score: 4 }
        ]
      }
    ]
  }
];