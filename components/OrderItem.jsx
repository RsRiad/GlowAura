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
                <td className="py-3 px-3 bg-rose-50/15 rounded-l-2xl border-y border-l border-rose-100/15">
                    <div className="flex flex-col gap-3">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <div className="flex items-center justify-center bg-white size-14 rounded-lg border border-rose-100/20 shadow-sm overflow-hidden shrink-0">
                                    <Image
                                        className="h-10 w-auto object-contain p-1"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-bold text-slate-900 text-sm leading-tight tracking-tight">{item.product.name}</p>
                                    <p className="text-[10px] font-medium text-slate-400">{currency}{item.price} <span className="mx-1.5 text-rose-100/30">|</span> Qty: {item.quantity}</p>
                                    <p className="text-[8px] text-rose-300 font-bold uppercase tracking-widest">{new Date(order.createdAt).toDateString()}</p>
                                    <div className="pt-1">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-rose-500 font-bold uppercase tracking-widest text-[8px] hover:text-rose-600 transition-all ${order.status !== "DELIVERED" && 'hidden'}`}>Review Experience</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="py-3 text-center bg-rose-50/15 border-y border-rose-100/15 font-bold text-slate-900 text-sm tracking-tight max-md:hidden">
                    {currency}{order.total.toLocaleString()}
                </td>

                <td className="py-3 px-3 bg-rose-50/15 border-y border-rose-100/15 text-left max-md:hidden">
                    <div className="space-y-0.5 text-[11px] font-medium text-slate-500">
                        <p className="text-slate-900 font-bold tracking-tight">{order.address.name}</p>
                        <p className="truncate max-w-[150px]">{order.address.street}</p>
                        <p className="text-[8px] font-bold text-rose-200 uppercase tracking-widest">{order.address.phone}</p>
                    </div>
                </td>

                <td className="py-3 px-3 bg-rose-50/15 rounded-r-2xl border-y border-r border-rose-100/15 max-md:hidden">
                    <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[8px] font-bold uppercase tracking-widest ${order.status === 'confirmed'
                            ? 'text-amber-600 bg-amber-50/30 border-amber-100'
                            : order.status === 'delivered'
                                ? 'text-rose-600 bg-rose-50 border-rose-100 shadow-sm shadow-rose-50'
                                : 'text-slate-400 bg-slate-50 border-slate-200'
                            }`}
                    >
                        <div className={`size-1 rounded-full ${order.status === 'confirmed' ? 'bg-amber-500' : order.status === 'delivered' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
                        {order.status.split('_').join(' ')}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrderItem