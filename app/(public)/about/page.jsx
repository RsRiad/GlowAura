'use client'
import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import Title from '@/components/Title'
import { CheckCircle2, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import HydrationGuard from '@/components/HydrationGuard'

const AboutPage = () => {
    return (
        <HydrationGuard>
            <main className="min-h-screen pt-12 pb-24">
                {/* Hero Section */}
                <section className="px-6 max-w-7xl mx-auto">
                    <div className="relative h-[400px] rounded-[3rem] overflow-hidden group">
                        <Image 
                            src={assets.hero_model_img} 
                            alt="About GlowAura" 
                            fill 
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-[3s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 via-rose-950/40 to-transparent flex flex-col justify-center px-12 sm:px-24">
                            <span className="text-rose-400 font-black uppercase tracking-[0.4em] text-xs mb-4">Our Essence</span>
                            <h1 className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter leading-tight max-w-2xl">
                                Redefining <br /> Luminous <br /> Beauty.
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="px-6 max-w-5xl mx-auto mt-24 text-center">
                    <Title title="Our Story" description="Born from a passion for radiance, GlowAura is more than just a brand—it's a celebration of your natural light." />
                    <div className="mt-12 space-y-8 text-lg text-slate-600 font-medium leading-relaxed">
                        <p>
                            At GlowAura, we believe that beauty isn't something you put on—it's something you illuminate. Founded in 2024, our mission has always been to bridge the gap between scientific innovation and the timeless rituals of self-care.
                        </p>
                        <p>
                            We travel the world to source the finest botanical extracts and combine them with cutting-edge skincare technology. Every product in our collection is a testament to our commitment to quality, efficacy, and the sheer joy of glowing skin.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="px-6 max-w-7xl mx-auto mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Sparkles, title: "Pure Efficacy", desc: "Results-driven formulas that actually work." },
                            { icon: ShieldCheck, title: "Safe Choice", desc: "Dermatologically tested and toxin-free." },
                            { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals, ever." },
                            { icon: CheckCircle2, title: "Authentic", desc: "100% original premium products." }
                        ].map((v, i) => (
                            <div key={i} className="premium-card p-10 flex flex-col items-center text-center group">
                                <div className="size-16 bg-rose-600 text-white flex items-center justify-center rounded-2xl mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-rose-100">
                                    <v.icon size={28} />
                                </div>
                                <h3 className="font-black text-xl italic tracking-tighter mb-2 text-slate-900">{v.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-snug">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </HydrationGuard>
    )
}

export default AboutPage
