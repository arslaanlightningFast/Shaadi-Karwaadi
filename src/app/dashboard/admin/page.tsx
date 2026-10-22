'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Users, Building2, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#FBCFE8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo className="w-11 h-11" />
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold hover:text-[#DB2777]">Home</Link>
            <Link href="/login" className="text-sm font-semibold hover:text-[#DB2777]">Logout</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg flex items-center justify-between">
          <div>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200 inline-flex items-center gap-1 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Platform Administrator
            </span>
            <h1 className="text-3xl font-serif font-bold">Admin Command Center</h1>
            <p className="text-sm text-[#475569] mt-1">Manage platform users, verify vendor documents, and monitor commissions.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Total Users</span>
            <div className="text-3xl font-bold text-[#831843]">1,240</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Active Venues</span>
            <div className="text-3xl font-bold text-[#DB2777]">85</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Catering Partners</span>
            <div className="text-3xl font-bold text-amber-700">42</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-2">
            <span className="text-xs text-[#475569] uppercase font-semibold">Platform Commission</span>
            <div className="text-3xl font-bold text-emerald-700">₹1,85,000</div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#831843]">Pending Vendor Verifications</h2>
          <div className="bg-white p-8 rounded-3xl border border-[#FBCFE8] shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-[#FBCFE8]">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#831843]">The Royal Palace & Banquets (Jaipur)</h3>
                <p className="text-xs text-[#475569] mt-1">GSTIN: 27AAAAA0000A1Z5 • PAN: ABCDE1234F</p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Verify & Approve</Button>
                <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">Reject</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
