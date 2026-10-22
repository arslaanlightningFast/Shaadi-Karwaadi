import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const customerUser = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' },
      include: {
        bookings: {
          include: {
            venue: true,
          }
        }
      }
    })

    if (!customerUser) {
      return NextResponse.json({ bookings: [] })
    }

    return NextResponse.json({
      success: true,
      bookings: customerUser.bookings
    })
  } catch (error: any) {
    console.error('Error loading customer dashboard:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
