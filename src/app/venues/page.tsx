'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Users, Star, ShieldCheck, Sparkles, ArrowRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cityFilter, setCityFilter] = useState('')

  useEffect(() => {
    fetch('/api/venues')
      .then(res => res.json())
      .then(data => {
        if (data.venues) setVenues(data.venues)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#FBCFE8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DB2777] to-[#831843] flex items-center justify-center text-white shadow-lg shadow-[#DB2777]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-[#831843] to-[#DB2777] bg-clip-text text-transparent">
              ShaadiSthal
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold hover:text-[#DB2777]">Sign In</Link>
            <Link href="/register">
              <Button className="bg-[#DB2777] hover:bg-[#be185d] text-white rounded-full px-5">Register Vendor</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Wedding Venues & Marriage Halls</h1>
          <p className="text-[#475569] text-sm">Explore verified luxury banquet halls, farmhouses, and heritage palaces across India.</p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-[#475569]">Loading venues...</div>
        ) : venues.length === 0 ? (
          <div className="text-center py-24 text-[#475569]">No venues found. Please run database seeding (`npx prisma db seed`).</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {venues.map(venue => (
              <div key={venue.id} className="bg-white rounded-3xl overflow-hidden border border-[#FBCFE8] shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-60">
                  <img src={venue.images[0]?.url || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'} alt={venue.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#831843] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#475569]">
                    <span className="uppercase">{venue.city} • {venue.locality}</span>
                    <span className="flex items-center gap-1 font-bold text-[#A16207]">
                      <Star className="w-3.5 h-3.5 fill-[#A16207]" /> 4.9
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#831843]">{venue.name}</h3>
                  <p className="text-xs text-[#475569] line-clamp-2">{venue.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#475569] pt-2">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#DB2777]" /> Up to {venue.capacityMax} guests</span>
                  </div>
                  <div className="pt-4 border-t border-[#FBCFE8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#475569] block">Price</span>
                      <span className="text-lg font-bold text-[#DB2777]">₹{venue.pricePerEvent.toLocaleString('en-IN')}</span>
                    </div>
                    <Link href={`/venues/${venue.id}`}>
                      <Button size="sm" className="bg-[#831843] hover:bg-[#6b1336] text-white rounded-xl">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
