'use client'
import Image from "next/image";
import { DotIcon } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";

const OrderItem = ({ order, setRatingModal }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const { ratings } = useSelector(state => state.rating);

    return (
        <>
            <tr className="group animate-soft-reveal">
                <td className="py-4 px-4 bg-rose-50/20 rounded-l-2xl border-y border-l border-rose-100/20">
                    <div className="flex flex-col gap-4">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex gap-6 items-center">
                                <div className="flex items-center justify-center bg-white size-16 rounded-xl border border-rose-100/30 shadow-sm overflow-hidden transition-all duration-500">
                                    <Image
                                        className="h-12 w-auto object-contain p-1"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-black text-slate-900 text-base leading-tight italic tracking-tight">{item.product.name}</p>
                                    <p className="text-xs font-semibold text-slate-400 italic">{currency}{item.price} <span className="mx-2 text-rose-100/30">|</span> Qty: {item.quantity}</p>
                                    <p className="text-[9px] text-rose-300 font-black uppercase tracking-widest italic">{new Date(order.createdAt).toDateString()}</p>
                                    <div className="pt-2">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-rose-600 font-black uppercase tracking-widest text-[9px] hover:text-rose-700 transition-all ${order.status !== "DELIVERED" && 'hidden'} italic`}>Experience Review</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="py-4 text-center bg-rose-50/20 border-y border-rose-100/20 font-black text-slate-900 text-base italic tracking-tighter max-md:hidden">
                    {currency}{order.total.toLocaleString()}
                </td>

                <td className="py-4 px-4 bg-rose-50/20 border-y border-rose-100/20 text-left max-md:hidden">
                    <div className="space-y-1 text-xs font-semibold text-slate-500 italic">
                        <p className="text-slate-900 font-black not-italic tracking-tight">{order.address.name}</p>
                        <p>{order.address.street}</p>
                        <p className="text-[9px] not-italic font-black text-rose-200 uppercase tracking-widest">{order.address.phone}</p>
                    </div>
                </td>

                <td className="py-4 px-4 bg-rose-50/20 rounded-r-2xl border-y border-r border-rose-100/20 max-md:hidden">
                    <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest italic ${order.status === 'confirmed'
                            ? 'text-amber-600 bg-amber-50/30 border-amber-100'
                            : order.status === 'delivered'
                                ? 'text-rose-600 bg-rose-50 border-rose-100 shadow-sm shadow-rose-50'
                                : 'text-slate-400 bg-slate-50 border-slate-200'
                            }`}
                    >
                        <div className={`size-1.5 rounded-full ${order.status === 'confirmed' ? 'bg-amber-500' : order.status === 'delivered' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
                        {order.status.split('_').join(' ')}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrderItem