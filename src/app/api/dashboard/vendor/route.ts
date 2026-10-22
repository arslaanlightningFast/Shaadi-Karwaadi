import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      listings: [],
      bookings: []
    })
  } catch (error: any) {
    console.error('Vendor dashboard error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
