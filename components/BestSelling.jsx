'use client'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import HydrationGuard from './HydrationGuard'

const BestSelling = () => {

    const displayQuantity = 8
    const products = useSelector(state => state.product.list)

    return (
        <HydrationGuard>
            <section className='px-6 my-12 max-w-7xl mx-auto'>
                <Title 
                    title='Best Sellers' 
                    description="The products our community loves most. Tried, tested, and highly rated." 
                    href='/shop' 
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {products.slice().sort((a, b) => b.rating.length - a.rating.length).slice(0, displayQuantity).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </section>
        </HydrationGuard>
    )
}

export default BestSelling;