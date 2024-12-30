'use server';

import { ApiConstants, LOSTKARK_API_URL } from '../constants/ApiConstants';
import { fetchWithRetry } from '../utils/fetchWithRetry';

type GetLostarkEventsResponse = {
  Title: string;
  Thumbnail: string;
  Link: string;
  StartDate: string;
  EndDate: string;
  RewardDate: string;
};

export const getLostarkEvents = async (): Promise<GetLostarkEventsResponse[]> => {
  const response = await fetchWithRetry(`${LOSTKARK_API_URL}${ApiConstants.EVENTS}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('data', data);
  return data;
};
