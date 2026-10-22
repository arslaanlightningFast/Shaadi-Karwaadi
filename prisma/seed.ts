import { PrismaClient, Role, VendorType, VenueType, DocStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding ShaadiSthal database...')

  await prisma.auditLogs.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.message.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.review.deleteMany()
  await prisma.platformCommission.deleteMany()
  await prisma.vendorPayout.deleteMany()
  await prisma.refund.deleteMany()
  await prisma.paymentTransaction.deleteMany()
  await prisma.quotation.deleteMany()
  await prisma.bookingLineItem.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.eventPlan.deleteMany()
  await prisma.cateringAvailability.deleteMany()
  await prisma.cateringMenu.deleteMany()
  await prisma.cateringListing.deleteMany()
  await prisma.venueAvailability.deleteMany()
  await prisma.venueAmenity.deleteMany()
  await prisma.venueImage.deleteMany()
  await prisma.venueListing.deleteMany()
  await prisma.verificationDocument.deleteMany()
  await prisma.vendorProfile.deleteMany()
  await prisma.customerProfile.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('Password123!', 10)

  // 1. Admin User
  await prisma.user.create({
    data: {
      email: 'admin@shaadisthal.com',
      passwordHash,
      name: 'Aarav Sharma (Admin)',
      role: Role.ADMIN,
      phone: '+919876543210',
      emailVerified: true,
    },
  })

  // 2. Customer User
  await prisma.user.create({
    data: {
      email: 'customer@shaadisthal.com',
      passwordHash,
      name: 'Priya Verma',
      role: Role.CUSTOMER,
      phone: '+919811122334',
      emailVerified: true,
      customerProfile: {
        create: {
          address: 'B-42, Bandra West',
          city: 'Mumbai',
          preferences: 'Luxury indoor banquet with vegetarian North Indian catering',
        },
      },
    },
  })

  // 3. Venue Manager User & Profile
  const venueUser = await prisma.user.create({
    data: {
      email: 'manager@thepalace.com',
      passwordHash,
      name: 'Vikram Singh',
      role: Role.VENUE_MANAGER,
      phone: '+919722233445',
      emailVerified: true,
      vendorProfile: {
        create: {
          businessName: 'The Royal Palace & Banquets',
          businessType: VendorType.VENUE,
          description: 'Premier heritage wedding palace with grand ballrooms and royal lawn gardens.',
          gstin: '27AAAAA0000A1Z5',
          pan: 'ABCDE1234F',
          verified: true,
          rating: 4.9,
          totalReviews: 48,
        },
      },
    },
    include: { vendorProfile: true }
  })

  // 4. Caterer User & Profile
  const catererUser = await prisma.user.create({
    data: {
      email: 'chef@royaldelights.com',
      passwordHash,
      name: 'Chef Rajesh Kapoor',
      role: Role.CATERER,
      phone: '+919633344556',
      emailVerified: true,
      vendorProfile: {
        create: {
          businessName: 'Royal Delights Catering & Hospitality',
          businessType: VendorType.CATERER,
          description: 'Exquisite culinary masters specializing in royal Mughlai, Rajasthani, and Continental wedding spreads.',
          gstin: '07BBBBB1111B1Z6',
          pan: 'FGHIJ5678K',
          verified: true,
          rating: 4.8,
          totalReviews: 64,
        },
      },
    },
    include: { vendorProfile: true }
  })

  const venueVendor = venueUser.vendorProfile
  const catererVendor = catererUser.vendorProfile

  if (venueVendor && catererVendor) {
    // Create Venue Listing
    await prisma.venueListing.create({
      data: {
        vendorId: venueVendor.id,
        name: 'The Royal Palace Grand Ballroom & Lawns',
        description: 'A magnificent heritage palace featuring crystal chandeliers, air-conditioned banquet halls, and lush manicured lawns for up to 1,500 guests.',
        address: 'Palace Road, Near Heritage Square',
        city: 'Jaipur',
        locality: 'Civil Lines',
        capacityMin: 200,
        capacityMax: 1500,
        venueType: VenueType.COMBINED,
        ac: true,
        parkingSpaces: 300,
        roomsCount: 25,
        bridalRooms: 3,
        powerBackup: true,
        accessibility: true,
        decorationPolicy: 'In-house decor panel available or outside decorators permitted with royalty fee.',
        outsideVendorPolicy: 'Outside catering allowed for specific cultural cuisines.',
        eventTypesSupported: ['Wedding', 'Reception', 'Engagement', 'Sangeet', 'Corporate Event'],
        pricePerEvent: 250000.0,
        advancePercentage: 25.0,
        securityDeposit: 25000.0,
        cancellationTerms: '50% refund up to 30 days before event date. Non-refundable within 14 days.',
        operatingHours: '9:00 AM - 12:00 Midnight',
        verificationStatus: DocStatus.VERIFIED,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200', caption: 'Grand Ballroom Setup', isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200', caption: 'Royal Mandap Stage', isPrimary: false },
          ],
        },
        amenities: {
          create: [
            { name: 'Valet Parking', icon: 'Car' },
            { name: 'Bridal Dressing Room', icon: 'Sparkles' },
            { name: 'Central AC', icon: 'Wind' },
            { name: 'Power Backup 100%', icon: 'Zap' },
            { name: 'Wi-Fi Enabled', icon: 'Wifi' },
          ],
        },
      },
    })

    // Create Catering Listing
    await prisma.cateringListing.create({
      data: {
        vendorId: catererVendor.id,
        name: 'Royal Delights Grand Wedding Catering',
        description: 'Award-winning catering service delivering authentic royal Indian cuisines, live chaat counters, and international dessert bars.',
        cuisines: ['North Indian', 'Rajasthani', 'Mughlai', 'Chinese', 'Continental', 'Italian'],
        vegOptions: true,
        nonVegOptions: true,
        jainOptions: true,
        veganOptions: true,
        serviceAreas: ['Jaipur', 'Delhi NCR', 'Udaipur', 'Agra'],
        travelCharges: 15000.0,
        staffIncluded: true,
        servingEquipment: true,
        menus: {
          create: [
            {
              name: 'Maharaja Royal Feast',
              description: 'Opulent multi-course wedding menu with live counters and premium silverware service.',
              pricePerPlate: 1800.0,
              minGuests: 100,
              starters: ['Paneer Tikka', 'Dahi Ke Kabab', 'Galouti Kebab', 'Crispy Chili Potato'],
              mainCourses: ['Dal Makhani', 'Paneer Lababdar', 'Laal Maas', 'Butter Chicken', 'Subz Biryani'],
              riceBreads: ['Tandoori Roti', 'Butter Naan', 'Roomali Roti', 'Saffron Pulao'],
              desserts: ['Gulab Jamun with Rabri', 'Moong Dal Halwa', 'Angoori Petha', 'Live Jalebi Counter'],
              beverages: ['Welcome Mocktails', 'Fresh Jaljeera', 'Badam Milk', 'Coffee & Tea'],
            },
          ],
        },
      },
    })

    console.log('✅ Database seeded successfully with ShaadiSthal test data!')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
