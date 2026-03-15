'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-14 text-sm text-slate-500 font-medium">

            {/* Tabs */}
            <div className="flex border-b border-rose-100 mb-8 max-w-2xl animate-reveal [animation-delay:200ms]">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button 
                        className={`${tab === selectedTab ? 'border-b-2 border-rose-600 text-rose-950 font-black italic tracking-tight' : 'text-rose-200 hover:text-rose-400'} px-6 py-3 text-[11px] uppercase tracking-widest transition-all`} 
                        key={index} 
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <div className="max-w-xl leading-relaxed italic animate-reveal [animation-delay:400ms]">
                    <p>{product.description}</p>
                </div>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-10 animate-reveal [animation-delay:400ms]">
                    {product.rating.map((item,index) => (
                        <div key={index} className="flex gap-6 mb-12 p-6 bg-rose-50/20 rounded-3xl border border-rose-100/30">
                            <Image src={item.user.image} alt="" className="size-12 rounded-full border-2 border-white shadow-sm" width={100} height={100} />
                            <div className="flex-1">
                                <div className="flex items-center gap-1.5" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={14} className='transition-all' fill={item.rating >= index + 1 ? "#fbbf24" : "transparent"} stroke={item.rating >= index + 1 ? "#fbbf24" : "#e2e8f0"} />
                                    ))}
                                </div>
                                <p className="text-sm font-semibold max-w-lg my-4 text-slate-600 italic leading-relaxed">"{item.review}"</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-black text-rose-950 italic tracking-tight">{item.user.name}</p>
                                    <p className="text-[10px] font-black text-rose-200 uppercase tracking-widest">{new Date(item.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex items-center gap-5 mt-16 p-6 bg-rose-950 rounded-[2.5rem] text-white animate-reveal [animation-delay:600ms] shadow-xl">
                <div className="size-14 rounded-full border-2 border-rose-500/50 p-1 flex items-center justify-center relative overflow-hidden">
                    <Image src={product.store.logo} alt="" className="w-full h-full rounded-full object-cover" width={100} height={100} />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-rose-300 uppercase tracking-[0.2em] italic mb-1">Curation By</p>
                    <p className="text-xl font-black italic tracking-tighter">{product.store.name}</p>
                </div>
                <Link href={`/shop/${product.store.username}`} className="premium-button py-3 px-8 text-[10px] tracking-widest"> 
                    Visit Gallery
                </Link>
            </div>
        </div>
    )
}

export default ProductDescription