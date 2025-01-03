'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { saveUserInfo } from '@/lib/api';
import { InfoFormData } from '@/types/info';

const questions = [
  {
    id: 'age',
    question: '연령대를 선택해주세요',
    options: ['20대', '30대', '40대', '50대 이상']
  },
  {
    id: 'severity',
    question: '평소 숙취가 얼마나 심각한가요?',
    options: ['매우 심각', '심각한 편', '보통', '약한 편', '전혀 없음']
  },
  {
    id: 'prevention',
    question: '숙취 예방을 위해 어떤 행동을 하시나요?',
    options: ['숙취해소제 복용', '물 많이 마시기', '안주 많이 먹기', '특별한 행동 없음']
  },
  {
    id: 'criteria',
    question: '숙취해소제 선택시 가장 중요하게 생각하는 것은?',
    options: ['효과', '가격(할인)', '누가 사오면', '안먹음']
  },
  {
    id: 'coping',
    question: '숙취시 주로 어떻게 대처하시나요?',
    options: ['계속 잠', '해장음식', '약 복용', '참고 견딤', '숙취 없음']
  },
  {
    id: 'awareness',
    question: '사람마다 숙취 유형이 다른 것을 알고 계신가요?',
    options: ['잘 알고 있음', '잘 모름']
  },
  {
    id: 'preference',
    question: '숙취 유형별 숙취해소제가 있다면 사용하실 의향이 있으신가요?',
    options: ['따로 집에 쟁여두겠다', '있으면 먹고 없으면 만다', '관심없다']
  }
];

export default function InfoForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<InfoFormData>({
    age: '',
    severity: '',
    prevention: '',
    criteria: '',
    coping: '',
    awareness: '',
    preference: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await saveUserInfo(answers);
      router.push('/survey');
    } catch (error) {
      console.error('에러:', error);
      alert('데이터 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q) => (
        <div key={q.id} className="space-y-4">
          <h3 className="font-medium text-lg">{q.question}</h3>
          <RadioGroup
            onValueChange={(value) => setAnswers(prev => ({ ...prev, [q.id]: value }))}
            value={answers[q.id as keyof InfoFormData]}
          >
            {q.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={Object.values(answers).some(value => !value) || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            저장 중...
          </div>
        ) : '다음으로'}
      </Button>
    </form>
  );
} 