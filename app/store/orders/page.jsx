'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { orderDummyData } from "@/assets/assets"

export default function StoreOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    const fetchOrders = async () => {
       setOrders(orderDummyData)
       setLoading(false)
    }

    const updateOrderStatus = async (orderId, status) => {
        // Logic to update the status of an order


    }

    const openModal = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedOrder(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Store <span className="text-rose-600">Orders</span>
            </h1>
            {orders.length === 0 ? (
                <div className="premium-card p-12 text-center">
                    <p className="italic text-slate-400 font-medium">No orders found in your collection.</p>
                </div>
            ) : (
                <div className="premium-card overflow-hidden">
                    <table className="w-full text-sm text-left italic">
                        <thead className="bg-rose-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-rose-100">
                            <tr>
                                {["Sr.", "Customer", "Total", "Payment", "Coupon", "Status", "Date"].map((heading, i) => (
                                    <th key={i} className="px-6 py-5">{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-50/30">
                            {orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-rose-50/30 transition-all duration-300 cursor-pointer group"
                                    onClick={() => openModal(order)}
                                >
                                    <td className="px-6 py-5 text-rose-600 font-black tracking-widest" >
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800 italic tracking-tight">{order.user?.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-0">{order.user?.email.split('@')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-black text-slate-800">${order.total}</td>
                                    <td className="px-6 py-5 text-slate-500 uppercase text-[10px] tracking-widest font-black">{order.paymentMethod}</td>
                                    <td className="px-6 py-5 text-center">
                                        {order.isCouponUsed ? (
                                            <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-100">
                                                {order.coupon?.code}
                                            </span>
                                        ) : (
                                            <span className="text-slate-200">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5" onClick={(e) => { e.stopPropagation() }}>
                                        <select
                                            value={order.status}
                                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                                            className="bg-white border border-rose-100 rounded-full text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none focus:border-rose-400 transition-all text-rose-600"
                                        >
                                            <option value="ORDER_PLACED">PLACED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col text-right">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-slate-400 opacity-60 leading-0 mt-1">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedOrder && (
                <div onClick={closeModal} className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-[100] p-4 slide-up" >
                    <div onClick={e => e.stopPropagation()} className="bg-white/95 rounded-[2.5rem] shadow-2xl max-w-3xl w-full p-10 relative overflow-hidden ring-1 ring-rose-100">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/30 to-transparent rounded-bl-full pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">
                                Order <span className="text-rose-600">Ref. #{selectedOrder.id.slice(-6).toUpperCase()}</span>
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-rose-50 rounded-full transition-colors text-slate-400" >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Customer Details */}
                            <div className="premium-card p-6 bg-rose-50/30">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                    Customer Details
                                </h3>
                                <div className="space-y-3 italic text-sm">
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Name</span> <span className="text-slate-800 font-bold">{selectedOrder.user?.name}</span></p>
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Email</span> <span className="text-slate-800 font-bold text-xs">{selectedOrder.user?.email}</span></p>
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Phone</span> <span className="text-slate-800 font-bold">{selectedOrder.address?.phone}</span></p>
                                    <div className="pt-2 border-t border-rose-100">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Shipping Address</p>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}`}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment & Status */}
                            <div className="premium-card p-6 bg-amber-50/20 border-amber-100/50">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                    Order Summary
                                </h3>
                                <div className="space-y-3 italic text-sm">
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Method</span> <span className="text-slate-800 font-bold uppercase">{selectedOrder.paymentMethod}</span></p>
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Paid</span> <span className={selectedOrder.isPaid ? "text-rose-600 font-black uppercase tracking-widest text-[10px]" : "text-slate-400"}>{selectedOrder.isPaid ? "CONFIRMED" : "PENDING"}</span></p>
                                    <p className="flex justify-between"><span className="text-slate-400 font-medium">Status</span> <span className="text-amber-600 font-black uppercase tracking-widest text-[10px]">{selectedOrder.status}</span></p>
                                    <div className="pt-2 border-t border-amber-100/50 flex justify-between items-end">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Total Paid</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">${selectedOrder.total}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="mb-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Order Items</h3>
                            <div className="space-y-3 max-h-[180px] overflow-y-auto no-scrollbar pr-2">
                                {selectedOrder.orderItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 bg-white border border-rose-50 rounded-2xl hover:border-rose-200 transition-colors group">
                                        <div className="relative p-0.5 bg-gradient-to-tr from-rose-100 to-amber-50 rounded-lg group-hover:scale-105 transition-transform duration-500">
                                            <img
                                                src={item.product.images?.[0].src || item.product.images?.[0]}
                                                alt={item.product?.name}
                                                className="w-14 h-14 object-cover rounded-md border border-white bg-white"
                                            />
                                        </div>
                                        <div className="flex-1 flex justify-between items-center italic">
                                            <div>
                                                <p className="text-slate-800 font-bold text-sm tracking-tight">{item.product?.name}</p>
                                                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-black text-rose-600">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">GlowAura Premium Store Experience</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
