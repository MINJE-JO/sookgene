'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SurveyResult from '@/components/survey/SurveyResult';
import { calculateResult } from '@/utils/calculator';

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = searchParams.get('data');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 진입시 잠시 로딩 표시
    const timer = setTimeout(() => setIsLoading(false), 1000);

    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, '', window.location.href);
    };

    if (!data) {
      router.push('/survey');
    }

    return () => {
      window.onpopstate = null;
      clearTimeout(timer);
    };
  }, [data, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { answers } = JSON.parse(decodeURIComponent(data));
  const result = calculateResult(answers);

  const handleReset = () => {
    router.push('/survey');
  };

  return <SurveyResult result={result} onReset={handleReset} />;
} 