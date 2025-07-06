"use client"

import React from 'react'
import ProductList from '@/components/custom/ProductList'
import { sampleProducts } from '../data/products'

export default function OffersPage() {
  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList products={sampleProducts} title="Offers" />
    </div>
  )
}