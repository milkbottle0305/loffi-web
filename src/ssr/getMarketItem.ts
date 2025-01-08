import { ApiConstants, LOSTKARK_API_URL } from '@/constants/ApiConstants';
import { fetchPostWithPagination } from '@/utils/fetchWithRetry';

export type MarketItem = {
  Id: number;
  Name: string;
  Grade: string;
  Icon: string;
  BundleCount: number;
  TradeReaminCount: number;
  YDayAvgPrice: number;
  RecentPrice: number;
  CurrentMinPrice: number;
};

interface GetMarketItemBody {
  Sort?: 'GRADE' | 'YDAY_AVG_PRICE' | 'RECENT_PRICE' | 'CURRENT_MIN_PRICE';
  CategoryCode?: number;
  CharacterClass?: string;
  ItemTier?: number;
  ItemGrade?: string;
  ItemName?: string;
  PageNo?: number;
  SortCondition?: 'ASC' | 'DESC';
}

interface GetMarketItemResponse {
  items: MarketItem[];
  responseTime: string;
}

export const getMarketItem = async (body: GetMarketItemBody): Promise<GetMarketItemResponse> => {
  const { items, ok, statusText, responseTime } = await fetchPostWithPagination(
    `${LOSTKARK_API_URL}${ApiConstants.MARKET_ITEMS}`,
    { ...body, PageNo: body.PageNo ?? 1 }, // 기본 PageNo 설정
    {
      method: 'POST',
      next: { revalidate: 3600 },
    }
  );

  if (!ok) {
    throw new Error(`Failed to fetch market items: ${statusText}`);
  }

  return { items, responseTime };
};
