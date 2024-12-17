'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';

export default function SurveyForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
    router.push(`/survey/result?answers=${encodedAnswers}`);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      {questions.map((question) => (
        <div key={question.id} className="mb-6">
          <h3 className="text-lg font-medium mb-2">{question.text}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={question.id}
                  value={index}
                  onChange={() => handleOptionSelect(question.id, index)}
                  required
                  className="form-radio"
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        결과 보기
      </button>
    </form>
  );
} 