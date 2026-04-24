'use client'
import { dummyStoreDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { toast } from "react-hot-toast"
import axios from "axios"

export default function Dashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const { getToken } = useAuth()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
        { title: 'Total Earnings', value: currency + dashboardData.totalEarnings, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.totalOrders, icon: TagsIcon },
        { title: 'Total Ratings', value: dashboardData.ratings.length, icon: StarIcon },
    ]

    const fetchDashboardData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/store/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                setDashboardData(data.dashboardData)
            }
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch dashboard data')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Seller <span className="text-rose-600">Dashboard</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="premium-card p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-500">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-rose-600 transition-colors">{card.title}</p>
                                <b className="text-2xl font-black text-slate-800 italic tracking-tight">{card.value}</b>
                            </div>
                            <div className="p-3 bg-rose-50 rounded-2xl group-hover:bg-rose-100 transition-colors">
                                <card.icon size={24} className="text-rose-600" />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-slate-800 italic tracking-tight">Recent Reviews</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-rose-100 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {
                    dashboardData.ratings.map((review, index) => (
                        <div key={index} className="premium-card p-6 flex flex-col md:flex-row gap-6 justify-between group hover:border-rose-200 transition-all duration-500">
                            <div className="flex-1">
                                <div className="flex gap-4 items-center mb-4">
                                    <div className="relative p-0.5 bg-gradient-to-tr from-rose-200 to-amber-100 rounded-full">
                                        <Image src={review.user.image} alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" width={100} height={100} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm italic tracking-tight">{review.user.name}</p>
                                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{new Date(review.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed italic line-clamp-3">"{review.review}"</p>
                            </div>
                            
                            <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                                <div className="text-right">
                                    <p className="text-[10px] font-black tracking-widest text-rose-600 uppercase mb-1">{review.product?.category}</p>
                                    <p className="font-bold text-slate-800 text-sm mb-2">{review.product?.name}</p>
                                    <div className='flex gap-0.5 justify-end'>
                                        {Array(5).fill('').map((_, index) => (
                                            <StarIcon 
                                                key={index} 
                                                size={14} 
                                                className="transition-all duration-300"
                                                fill={review.rating >= index + 1 ? "#fbbf24" : "transparent"} 
                                                stroke={review.rating >= index + 1 ? "#fbbf24" : "#e2e8f0"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => router.push(`/product/${review.product.id}`)} 
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 bg-rose-50 px-6 py-2.5 rounded-full border border-rose-100 hover:bg-rose-600 hover:text-white transition-all duration-500 flex items-center gap-2 group/btn"
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}