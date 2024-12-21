'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';

export default function SurveyForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => {
      const currentQuestion = questions.find(q => q.id === questionId)!;
      
      if (currentQuestion.multipleChoice) {
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(optionIndex)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(idx => idx !== optionIndex)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionIndex]
          };
        }
      } else {
        return {
          ...prev,
          [questionId]: [optionIndex]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAllAnswered = questions.every(question => 
      answers[question.id] && answers[question.id].length > 0
    );
    
    if (!isAllAnswered) {
      alert('모든 질문에 답변해 주세요.');
      return;
    }

    const encodedData = encodeURIComponent(JSON.stringify({ answers }));
    router.push(`/survey/result?data=${encodedData}`);
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion.id] || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-center items-center gap-3 mb-2">
          {[...Array(TOTAL_QUESTIONS)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-blue-500'
                  : index < currentStep
                  ? 'bg-blue-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-center text-gray-500">
          {currentStep + 1} / {TOTAL_QUESTIONS}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          {currentQuestion.text}
        </h3>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type={currentQuestion.multipleChoice ? "checkbox" : "radio"}
                name={currentQuestion.id}
                value={index}
                checked={currentAnswers.includes(index)}
                onChange={() => handleOptionSelect(currentQuestion.id, index)}
                className={currentQuestion.multipleChoice ? "form-checkbox" : "form-radio"}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      </div>

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
        {currentStep < TOTAL_QUESTIONS - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            다음
          </button>
        )}
        {currentStep === TOTAL_QUESTIONS - 1 && (
          <button
            type="submit"
            className="ml-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            제출하기
          </button>
        )}
      </div>
    </form>
  );
} 