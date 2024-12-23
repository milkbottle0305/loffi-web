import { useQuery } from '@tanstack/react-query';
import { createQueryString } from '../utils/createQueryString';

type GetNoticesParams = {
  searchText?: string;
  type?: '공지' | '점검' | '상점' | '이벤트';
};

type GetNoticesResponse = {
  Title: string;
  Date: string;
  Link: string;
  Type: '공지' | '점검' | '상점' | '이벤트';
};

const getNotices = async (params?: GetNoticesParams): Promise<GetNoticesResponse[]> => {
  const queryString = createQueryString(params);

  const response = await fetch(`/api/notices?${queryString}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notices: ${response.statusText}`);
  }

  return response.json();
};

export const useGetNoticesQuery = (params?: GetNoticesParams) => {
  return useQuery<GetNoticesResponse[]>({
    queryKey: ['notices', params],
    queryFn: () => getNotices(params),
  });
};
