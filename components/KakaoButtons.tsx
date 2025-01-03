'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoButtons() {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      // SDK 로드 완료 후 초기화
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        setIsKakaoInitialized(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  const handleAddChannel = () => {
    if (window.Kakao && isKakaoInitialized) {
      window.Kakao.Channel.addChannel({
        channelPublicId: '_PxaFxln'
      });
    }
  };

  return (
    <Button
      onClick={handleAddChannel}
      variant="outline"
      className="w-full bg-[#FAE100] hover:bg-[#FAE100]/90 text-black border-none"
      disabled={!isKakaoInitialized}
    >
      카카오톡 채널 추가하기
    </Button>
  );
} 