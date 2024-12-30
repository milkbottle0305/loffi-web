import { LostarkEventCarousel } from './shared/components/LostarkEventCarousel';
import { LostarkNotice } from './shared/components/LostarkNotice';

export default function Home() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center">
      <LostarkNotice />
      <LostarkEventCarousel />
    </div>
  );
}
