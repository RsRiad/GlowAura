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
        <section className="min-h-screen mx-6 py-12 text-slate-900">
            <div className="max-w-7xl mx-auto">
                <PageTitle heading="Private Sanctuary" text="Gems selected with grace for your collection." linkText="Discover more" />

                <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
                    <div className="w-full lg:flex-1 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-4">
                                <thead className="animate-reveal [animation-delay:200ms]">
                                    <tr className="max-sm:text-sm text-rose-300 font-black uppercase tracking-[0.3em] text-[10px]">
                                        <th className="pb-6 px-6 italic">Gifts of Grace</th>
                                        <th className="pb-6 text-center italic">Quantity</th>
                                        <th className="pb-6 text-center italic">Subtotal</th>
                                        <th className="pb-6 text-center italic max-md:hidden">Release</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartArray.map((item, index) => (
                                        <tr key={index} className="group">
                                            <td className="py-6 px-6 bg-rose-50/30 rounded-l-[2rem] border-y border-l border-rose-100/30">
                                                <div className="flex gap-8 items-center">
                                                    <div className="flex items-center justify-center bg-white size-24 rounded-2xl border border-rose-100/50 shadow-sm overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                        <Image src={item.images[0]} className="h-16 w-auto object-contain p-2" alt="" width={80} height={80} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="font-black text-rose-950 text-lg leading-tight italic tracking-tight">{item.name}</p>
                                                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-rose-400 italic">{item.category}</p>
                                                        <p className="text-sm font-bold text-slate-400 italic">{currency}{item.price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 text-center bg-rose-50/30 border-y border-rose-100/30">
                                                <Counter productId={item.id} />
                                            </td>
                                            <td className="py-6 text-center bg-rose-50/30 border-y border-rose-100/30 font-black text-rose-950 text-lg italic tracking-tighter">
                                                {currency}{(item.price * item.quantity).toLocaleString()}
                                            </td>
                                            <td className="py-6 text-center bg-rose-50/30 rounded-r-[2rem] border-y border-r border-rose-100/30 max-md:hidden">
                                                <button 
                                                    onClick={() => handleDeleteItemFromCart(item.id)} 
                                                    className="size-10 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all rounded-xl border border-transparent hover:border-red-100 mx-auto"
                                                >
                                                    <Trash2Icon size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-96 shrink-0">
                        <OrderSummary totalPrice={totalPrice} items={cartArray} />
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <section className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-center animate-reveal">
            <div className="size-36 bg-rose-50/50 rounded-full flex items-center justify-center text-rose-200 mb-12 border border-rose-100/50 shadow-inner">
                <Trash2Icon size={56} className="animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-rose-950 tracking-tighter italic mb-6">Your Sanctuary is Empty</h1>
            <p className="text-slate-500 font-semibold italic text-lg mb-12">Discover your next graceful innovation today.</p>
            <button onClick={() => router.push('/shop')} className="premium-button px-14 py-5 text-lg">
                 Explore the Collection
            </button>
        </section>
    )
}