import { ApiConstants, LOSTKARK_API_URL } from '@/app/shared/constants/ApiConstants';
import { fetchWithRetry } from '@/app/shared/utils/fetchWithRetry';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  try {
    const data = await fetchWithRetry(`${LOSTKARK_API_URL}${ApiConstants.NOTICES}?${query}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
