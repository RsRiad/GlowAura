"use client"
import React from 'react'
import Title from './Title'
import HydrationGuard from './HydrationGuard'

const Newsletter = () => {
    return (
        <HydrationGuard>
            <section className='px-6 my-32 max-w-7xl mx-auto'>
                <div className='relative bg-rose-950 rounded-[3.5rem] p-12 md:p-24 overflow-hidden text-center animate-reveal'>
                    <div className='absolute inset-0 bg-gradient-to-tr from-rose-600/20 via-amber-500/5 to-transparent opacity-50'></div>
                    <div className='relative z-10 max-w-2xl mx-auto'>
                        <h2 className='text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter italic'>Stay in the Glow.</h2>
                        <p className='text-rose-100/70 font-medium mb-12 text-sm md:text-base leading-relaxed italic'>
                            Join our exclusive sanctuary to receive early access to ethereal collection drops, artisan deals, and the latest innovations delivered with grace.
                        </p>
                        <div className='flex flex-col sm:flex-row bg-white/5 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/10 focus-within:ring-2 focus-within:ring-rose-500/50 transition-all'>
                            <input 
                                className='flex-1 px-8 py-4 bg-transparent outline-none text-white placeholder-rose-200/40 text-base font-medium' 
                                type="email" 
                                placeholder='your.grace@ethereal.com' 
                            />
                            <button className='premium-button py-4 px-12 whitespace-nowrap text-[10px] tracking-[0.2em] font-black uppercase'>
                                Join the Sanctuary
                            </button>
                        </div>
                        <p className='text-[10px] text-rose-300/40 uppercase tracking-[0.3em] mt-10 font-black'>
                            Pure Intentions. Artisan Innovation. Unsubscribe with Grace.
                        </p>
                    </div>
                </div>
            </section>
        </HydrationGuard>
    )
}

export default Newsletter