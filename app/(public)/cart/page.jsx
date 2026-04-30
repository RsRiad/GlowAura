'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <section className="min-h-screen mx-6 py-10 text-slate-900 animate-soft-reveal">
            <div className="max-w-7xl mx-auto">
                <PageTitle heading="Your Cart" text="Review your selected premium finds." linkText="Keep Shopping" />

                <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mt-10">
                    <div className="w-full lg:flex-1 bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <thead className="animate-soft-reveal">
                                    <tr className="max-sm:text-sm text-slate-400 font-black uppercase tracking-widest text-[9px]">
                                        <th className="pb-4 px-4 italic">Product</th>
                                        <th className="pb-4 text-center italic">Quantity</th>
                                        <th className="pb-4 text-center italic">Subtotal</th>
                                        <th className="pb-4 text-center italic max-md:hidden">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartArray.map((item, index) => (
                                        <tr key={index} className="group">
                                            <td className="py-4 px-4 bg-rose-50/20 rounded-l-2xl border-y border-l border-rose-100/20">
                                                <div className="flex gap-6 items-center">
                                                    <div className="flex items-center justify-center bg-white size-16 rounded-xl border border-rose-100/30 shadow-sm overflow-hidden transition-all duration-500">
                                                        <Image src={item.images[0]} className="h-12 w-auto object-contain p-1" alt="" width={60} height={60} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="font-black text-slate-900 text-base leading-tight italic tracking-tight">{item.name}</p>
                                                        <p className="text-[9px] uppercase tracking-widest font-black text-rose-400 italic">{item.category}</p>
                                                        <p className="text-xs font-bold text-slate-400 italic">{currency}{item.price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center bg-rose-50/20 border-y border-rose-100/20">
                                                <Counter productId={item.id} />
                                            </td>
                                            <td className="py-4 text-center bg-rose-50/20 border-y border-rose-100/20 font-black text-slate-900 text-base italic tracking-tighter">
                                                {currency}{(item.price * item.quantity).toLocaleString()}
                                            </td>
                                            <td className="py-4 text-center bg-rose-50/20 rounded-r-2xl border-y border-r border-rose-100/20 max-md:hidden">
                                                <button 
                                                    onClick={() => handleDeleteItemFromCart(item.id)} 
                                                    className="size-8 flex items-center justify-center text-slate-300 hover:bg-rose-100 hover:text-rose-600 transition-all rounded-lg mx-auto"
                                                >
                                                    <Trash2Icon size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-80 shrink-0">
                        <OrderSummary totalPrice={totalPrice} items={cartArray} />
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <section className="min-h-[70vh] mx-6 flex flex-col items-center justify-center text-center animate-soft-reveal">
            <div className="size-24 bg-rose-50/50 rounded-full flex items-center justify-center text-rose-200 mb-8 border border-rose-100/50 shadow-inner">
                <Trash2Icon size={40} className="animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic mb-4">Your Cart is Empty</h1>
            <p className="text-slate-500 font-semibold italic text-base mb-8">Start adding some premium finds to your collection.</p>
            <button onClick={() => router.push('/shop')} className="premium-button px-10 py-4 text-base">
                 Start Shopping
            </button>
        </section>
    )
}