'use client'
import { StarIcon } from 'lucide-react'
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
            <Link href={`/product/${product.id}`} className='group block animate-reveal'>
                <div className='premium-card p-5 group-hover:-translate-y-3 transition-all duration-700'>
                    <div className='bg-rose-50/30 relative aspect-square rounded-[1.5rem] flex items-center justify-center overflow-hidden mb-6 p-8'>
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-rose-200/10 pointer-events-none'></div>
                        <Image 
                            width={500} 
                            height={500} 
                            className='max-h-44 w-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-1000 ease-out animate-float' 
                            src={product.images[0]} 
                            alt={product.name} 
                        />
                    </div>
                    <div className='space-y-3'>
                        <div className='flex justify-between items-start gap-4'>
                            <p className='text-slate-800 font-bold text-lg italic tracking-tight line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors'>{product.name}</p>
                            <p className='font-black text-rose-950 text-xl italic tracking-tighter'>{currency}{product.price}</p>
                        </div>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='flex gap-0.5'>
                                {Array(5).fill('').map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={14} 
                                        className='transition-all duration-300'
                                        fill={rating >= index + 1 ? "#fbbf24" : "transparent"} 
                                        stroke={rating >= index + 1 ? "#fbbf24" : "#e2e8f0"}
                                    />
                                ))}
                            </div>
                            <span className='text-[10px] uppercase tracking-[0.2em] font-black text-rose-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500'>Luxe Details</span>
                        </div>
                    </div>
                </div>
            </Link>
        </HydrationGuard>
    )
}

export default ProductCard