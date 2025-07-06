import ViewProduct from '@/components/custom/ProductDetails'
import ProductReviews from '@/components/custom/ProductReviews'
import React from 'react'

const page = () => {
  return (
    <>
      <ViewProduct />
      <div className="my-8 border-t border-gray-300 w-full" />
      <ProductReviews />
    </>
  )
}

export default page