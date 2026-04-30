'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, ArrowRight as ArrowRightIcon } from "lucide-react";
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Image Gallery */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4 animate-soft-reveal">
                <div className="bg-white border border-rose-100/30 rounded-[2rem] flex items-center justify-center h-[300px] shadow-lg shadow-rose-100/10 overflow-hidden group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 to-transparent pointer-events-none"></div>
                    <Image src={mainImage} className="max-h-[85%] w-auto object-contain transition-all duration-1000 ease-out" alt={product.name} width={400} height={400} priority />
                </div>
                
                <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                    {product.images.map((image, index) => (
                        <div 
                            key={index} 
                            onClick={() => setMainImage(image)} 
                            className={`min-w-[60px] size-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${mainImage === image ? 'border-rose-600 shadow-md shadow-rose-50' : 'border-rose-100/50 hover:border-rose-200'}`}
                        >
                            <Image src={image} className="w-full h-full object-contain p-1.5" alt="" width={60} height={60} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Info Section */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center space-y-5 animate-soft-reveal">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon 
                                    key={index} 
                                    size={12} 
                                    fill={averageRating >= index + 1 ? "#fbbf24" : "transparent"} 
                                    stroke={averageRating >= index + 1 ? "#fbbf24" : "#e2e8f0"}
                                />
                            ))}
                            <span className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest">{averageRating.toFixed(1)}</span>
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-tight italic">
                        {product.name}
                    </h1>
                </div>

                <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-black text-rose-600 tracking-tighter italic">{currency}{product.price}</p>
                    {product.mrp > product.price && (
                        <p className="text-lg text-slate-300 line-through font-bold italic">{currency}{product.mrp}</p>
                    )}
                    {product.mrp > product.price && (
                        <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-md">
                            {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% Off
                        </span>
                    )}
                </div>

                <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 text-xs italic">
                    {product.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    {cart[productId] && (
                        <div className="flex items-center bg-rose-50 rounded-xl p-0.5 pr-3 border border-rose-100/50">
                            <Counter productId={productId} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 ml-3 hidden sm:block">In Cart</span>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} 
                        className="premium-button flex-1 py-3 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-rose-100"
                    >
                        {!cart[productId] ? 'Add to Cart' : 'Checkout Now'}
                        <ArrowRightIcon size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-rose-100">
                    <div className="flex items-center gap-3 group">
                        <div className="size-9 bg-rose-50 text-rose-600 flex items-center justify-center rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-all">
                            <EarthIcon size={16} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Free Shipping</p>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <div className="size-9 bg-rose-50 text-rose-600 flex items-center justify-center rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-all">
                            <CreditCardIcon size={16} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Secure Payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails