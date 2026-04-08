'use client'

import { usePathname } from "next/navigation"
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { assets } from "@/assets/assets"
import { useUser } from "@clerk/nextjs"

const AdminSidebar = () => {
    const { user } = useUser();
    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
        { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon  },
    ]

    return (
        <div className="inline-flex h-full flex-col gap-5 border-r border-rose-100 bg-white/50 sm:min-w-64">
            <div className="flex flex-col gap-3 justify-center items-center pt-10 max-sm:hidden">
                <div className="relative p-1 bg-gradient-to-tr from-rose-200 to-rose-400 rounded-full shadow-lg shadow-rose-900/5">
                    <Image className="w-16 h-16 rounded-full border-2 border-white bg-rose-50 p-2" src={user.imageUrl} alt="" width={100} height={100} />
                </div>
                <p className="text-slate-800 font-bold italic tracking-tight">{user.fullName}</p>
            </div>

            <div className="max-sm:mt-8 px-4">
                {
                    sidebarLinks.map((link, index) => (
                        <Link key={index} href={link.href} className={`relative flex items-center gap-4 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 my-1 p-3 px-6 rounded-2xl transition-all duration-300 font-black uppercase tracking-[0.15em] text-[10px] ${pathname === link.href ? 'bg-rose-50 text-rose-600 shadow-sm shadow-rose-900/5' : ''}`}>
                            <link.icon size={18} className={pathname === link.href ? 'text-rose-600' : 'text-slate-400'} />
                            <p className="max-sm:hidden">{link.name}</p>
                            {pathname === link.href && <span className="absolute bg-rose-600 left-0 top-3 bottom-3 w-1 rounded-r-full shadow-[0_0_10px_rgba(225,29,72,0.4)]"></span>}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar