'use client';

import type { SurveyResult } from '@/types/survey';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SurveyResultProps {
  result: SurveyResult;
  onReset: () => void;
}

export default function SurveyResult({ result, onReset }: SurveyResultProps) {
  const typeNames = {
    IMMEDIATE_REACTION: '즉각적 반응형',
    RAPID_INTOXICATION: '빠른 취기형',
    DELAYED_DETOX: '지연성 해독 장애형'
  };

  const baseComponents = [
    '비타민 B군 복합체',
    '전해질 보충제',
    '기본 항산화제',
    '타우린 500mg'
  ];

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
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-secondary/20 p-6 rounded-lg h-full">
          <h3 className="text-xl font-semibold mb-4 text-primary">기본 성분</h3>
          <ul className="space-y-2">
            {baseComponents.map((component, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-destructive rounded-full mr-2" />
                {component}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/5 p-6 rounded-lg h-full">
          <h3 className="text-xl font-semibold mb-4 text-primary">맞춤 추천 성분</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-destructive rounded-full mr-2" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
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