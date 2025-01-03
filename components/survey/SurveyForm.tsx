'use client';

import { useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';
import { Question } from '@/types/survey';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface OptionProps {
  option: Question['options'][number];
  isSelected: boolean;
  onSelect: () => void;
}

const MemoizedOption = memo(({ option, isSelected, onSelect }: OptionProps) => {
  return (
    <div onClick={onSelect} className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected ? 'bg-primary text-white' : 'hover:bg-gray-50'
    }`}>
      {option.text}
    </div>
  );
});

MemoizedOption.displayName = 'MemoizedOption';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAllAnswered()) {
      alert('모든 질문에 답변해주세요.');
      return;
    }
    
    try {
      const encodedData = encodeURIComponent(JSON.stringify({ answers }));
      router.push(`/survey/result?data=${encodedData}`);
    } catch (error) {
      console.error('에러:', error);
      alert('결과 처리 중 오류가 발생했습니다.');
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isAllAnswered = () => {
    return questions.every(question => 
      answers[question.id] && answers[question.id].length > 0
    );
  };

  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion.id] || [];

  const renderQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return null;

    if (questionId === 'q1') {
      return (
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`${questionId}-${index}`}
                checked={answers[questionId]?.includes(index)}
                onCheckedChange={(checked) => {
                  setAnswers(prev => {
                    const currentAnswers = prev[questionId] || [];
                    if (checked) {
                      return {
                        ...prev,
                        [questionId]: [...currentAnswers, index]
                      };
                    } else {
                      return {
                        ...prev,
                        [questionId]: currentAnswers.filter(v => v !== index)
                      };
                    }
                  });
                }}
              />
              <Label
                htmlFor={`${questionId}-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </div>
      );
    }

    const currentValue = answers[questionId]?.[0]?.toString() || '';
    
    return (
      <RadioGroup
        value={currentValue}
        onValueChange={(value) => {
          setAnswers(prev => ({
            ...prev,
            [questionId]: [parseInt(value)]
          }));
        }}
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={index.toString()}
              id={`${questionId}-${index}`}
            />
            <Label htmlFor={`${questionId}-${index}`}>
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <Progress value={(currentStep + 1) / questions.length * 100} className="mb-2" />
        <div className="text-sm text-center text-gray-500">
          {currentStep + 1} / {questions.length}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-medium mb-6">
          {currentQuestion.text}
        </h3>
        <div className="space-y-4">
          {renderQuestion(currentQuestion.id)}
        </div>
      </div>

      <div className="mt-auto flex justify-between gap-4">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
            className="w-28"
          >
            이전
          </Button>
        )}
        {currentStep < questions.length - 1 && (
          <Button
            type="button"
            onClick={handleNext}
            className={`w-28 ${currentStep === 0 ? 'ml-auto' : ''}`}
          >
            다음
          </Button>
        )}
      </div>

      {isAllAnswered() && (
        <div className="mt-8 text-center">
          <Button
            type="submit"
            variant="destructive"
            className="w-full max-w-md py-6 text-lg"
          >
            결과 보기
          </Button>
        </div>
      )}
    </form>
  );
} 