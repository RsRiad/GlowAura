'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId,products]);

    return (
        <div className="mx-6 relative overflow-hidden">
            {/* Background Aura */}
            <div className="aura-glow w-[600px] h-[600px] -top-48 -left-48 opacity-10"></div>
            <div className="aura-glow-sm w-[400px] h-[400px] top-1/2 -right-48 opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Breadcrums */}
                <div className="flex items-center gap-2 text-rose-300 text-[10px] font-black uppercase tracking-[0.2em] mt-12 mb-8 italic">
                    <span className="text-rose-100/50">Space</span>
                    <span className="size-1 rounded-full bg-rose-200"></span>
                    <span className="text-rose-100/50">Private Selection</span>
                    <span className="size-1 rounded-full bg-rose-200"></span>
                    <span className="text-rose-600">The {product?.category} Gallery</span>
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}
            </div>
        </div>
    );
}