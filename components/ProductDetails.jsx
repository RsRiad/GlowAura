'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    
    return (
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 flex flex-col-reverse sm:flex-row gap-8 animate-reveal">
                <div className="flex sm:flex-col gap-5 border border-rose-100/30">
                    {product.images.map((image, index) => (
                        <div 
                            key={index} 
                            onClick={() => setMainImage(product.images[index])} 
                            className={`size-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shadow-sm ${mainImage === image ? 'border-rose-600 ring-4 ring-rose-50 scale-105' : 'border-rose-100/50 hover:border-rose-200 hover:-translate-y-1'}`}
                        >
                            <Image src={image} className="w-full h-full object-contain p-2" alt="" width={80} height={80} />
                        </div>
                    ))}
                </div>
                <div className="flex-1 bg-white border border-rose-100/30 rounded-[3rem] flex items-center justify-center aspect-square shadow-[0_40px_100px_-20px_rgba(244,63,94,0.12)] overflow-hidden group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-transparent pointer-events-none"></div>
                    <Image src={mainImage} className="max-h-[75%] w-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-[1.5s] animate-float" alt={product.name} width={600} height={600} priority />
                </div>
            </div>
            
            <div className="lg:w-1/2 space-y-10">
                <div className="space-y-6 animate-reveal [animation-delay:200ms]">
                    <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 bg-rose-50/50 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-rose-100 italic">
                            Artisan GlowAura
                        </span>
                        <div className="flex items-center gap-1.5">
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon 
                                    key={index} 
                                    size={16} 
                                    className="transition-all duration-300"
                                    fill={averageRating >= index + 1 ? "#fbbf24" : "transparent"} 
                                    stroke={averageRating >= index + 1 ? "#fbbf24" : "#e2e8f0"}
                                />
                            ))}
                            <span className="text-xs font-black text-rose-200 ml-2 tracking-widest">{averageRating.toFixed(1)}</span>
                        </div>
                    </div>
                    <h1 className="relative text-4xl md:text-5xl font-black text-rose-950 tracking-tighter leading-tight italic">
                        {product.name}
                        <div className="absolute -z-10 -top-12 -left-12 w-48 h-48 bg-rose-200/20 blur-3xl rounded-full"></div>
                    </h1>
                </div>

                <div className="space-y-2 animate-reveal [animation-delay:400ms]">
                    <div className="flex items-baseline gap-4">
                        <p className="text-4xl font-black text-rose-950 tracking-tighter italic">{currency}{product.price}</p>
                        {product.mrp > product.price && (
                            <p className="text-2xl text-slate-300 line-through font-bold italic translate-y-[-2px]">{currency}{product.mrp}</p>
                        )}
                    </div>
                    {product.mrp > product.price && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50/50 text-amber-600 rounded-xl text-[10px] font-black border border-amber-100/50 uppercase tracking-[0.2em] italic">
                            <TagIcon size={12} className="animate-pulse" />
                            Graceful Savings: {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% OFF
                        </div>
                    )}
                </div>

                <div className="p-8 bg-rose-50/30 rounded-[2.5rem] border border-rose-100/50 space-y-8 animate-reveal [animation-delay:600ms] shadow-inner shadow-rose-100/20">
                    {cart[productId] && (
                        <div className="space-y-4 text-center">
                            <p className="text-[10px] font-black text-rose-300 uppercase tracking-[0.3em] italic">Select Graceful Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}
                    
                    <button 
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} 
                        className="premium-button w-full py-5 text-lg animate-float font-black uppercase tracking-[0.2em]"
                    >
                        {!cart[productId] ? 'Add to Private Sanctuary' : 'Complete with Grace'}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 animate-reveal [animation-delay:800ms]">
                    <div className="flex items-center gap-5 group p-1 rounded-3xl hover:bg-white transition-colors">
                        <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-rose-300 border border-rose-100/50 group-hover:bg-rose-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all shadow-sm">
                            <EarthIcon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-rose-950 italic tracking-tight">Free Global Grace</p>
                            <p className="text-[10px] text-rose-200 uppercase font-black tracking-widest">Insured Delivery</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 group p-4 rounded-3xl hover:bg-white transition-colors">
                        <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-rose-300 border border-rose-100/50 group-hover:bg-rose-600 group-hover:text-white group-hover:-rotate-12 group-hover:scale-110 transition-all shadow-sm">
                            <CreditCardIcon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-rose-950 italic tracking-tight">Secure Sanctuary</p>
                            <p className="text-[10px] text-rose-200 uppercase font-black tracking-widest">100% Encrypted</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails