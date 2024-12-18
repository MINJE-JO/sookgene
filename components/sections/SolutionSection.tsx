'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    title: '증상 분석',
    description: '간단한 설문을 통해 당신의 숙취 증상을 분석합니다.'
  },
  {
    title: '패턴 파악',
    description: '증상을 바탕으로 유전자 기반 숙취 패턴을 파악합니다.'
  },
  {
    title: '맞춤 추천',
    description: '당신의 유형에 맞는 최적의 솔루션을 제안합니다.'
  }
];

export default function SolutionSection() {
  return (
    <section id="solution" className="scroll-section bg-[#2C5282] text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          당신의 숙취 패턴을 분석합니다
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-[#9DC6FF]">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/survey"
            className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg text-xl hover:bg-opacity-90 transition-all"
          >
            지금 바로 분석하기
          </Link>
        </div>
      </div>
    </section>
  );
} 