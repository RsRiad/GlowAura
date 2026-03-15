'use client'
import Link from "next/link"

const AdminNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-4 glassmorphism border-b border-rose-100 shadow-sm transition-all">
            <Link href="/" className="relative text-3xl font-black text-slate-800 italic tracking-tighter group hover:scale-105 transition-all duration-500">
                <span className="text-rose-600">Glow</span>Aura<span className="text-rose-600 text-4xl leading-0">.</span>
                <p className="absolute -top-1 -right-14 bg-rose-600 text-white text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-[0.2em] scale-75 shadow-sm shadow-rose-100">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-[0.15em] text-[10px]">
                <p className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full border border-rose-100 italic lowercase tracking-tight font-medium text-xs">system controller</p>
                <p className="px-4 py-2 border border-slate-200 rounded-full">Hi, Admin</p>
            </div>
        </div>
    )
}

export default AdminNavbar