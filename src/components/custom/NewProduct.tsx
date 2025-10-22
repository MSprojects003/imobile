"use client"

import Link from "next/link"
import { ChevronRight} from "lucide-react"
import ProductCard from "./ProductCard"
import { getAllProductList } from "@/lib/db/products"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import noProducts from "@/pictures/background/no_products.png"

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

// Interface for ProductCard component
interface Product {
  id: string
  brand: string
  name: string
  frontImage: string
  backImage: string
  price: number
  discountPrice?: number
  discountAdded?: boolean
}

interface NewProductsProps {
  products?: Product[]
  limit?: number
}

export default function NewProducts({ products, limit }: NewProductsProps) {
  // React Query for fetching products
  const { data: databaseProducts, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductList,
  })

  // Transform database products to match ProductCard interface and filter by date
  const transformAndFilterProducts = (dbProducts: DatabaseProduct[]): Product[] => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // 7 days ago

    return dbProducts
      .filter((product) => {
        if (!product.created_at) return false;
        const productDate = new Date(product.created_at);
        return productDate >= oneWeekAgo;
      })
      .map((product) => ({
        id: product.id,
        brand: product.brand,
        name: product.name,
        frontImage: product.image,
        backImage: product.back_image || product.image,
        price: product.price,
        discountPrice: product.discounted_price || undefined,
        discountAdded: product.discount_added,
        quantity: product.quantity,
      }));
  }

  // Use provided products or transform and filter database products
  const finalProducts = products || (databaseProducts ? transformAndFilterProducts(databaseProducts) : [])
  const displayedProducts = finalProducts.slice(0, limit !== undefined ? limit : finalProducts.length)
  const hasMoreProducts = limit !== undefined ? finalProducts.length > limit : false

  if (isLoading) {
    return (
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-medium text-gray-900">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, index) => (
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
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  // Show "No New Arrivals" message if no products found
  if (finalProducts.length === 0) {
    return (
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-medium text-gray-900">New Arrivals</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-2 px-4">
            <div className="relative mb-8">
               
            <Image src={noProducts} alt="no products" width={150} height={150} className="w-36 h-36 md:w-48 md:h-48" />
            </div>
            <div className="text-center max-w-md">
              <h3 className="text-2xl font-medium text-gray-800 mb-3">No New Arrivals</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We&apos;re carefully curating fresh products for you. 
                Check back soon for exciting new arrivals and latest additions!
              </p>
              
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with title and see all link */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-medium text-gray-900">New Arrivals</h2>
          {hasMoreProducts && (
            <Link
              href="/new_arrivals"
              className="flex items-center gap-1 text-md font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 group"
            >
              See All
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile See All Button - only show if hasMoreProducts and on mobile
        {hasMoreProducts && (
          <div className="flex justify-center mt-8 sm:hidden">
            <Link
              href="/products/new-arrivals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              See All Products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )} */}
      </div>
    </section>
  )
}
 
