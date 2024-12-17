import { Metadata } from 'next';
import SurveyForm from '@/components/survey/SurveyForm';

export const metadata: Metadata = {
  title: '설문조사 | 숙취 유형 분석',
  description: '간단한 설문을 통해 당신의 숙취 유형을 분석합니다.',
};

export default function SurveyPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">숙취 유형 분석 설문</h1>
        <p className="text-gray-600">
          아래 질문들에 답하고 자신의 숙취 유형을 알아보세요.
        </p>
      </div>
      <SurveyForm />
    </div>
  );
} 