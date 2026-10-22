'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, DollarSign, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

export default function VendorDashboard() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/vendor')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDashboard(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#FBCFE8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo className="w-11 h-11" />
          <div className="flex items-center gap-4">
            <Link href="/venues" className="text-sm font-semibold hover:text-[#DB2777]">Browse Venues</Link>
            <Link href="/login" className="text-sm font-semibold hover:text-[#DB2777]">Logout</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg flex items-center justify-between">
          <div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 inline-flex items-center gap-1 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Vendor Partner
            </span>
            <h1 className="text-3xl font-serif font-bold">Vendor Dashboard</h1>
            <p className="text-sm text-[#475569] mt-1">Manage your wedding venues, catering packages, bookings, and earnings.</p>
          </div>
          <Button className="bg-[#DB2777] hover:bg-[#be185d] text-white rounded-xl">Add New Listing</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Total Listings</span>
            <div className="text-3xl font-bold text-[#831843]">2 Active</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Total Bookings</span>
            <div className="text-3xl font-bold text-[#DB2777]">12 Confirmed</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Total Revenue</span>
            <div className="text-3xl font-bold text-emerald-700">₹6,50,000</div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#831843]">Incoming Booking Requests</h2>
          {loading ? (
            <div className="text-center py-12 text-[#475569]">Loading bookings...</div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#FBCFE8]">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#831843]">The Royal Palace Grand Ballroom</h3>
                  <p className="text-xs text-[#475569] flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-[#DB2777]" /> Event Date: 15 Dec 2026 • Wedding (500 Guests)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Accept</Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">Decline</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
