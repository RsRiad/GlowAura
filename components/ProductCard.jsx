'use client'
import { StarIcon, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HydrationGuard from './HydrationGuard'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = product.rating.length > 0 ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length) : 0;

    return (
        <HydrationGuard>
            <Link href={`/product/${product.id}`} className='group block animate-soft-reveal'>
                <div className='bg-white rounded-[1.5rem] p-3 border border-rose-100/20 shadow-sm hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-700 h-[360px] flex flex-col'>
                    <div className='relative h-52 w-full bg-rose-50/20 rounded-[1.25rem] overflow-hidden group-hover:bg-rose-50/40 transition-colors mb-3 flex items-center justify-center p-4'>
                        <div className='absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
                        <Image 
                            width={400} 
                            height={400} 
                            className='max-h-full w-auto object-contain group-hover:scale-110 group-hover:-rotate-3 transition-all duration-1000 ease-out drop-shadow-2xl' 
                            src={product.images[0]} 
                            alt={product.name} 
                        />
                        <div className='absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-100/50 shadow-sm'>
                            <p className='text-[10px] font-black text-rose-600 uppercase tracking-widest'>{product.category}</p>
                        </div>
                    </div>
                    
                    <div className='flex-1 flex flex-col justify-between space-y-3 px-2'>
                        <div>
                            <p className='text-slate-800 font-bold text-base leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors mb-1'>{product.name}</p>
                            <div className='flex gap-0.5'>
                                {Array(5).fill('').map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={12} 
                                        className='transition-all duration-300'
                                        fill={rating >= index + 1 ? "#fbbf24" : "transparent"} 
                                        stroke={rating >= index + 1 ? "#fbbf24" : "#e2e8f0"}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='flex items-end justify-between'>
                            <div className='flex flex-col'>
                                <p className='text-xs text-slate-400 font-semibold line-through'>{currency}{product.mrp}</p>
                                <p className='font-black text-slate-900 text-xl tracking-tighter italic'>{currency}{product.price}</p>
                            </div>
                            <button className='bg-rose-600 text-white p-2.5 rounded-xl hover:bg-rose-700 transition-all hover:scale-110 shadow-lg shadow-rose-100 group-hover:translate-x-0 transition-transform'>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </HydrationGuard>
    )
}

export default ProductCard