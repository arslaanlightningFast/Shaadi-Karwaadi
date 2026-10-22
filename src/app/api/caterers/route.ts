import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MOCK_CATERERS = [
  {
    id: 'caterer-1',
    name: 'Royal Delights Grand Wedding Catering',
    description: 'Award-winning catering service delivering authentic royal Indian cuisines, live chaat counters, and international dessert bars.',
    cuisines: ['North Indian', 'Rajasthani', 'Mughlai', 'Chinese', 'Continental', 'Italian'],
    menus: [
      {
        id: 'm1',
        name: 'Maharaja Royal Feast',
        description: 'Opulent multi-course wedding menu with live counters and premium silverware service.',
        pricePerPlate: 1800.0,
        minGuests: 100,
      }
    ],
    vendor: { businessName: 'Royal Delights Catering & Hospitality', rating: 4.8, verified: true }
  }
]

export async function GET() {
  try {
    let caterers = []
    try {
      caterers = await prisma.cateringListing.findMany({
        include: {
          menus: true,
          vendor: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    } catch (dbErr) {
      caterers = MOCK_CATERERS
    }

    if (!caterers || caterers.length === 0) {
      caterers = MOCK_CATERERS
    }

    return NextResponse.json({ caterers })
  } catch (error: any) {
    console.error('Error fetching caterers:', error)
    return NextResponse.json({ caterers: MOCK_CATERERS })
  }
}
