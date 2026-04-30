'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect } from "react";
import OrderItem from "@/components/OrderItem";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/lib/features/order/orderSlice";
import { useAuth, useUser } from "@clerk/nextjs";

import { useState } from "react";
import RatingModal from "@/components/RatingModal";

export default function Orders() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { getToken } = useAuth();
    const { user } = useUser();
    const { list: orders, loading } = useSelector(state => state.order);

    const [ratingModal, setRatingModal] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(fetchOrders({ getToken }));
        }
    }, [user]);

    return (
        <section className="min-h-screen mx-6 py-10 animate-soft-reveal">
            <div className="max-w-7xl mx-auto">
                {orders.length > 0 ? (
                    <div className="space-y-8">
                        <PageTitle heading="Order History" text="Your collection of premium acquisitions." linkText="Keep Exploring" />

                        <div className="bg-white rounded-[2.5rem] border border-rose-100/30 p-6 shadow-sm overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <thead className="animate-soft-reveal">
                                    <tr className="max-sm:text-sm text-slate-400 font-black uppercase tracking-widest text-[9px]">
                                        <th className="pb-4 px-4 italic">Order</th>
                                        <th className="pb-4 text-center italic">Total</th>
                                        <th className="pb-4 text-left italic">Delivery</th>
                                        <th className="pb-4 text-left italic">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <OrderItem order={order} key={order.id} setRatingModal={setRatingModal} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-soft-reveal">
                        <div className="size-24 bg-rose-50/50 rounded-full flex items-center justify-center text-rose-200 mb-8 border border-rose-100/50 shadow-inner">
                            <ShoppingCart size={40} className="animate-float" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic mb-4">No Orders Yet</h1>
                        <p className="text-slate-500 font-semibold italic text-base mb-8">Your procurement history will appear here.</p>
                        <button onClick={() => router.push('/shop')} className="premium-button px-10 py-4 text-base">
                             Start Shopping
                        </button>
                    </div>
                )}
            </div>
            {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
        </section>
    )
}