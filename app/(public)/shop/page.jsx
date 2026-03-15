'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <section className="min-h-screen mx-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-reveal">
                    <div className="space-y-3">
                        <h1 
                            onClick={() => router.push('/shop')} 
                            className="text-5xl md:text-7xl font-black text-rose-950 flex items-center gap-6 cursor-pointer tracking-tighter italic"
                        >
                            {search && <MoveLeftIcon size={40} className="text-rose-600 hover:-translate-x-2 transition-transform" />}
                            Silk Shop<span className="text-rose-600">.</span>
                        </h1>
                        <p className="text-slate-500 font-semibold italic text-lg">
                            {search ? `Searching the Sanctuary for "${search}"` : "Discover our curated sanctuary of ethereal innovations."}
                        </p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300 bg-rose-50/50 px-6 py-2 rounded-full border border-rose-100">
                        Total {filteredProducts.length} Results
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-500">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 bg-rose-50/30 rounded-[4rem] border border-rose-100/50 mb-32 animate-reveal">
                        <p className="text-rose-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">No Grace Found</p>
                        <h3 className="text-3xl font-black text-rose-950 italic tracking-tighter">Refine your intentions</h3>
                        <button 
                            onClick={() => router.push('/shop')}
                            className="premium-button-secondary mt-10 px-12"
                        >
                            Back to Sanctuary
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}


export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}