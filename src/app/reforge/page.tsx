import { transformMarketItem } from '@/business/item/markets/transformMarketItem';
import { ItemList } from '@/components/item/ItemList';
import { ReforgeCalculator } from '@/components/item/reforge/ReforgeCalculator';
import { getMarketItem } from '@/ssr/getMarketItem';

export default async function ReforgePage() {
  const { items: reforgeItems, responseTime } = await getMarketItem({
    Sort: 'GRADE',
    CategoryCode: 50010,
    PageNo: 1,
    SortCondition: 'ASC',
  });

  const { items: reforgeAdditionalItems } = await getMarketItem({
    Sort: 'GRADE',
    CategoryCode: 50020,
    PageNo: 1,
    SortCondition: 'ASC',
  });

  const items = [...reforgeItems, ...reforgeAdditionalItems];

  const transformItems = transformMarketItem(items);

  return (
    <div className="flex w-full flex-col justify-center">
      <p className="mb-4 text-2xl font-semibold">재련 계산기</p>
      <ItemList responseTime={responseTime} items={transformItems} />
      <ReforgeCalculator items={transformItems} />
    </div>
  );
}
