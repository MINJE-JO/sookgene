import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="scroll-section bg-[#2C5282] text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          당신의 숙취 패턴에 맞는 맞춤형 솔루션
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-[#9DC6FF]">
          내 몸에 맞는 숙취해소제 찾기
        </p>
        <Link
          href="/survey"
          className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-lg text-xl hover:bg-opacity-90 transition-all"
        >
          숙취 패턴 분석하기
        </Link>
      </div>
    </section>
  );
} 