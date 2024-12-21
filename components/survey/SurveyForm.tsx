'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
    const currentQuestionId = questions[currentStep].id;
    if (!answers[currentQuestionId] || answers[currentQuestionId].length === 0) {
      alert('질문에 답해주세요.');
      return;
    }
    
    if (currentStep < questions.length - 1) {
      const nextQuestionId = questions[currentStep + 1].id;
      setAnswers(prev => {
        const { [nextQuestionId]: _, ...rest } = prev;
        return rest;
      });
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <Progress value={(currentStep + 1) / TOTAL_QUESTIONS * 100} className="mb-2" />
        <div className="text-sm text-center text-gray-500">
          {currentStep + 1} / {TOTAL_QUESTIONS}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          {currentQuestion.text}
        </h3>
        <div className="space-y-2">
          {renderQuestion(currentQuestion.id)}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
          >
            이전
          </Button>
        )}
        {currentStep < TOTAL_QUESTIONS - 1 && (
          <Button
            type="button"
            onClick={handleNext}
            className="ml-auto"
          >
            다음
          </Button>
        )}
        {currentStep === TOTAL_QUESTIONS - 1 && (
          <Button
            type="submit"
            variant="destructive"
            className="ml-auto"
          >
            제출하기
          </Button>
        )}
      </div>
    </form>
  );
} 