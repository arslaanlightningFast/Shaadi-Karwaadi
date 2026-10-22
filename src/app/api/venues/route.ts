import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MOCK_VENUES = [
  {
    id: 'venue-1',
    name: 'The Royal Palace Grand Ballroom & Lawns',
    description: 'A magnificent heritage palace featuring crystal chandeliers, air-conditioned banquet halls, and lush manicured lawns for up to 1,500 guests.',
    address: 'Palace Road, Near Heritage Square',
    city: 'Jaipur',
    locality: 'Civil Lines',
    capacityMin: 200,
    capacityMax: 1500,
    venueType: 'COMBINED',
    ac: true,
    parkingSpaces: 300,
    roomsCount: 25,
    pricePerEvent: 250000.0,
    advancePercentage: 25.0,
    securityDeposit: 25000.0,
    images: [
      { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200', caption: 'Grand Ballroom Setup', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200', caption: 'Royal Mandap Stage', isPrimary: false },
    ],
    amenities: [
      { id: 'a1', name: 'Valet Parking', icon: 'Car' },
      { id: 'a2', name: 'Bridal Dressing Room', icon: 'Sparkles' },
      { id: 'a3', name: 'Central AC', icon: 'Wind' },
      { id: 'a4', name: 'Power Backup 100%', icon: 'Zap' },
    ],
    vendor: { businessName: 'The Royal Palace & Banquets', rating: 4.9, verified: true }
  },
  {
    id: 'venue-2',
    name: 'Udaivilas Heritage Lawns & Courtyard',
    description: 'Breathtaking lakeside heritage property offering picturesque backdrops for luxury royal weddings and receptions.',
    address: 'Lake Pichola Shoreline',
    city: 'Udaipur',
    locality: 'Lake Pichola',
    capacityMin: 150,
    capacityMax: 1200,
    venueType: 'COMBINED',
    ac: true,
    parkingSpaces: 250,
    roomsCount: 20,
    pricePerEvent: 350000.0,
    advancePercentage: 25.0,
    securityDeposit: 30000.0,
    images: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200', caption: 'Lakeside Lawns', isPrimary: true },
    ],
    amenities: [
      { id: 'b1', name: 'Lake View', icon: 'Eye' },
      { id: 'b2', name: 'Valet Parking', icon: 'Car' },
      { id: 'b3', name: 'Bridal Dressing Room', icon: 'Sparkles' },
    ],
    vendor: { businessName: 'Udaivilas Hospitality', rating: 5.0, verified: true }
  },
  {
    id: 'venue-3',
    name: 'Taj Mahal View Luxury Banquet & Lawns',
    description: 'Stunning luxury venue overlooking the majestic Taj Mahal with world-class hospitality and regal dining.',
    address: 'Taj East Gate Road',
    city: 'Agra',
    locality: 'Taj East Gate',
    capacityMin: 100,
    capacityMax: 1000,
    venueType: 'INDOOR',
    ac: true,
    parkingSpaces: 200,
    roomsCount: 15,
    pricePerEvent: 200000.0,
    advancePercentage: 25.0,
    securityDeposit: 20000.0,
    images: [
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200', caption: 'Banquet Hall', isPrimary: true },
    ],
    amenities: [
      { id: 'c1', name: 'Monument View', icon: 'Eye' },
      { id: 'c2', name: 'Central AC', icon: 'Wind' },
    ],
    vendor: { businessName: 'Taj View Banquets', rating: 4.8, verified: true }
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const minCapacity = searchParams.get('minCapacity')
    const maxBudget = searchParams.get('maxBudget')

    let venues = []
    try {
      venues = await prisma.venueListing.findMany({
        include: {
          images: true,
          amenities: true,
          vendor: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    } catch (dbErr) {
      console.warn('Database offline, using mock venues:', dbErr)
      venues = MOCK_VENUES
    }

    if (!venues || venues.length === 0) {
      venues = MOCK_VENUES
    }

    return NextResponse.json({ venues })
  } catch (error: any) {
    console.error('Error fetching venues:', error)
    return NextResponse.json({ venues: MOCK_VENUES })
  }
}
