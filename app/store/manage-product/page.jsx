'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { productDummyData } from "@/assets/assets"

export default function StoreManageProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        setProducts(productDummyData)
        setLoading(false)
    }

    const toggleStock = async (productId) => {
        // Logic to toggle the stock of a product


    }

    useEffect(() => {
            fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28 max-w-7xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Manage <span className="text-rose-600">Products</span>
            </h1>

            <div className="premium-card overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-rose-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-rose-100">
                        <tr>
                            <th className="px-8 py-5">Product Details</th>
                            <th className="px-8 py-5 hidden lg:table-cell">Description</th>
                            <th className="px-8 py-5 hidden md:table-cell">Price / MRP</th>
                            <th className="px-8 py-5 text-center">In Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-50/50 italic">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-rose-50/30 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex gap-4 items-center">
                                        <div className="relative p-0.5 bg-gradient-to-tr from-rose-100 to-amber-50 rounded-xl group-hover:scale-110 transition-transform duration-500">
                                            <Image width={50} height={50} className='w-12 h-12 object-cover rounded-lg border border-white bg-white' src={product.images[0]} alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm italic tracking-tight">{product.name}</p>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-rose-600 transition-colors">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 max-w-xs text-slate-500 hidden lg:table-cell">
                                    <p className="truncate text-xs leading-relaxed">{product.description}</p>
                                </td>
                                <td className="px-8 py-5 hidden md:table-cell">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800 text-sm tracking-tight">{currency}{product.price.toLocaleString()}</span>
                                        <span className="text-[10px] text-slate-400 line-through opacity-60 tracking-tighter">{currency}{product.mrp.toLocaleString()}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex justify-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleStock(product.id), { loading: "Updating stock..." })} checked={product.inStock} />
                                            <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-rose-600 transition-colors duration-300"></div>
                                            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5 shadow-sm"></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}