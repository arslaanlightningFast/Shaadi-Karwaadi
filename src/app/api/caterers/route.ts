import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const caterers = await prisma.cateringListing.findMany({
      include: {
        menus: true,
        vendor: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ caterers })
  } catch (error: any) {
    console.error('Error fetching caterers:', error)
    return NextResponse.json({ error: 'Failed to fetch caterers' }, { status: 500 })
  }
}
