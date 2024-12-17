import { Question } from '@/types/survey';

export const questions: Question[] = [
  {
    id: 'q1',
    text: '술을 마시면 얼굴이 빨개지나요?',
    options: [
      {
        text: '매우 빨리, 심하게 빨개짐',
        scores: [
          { type: 'ALDH2_SINGLE', score: 4 },
          { type: 'ALDH2_ADH1B', score: 4 }
        ]
      },
      {
        text: '조금 빨개지는 편',
        scores: [
          { type: 'ALDH2_SINGLE', score: 2 },
          { type: 'ALDH2_ADH1B', score: 1 }
        ]
      },
      {
        text: '거의 빨개지지 않음',
        scores: [
          { type: 'ADH1B_HIGH', score: 2 }
        ]
      }
    ]
  },
  {
    id: 'q2',
    text: '구토/메스꺼움이 있나요?',
    options: [
      {
        text: '술을 조금만 마셔도 심함',
        scores: [
          { type: 'ALDH2_ADH1B', score: 4 },
          { type: 'ALDH2_SINGLE', score: 3 }
        ]
      },
      {
        text: '어느 정도 마시면 발생',
        scores: [
          { type: 'ALDH2_SINGLE', score: 2 },
          { type: 'CYP2E1_LOW', score: 1 }
        ]
      },
      {
        text: '거의 없음',
        scores: [
          { type: 'ADH1B_HIGH', score: 2 },
          { type: 'GST_NULL', score: 1 }
        ]
      }
    ]
  },
  {
    id: 'q3',
    text: '증상은 언제부터 시작되나요?',
    options: [
      {
        text: '첫 잔부터 바로',
        scores: [
          { type: 'ALDH2_SINGLE', score: 3.6 },
          { type: 'ALDH2_ADH1B', score: 3.6 }
        ]
      },
      {
        text: '술자리 중반 이후',
        scores: [
          { type: 'ADH1B_HIGH', score: 3.6 },
          { type: 'CYP2E1_LOW', score: 1.8 }
        ]
      },
      {
        text: '다음날 아침',
        scores: [
          { type: 'CYP2E1_GST', score: 3.6 },
          { type: 'GST_NULL', score: 1.8 }
        ]
      }
    ]
  },
  {
    id: 'q4',
    text: '심장 박동이 빨라지나요?',
    options: [
      {
        text: '매우 심하게',
        scores: [
          { type: 'ALDH2_SINGLE', score: 3 },
          { type: 'ALDH2_ADH1B', score: 3 }
        ]
      },
      {
        text: '약간',
        scores: [
          { type: 'ALDH2_SINGLE', score: 1.5 }
        ]
      },
      {
        text: '거의 없음',
        scores: [
          { type: 'ADH1B_HIGH', score: 1.5 },
          { type: 'CYP2E1_LOW', score: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'q5',
    text: '부종이 생기나요?',
    options: [
      {
        text: '매우 심한 부종',
        scores: [
          { type: 'GST_NULL', score: 3 },
          { type: 'CYP2E1_GST', score: 3 }
        ]
      },
      {
        text: '약간의 부종',
        scores: [
          { type: 'CYP2E1_LOW', score: 1.5 }
        ]
      },
      {
        text: '거의 없음',
        scores: []
      }
    ]
  },
  {
    id: 'q6',
    text: '숙취는 얼마나 지속되나요?',
    options: [
      {
        text: '2일 이상',
        scores: [
          { type: 'CYP2E1_GST', score: 2.6 },
          { type: 'GST_NULL', score: 2.6 }
        ]
      },
      {
        text: '1-2일',
        scores: [
          { type: 'CYP2E1_LOW', score: 1.3 }
        ]
      },
      {
        text: '하루 이내',
        scores: [
          { type: 'ADH1B_HIGH', score: 1.3 }
        ]
      }
    ]
  }
];