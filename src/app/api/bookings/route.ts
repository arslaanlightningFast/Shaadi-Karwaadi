import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { venueId, eventDate, eventType, guestCount } = await request.json()

    if (!venueId || !eventDate) {
      return NextResponse.json({ error: 'Venue ID and event date are required' }, { status: 400 })
    }

    // For demo/simulated booking, we fetch the first customer user
    const customerUser = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' },
    })

    if (!customerUser) {
      return NextResponse.json({ error: 'Customer user not found. Please log in.' }, { status: 401 })
    }

    const venue = await prisma.venueListing.findUnique({ where: { id: venueId } })
    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }

    const totalAmount = venue.pricePerEvent
    const advanceAmount = (totalAmount * venue.advancePercentage) / 100

    const booking = await prisma.booking.create({
      data: {
        customerId: customerUser.id,
        venueId: venue.id,
        eventDate: new Date(eventDate),
        guestCount: Number(guestCount),
        totalAmount,
        advanceAmount,
        remainingAmount: totalAmount - advanceAmount,
        bookingStatus: 'PENDING',
        specialRequirements: `Event Type: ${eventType}`,
      }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error: any) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
