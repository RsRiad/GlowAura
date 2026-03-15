'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { orderDummyData } from "@/assets/assets";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Orders() {

    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(orderDummyData)
    }, []);

    return (
        <section className="min-h-screen mx-6 py-12">
            <div className="max-w-7xl mx-auto">
                {orders.length > 0 ? (
                    <div className="space-y-12">
                        <PageTitle heading="Orders History" text="Your exclusive procurement history." linkText="Keep Exploring" />

                        <div className="bg-white rounded-[4rem] border border-rose-100/30 p-10 shadow-[0_30px_100px_-15px_rgba(244,63,94,0.05)] overflow-x-auto animate-reveal [animation-delay:400ms]">
                            <table className="w-full text-left border-separate border-spacing-y-6">
                                <thead className="animate-reveal [animation-delay:200ms]">
                                    <tr className="max-sm:text-sm text-rose-300 font-black uppercase tracking-[0.3em] text-[10px]">
                                        <th className="pb-6 px-6 italic">Artisan Acquisition</th>
                                        <th className="pb-6 text-center italic">Sanctuary Investment</th>
                                        <th className="pb-6 text-left italic">Graceful Destination</th>
                                        <th className="pb-6 text-left italic">Current State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <OrderItem order={order} key={order.id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-reveal">
                        <div className="size-36 bg-rose-50/50 rounded-full flex items-center justify-center text-rose-200 mb-12 border border-rose-100/50 shadow-inner">
                            <ShoppingCart size={56} className="animate-float" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-rose-950 tracking-tighter italic mb-6">No Graceful Acquisitions</h1>
                        <p className="text-slate-500 font-semibold italic text-lg mb-12">Begin your ethereal collection today.</p>
                        <button onClick={() => router.push('/shop')} className="premium-button px-14 py-5 text-lg">
                             Start Discovering
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}