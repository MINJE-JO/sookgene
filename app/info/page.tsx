import InfoForm from '@/components/info/InfoForm';

export default function InfoPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">기초 정보 수집</h1>
          <p className="text-gray-600">
            더 정확한 분석을 위해 몇 가지 정보를 수집하고 있습니다.
          </p>
        </div>
        <InfoForm />
      </div>
    </div>
  );
} 