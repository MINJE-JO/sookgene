'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SurveyResult from '@/components/survey/SurveyResult';
import { calculateResult } from '@/utils/calculator';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = searchParams.get('data');

  useEffect(() => {
    if (!data) {
      router.push('/survey');
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  const { answers } = JSON.parse(decodeURIComponent(data));
  const result = calculateResult(answers);

  const handleReset = () => {
    router.push('/survey');
  };

  return <SurveyResult result={result} onReset={handleReset} />;
} 