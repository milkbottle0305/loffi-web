import { ApiConstants, LOSTKARK_API_URL } from '@/constants/ApiConstants';
import { fetchWithRetry } from '@/utils/fetchWithRetry';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  try {
    const data = await fetchWithRetry(`${LOSTKARK_API_URL}${ApiConstants.NOTICES}?${query}`, req);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
