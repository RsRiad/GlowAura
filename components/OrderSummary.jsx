import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { clearCart } from '@/lib/features/cart/cartSlice';

const OrderSummary = ({ totalPrice, items }) => {

    const { getToken } = useAuth();
    const dispatch = useDispatch();
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    const handleCouponCode = async (event) => {
        event.preventDefault();
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            toast.error("Please select a sanctuary for delivery");
            return;
        }

        try {
            const token = await getToken();
            const { data } = await axios.post('/api/order', {
                addressId: selectedAddress.id,
                paymentMethod,
                items
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                toast.success("Order initiated with Grace");
                dispatch(clearCart());
                
                if (data.session) {
                    window.location.href = data.session.url;
                } else {
                    router.push('/orders');
                }
            } else {
                throw new Error(data.error || "Failed to place order");
            }
        } catch (error) {
            console.error("Place order error:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className='w-full bg-rose-950 text-white rounded-[3.5rem] p-10 shadow-[0_30px_100px_-15px_rgba(159,18,57,0.3)] relative overflow-hidden animate-reveal'>
            <div className='absolute inset-0 bg-gradient-to-br from-rose-600/20 via-amber-500/5 to-transparent opacity-50'></div>
            <div className='relative z-10 space-y-10'>
                <div className='space-y-2'>
                    <h2 className='text-3xl font-black italic tracking-tighter'>Checkout Grace<span className='text-rose-500'>.</span></h2>
                    <p className='text-[10px] uppercase tracking-[0.3em] font-black text-rose-300/60'>Artisan Order Finalization</p>
                </div>

                <div className='space-y-5 pt-8 border-t border-white/10'>
                    <p className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/40'>Payment Sanctuary</p>
                    <div className='grid grid-cols-2 gap-4'>
                        {[
                            { id: 'COD', label: 'Cash' },
                            { id: 'STRIPE', label: 'Luxe Card' }
                        ].map((method) => (
                            <label 
                                key={method.id} 
                                className={`flex items-center justify-center py-4 px-5 rounded-2xl border-2 cursor-pointer transition-all font-black text-[10px] uppercase tracking-[0.2em] ${paymentMethod === method.id ? 'border-rose-500 bg-rose-500/20 text-white' : 'border-white/5 bg-white/5 text-rose-100/30 hover:border-white/10'}`}
                            >
                                <input 
                                    type="radio" 
                                    name='payment' 
                                    className='hidden' 
                                    onChange={() => setPaymentMethod(method.id)} 
                                    checked={paymentMethod === method.id} 
                                />
                                {method.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className='space-y-5 pt-8 border-t border-white/10'>
                    <div className='flex items-center justify-between'>
                        <p className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/40'>Delivery Sanctuary</p>
                        {selectedAddress && (
                            <button onClick={() => setSelectedAddress(null)} className='text-rose-400 hover:text-rose-300 transition-colors'>
                                <SquarePenIcon size={18} />
                            </button>
                        )}
                    </div>
                    
                    {!selectedAddress ? (
                        <div className='space-y-4'>
                            {addressList && addressList.length > 0 && (
                                <select 
                                    className='w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-sm font-semibold focus:ring-2 focus:ring-rose-500/50 transition-all text-white' 
                                    onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                                >
                                    <option value="" className='bg-rose-950'>Select Saved Sanctuary</option>
                                    {addressList.map((address, index) => (
                                        <option key={index} value={index} className='bg-rose-950'>
                                            {address.name} - {address.city}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <button 
                                className='w-full flex items-center justify-center gap-3 py-4 px-5 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-rose-100/30 transition-all' 
                                onClick={() => setShowAddressModal(true)}
                            >
                                <PlusIcon size={16} /> Add New Sanctuary
                            </button>
                        </div>
                    ) : (
                        <div className='bg-white/5 p-6 rounded-3xl border border-white/10 shadow-inner'>
                            <p className='text-base font-black leading-relaxed italic text-white tracking-tight'>
                                {selectedAddress.name}<br/>
                                <span className='text-rose-200/50 not-italic text-xs font-semibold tracking-normal'>{selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</span>
                            </p>
                        </div>
                    )}
                </div>

                <div className='pt-10 border-t border-white/10 space-y-5'>
                    <div className='flex justify-between text-sm font-semibold italic'>
                        <span className='text-rose-200/40'>Subtotal Grace</span>
                        <span className='font-black text-white'>{currency}{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-sm font-semibold italic'>
                        <span className='text-rose-200/40'>Shipping Sanctuary</span>
                        <span className='text-amber-400 font-black uppercase text-[10px] tracking-[0.2em] animate-pulse'>Complimentary</span>
                    </div>
                    {coupon && (
                        <div className='flex justify-between text-sm font-black text-rose-400 italic'>
                            <span>Voucher of Grace</span>
                            <span>-{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}</span>
                        </div>
                    )}
                    
                    {!coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Validating Grace...' })} className='flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 focus-within:ring-2 focus-within:ring-rose-500/50 transition-all'>
                            <input 
                                onChange={(e) => setCouponCodeInput(e.target.value)} 
                                value={couponCodeInput} 
                                type="text" 
                                placeholder='Grace Code' 
                                className='bg-transparent px-4 py-2 text-[10px] flex-1 outline-none font-black text-white placeholder-rose-200/20 uppercase tracking-[0.3em]' 
                            />
                            <button className='bg-white text-rose-950 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-400 hover:text-white transition-all transform hover:scale-105'>Apply</button>
                        </form>
                    ) : (
                        <div className='flex items-center justify-between bg-rose-600/20 border border-rose-600/50 p-4 rounded-2xl animate-reveal'>
                            <div className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-400'>
                                {coupon.code} Applied With Grace
                            </div>
                            <XIcon size={18} onClick={() => setCoupon('')} className='text-rose-400 hover:text-white transition cursor-pointer' />
                        </div>
                    )}

                    <div className='flex justify-between items-end pt-6'>
                        <div>
                            <p className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/40 mb-2'>Total Sanctuary Investment</p>
                            <p className='text-5xl font-black tracking-tighter italic text-white'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'Processing with Grace...' })} 
                    className='premium-button w-full py-6 text-lg relative group overflow-hidden shadow-[0_20px_40px_-10px_rgba(244,63,94,0.4)] transform hover:scale-[1.02] active:scale-[0.98] transition-all'
                >
                    <span className='relative z-10 font-black uppercase tracking-[0.3em]'>Complete Order with Grace</span>
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                </button>
            </div>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    )
}

export default OrderSummary