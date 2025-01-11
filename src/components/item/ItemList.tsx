import { MarketItemWithOneGold } from '@/business/item/markets/transformMarketItem';

interface ItemListProps {
  responseTime: string;
  items: MarketItemWithOneGold[];
}

export const ItemList: React.FC<ItemListProps> = ({ responseTime, items }) => {
  return (
    <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-lg font-semibold">아이템 시세</p>
        <p className="text-xs text-gray-400">{responseTime} 갱신</p>
      </div>
      <div className="grid max-h-[240px] grid-cols-2 gap-4 overflow-y-auto md:grid-cols-6 lg:grid-cols-8">
        {items.map((item) => (
          <div key={item.Id} className="flex items-center gap-4">
            <img
              src={item.Icon}
              alt={item.Name}
              className="h-8 w-8 rounded-md object-cover sm:h-12 sm:w-12"
            />
            <div>
              <h3 className="line-clamp-1 text-xs text-gray-600">{item.Name}</h3>
              <p className="line-clamp-1 text-xs font-semibold lg:text-base">
                {item.OnePrice.toLocaleString()} G
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
