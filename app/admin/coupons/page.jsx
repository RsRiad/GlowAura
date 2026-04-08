'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { DeleteIcon } from "lucide-react"
import { couponDummyData } from "@/assets/assets"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export default function AdminCoupons() {

    const {getToken} = useAuth();
    const [loading, setLoading] = useState(true);
    const [coupons, setCoupons] = useState([])

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        description: '',
        discount: '',
        forNewUser: false,
        forMember: false,
        isPublic: false,
        expiresAt: new Date()
    })

    const fetchCoupons = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(`/api/admin/cupon`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCoupons(data.cupons)
            setLoading(false)
        } catch (error) {
            
            toast.error(error?.response?.data?.error || "Failed to fetch coupons")
            setLoading(false)
        }
    }

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            newCoupon.discount = Number(newCoupon.discount);
            newCoupon.expiresAt = new Date(newCoupon.expiresAt);
            const {data} = await axios.post(`/api/admin/cupon`, {cupon: newCoupon}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message);
            await fetchCoupons();
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to add coupon")
            setLoading(false)
        }


    }

    const handleChange = (e) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
    }

    const deleteCoupon = async (code) => {
        // Logic to delete a cupon
        try {
            const confirmDelete = confirm("Are you sure you want to delete this coupon?");
            if(!confirmDelete) return;
            setLoading(true);
            const token = await getToken();
            await axios.delete(`/api/admin/cupon?code=${code}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await fetchCoupons();
            toast.success("Coupon deleted successfully");
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to delete coupon")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="text-slate-500 mb-40 max-w-7xl">

            {/* Add Coupon */}
            <div className="premium-card p-10 max-w-2xl">
                <form onSubmit={(e) => toast.promise(handleAddCoupon(e), { loading: "Adding coupon..." })} className="text-sm italic">
                    <h2 className="text-2xl font-black text-slate-800 italic tracking-tighter mb-6">
                        Add <span className="text-rose-600">Coupons</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Coupon Code</label>
                            <input type="text" placeholder="e.g. GLOW20" className="w-full p-4 bg-white border border-rose-100 outline-none focus:border-rose-400 rounded-2xl transition-all font-bold tracking-widest"
                                name="code" value={newCoupon.code} onChange={handleChange} required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Discount (%)</label>
                            <input type="number" placeholder="20" min={1} max={100} className="w-full p-4 bg-white border border-rose-100 outline-none focus:border-rose-400 rounded-2xl transition-all font-bold"
                                name="discount" value={newCoupon.discount} onChange={handleChange} required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
                        <input type="text" placeholder="Describe the offer..." className="w-full p-4 bg-white border border-rose-100 outline-none focus:border-rose-400 rounded-2xl transition-all font-medium"
                            name="description" value={newCoupon.description} onChange={handleChange} required
                        />
                    </div>

                    <div className="space-y-2 mb-8">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Expiry Date</label>
                        <input type="date" className="w-full p-4 bg-white border border-rose-100 outline-none focus:border-rose-400 rounded-2xl transition-all font-medium text-slate-600"
                            name="expiresAt" value={format(newCoupon.expiresAt, 'yyyy-MM-dd')} onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-rose-50/30 border border-rose-100/50 rounded-2xl group transition-all hover:bg-rose-50/50">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer"
                                    name="forNewUser" checked={newCoupon.forNewUser}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-rose-600 transition-colors duration-200"></div>
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 shadow-sm"></span>
                            </label>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-rose-600 transition-colors">For New User</p>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-amber-50/30 border border-amber-100/50 rounded-2xl group transition-all hover:bg-amber-50/50">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer"
                                    name="forMember" checked={newCoupon.forMember}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-amber-500 transition-colors duration-200"></div>
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 shadow-sm"></span>
                            </label>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-amber-600 transition-colors">For Member</p>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-rose-600 text-white rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-lg shadow-rose-900/10 active:scale-[0.98] transition-all">
                        Create Coupon
                    </button>
                </form>
            </div>

            {/* List Coupons */}
            <div className="mt-16">
                <h2 className="text-2xl font-black text-slate-800 italic tracking-tighter mb-8 ml-2">
                    Active <span className="text-rose-600">Coupons</span>
                </h2>
                <div className="premium-card overflow-hidden max-w-6xl">
                    <table className="w-full text-sm text-left italic">
                        <thead className="bg-rose-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-rose-100">
                            <tr>
                                <th className="py-5 px-6">Code</th>
                                <th className="py-5 px-6">Description</th>
                                <th className="py-5 px-6">Discount</th>
                                <th className="py-5 px-6 text-center">Expiry</th>
                                <th className="py-5 px-6 text-center">Rules</th>
                                <th className="py-5 px-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-50/30">
                            {coupons.map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-rose-50/30 transition-all duration-300 group">
                                    <td className="py-5 px-6">
                                        <span className="bg-rose-50 text-rose-600 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-rose-100 group-hover:scale-105 transition-transform block w-fit shadow-sm shadow-rose-900/5">
                                            {coupon.code}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-slate-600 font-medium truncate max-w-xs">{coupon.description}</td>
                                    <td className="py-5 px-6 font-black text-slate-800 text-base">{coupon.discount}%</td>
                                    <td className="py-5 px-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{format(coupon.expiresAt, 'MMM dd')}</span>
                                            <span className="text-[10px] text-slate-300 uppercase italic">{format(coupon.expiresAt, 'yyyy')}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex gap-2 justify-center">
                                            {coupon.forNewUser && <span className="w-2 h-2 rounded-full bg-rose-400" title="New User Only"></span>}
                                            {coupon.forMember && <span className="w-2 h-2 rounded-full bg-amber-400" title="Members Only"></span>}
                                            {!coupon.forNewUser && !coupon.forMember && <span className="w-2 h-2 rounded-full bg-slate-200" title="Public"></span>}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <button 
                                            onClick={() => toast.promise(deleteCoupon(coupon.code), { loading: "Deleting coupon..." })}
                                            className="p-2.5 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-300"
                                        >
                                            <DeleteIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}