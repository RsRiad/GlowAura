'use client'
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"

const StoreInfo = ({store}) => {
    return (
        <div className="flex-1 space-y-6 italic">
            <div className="flex items-start justify-between">
                <div className="relative p-1 bg-gradient-to-tr from-rose-100 to-amber-50 rounded-2xl shadow-sm">
                    <Image width={100} height={100} src={store.logo} alt={store.name} className="w-24 h-24 object-cover rounded-xl border border-white bg-white" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border shadow-sm ${
                        store.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : store.status === 'rejected'
                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}
                    >
                        {store.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Created {new Date(store.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter"> {store.name} </h3>
                    <span className="text-xs text-rose-600 font-bold tracking-tight">@{store.username}</span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl bg-white/50 p-4 rounded-2xl border border-rose-50/50">{store.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                    <p className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-rose-50/50"> <MapPin size={14} className="text-rose-400" /> {store.address}</p>
                    <p className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-rose-50/50"><Phone size={14} className="text-rose-400" /> {store.contact}</p>
                    <p className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-rose-50/50 col-span-full"><Mail size={14} className="text-rose-400" />  {store.email}</p>
                </div>

                <div className="pt-4 border-t border-rose-50 flex items-center gap-4">
                    <div className="relative p-0.5 bg-gradient-to-tr from-rose-200 to-amber-200 rounded-full">
                        <Image width={40} height={40} src={store.user.image} alt={store.user.name} className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-rose-50" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-0">Owner</p>
                        <p className="text-slate-800 font-bold tracking-tight text-sm">{store.user.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreInfo