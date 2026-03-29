import { NextResponse } from 'next/server';
import { getCountryOptions } from '@/lib/countries';

export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
  try {
    const countries = await getCountryOptions();

    return NextResponse.json({ countries });
  } catch (error) {
    console.error('Get countries error:', error);
    return NextResponse.json(
      { error: 'Failed to load countries' },
      { status: 500 }
    );
  }
}
