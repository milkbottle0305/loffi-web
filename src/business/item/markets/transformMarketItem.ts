import { ItemId } from '@/constants/item/ItemOptions';
import { MarketItem } from '@/ssr/getMarketItem';

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
 * 불필요한 아이템을 제거합니다.
 * @param items 아이템 목록
 * @returns 불필요한 아이템을 제거한 아이템 목록
 */
function removeUselessItem(items: MarketItem[]): MarketItem[] {
  // 파편 아이템 중 정해진 ID만 필터링하고 생명의 돌파석을 제외합니다.
  const transformedItems = items.filter((item) => {
    if (item.Name.includes('파편')) {
      return Object.values(ItemId).includes(item.Id);
    } else if (item.Name === '생명의 돌파석') {
      return false;
    } else {
      return true;
    }
  });

  return transformedItems;
}

/**
 * 아이템을 정해진 이름 순으로 정렬합니다.
 * @param items 정렬되지 않은 아이템
 * @returns 정렬된 아이템
 */
function sortMarkItem(items: MarketItemWithOneGold[]): MarketItemWithOneGold[] {
  const sortOrder = [
    '파괴석 조각',
    '파괴석',
    '파괴석 결정',
    '파괴강석',
    '정제된 파괴강석',
    '운명의 파괴석',
    '수호석 조각',
    '수호석',
    '수호석 결정',
    '수호강석',
    '정제된 수호강석',
    '운명의 수호석',
    '조화의 돌파석',
    '명예의 돌파석',
    '위대한 명예의 돌파석',
    '경이로운 명예의 돌파석',
    '찬란한 명예의 돌파석',
    '운명의 돌파석',
    '오레하 융화 재료',
    '상급 오레하 융화 재료',
    '최상급 오레하 융화 재료',
    '아비도스 융화 재료',
    '조화의 파편 주머니(소)',
    '조화의 파편 주머니(중)',
    '조화의 파편 주머니(대)',
    '명예의 파편 주머니(소)',
    '명예의 파편 주머니(중)',
    '명예의 파편 주머니(대)',
    '운명의 파편 주머니(소)',
    '운명의 파편 주머니(중)',
    '운명의 파편 주머니(대)',
  ];

  const sortOrderMap: { [key: string]: number } = sortOrder.reduce(
    (map, name, index) => {
      map[name] = index;
      return map;
    },
    {} as { [key: string]: number }
  );

  const sortedItems = items.sort((a, b) => {
    const indexA = sortOrderMap[a.Name] !== undefined ? sortOrderMap[a.Name] : Infinity;
    const indexB = sortOrderMap[b.Name] !== undefined ? sortOrderMap[b.Name] : Infinity;

    return indexA - indexB;
  });

  return sortedItems;
}

/**
 * 시세 정보를 변환합니다.
 * @param items 시세 정보
 * @returns 변환된 시세 정보
 */
export function transformMarketItem(items: MarketItem[]): MarketItemWithOneGold[] {
  // 1. 불필요한 아이템을 제거합니다.
  const removedItems = removeUselessItem(items);

  // 2. 각 아이템의 가격을 1개 당 가격으로 계산합니다.
  const transformedItems: MarketItemWithOneGold[] = [];
  removedItems.forEach((item) => {
    if (item.Name.includes('파편')) {
      transformedItems.push({
        Id: item.Id,
        Name: item.Name,
        Icon: item.Icon,
        OnePrice: calculatePaypeonBundleToOnePrice(item),
      });
    } else {
      transformedItems.push({
        Id: item.Id,
        Name: item.Name,
        Icon: item.Icon,
        OnePrice: calculateMarketItemBundleToOnePrice(item),
      });
    }
  });

  // 3. 아이템을 정해진 이름 순으로 정렬합니다.
  const sortedItems = sortMarkItem(transformedItems);

  return sortedItems;
}
