'use client';

import { motion } from 'framer-motion';

const products = [
  {
    title: 'Base 제품',
    description: '모든 유형에 공통적으로 필요한 기본 성분',
    ingredients: [
      '비타민 B군 복합체',
      '전해질 보충제',
      '기본 항산화제',
      '타우린 500mg'
    ]
  },
  {
    title: '즉각적 반응형',
    description: '빠른 증상 완화를 위한 특화 성분',
    ingredients: [
      'NAC 600mg',
      '글루타치온 200-300mg',
      'DHM 300mg',
      '비타민C 500mg'
    ]
  },
  {
    title: '빠른 취기형',
    description: '빠른 해독을 위한 특화 성분',
    ingredients: [
      '비타민B6 50mg',
      '마그네슘 300mg',
      'CoQ10 100mg',
      '타우린 500mg'
    ]
  },
  {
    title: '지연성 해독 장애형',
    description: '지속적인 해독 지원을 위한 특화 성분',
    ingredients: [
      'BCAA 5000mg',
      '오르니틴 400mg',
      '밀크시슬 추출물 150-200mg',
      'NAC 300mg'
    ]
  }
];

export default function ProductSection() {
  return (
    <section id="product" className="scroll-section bg-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#2C5282]">
          맞춤형 숙취해소 솔루션
        </h2>
        <div className="flex flex-col gap-8">
          {/* 특화 제품들 - 상단 row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(1).map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-5 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2 text-[#2C5282]">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <ul className="space-y-1.5">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#FF6B6B] rounded-full mr-2" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Base 제품 - 하단 row */}
          <div className="w-full">
            {products.slice(0, 1).map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-5 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-48">
                    <h3 className="text-lg font-semibold text-[#2C5282]">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                  <ul className="flex gap-5 flex-wrap">
                    {product.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center whitespace-nowrap">
                        <span className="w-1.5 h-1.5 bg-[#FF6B6B] rounded-full mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 