import Link from 'next/link';

export const metadata = {
  title: '숙취 유형 분석 | SookGene',
  description: '당신의 유전자 기반 맞춤형 숙취 유형을 분석해보세요.',
};

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-4">숙취 유형 분석</h1>
        <p className="text-gray-600 mb-8">
          간단한 설문을 통해 당신의 유전자 기반 숙취 유형을 분석하고,<br />
          맞춤형 솔루션을 제안해드립니다.
        </p>
        <Link 
          href="/survey" 
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          설문 시작하기
        </Link>
      </div>
    </div>
  );
}
