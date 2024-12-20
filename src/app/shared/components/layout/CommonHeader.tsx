import Link from 'next/link';

export const CommonHeader = () => {
  return (
    <header className="sticky top-0 w-full backdrop-blur py-1 bg-white shadow-md flex justify-center">
      <div className="w-[768px] flex items-center justify-between">
        <Link href="/">
          <h1 className="p-2 text-3xl font-extrabold">로피</h1>
        </Link>
        <nav>
          <ul className="flex gap-8 flex-row">
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
      </div>
    </header>
  );
};
