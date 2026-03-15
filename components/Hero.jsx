"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";
import HydrationGuard from "./HydrationGuard";

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "৳";

  return (
    <HydrationGuard>
      <div className="mx-6">
        <div className="flex max-xl:flex-col gap-10 max-w-7xl mx-auto mt-8 mb-2">
          {/* ... existing hero code ... */}
          <div className="relative xl:flex-[1.4] flex flex-col bg-rose-950 rounded-[3rem] xl:min-h-[460px] group overflow-hidden animate-reveal">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>
            <div className="relative p-6 sm:p-12 z-10">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-rose-200 pr-5 p-1.5 rounded-full text-xs sm:text-sm border border-white/5">
                <span className="bg-rose-600 px-3 py-1 ml-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                  NEW
                </span>
                Ethereal Collection & Complimentary Shipping{" "}
                <ChevronRightIcon
                  className="group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </div>
              <h2 className="text-4xl sm:text-6xl leading-[1.1] my-8 font-black bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent max-w-xl italic tracking-tighter">
                Glow with Unrivaled Grace & Elegance.
              </h2>
              <div className="text-rose-100/80 text-sm font-medium mt-4 sm:mt-6 flex flex-col gap-1">
                <p className="uppercase tracking-[0.3em] text-[10px] text-rose-400 font-black">
                  Artisan Curated
                </p>
                <p className="text-5xl font-black italic tracking-tighter">
                  {currency}4.90
                </p>
              </div>
              <button className="premium-button mt-6 sm:mt-8 group">
                Discover the Glow
                <ArrowRightIcon
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </button>
            </div>
            <div className="absolute bottom-0 right-0 md:right-12 w-full sm:max-w-md hidden sm:block animate-float">
              <Image
                className="group-hover:scale-110 transition-transform duration-1000"
                src={assets.hero_model_img}
                alt="Premium Gadgets"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row xl:flex-col gap-6 w-full xl:max-w-xs transition-all duration-300">
            <div className="flex-1 flex items-center justify-between w-full bg-white rounded-[2.5rem] p-10 border border-rose-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-reveal [animation-delay:200ms]">
              <div className="space-y-4">
                <p className="text-3xl font-black text-slate-900 tracking-tighter italic">
                  Luxe Essentials
                </p>
                <p className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px] group-hover:text-rose-700 transition-colors">
                  Signature Series{" "}
                  <ArrowRightIcon
                    className="group-hover:translate-x-1 transition-transform"
                    size={14}
                  />
                </p>
              </div>
              <Image
                className="w-32 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 animate-float"
                src={assets.hero_product_img1}
                alt="Essentials"
              />
            </div>
            <div className="flex-1 flex items-center justify-between w-full bg-rose-50/50 rounded-[2.5rem] p-10 border border-rose-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-reveal [animation-delay:400ms]">
              <div className="space-y-4">
                <p className="text-3xl font-black text-rose-950 tracking-tighter italic">
                  Exclusive Offers
                </p>
                <p className="text-rose-600/70 font-bold text-lg italic">
                  Save 20% on Grace
                </p>
                <p className="flex items-center gap-2 text-rose-700 font-black uppercase tracking-widest text-[10px] group-hover:text-amber-600 transition-colors">
                  Access Benefit{" "}
                  <ArrowRightIcon
                    className="group-hover:translate-x-1 transition-transform"
                    size={14}
                  />
                </p>
              </div>
              <Image
                className="w-32 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 animate-float [animation-delay:1s]"
                src={assets.hero_product_img2}
                alt="Offers"
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
