'use client'
import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.products, icon: ShoppingBasketIcon },
        { title: 'Total Revenue', value: currency + dashboardData.revenue, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.orders, icon: TagsIcon },
        { title: 'Total Stores', value: dashboardData.stores, icon: StoreIcon },
    ]

    const fetchDashboardData = async () => {
        setDashboardData(dummyAdminDashboardData)
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-20 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Admin <span className="text-rose-600">Dashboard</span>
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10 mt-4">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="premium-card p-6 flex items-center justify-between hover:border-rose-200 transition-all duration-500 group">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-rose-600 transition-colors duration-300">{card.title}</p>
                                <b className="text-2xl font-black text-slate-800 italic tracking-tight">{card.value}</b>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-rose-100 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <card.icon size={24} className="relative w-12 h-12 p-3 text-rose-600 bg-rose-50 rounded-2xl border border-rose-100 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Area Chart */}
            <div className="premium-card p-8">
                <OrdersAreaChart allOrders={dashboardData.allOrders} />
            </div>
        </div>
    )
}