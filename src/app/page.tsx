import Link from 'next/link'
import { Search, MapPin, Calendar, Users, Sparkles, ShieldCheck, Heart, Star, CheckCircle, Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843] selection:bg-[#DB2777] selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#FBCFE8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DB2777] to-[#831843] flex items-center justify-center text-white shadow-lg shadow-[#DB2777]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-[#831843] to-[#DB2777] bg-clip-text text-transparent">
              ShaadiSthal
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/venues" className="hover:text-[#DB2777] transition-colors">Wedding Venues</Link>
            <Link href="/caterers" className="hover:text-[#DB2777] transition-colors">Catering Services</Link>
            <Link href="#how-it-works" className="hover:text-[#DB2777] transition-colors">How It Works</Link>
            <Link href="#cities" className="hover:text-[#DB2777] transition-colors">Popular Cities</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold hover:text-[#DB2777] transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <Button className="bg-[#DB2777] hover:bg-[#be185d] text-white font-semibold rounded-full px-6 shadow-lg shadow-[#DB2777]/25">
                Register Vendor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DB2777]/10 border border-[#DB2777]/20 text-[#DB2777] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> India’s Premier Wedding Venues & Caterers Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-6 tracking-tight leading-[1.1]">
            Find Your Dream <br />
            <span className="bg-gradient-to-r from-[#DB2777] to-[#A16207] bg-clip-text text-transparent">
              Marriage Hall & Caterer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#475569] mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover verified marriage halls, compare per-plate catering menus, check live availability, and reserve your dates securely with advance payments.
          </p>

          {/* Search Bar Widget */}
          <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-2xl border border-[#FBCFE8] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF2F8]/60 border border-[#FBCFE8]/50 text-left">
              <MapPin className="w-5 h-5 text-[#DB2777] shrink-0" />
              <div>
                <div className="text-[10px] font-semibold text-[#475569] uppercase">City or Location</div>
                <input type="text" placeholder="e.g. Jaipur, Mumbai, Delhi" className="w-full bg-transparent text-sm font-semibold text-[#831843] focus:outline-none" defaultValue="Jaipur" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF2F8]/60 border border-[#FBCFE8]/50 text-left">
              <Calendar className="w-5 h-5 text-[#DB2777] shrink-0" />
              <div>
                <div className="text-[10px] font-semibold text-[#475569] uppercase">Event Date</div>
                <input type="date" className="w-full bg-transparent text-sm font-semibold text-[#831843] focus:outline-none" defaultValue="2026-12-15" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF2F8]/60 border border-[#FBCFE8]/50 text-left">
              <Users className="w-5 h-5 text-[#DB2777] shrink-0" />
              <div>
                <div className="text-[10px] font-semibold text-[#475569] uppercase">Guest Count</div>
                <input type="number" placeholder="500 Guests" className="w-full bg-transparent text-sm font-semibold text-[#831843] focus:outline-none" defaultValue={500} />
              </div>
            </div>

            <Link href="/venues" className="w-full">
              <Button className="w-full h-full py-4 bg-[#DB2777] hover:bg-[#be185d] text-white font-bold rounded-2xl shadow-xl shadow-[#DB2777]/30 flex items-center justify-center gap-2 text-base">
                <Search className="w-5 h-5" /> Search Venues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#FBCFE8]">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold text-[#DB2777] uppercase tracking-wider mb-2">Verified Marriage Halls</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#831843]">Featured Wedding Venues</h2>
          </div>
          <Link href="/venues" className="text-sm font-bold text-[#DB2777] hover:underline flex items-center gap-1">
            View All Venues <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#FBCFE8] shadow-lg hover:shadow-xl transition-all group">
            <div className="relative h-64 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" alt="Venue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#831843] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Jaipur • Civil Lines</span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#A16207]">
                  <Star className="w-3.5 h-3.5 fill-[#A16207]" /> 4.9 (48)
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#831843]">The Royal Palace Grand Ballroom</h3>
              <p className="text-xs text-[#475569] line-clamp-2">Magnificent heritage palace featuring crystal chandeliers, air-conditioned banquet halls, and lush manicured lawns.</p>
              <div className="pt-4 border-t border-[#FBCFE8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#475569] block">Starting from</span>
                  <span className="text-lg font-bold text-[#DB2777]">₹2,50,000 <span className="text-xs font-normal text-[#475569]">/ event</span></span>
                </div>
                <Link href="/venues">
                  <Button size="sm" className="bg-[#831843] hover:bg-[#6b1336] text-white rounded-xl">Check Dates</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#FBCFE8] bg-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DB2777] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-lg text-[#831843]">ShaadiSthal</span>
          </div>
          <p className="text-xs text-[#475569]">
            © 2026 ShaadiSthal Technologies India Pvt. Ltd. All rights reserved. Trusted by over 10,000 couples.
          </p>
        </div>
      </footer>
    </div>
  )
}
