'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function StoreAddProduct() {

    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [loading, setLoading] = useState(false)


    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // Logic to add a product
        
    }


    return (
        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })} className="text-slate-500 mb-28 max-w-4xl">
            <h1 className="text-3xl font-black text-slate-800 italic tracking-tighter mb-8">
                Add New <span className="text-rose-600">Product</span>
            </h1>

            <div className="premium-card p-10 space-y-8">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Product Images</p>
                    <div className="flex flex-wrap gap-4">
                        {Object.keys(images).map((key) => (
                            <label key={key} htmlFor={`images${key}`} className="group relative">
                                <div className='w-24 h-24 border-2 border-dashed border-rose-100 rounded-2xl flex items-center justify-center bg-rose-50/30 hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer overflow-hidden'>
                                    <Image width={300} height={300} className='w-full h-full object-cover p-2' src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area} alt="" />
                                </div>
                                <input type="file" accept='image/*' id={`images${key}`} onChange={e => setImages({ ...images, [key]: e.target.files[0] })} hidden />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Product Name</span>
                        <input type="text" name="name" onChange={onChangeHandler} value={productInfo.name} placeholder="Enter product name" className="w-full p-3 px-5 outline-none border border-rose-100 rounded-2xl bg-white focus:border-rose-400 transition-all text-sm italic font-medium" required />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</span>
                        <select onChange={e => setProductInfo({ ...productInfo, category: e.target.value })} value={productInfo.category} className="w-full p-3 px-5 outline-none border border-rose-100 rounded-2xl bg-white focus:border-rose-400 transition-all text-sm italic font-medium" required>
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <label className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</span>
                    <textarea name="description" onChange={onChangeHandler} value={productInfo.description} placeholder="Enter product description" rows={4} className="w-full p-4 px-5 outline-none border border-rose-100 rounded-2xl bg-white focus:border-rose-400 transition-all text-sm italic font-medium resize-none leading-relaxed" required />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actual Price ($)</span>
                        <input type="number" name="mrp" onChange={onChangeHandler} value={productInfo.mrp} placeholder="0" className="w-full p-3 px-5 outline-none border border-rose-100 rounded-2xl bg-white focus:border-rose-400 transition-all text-sm italic font-medium" required />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Offer Price ($)</span>
                        <input type="number" name="price" onChange={onChangeHandler} value={productInfo.price} placeholder="0" className="w-full p-3 px-5 outline-none border border-rose-100 rounded-2xl bg-white focus:border-rose-400 transition-all text-sm italic font-medium" required />
                    </label>
                </div>

                <div className="pt-4">
                    <button 
                        disabled={loading} 
                        className="w-full md:w-auto text-[11px] font-black uppercase tracking-[0.2em] text-white bg-rose-600 px-10 py-4 rounded-full hover:bg-rose-700 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-rose-900/10 active:scale-95 disabled:opacity-50"
                    >
                        Publish Product
                    </button>
                </div>
            </div>
        </form>
    )
}