"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";
import HydrationGuard from "./HydrationGuard";

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  return (
    <HydrationGuard>
      <div className="mx-6">
        <div className="flex max-xl:flex-col gap-10 max-w-7xl mx-auto mt-8 mb-2">
          {/* ... existing hero code ... */}
          <div className="relative xl:flex-[1.4] flex max-md:flex-col bg-rose-950 rounded-[3rem] xl:min-h-[500px] group overflow-hidden animate-soft-reveal shadow-2xl shadow-rose-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,63,94,0.15),transparent)] pointer-events-none"></div>
            
            <div className="relative flex-1 p-8 sm:p-14 z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl text-rose-100 pr-5 p-2 rounded-full text-xs sm:text-sm border border-white/10 w-fit">
                <span className="bg-rose-600 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">
                  NEW
                </span>
                The Luminous Collection is here
                <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" size={16} />
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl leading-[1] my-8 font-black bg-gradient-to-br from-white via-rose-50 to-amber-100 bg-clip-text text-transparent italic tracking-tighter">
                Illuminate <br /> Your True <br /> Radiance.
              </h2>

              <div className="flex items-center gap-8 mt-4">
                <div className="flex flex-col">
                  <p className="uppercase tracking-[0.3em] text-[10px] text-rose-400 font-black mb-1">
                    Luxury Skincare
                  </p>
                  <p className="text-4xl font-black italic tracking-tighter text-white">
                    {currency}29.00
                  </p>
                </div>
                <Link href="/shop" className="premium-button group h-fit self-end mb-1 inline-flex items-center">
                  Discover Glow
                  <ArrowRightIcon className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
            </div>

            <div className="relative flex-1 min-h-[350px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-transparent to-transparent z-10 md:block hidden"></div>
              <Image
                className="object-cover object-center transition-transform duration-1000"
                src={assets.hero_model_img}
                alt="Ethereal Beauty"
                fill
                priority
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row xl:flex-col gap-6 w-full xl:max-w-sm transition-all duration-300">
            <div className="flex-1 flex items-center justify-between w-full bg-white rounded-[2.5rem] p-8 border border-rose-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 group animate-soft-reveal [animation-delay:200ms]">
              <div className="space-y-3">
                <p className="text-2xl font-black text-slate-900 tracking-tighter italic">
                  Divine <br /> Scent
                </p>
                <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[9px] bg-rose-50 px-3 py-1.5 rounded-full w-fit">
                  Explore Now
                  <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={12} />
                </div>
              </div>
              <Image
                className="w-28 group-hover:-rotate-6 transition-all duration-1000 animate-float"
                src={assets.hero_product_img1}
                alt="Fragrance"
              />
            </div>

            <div className="flex-1 flex items-center justify-between w-full bg-rose-50/50 rounded-[2.5rem] p-8 border border-rose-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 group animate-soft-reveal [animation-delay:400ms]">
              <div className="space-y-3">
                <p className="text-2xl font-black text-rose-950 tracking-tighter italic">
                  Pure <br /> Rituals
                </p>
                <p className="text-rose-600/70 font-bold text-base italic">
                  Up to 30% Off
                </p>
                <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[9px] bg-rose-600 px-3 py-1.5 rounded-full w-fit">
                  Claim Deal
                  <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" size={12} />
                </div>
              </div>
              <Image
                className="w-28 group-hover:rotate-6 transition-all duration-1000 animate-float [animation-delay:1s]"
                src={assets.hero_product_img2}
                alt="Skincare"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <CategoriesMarquee />
        </div>
      </div>
    </HydrationGuard>
  );
};

export default Hero;
