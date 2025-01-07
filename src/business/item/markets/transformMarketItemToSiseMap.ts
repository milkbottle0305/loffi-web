import { MarketItem } from '@/ssr/getMarketItem';

type SiseItem = {
  name: string;
  yDayAvgPrice: number;
  recentPrice: number;
  currentMinPrice: number;
};

type SiseMap = {
  [key: string]: Omit<SiseItem, 'name'>;
};

function transformMarketItemToSiseMap(item: MarketItem): SiseMap {
  return {
    [item.Name]: {
      yDayAvgPrice: item.YDayAvgPrice / item.BundleCount,
      recentPrice: item.RecentPrice / item.BundleCount,
      currentMinPrice: item.CurrentMinPrice / item.BundleCount,
    },
  };
}

function transformPapyeonToSiseMap(item: MarketItem): SiseMap {
  switch (item.Name) {
    case '운명의 파편 주머니(소)':
      return {
        [item.Name]: {
          yDayAvgPrice: item.YDayAvgPrice / item.BundleCount,
          recentPrice: item.RecentPrice / item.BundleCount,
          currentMinPrice: item.CurrentMinPrice / item.BundleCount,
        },
      };
    default:
      return {
        [item.Name]: {
          yDayAvgPrice: item.YDayAvgPrice / item.BundleCount,
          recentPrice: item.RecentPrice / item.BundleCount,
          currentMinPrice: item.CurrentMinPrice / item.BundleCount,
        },
      };
  }
}
