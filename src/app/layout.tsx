import type { Metadata } from 'next';
import '@/app/globals.css';
import { CommonHeader } from '@/components/CommonHeader';

export const metadata: Metadata = {
  title: '로피 - 효율적인 로생을 위해!',
  description: '로피는 효율적인 로생을 위해 만들어진 서비스입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <CommonHeader />
        {children}
      </body>
    </html>
  );
}
