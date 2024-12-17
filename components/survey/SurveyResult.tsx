'use client';

import type { SurveyResult } from '@/types/survey';
import Link from 'next/link';

interface SurveyResultProps {
  result: SurveyResult;
  onReset: () => void;
}

export default function SurveyResult({ result, onReset }: SurveyResultProps) {
  const typeNames = {
    ALDH2_SINGLE: 'ALDH2 단독 변이형',
    ALDH2_ADH1B: 'ALDH2 + ADH1B 복합 변이형',
    ADH1B_HIGH: 'ADH1B 고활성형',
    CYP2E1_LOW: 'CYP2E1 저활성형',
    GST_NULL: 'GST 결손형',
    CYP2E1_GST: 'CYP2E1 + GST 복합 변이형'
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        당신의 숙취 유형은 {typeNames[result.type]}입니다.
      </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">주요 특징</h3>
        <ul className="list-disc pl-5 space-y-1">
          {result.characteristics.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">추천 성분</h3>
        <ul className="list-disc pl-5 space-y-1">
          {result.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <button
          onClick={onReset}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          다시 검사하기
        </button>
        <Link
          href="/"
          className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 