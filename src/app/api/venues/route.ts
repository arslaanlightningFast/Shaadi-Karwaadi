import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const minCapacity = searchParams.get('minCapacity')
    const maxBudget = searchParams.get('maxBudget')

    const where: any = {}
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (minCapacity) where.capacityMax = { gte: parseInt(minCapacity, 10) }
    if (maxBudget) where.pricePerEvent = { lte: parseFloat(maxBudget) }

    const venues = await prisma.venueListing.findMany({
      where,
      include: {
        images: true,
        amenities: true,
        vendor: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ venues })
  } catch (error: any) {
    console.error('Error fetching venues:', error)
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 })
  }
}
