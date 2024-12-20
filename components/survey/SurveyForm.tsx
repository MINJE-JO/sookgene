'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, symptoms } from '@/data/questions';

export default function SurveyForm() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedData = encodeURIComponent(JSON.stringify({
      symptoms: selectedSymptoms,
      answers
    }));
    router.push(`/survey/result?data=${encodedData}`);
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedSymptoms.length === 0) {
      alert('하나 이상의 증상을 선택해주세요.');
      return;
    }
    
    if (currentStep > 0 && answers[questions[currentStep - 1].id] === undefined) {
      alert('답변을 선택해주세요.');
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const totalSteps = questions.length + 1; // 증상 선택 + 질문들

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <div className="text-sm text-gray-500">
          {currentStep + 1} / {totalSteps}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {currentStep === 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-4">
            술을 마신 후 주로 어떤 증상이 나타나나요? (복수 선택 가능)
          </h3>
          <div className="space-y-2">
            {symptoms.map((symptom) => (
              <label key={symptom.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom.id)}
                  onChange={() => handleSymptomToggle(symptom.id)}
                  className="form-checkbox"
                />
                <span>{symptom.text}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-4">
            {questions[currentStep - 1].text}
          </h3>
          <div className="space-y-2">
            {questions[currentStep - 1].options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={questions[currentStep - 1].id}
                  value={index}
                  checked={answers[questions[currentStep - 1].id] === index}
                  onChange={() => handleOptionSelect(questions[currentStep - 1].id, index)}
                  className="form-radio"
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            이전
          </button>
        )}
        {currentStep < questions.length ? (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            다음
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            결과 보기
          </button>
        )}
      </div>
    </form>
  );
} 