'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import HydrationGuard from './HydrationGuard'

const LatestProducts = () => {

    const displayQuantity = 4
    const products = useSelector(state => state.product.list)

    return (
        <HydrationGuard>
            <section className='px-6 my-12 max-w-7xl mx-auto'>
                <Title 
                    title='New Arrivals' 
                    description='Explore our latest premium arrivals, curated for your radiant glow.' 
                    href='/shop' 
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </section>
        </HydrationGuard>
    )
}

export default LatestProducts;