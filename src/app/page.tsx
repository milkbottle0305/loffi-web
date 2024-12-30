import Link from 'next/link';
import { LostarkEventCarousel } from '@/components/LostarkEventCarousel';
import { LostarkNotice } from '@/components/LostarkNotice';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      {/* 배너 텍스트 영역 */}
      <div className="mb-4 w-full bg-black py-16 text-white">
        <div className="text-center">
          <p className="text-4xl font-bold">LOstark eFFIciency</p>
          <p className="mt-2 text-2xl">로피 - 효율적인 로생을 위해!</p>
        </div>
      </div>

      {/* 로스트아크 정보 배치 */}
      <div className="mb-16 flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
        <LostarkNotice />
        <LostarkEventCarousel />
      </div>

      {/* 주요 기능 나열 섹션*/}
      <div className="mb-8 w-full px-6 text-center md:px-16">
        <p className="mb-4 text-2xl font-bold text-gray-800">주요 기능</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <Link href="/chart">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">차트</h3>
              <p className="text-gray-600">
                생활, 재련, 보석 등의 시세정보를 차트로 분석할 수 있습니다.
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <Link href="/reforge">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">재련 계산기</h3>
              <p className="text-gray-600">재련에 필요한 정보를 자동으로 계산해줍니다.</p>
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <Link href="/sang_reforge">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">상급 재련 계산기</h3>
              <p className="text-gray-600">상급 재련에 필요한 정보를 자동으로 계산해줍니다.</p>
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <Link href="/parking">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">주차효율 계산기</h3>
              <p className="text-gray-600">게임 내 주차 효율을 계산하여 더 나은 선택을 돕습니다.</p>
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <Link href="/info">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">정보</h3>
              <p className="text-gray-600">게임에 필요한 다양한 정보를 제공합니다.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* 커뮤니티 소개 및 링크 섹션 */}
      <div className="mb-8 w-full px-6 text-center md:px-16">
        <p className="mb-4 text-2xl font-bold text-gray-800">커뮤니티 소개</p>
        <p className="mx-auto mb-6 max-w-xl text-lg text-gray-700">
          로피는 로아인들을 위한 편의성을 제공하며, 커뮤니티와 소통할 수 있는 다양한 채널을 운영하고
          있습니다. 게임의 최신 소식, 공지사항을 빠르게 전달하고, 사용자들 간의 활발한 소통을
          지원합니다.
        </p>

        <div className="mb-8 flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-github text-3xl"></i>
            <span>GitHub</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-discord text-3xl"></i>
            <span>Discord</span>
          </a>
          <a
            href="https://open.kakao.com"
            target="_blank"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <i className="fab fa-line text-3xl"></i>
            <span>카카오톡</span>
          </a>
        </div>
      </div>
    </div>
  );
}
