import Link from 'next/link'

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`relative rounded-full overflow-hidden shadow-md border border-[#FBCFE8] bg-white flex items-center justify-center p-0.5 ${className}`}>
        <img src="/logo.png" alt="Shaadi Karwadi Logo" className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform" />
      </div>
      <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-[#831843] to-[#DB2777] bg-clip-text text-transparent">
        Shaadi Karwadi
      </span>
    </Link>
  )
}
