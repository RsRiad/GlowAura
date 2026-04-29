'use client'
import ProductCard from "@/components/ProductCard"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { MailIcon, MapPinIcon, StoreIcon, ShoppingBagIcon } from "lucide-react"
import Loading from "@/components/Loading"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"

export default function StoreShop() {

    const { username } = useParams()
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStoreData = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/store/data?userName=${username}`)
            if (data.success) {
                setStoreInfo(data.store)
                setProducts(data.products)
            } else {
                toast.error(data.error || "Store sanctuary not found")
                router.push('/shop')
            }
        } catch (error) {
            console.error("Fetch store data error:", error)
            toast.error("Failed to discover this sanctuary")
            router.push('/shop')
        } finally {
            setLoading(false)
        }
    }, [username, router])

    useEffect(() => {
        if (username) {
            fetchStoreData()
        }
    }, [username, fetchStoreData])

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-[#fffcfc]">
            {/* Store Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-rose-950">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 via-transparent to-amber-500/10"></div>
                    <div className="aura-glow top-0 left-0 w-[800px] h-[800px] bg-rose-500 opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-12 px-6">
                    <div className="flex flex-col md:flex-row items-end gap-8 animate-reveal">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative size-32 md:size-44 bg-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-4">
                                <Image
                                    src={storeInfo?.logo || '/gs_logo.jpg'}
                                    alt={storeInfo?.name}
                                    className="w-full h-full object-contain"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4 pb-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-rose-300">
                                <StoreIcon size={12} /> Established Artisan
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">
                                {storeInfo?.name}<span className="text-rose-500">.</span>
                            </h1>
                            <div className="flex flex-wrap gap-6 text-rose-100/60 text-sm font-medium italic">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon size={16} className="text-rose-400" />
                                    {storeInfo?.address}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MailIcon size={16} className="text-rose-400" />
                                    {storeInfo?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Content */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {/* Sidebar / Description */}
                    <div className="lg:col-span-1 space-y-8 animate-reveal">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/60">The Artisan Story</p>
                            <p className="text-slate-600 leading-relaxed font-medium italic text-lg">
                                "{storeInfo?.description}"
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-[2.5rem] bg-rose-50/50 border border-rose-100/50 space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-950/40">Sanctuary Stats</p>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <p className="text-3xl font-black text-rose-950 tracking-tighter italic">{products.length}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ethereal Creations</p>
                                </div>
                                <div className="pt-6 border-t border-rose-100">
                                    <div className="flex items-center gap-2 text-rose-600">
                                        <ShoppingBagIcon size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Curator</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex items-end justify-between mb-12 border-b border-rose-100 pb-8 animate-reveal [animation-delay:200ms]">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/60 mb-2">Curated Collection</p>
                                <h2 className="text-4xl font-black text-rose-950 tracking-tighter italic">Featured <span className="text-rose-500">Creations</span></h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-reveal [animation-delay:400ms]">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center space-y-4">
                                    <p className="text-slate-400 font-medium italic">No creations discovered in this sanctuary yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}