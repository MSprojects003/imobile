import ProductList from '@/components/custom/ProductList'
import React from 'react'
import { sampleProducts } from '../../data/products'

export default function Page({ params }: { params: { category: string } }) {
  // Format the category name for display
  const displayCategory = params.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList products={sampleProducts} category={params.category} title={displayCategory  } />
    </div>
  )
}