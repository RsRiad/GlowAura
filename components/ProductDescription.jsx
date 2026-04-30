'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-16 text-sm text-slate-600 font-medium animate-soft-reveal">
            {/* Tabs */}
            <div className="flex gap-10 border-b border-rose-100 mb-10">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button 
                        className={`${tab === selectedTab ? 'border-b-2 border-rose-600 text-slate-900 font-black italic' : 'text-slate-400 hover:text-rose-400'} px-2 py-4 text-[10px] uppercase tracking-widest transition-all`} 
                        key={index} 
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[200px]">
                {selectedTab === "Description" && (
                    <div className="max-w-2xl leading-relaxed text-base italic text-slate-500 animate-soft-reveal">
                        <p>{product.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                            <div className="p-6 bg-rose-50/30 rounded-[1.5rem] border border-rose-100/50">
                                <p className="text-[9px] font-black uppercase tracking-widest text-rose-400 mb-2">Key Highlight</p>
                                <p className="text-sm font-bold text-slate-800 leading-snug">Ethically sourced premium ingredients for a natural glow.</p>
                            </div>
                            <div className="p-6 bg-rose-50/30 rounded-[1.5rem] border border-rose-100/50">
                                <p className="text-[9px] font-black uppercase tracking-widest text-rose-400 mb-2">Artisan Crafted</p>
                                <p className="text-sm font-bold text-slate-800 leading-snug">Carefully curated by {product.store.name} experts.</p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === "Reviews" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-soft-reveal">
                        {product.rating.map((item, index) => (
                            <div key={index} className="p-6 bg-white rounded-[2rem] border border-rose-100/30 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image src={item.user.image} alt="" className="size-10 rounded-full border border-rose-100" width={100} height={100} />
                                    <div>
                                        <p className="font-black text-slate-900 text-sm italic leading-none mb-1">{item.user.name}</p>
                                        <div className="flex items-center gap-0.5">
                                            {Array(5).fill('').map((_, i) => (
                                                <StarIcon key={i} size={10} fill={item.rating >= i + 1 ? "#fbbf24" : "transparent"} stroke={item.rating >= i + 1 ? "#fbbf24" : "#e2e8f0"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 italic leading-relaxed">"{item.review}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Store Curation */}
            <div className="mt-20 p-8 bg-rose-950 rounded-[3rem] text-white flex flex-col sm:flex-row items-center gap-8 shadow-2xl shadow-rose-900/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(244,63,94,0.1),transparent)]"></div>
                <div className="size-20 rounded-full border-2 border-rose-500/30 p-1 flex items-center justify-center relative z-10 shrink-0">
                    <Image src={product.store.logo} alt="" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-700" width={100} height={100} />
                </div>
                <div className="flex-1 text-center sm:text-left relative z-10">
                    <p className="text-[9px] font-black text-rose-400 uppercase tracking-[0.3em] mb-2">Curated With Excellence</p>
                    <p className="text-2xl font-black italic tracking-tighter mb-1">{product.store.name}</p>
                    <p className="text-xs text-rose-100/60 font-medium">Verified Artisan Partner since 2024</p>
                </div>
                <Link href={`/shop/${product.store.username}`} className="bg-white text-rose-950 px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-colors relative z-10"> 
                    Visit Gallery
                </Link>
            </div>
        </div>
    )
}

export default ProductDescription