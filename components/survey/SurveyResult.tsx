'use client';

import type { SurveyResult } from '@/types/survey';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import KakaoButtons from '@/components/KakaoButtons';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SurveyResultProps {
  result: SurveyResult;
  onReset: () => void;
}

export default function SurveyResult({ result, onReset }: SurveyResultProps) {
  const typeNames = {
    IMMEDIATE_REACTION: '불타는 홍조형',
    RAPID_INTOXICATION: '초고속 취기형',
    DELAYED_DETOX: '다음날 숙취형'
  };

  const recommendations = {
    IMMEDIATE_REACTION: [
      'NAC (N-Acetylcysteine) 600mg',
      '글루타치온 200-300mg',
      'DHM (Dihydromyricetin) 300mg',
      '비타민C 500mg',
      '비타민B6 50mg'
    ],
    RAPID_INTOXICATION: [
      '비타민B6 50mg',
      '마그네슘 300mg',
      'CoQ10 100mg',
      '타우린 500mg'
    ],
    DELAYED_DETOX: [
      'BCAA (분지 사슬 아미노산) 5000mg',
      '오르니틴 400mg',
      '밀크시슬 추출물 150-200mg',
      'NAC 300mg',
      '글루타치온 200-300mg'
    ]
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        당신의 숙취 유형은 {typeNames[result.type]}입니다.
      </h2>

      <div className="mb-8 bg-primary/5 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-primary">유형 특징</h3>
        <ul className="space-y-2">
          {result.characteristics.map((characteristic, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-destructive rounded-full mr-2" />
              {characteristic}
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="mb-8 bg-primary/5 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-primary">추천 성분</h3>
        <ul className="space-y-2">
          {recommendations[result.type].map((recommendation, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-destructive rounded-full mr-2" />
              {recommendation}
            </li>
          ))}
        </ul>
      </div> */}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">새로운 제품 추천을 받고 싶으신가요?</CardTitle>
          <CardDescription>
            카카오톡 채널 추가하고 맞춤형 숙취해소제 정보를 받아보세요!
            <br />
            신제품 출시 소식과 특별 할인 혜택도 받아보실 수 있습니다.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <KakaoButtons />
        <Button
          onClick={onReset}
          variant="destructive"
          className="w-full"
        >
          다시 검사하기
        </Button>
        <Link href="/" className="block w-full">
          <Button
            variant="secondary"
            className="w-full"
          >
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
} 