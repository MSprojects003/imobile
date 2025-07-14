"use client"

import React from 'react'
import ProductList from '@/components/custom/ProductList'
import { getAllProductList } from '@/lib/db/products'
import { useQuery } from '@tanstack/react-query'
import { PackageSearch } from 'lucide-react'

// Interface matching your database schema
interface DatabaseProduct {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  category: string
  brand: string
  models: string[]
  colors: string[]
  image: string
  back_image: string | null
  discount: number | null
  created_at: string | null
  updated_at: string | null
  is_deleted: boolean
  discount_added: boolean
  discounted_price: number | null
}

// Interface for ProductList component
interface Product {
  id: string
  brand: string
  name: string
  image: string
  back_image: string | null
  price: number
  discounted_price?: number | null
  discount_added?: boolean
  category?: string | null
  quantity?: number
}

export default function OffersPage() {
  // React Query for fetching products
  const { data: databaseProducts, isLoading, error } = useQuery({
    queryKey: ['offers-products'],
    queryFn: getAllProductList,
  })

  // Transform and filter database products to show only discounted products
  const transformAndFilterProducts = (dbProducts: DatabaseProduct[]): Product[] => {
    return dbProducts
      .filter((product) => product.discount_added === true) // Only products with discount_added: true
      .map((product) => ({
        id: product.id,
        brand: product.brand,
        name: product.name,
        image: product.image,
        back_image: product.back_image,
        price: product.price,
        discounted_price: product.discounted_price,
        discount_added: product.discount_added,
        category: product.category,
        quantity: product.quantity,
      }));
  }

  const discountedProducts = databaseProducts ? transformAndFilterProducts(databaseProducts) : []

  if (isLoading) {
    return (
      <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full h-64 bg-gray-200 rounded-xl"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Offers</h1>
          <p className="text-gray-600">Failed to load offers. Please try again later.</p>
        </div>
      </div>
    )
  }

  // Show "No Offers Found" message if no discounted products
  if (discountedProducts.length === 0) {
    return (
      <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <PackageSearch className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Offers Found</h3>
          <p className="text-gray-500 text-center max-w-md">
            We don't have any active offers at the moment. Check back soon for amazing deals and discounts!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList products={discountedProducts} title="Offers" />
    </div>
  )
}