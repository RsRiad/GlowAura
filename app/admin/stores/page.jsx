'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export default function AdminStores() {

    const {isSignedIn, getToken} = useAuth();
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(`/api/admin/stores`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setStores(data.stores)
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to fetch stores")
            setLoading(false)
        }
    }

    const toggleIsActive = async (storeId) => {
        try {
            const token = await getToken();
            const {data} = await axios.post(`/api/admin/toggle-store`, { storeId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                toast.success(data.message)
                fetchStores()
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to toggle store status")
        }
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchStores()
        }
    }, [isSignedIn])

    return !loading ? (
        <div className="text-slate-500 mb-28 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Live <span className="text-rose-600">Stores</span>
            </h1>

            {stores.length ? (
                <div className="grid grid-cols-1 gap-6 mt-4">
                    {stores.map((store) => (
                        <div key={store.id} className="premium-card p-10 flex flex-col md:flex-row gap-10 items-start md:items-center max-w-5xl hover:border-rose-200 transition-all duration-500 group" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex flex-col items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-rose-100 md:pl-10 min-w-32">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-rose-600 transition-colors">Active Status</p>
                                <label className="relative inline-flex items-center cursor-pointer text-gray-900">
                                    <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleIsActive(store.id), { loading: "Updating data..." })} checked={store.isActive} />
                                    <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-checked:bg-rose-600 transition-colors duration-500"></div>
                                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-500 peer-checked:translate-x-7 shadow-sm"></span>
                                </label>
                                <p className={`text-[10px] font-black italic tracking-widest ${store.isActive ? 'text-rose-600' : 'text-slate-300'}`}>
                                    {store.isActive ? 'OPERATIONAL' : 'SUSPENDED'}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div className="premium-card h-80 flex items-center justify-center">
                    <h1 className="text-2xl text-slate-300 font-black italic tracking-tighter">No stores Available</h1>
                </div>
            )
            }
        </div>
    ) : <Loading />
}