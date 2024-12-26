export default function ProblemSection() {
  return (
    <section id="problem" className="scroll-section bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
          왜 모두에게 똑같은 숙취해소제일까요?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-secondary/10 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              사람마다 다른 숙취 증상
            </h3>
            <p className="text-gray-600">
              유전적 특성과 생활습관에 따라 각기 다른 숙취 반응이 나타납니다.
            </p>
          </div>
          <div className="p-6 bg-secondary/10 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              기존 제품의 한계
            </h3>
            <p className="text-gray-600">
              획일화된 성분으로는 개인별 증상에 효과적으로 대응할 수 없습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 