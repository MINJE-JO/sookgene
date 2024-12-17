'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SurveyResult from '@/components/survey/SurveyResult';
import { calculateResult } from '@/utils/calculator';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const answers = searchParams.get('answers');

  useEffect(() => {
    if (!answers) {
      router.push('/survey');
    }
  }, [answers, router]);

  if (!answers) {
    return null;
  }

  const parsedAnswers = JSON.parse(decodeURIComponent(answers));
  const result = calculateResult(parsedAnswers);

  const handleReset = () => {
    router.push('/survey');
  };

  return <SurveyResult result={result} onReset={handleReset} />;
} 