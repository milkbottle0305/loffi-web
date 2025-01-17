import { ItemId } from '@/constants/item/ItemOptions';
import { MarketItem } from '@/ssr/getMarketItem';
import { converItemNameToSrc } from '@/utils/convertItemNameToSrc';

const Small_Tier23Papyeon_BundleCount = 500;
const Medium_Tier23Papyeon_BundleCount = 1000;
const Large_Tier23Papyeon_BundleCount = 2000;
const Small_Tier4Papyeon_BundleCount = 1000;
const Medium_Tier4Papyeon_BundleCount = 2000;
const Large_Tier4Papyeon_BundleCount = 4000;

export type MarketItemWithOneGold = {
  Id: number;
  Name: string;
  Icon: string;
  OnePrice: number;
};

/**
 * 각 파편 아이템을 제외한 아이템의 가격을 1개 당 가격으로 계산합니다.
 * @param item
 * @returns
 */
function calculateMarketItemBundleToOnePrice(item: MarketItem): number {
  return item.RecentPrice / item.BundleCount;
}

/**
 * 각 파편 아이템의 가격을 1개 당 가격으로 계산합니다.
 * @param item
 * @returns
 */
function calculatePaypeonBundleToOnePrice(item: MarketItem): number {
  switch (item.Name) {
    case '조화의 파편 주머니(소)':
      return item.RecentPrice / Small_Tier23Papyeon_BundleCount;
    case '명예의 파편 주머니(소)':
      return item.RecentPrice / Small_Tier23Papyeon_BundleCount;
    case '운명의 파편 주머니(소)':
      return item.RecentPrice / Small_Tier4Papyeon_BundleCount;
    case '조화의 파편 주머니(중)':
      return item.RecentPrice / Medium_Tier23Papyeon_BundleCount;
    case '명예의 파편 주머니(중)':
      return item.RecentPrice / Medium_Tier23Papyeon_BundleCount;
    case '운명의 파편 주머니(중)':
      return item.RecentPrice / Medium_Tier4Papyeon_BundleCount;
    case '조화의 파편 주머니(대)':
      return item.RecentPrice / Large_Tier23Papyeon_BundleCount;
    case '명예의 파편 주머니(대)':
      return item.RecentPrice / Large_Tier23Papyeon_BundleCount;
    case '운명의 파편 주머니(대)':
      return item.RecentPrice / Large_Tier4Papyeon_BundleCount;
    default:
      return 0;
  }
}

/**
 * 불필요한 아이템을 제거하고 정렬합니다.
 * @param items 아이템 목록
 * @returns 불필요한 아이템을 제거한 아이템 목록
 */
function removeUselessItem(items: MarketItem[]): MarketItem[] {
  // ItemId에 정의되어 있지 않은 아이템만 필터링합니다.
  const filteredItems = items.filter((item) => {
    return Object.values(ItemId).includes(item.Id);
  });

  // ItemId에 정의된 순서대로 정렬
  const sortedItems = filteredItems.sort((a, b) => {
    const indexA = Object.values(ItemId).indexOf(a.Id);
    const indexB = Object.values(ItemId).indexOf(b.Id);

    if (indexA === -1 && indexB === -1) {
      return 0;
    } else if (indexA === -1) {
      return 1;
    } else if (indexB === -1) {
      return -1;
    } else {
      return indexA - indexB;
    }
  });

  return sortedItems;
}

/**
 * 시세 정보를 변환합니다.
 * @param items 시세 정보
 * @returns 변환된 시세 정보
 */
export function transformMarketItem(items: MarketItem[]): MarketItemWithOneGold[] {
  // 1. 불필요한 아이템을 제거하고 정렬합니다.
  const removedItems = removeUselessItem(items);

  // 2. 각 아이템의 가격을 1개 당 가격으로 계산합니다.
  const transformedItems: MarketItemWithOneGold[] = [];
  removedItems.forEach((item) => {
    if (item.Name.includes('파편')) {
      transformedItems.push({
        Id: item.Id,
        Name: item.Name,
        Icon: converItemNameToSrc(item.Name),
        OnePrice: calculatePaypeonBundleToOnePrice(item),
      });
    } else {
      transformedItems.push({
        Id: item.Id,
        Name: item.Name,
        Icon: converItemNameToSrc(item.Name),
        OnePrice: calculateMarketItemBundleToOnePrice(item),
      });
    }
  });

  return transformedItems;
}
