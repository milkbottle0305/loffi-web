'use client';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';

export const CommonHeader = () => {
  return (
    <header className="sticky bottom-0 flex items-center justify-between bg-white px-8 py-1 shadow-md backdrop-blur">
      <Link href="/">
        <h1 className="p-2 text-3xl font-extrabold">로피</h1>
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <button className="block rounded-lg p-1 hover:bg-gray-200 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
              <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <ul className="flex w-32 flex-col items-end justify-end gap-4">
            <li>
              <Link className="text-lg hover:font-bold" href="/chart">
                차트
              </Link>
            </li>
            <li>
              <Link className="text-lg hover:font-bold" href="/reforge">
                재련 계산기
              </Link>
            </li>
            <li>
              <Link className="text-lg hover:font-bold" href="/sang_reforge">
                상급재련 계산기
              </Link>
            </li>
            <li>
              <Link className="text-lg hover:font-bold" href="/parking">
                주차효율 계산기
              </Link>
            </li>
            <li>
              <Link className="text-lg hover:font-bold" href="/info">
                정보
              </Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      <nav className="hidden md:block">
        <ul className="flex flex-row gap-8">
          <li>
            <Link className="text-lg hover:font-bold" href="/chart">
              차트
            </Link>
          </li>
          <li>
            <Link className="text-lg hover:font-bold" href="/reforge">
              재련 계산기
            </Link>
          </li>
          <li>
            <Link className="text-lg hover:font-bold" href="/sang_reforge">
              상급재련 계산기
            </Link>
          </li>
          <li>
            <Link className="text-lg hover:font-bold" href="/parking">
              주차회수 계산기
            </Link>
          </li>
          <li>
            <Link className="text-lg hover:font-bold" href="/info">
              정보
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
