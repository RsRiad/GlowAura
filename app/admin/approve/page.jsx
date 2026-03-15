'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchStores = async () => {
        setStores(storesDummyData)
        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }) => {
        // Logic to approve a store


    }

    useEffect(() => {
            fetchStores()
    }, [])

    return !loading ? (
        <div className="text-slate-500 mb-28 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Approve <span className="text-rose-600">Stores</span>
            </h1>

            {stores.length ? (
                <div className="grid grid-cols-1 gap-6 mt-4">
                    {stores.map((store) => (
                        <div key={store.id} className="premium-card p-10 flex flex-col md:flex-row gap-10 items-start md:items-center max-w-5xl hover:border-rose-200 transition-all duration-500 group" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex flex-col gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-rose-100 md:pl-10">
                                <button 
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'approved' }), { loading: "approving" })} 
                                    className="px-8 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-900/10 active:scale-95 transition-all" 
                                >
                                    Approve Store
                                </button>
                                <button 
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'rejected' }), { loading: 'rejecting' })} 
                                    className="px-8 py-3 bg-white text-slate-400 border border-slate-200 rounded-full hover:text-slate-600 hover:border-slate-300 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all" 
                                >
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    ))}

                </div>) : (
                <div className="premium-card h-80 flex items-center justify-center">
                    <h1 className="text-2xl text-slate-300 font-black italic tracking-tighter">No Applications Pending</h1>
                </div>
            )}
        </div>
    ) : <Loading />
}