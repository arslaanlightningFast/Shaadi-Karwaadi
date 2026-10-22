'use client'

import { useEffect, useState, use, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, MapPin, Users, Star, ShieldCheck, CheckCircle2, Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

function VenueDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [venue, setVenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [bookingDate, setBookingDate] = useState('')
  const [eventType, setEventType] = useState('Wedding')
  const [guestCount, setGuestCount] = useState(500)
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetch(`/api/venues/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.venue) setVenue(data.venue)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [resolvedParams.id])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueId: venue.id,
          eventDate: bookingDate,
          eventType,
          guestCount: Number(guestCount),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setSuccessMsg('Booking request submitted successfully! Redirecting to dashboard...')
      setTimeout(() => router.push('/dashboard/customer'), 2000)
    } catch (err: any) {
      alert(err.message || 'Please log in as a customer to book.')
      router.push('/login')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-[#FDF2F8] flex items-center justify-center text-[#831843]">Loading venue details...</div>
  if (!venue) return <div className="min-h-screen bg-[#FDF2F8] flex items-center justify-center text-[#831843]">Venue not found.</div>

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#FBCFE8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo className="w-11 h-11" />
          <div className="flex items-center gap-4">
            <Link href="/venues" className="text-sm font-semibold hover:text-[#DB2777]">All Venues</Link>
            <Link href="/login">
              <Button className="bg-[#DB2777] hover:bg-[#be185d] text-white rounded-full px-5">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Title & Location */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DB2777]">
            <span className="bg-white px-3 py-1 rounded-full border border-[#FBCFE8]">{venue.city} • {venue.locality}</span>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Venue
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold">{venue.name}</h1>
          <p className="text-[#475569] text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#DB2777]" /> {venue.address}, {venue.city}
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 gap-4 h-[400px]">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img src={venue.images[0]?.url || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'} alt={venue.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800" alt="Mandap" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" alt="Banquet" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Content & Booking Form */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#831843]">About Venue</h2>
              <p className="text-[#475569] text-sm leading-relaxed">{venue.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#FBCFE8]">
                <div>
                  <span className="text-xs text-[#475569] block">Guest Capacity</span>
                  <span className="text-base font-bold text-[#831843]">{venue.capacityMin} - {venue.capacityMax} Guests</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] block">Venue Type</span>
                  <span className="text-base font-bold text-[#831843]">{venue.venueType}</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] block">Rooms / Suites</span>
                  <span className="text-base font-bold text-[#831843]">{venue.roomsCount} Rooms</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] block">Parking Spaces</span>
                  <span className="text-base font-bold text-[#831843]">{venue.parkingSpaces} Cars</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] block">AC Banquet</span>
                  <span className="text-base font-bold text-[#831843]">{venue.ac ? 'Yes, Fully AC' : 'No'}</span>
                </div>
                <div>
                  <span className="text-xs text-[#475569] block">Power Backup</span>
                  <span className="text-base font-bold text-[#831843]">{venue.powerBackup ? '100% Backup' : 'Standard'}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-6">
              <h2 className="text-2xl font-serif font-bold text-[#831843]">Amenities & Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {venue.amenities?.map((amenity: any) => (
                  <div key={amenity.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#FDF2F8]/60 border border-[#FBCFE8]">
                    <CheckCircle2 className="w-5 h-5 text-[#DB2777]" />
                    <span className="text-sm font-semibold">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-2xl sticky top-28 space-y-6">
              <div>
                <span className="text-xs text-[#475569] uppercase font-semibold">Starting Price</span>
                <div className="text-3xl font-bold text-[#DB2777]">₹{venue.pricePerEvent.toLocaleString('en-IN')} <span className="text-xs text-[#475569] font-normal">/ event</span></div>
              </div>

              {successMsg && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-2">Event Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8]/40 text-sm text-[#831843] focus:outline-none focus:border-[#DB2777]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-2">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8]/40 text-sm text-[#831843] focus:outline-none focus:border-[#DB2777]"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Sangeet">Sangeet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-2">Expected Guests</label>
                  <input
                    type="number"
                    required
                    min={venue.capacityMin}
                    max={venue.capacityMax}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8]/40 text-sm text-[#831843] focus:outline-none focus:border-[#DB2777]"
                  />
                </div>

                <div className="pt-4 border-t border-[#FBCFE8] space-y-2 text-xs text-[#475569]">
                  <div className="flex justify-between">
                    <span>Advance Payment ({venue.advancePercentage}%):</span>
                    <span className="font-bold text-[#831843]">₹{((venue.pricePerEvent * venue.advancePercentage) / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span className="font-bold text-[#831843]">₹{venue.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#DB2777] hover:bg-[#be185d] text-white font-bold rounded-xl shadow-lg shadow-[#DB2777]/30 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Processing...' : 'Book Venue Online'} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF2F8] flex items-center justify-center text-[#831843]">Loading venue...</div>}>
      <VenueDetailContent params={params} />
    </Suspense>
  )
}
