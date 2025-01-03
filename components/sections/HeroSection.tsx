import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-primary text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          당신의 숙취 패턴에 맞는 맞춤형 솔루션
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-secondary">
          내 몸에 맞는 숙취해소제 찾기
        </p>
        <Link
          href="/info"
          className="inline-block bg-destructive text-white px-8 py-4 rounded-lg text-xl hover:bg-opacity-90 transition-all"
        >
          설문조사 후 나의 숙취유형 알아보기
        </Link>
      </div>
    </section>
  );
} 