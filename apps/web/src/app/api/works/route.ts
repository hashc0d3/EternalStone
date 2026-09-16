import { NextResponse } from 'next/server';
import { getWorkPage } from '@/lib/works';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 9);

  const data = await getWorkPage(
    Number.isFinite(page) && page > 0 ? page : 1,
    Number.isFinite(limit) && limit > 0 ? Math.min(limit, 50) : 9,
  );

  return NextResponse.json(data);
}
