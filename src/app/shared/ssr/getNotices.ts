'use server';
import { ApiConstants, LOSTKARK_API_URL } from '../constants/ApiConstants';
import { GetNoticesParams, GetNoticesResponse } from '../queries/useGetNoticesQuery';
import { createQueryString } from '../utils/createQueryString';
import { fetchWithRetry } from '../utils/fetchWithRetry';

const NOTICES_COUNT = 5;

export const getNotices = async (params?: GetNoticesParams): Promise<GetNoticesResponse[]> => {
  const queryString = createQueryString(params);

  const response = await fetchWithRetry(
    `${LOSTKARK_API_URL}${ApiConstants.NOTICES}?${queryString}`,
    {
      method: 'GET',
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch notices: ${response.statusText}`);
  }

  const data = await response.json();
  return data.slice(0, NOTICES_COUNT);
};
