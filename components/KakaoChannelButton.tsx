'use client';

import { useEffect } from 'react';
import { Button } from './ui/button';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoChannelButton() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleAddChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.addChannel({
        channelPublicId: '_ZeUTxl' // 카카오톡 채널 ID를 넣으세요
      });
    }
  };

  return (
    <Button
      onClick={handleAddChannel}
      variant="outline"
      className="w-full bg-[#FAE100] hover:bg-[#FAE100]/90 text-black border-none"
    >
      카카오톡 채널 추가하기
    </Button>
  );
} 