'use client';

import { motion } from 'framer-motion';

const products = [
  {
    title: 'Base 제품',
    description: '모든 유형에 공통적으로 필요한 기본 성분',
    ingredients: ['비타민 B군', '전해질', '아미노산']
  },
  {
    title: 'Type별 특화 성분',
    description: '각 유형에 맞춤화된 특화 성분',
    ingredients: ['ALDH2 억제제', 'GST 활성화 성분', 'CYP2E1 조절제']
  }
];

export default function ProductSection() {
  return (
    <section id="product" className="scroll-section bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#2C5282]">
          맞춤형 숙취해소 솔루션
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#9DC6FF] bg-opacity-10 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#2C5282]">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <ul className="space-y-3">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-2" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-[#FF6B6B] text-white px-8 py-4 rounded-lg text-xl hover:bg-opacity-90 transition-all">
            구매하기
          </button>
        </div>
      </div>
    </section>
  );
} 