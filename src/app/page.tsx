import { LoffiNotice } from './shared/components/LoffiNotice';
import { LostarkNotice } from './shared/components/LostarkNotice';
import QueryProviders from './shared/providers/QueryProviders';

export default function Home() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center">
      <QueryProviders>
        <LostarkNotice />
        <LoffiNotice />
      </QueryProviders>
    </div>
  );
}
