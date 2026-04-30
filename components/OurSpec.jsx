"use client"
import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'
import HydrationGuard from './HydrationGuard'

const OurSpecs = () => {

    return (
        <HydrationGuard>
            <section className='px-6 my-12 max-w-7xl mx-auto'>
                <Title 
                    title='GlowAura Standard' 
                    description="We redefine excellence. Enjoy a shopping experience crafted for enthusiasts, by enthusiasts." 
                />

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                    {
                        ourSpecsData.map((spec, index) => {
                            return (
                                <div className='premium-card p-10 flex flex-col items-center text-center group relative overflow-hidden animate-reveal' style={{ animationDelay: `${index * 150}ms` }} key={index}>
                                    <div className='absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    <div className='relative z-10'>
                                        <div className='size-14 bg-rose-600 text-white flex items-center justify-center rounded-[1.25rem] mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-rose-100 animate-float' style={{ animationDelay: `${index * 200}ms` }}>
                                            <spec.icon size={24} />
                                        </div>
                                        <h3 className='text-slate-900 font-black text-xl mb-4 italic tracking-tighter'>{spec.title}</h3>
                                        <p className='text-sm text-slate-500 leading-relaxed font-medium'>{spec.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </HydrationGuard>
    )
}

export default OurSpecs