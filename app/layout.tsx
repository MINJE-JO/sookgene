import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: '숙취 유형 분석 | SookGene - 맞춤형 숙취해소 솔루션',
  description: '당신의 유전자 기반 맞춤형 숙취 유형을 분석하고, 개인화된 숙취해소 솔루션을 제안받아보세요.',
  keywords: '숙취해소, 맞춤형 솔루션, 유전자 분석, 숙취 패턴, 건강',
  openGraph: {
    title: '숙취 유형 분석 | SookGene',
    description: '당신만의 맞춤형 숙취해소 솔루션을 찾아보세요',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
