import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const venue = await prisma.venueListing.findUnique({
      where: { id },
      include: {
        images: true,
        amenities: true,
        vendor: {
          select: { businessName: true, rating: true, totalReviews: true, verified: true }
        }
      }
    })

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }

    return NextResponse.json({ venue })
  } catch (error: any) {
    console.error('Error fetching venue:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
