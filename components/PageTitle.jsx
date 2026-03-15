'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const PageTitle = ({ heading, text, path = "/", linkText }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 my-12">
            <div className="space-y-1">
                <h1 className="text-4xl md:text-6xl font-black text-rose-950 tracking-tighter leading-tight italic">
                    {heading}<span className="text-rose-600">.</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    {text}
                </p>
            </div>
            {linkText && (
                <Link 
                    href={path} 
                    className="group inline-flex items-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-rose-700 transition-all whitespace-nowrap"
                >
                    {linkText}
                    <div className="size-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center group-hover:bg-rose-100 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-rose-100">
                        <ArrowRightIcon size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </Link>
            )}
        </div>
    )
}

export default PageTitle