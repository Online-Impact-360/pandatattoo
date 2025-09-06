import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      phoneNumber: process.env.BUSINESS_PHONE_NUMBER || '+17867894567'
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}
