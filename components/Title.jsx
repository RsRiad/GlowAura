'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, href }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-reveal">
            <div className="space-y-2 text-left w-full">
                <h2 className="text-3xl md:text-5xl font-black text-rose-950 tracking-tighter italic">
                    {title}
                </h2>
                <p className="text-slate-500 font-semibold max-w-xl italic text-sm">
                    {description}
                </p>
            </div>
            {href && (
                <Link 
                    href={href} 
                    className="group inline-flex items-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-rose-700 transition-all whitespace-nowrap"
                >
                    View All Collection
                    <div className="size-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center group-hover:bg-rose-100 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-rose-100">
                        <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Title