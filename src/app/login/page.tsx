'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      // Redirect based on role
      if (data.user.role === 'ADMIN') router.push('/dashboard/admin')
      else if (data.user.role === 'VENUE_MANAGER' || data.user.role === 'CATERER') router.push('/dashboard/vendor')
      else router.push('/dashboard/customer')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#831843] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#DB2777] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo className="w-14 h-14" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#831843]">Welcome Back</h2>
        <p className="mt-2 text-sm text-[#475569]">Sign in to manage your wedding venues and bookings</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl border border-[#FBCFE8]">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#DB2777]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@shaadikarwadi.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8]/40 text-sm text-[#831843] focus:outline-none focus:border-[#DB2777]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#DB2777]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password123!"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8]/40 text-sm text-[#831843] focus:outline-none focus:border-[#DB2777]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#DB2777] hover:bg-[#be185d] text-white font-bold rounded-xl shadow-lg shadow-[#DB2777]/25 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#FBCFE8] text-center text-xs text-[#475569]">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[#DB2777] hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
