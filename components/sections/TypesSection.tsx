'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const types = [
  {
    name: '즉각적 반응형',
    symptoms: [
      '얼굴 홍조가 빠르게 나타남',
      '메스꺼움/구토',
      '두통',
      '심한 심장 박동 증가'
    ]
  },
  {
    name: '빠른 취기형',
    symptoms: [
      '빠른 취기',
      '두통',
      '약간의 얼굴 홍조',
      '약간의 심장 박동 증가'
    ]
  },
  {
    name: '지연성 해독 장애형',
    symptoms: [
      '피로',
      '부종',
      '지연성 숙취 (다음날까지 지속)',
      '느린 회복'
    ]
  }
];

export default function TypesSection() {
  return (
    <section id="types" className="scroll-section bg-[#9DC6FF] bg-opacity-5 flex items-center justify-center py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#2C5282]">
          숙취 유형 소개
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <motion.div key={type.name}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-[#2C5282]">{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-2" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 