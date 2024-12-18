'use client';

import { motion } from 'framer-motion';

const types = [
  {
    name: 'ALDH2 단독 변이형',
    symptoms: ['얼굴 홍조가 빠르게 나타남', '심장 박동이 빨라짐', '즉각적인 반응']
  },
  {
    name: 'ALDH2 + ADH1B 복합 변이형',
    symptoms: ['복합적인 증상', '홍조와 구토 동반', '심한 두통']
  },
  {
    name: 'ADH1B 고활성형',
    symptoms: ['빠른 취기', '두통이 주요 증상', '홍조가 적음']
  },
  {
    name: 'CYP2E1 저활성형',
    symptoms: ['피로감이 주요 증상', '지연성 숙취', '간 기능 저하']
  },
  {
    name: 'GST 결손형',
    symptoms: ['부종이 주요 증상', '간 관련 증상', '해독 능력 저하']
  },
  {
    name: 'CYP2E1 + GST 복합 변이형',
    symptoms: ['복합적 해독 장애', '장기 지속형 숙취', '심한 피로와 부종']
  }
];

export default function TypesSection() {
  return (
    <section id="types" className="scroll-section bg-[#9DC6FF] bg-opacity-5 flex items-center justify-center py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#2C5282]">
          숙취 유형 소개
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#2C5282]">{type.name}</h3>
              <ul className="space-y-2">
                {type.symptoms.map((symptom, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-2" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 