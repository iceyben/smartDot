import React from 'react'
import ProductCard from './components/ProductCard'

const page = () => {
  return (
    <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5'>
      <ProductCard />
      <ProductCard />
      <ProductCard/>
    </div>
  )
}

export default page
