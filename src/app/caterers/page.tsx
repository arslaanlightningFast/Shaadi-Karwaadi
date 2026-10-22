'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Utensils, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

export default function CaterersPage() {
  const [caterers, setCaterers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/caterers')
      .then(res => res.json())
      .then(data => {
        if (data.caterers) setCaterers(data.caterers)
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
            <Link href="/venues" className="text-sm font-semibold hover:text-[#DB2777]">Venues</Link>
            <Link href="/login" className="text-sm font-semibold hover:text-[#DB2777]">Sign In</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Wedding Catering Services & Menus</h1>
          <p className="text-[#475569] text-sm">Explore master caterers, royal menus, live chaat counters, and multi-course feasts for your wedding.</p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-[#475569]">Loading caterers...</div>
        ) : caterers.length === 0 ? (
          <div className="text-center py-24 text-[#475569]">No caterers found. Please run database seeding (`npx prisma db seed`).</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {caterers.map(caterer => (
              <div key={caterer.id} className="bg-white rounded-3xl overflow-hidden border border-[#FBCFE8] shadow-lg p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 inline-flex items-center gap-1 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Caterer
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#831843]">{caterer.name}</h3>
                  </div>
                  <span className="flex items-center gap-1 font-bold text-[#A16207] bg-amber-50 px-3 py-1 rounded-full text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#A16207]" /> 4.8
                  </span>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">{caterer.description}</p>

                <div>
                  <h4 className="text-xs font-bold uppercase text-[#831843] mb-2">Specialty Cuisines</h4>
                  <div className="flex flex-wrap gap-2">
                    {caterer.cuisines?.map((cuisine: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-[#FDF2F8] text-[#DB2777] text-xs font-semibold border border-[#FBCFE8]">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#FBCFE8]">
                  <h4 className="text-xs font-bold uppercase text-[#831843]">Signature Menus</h4>
                  {caterer.menus?.map((menu: any) => (
                    <div key={menu.id} className="p-4 rounded-2xl bg-[#FDF2F8]/60 border border-[#FBCFE8] flex items-center justify-between">
                      <div>
                        <h5 className="font-serif font-bold text-sm text-[#831843]">{menu.name}</h5>
                        <p className="text-[11px] text-[#475569]">{menu.description}</p>
                        <span className="text-xs font-bold text-[#DB2777] mt-1 block">₹{menu.pricePerPlate.toLocaleString('en-IN')} / plate (Min {menu.minGuests} guests)</span>
                      </div>
                      <Link href={`/caterers/${caterer.id}`}>
                        <Button size="sm" className="bg-[#831843] hover:bg-[#6b1336] text-white rounded-xl">View Menu</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
