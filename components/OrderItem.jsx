'use client'
import Image from "next/image";
import { DotIcon } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);

    const { ratings } = useSelector(state => state.rating);

    return (
        <>
            <tr className="group animate-reveal">
                <td className="py-8 px-6 bg-rose-50/30 rounded-l-[2.5rem] border-y border-l border-rose-100/30">
                    <div className="flex flex-col gap-8">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex gap-8 items-center">
                                <div className="flex items-center justify-center bg-white size-24 rounded-2xl border border-rose-100/50 shadow-sm overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Image
                                        className="h-16 w-auto object-contain p-2"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black text-rose-950 text-lg leading-tight italic tracking-tight">{item.product.name}</p>
                                    <p className="text-sm font-semibold text-slate-400 italic">{currency}{item.price} <span className="mx-3 text-rose-100/50">|</span> Qty: {item.quantity}</p>
                                    <p className="text-[10px] text-rose-300 font-black uppercase tracking-[0.2em] italic">{new Date(order.createdAt).toDateString()}</p>
                                    <div className="pt-3">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-rose-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-rose-700 transition-all transform hover:translate-x-1 ${order.status !== "DELIVERED" && 'hidden'} italic`}>Experience Review</button>
                                        }
                                    </div>
                                    {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="py-8 text-center bg-rose-50/30 border-y border-rose-100/30 font-black text-rose-950 text-xl italic tracking-tighter max-md:hidden">
                    {currency}{order.total.toLocaleString()}
                </td>

                <td className="py-8 px-6 bg-rose-50/30 border-y border-rose-100/30 text-left max-md:hidden">
                    <div className="space-y-2 text-sm font-semibold text-slate-500 italic">
                        <p className="text-rose-950 font-black not-italic tracking-tight">{order.address.name}</p>
                        <p>{order.address.street}</p>
                        <p>{order.address.city}, {order.address.state}</p>
                        <p className="text-[10px] not-italic font-black text-rose-200 uppercase tracking-widest">{order.address.phone}</p>
                    </div>
                </td>

                <td className="py-8 px-6 bg-rose-50/30 rounded-r-[2.5rem] border-y border-r border-rose-100/30 max-md:hidden">
                    <div
                        className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] italic ${order.status === 'confirmed'
                            ? 'text-amber-600 bg-amber-50/50 border-amber-100'
                            : order.status === 'delivered'
                                ? 'text-rose-600 bg-rose-50 border-rose-100 shadow-sm shadow-rose-100'
                                : 'text-slate-400 bg-slate-50 border-slate-200'
                            }`}
                    >
                        <div className={`size-2 rounded-full ${order.status === 'confirmed' ? 'bg-amber-500' : order.status === 'delivered' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
                        {order.status.split('_').join(' ')}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrderItem