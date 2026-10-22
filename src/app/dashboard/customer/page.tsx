'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, Clock, DollarSign, ShieldCheck, ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

export default function CustomerDashboard() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/customer')
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
            <h1 className="text-3xl font-serif font-bold">Welcome, Priya Verma!</h1>
            <p className="text-sm text-[#475569] mt-1">Manage your wedding venue bookings, payments, and quotations here.</p>
          </div>
          <Link href="/venues">
            <Button className="bg-[#DB2777] hover:bg-[#be185d] text-white rounded-xl">Book New Venue</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#831843]">My Bookings</h2>
          {loading ? (
            <div className="text-center py-12 text-[#475569]">Loading bookings...</div>
          ) : !dashboard || dashboard.bookings?.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-[#FBCFE8] text-center space-y-4">
              <p className="text-[#475569]">You haven't booked any wedding venues yet.</p>
              <Link href="/venues">
                <Button className="bg-[#831843] hover:bg-[#6b1336] text-white rounded-xl">Explore Venues Now</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {dashboard.bookings.map((booking: any) => (
                <div key={booking.id} className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                      {booking.status}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#831843]">{booking.venue?.name}</h3>
                    <p className="text-xs text-[#475569] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#DB2777]" /> Event Date: {new Date(booking.eventDate).toLocaleDateString()} • {booking.eventType} ({booking.guestCount} Guests)
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs text-[#475569] block">Total Amount</span>
                    <span className="text-xl font-bold text-[#DB2777]">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                    <div className="pt-2">
                      <Button size="sm" className="bg-[#831843] hover:bg-[#6b1336] text-white rounded-xl">Pay Advance (Razorpay)</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
