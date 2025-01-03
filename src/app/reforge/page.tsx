import { ItemList } from '@/components/item/ItemList';
import { ReforgeCalculator } from '@/components/item/reforge/ReforgeCalculator';

export default function ReforgePage() {
  return (
    <div className="flex flex-col justify-center">
      <p className="mb-4 text-2xl font-semibold">재련 계산기</p>
      <ItemList />
      <ReforgeCalculator />
    </div>
  );
}
