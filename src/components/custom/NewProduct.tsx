"use client"

import Link from "next/link"
 
import { ChevronRight } from "lucide-react"
import ProductCard from "./ProductCard"
import nikeShoefont from "../../pictures/products/nike-shoe-font.webp"
import nikeShoeBack from "../../pictures/products/nike-shoe-back.jpg"
import { StaticImageData } from "next/image"

interface Product {
  id: string
  brand: string
  name: string
  frontImage: string |StaticImageData
  backImage: string|StaticImageData
  price: number
  discountPrice?: number
}

// Sample product data - replace with your actual data
const sampleProducts: Product[] = [
  {
    id: "11",
    brand: "Nike",
    name: "Air Max 270 React Running Shoes for Men",
    frontImage: nikeShoefont,
    backImage: nikeShoeBack,
    price: 12999,
    discountPrice: 9999,
  },
  {
    id: "22",
    brand: "Adidas",
    name: "Ultraboost 22 Premium Running Sneakers",
    frontImage: "/placeholder.svg?height=300&width=300&text=Adidas+Front",
    backImage: "/placeholder.svg?height=300&width=300&text=Adidas+Back",
    price: 15999,
    discountPrice: 12799,
  },
  {
    id: "3",
    brand: "Puma",
    name: "RS-X Reinvention Lifestyle Shoes",
    frontImage: "/placeholder.svg?height=300&width=300&text=Puma+Front",
    backImage: "/placeholder.svg?height=300&width=300&text=Puma+Back",
    price: 8999,
  },
  {
    id: "4",
    brand: "Reebok",
    name: "Classic Leather Legacy Casual Sneakers",
    frontImage: "/placeholder.svg?height=300&width=300&text=Reebok+Front",
    backImage: "/placeholder.svg?height=300&width=300&text=Reebok+Back",
    price: 6999,
    discountPrice: 5599,
  },
  {
    id: "5",
    brand: "New Balance",
    name: "574 Core Plus Lifestyle Shoes",
    frontImage: "/placeholder.svg?height=300&width=300&text=NewBalance+Front",
    backImage: "/placeholder.svg?height=300&width=300&text=NewBalance+Back",
    price: 7999,
  },
  {
    id: "6",
    brand: "Converse",
    name: "Chuck Taylor All Star High Top Canvas",
    frontImage: "/placeholder.svg?height=300&width=300&text=Converse+Front",
    backImage: "/placeholder.svg?height=300&width=300&text=Converse+Back",
    price: 4999,
    discountPrice: 3999,
  },
]

interface NewProductsProps {
  products?: Product[]
  limit?: number
}

export default function NewProducts({ products = sampleProducts, limit }: NewProductsProps) {
  const displayedProducts = products.slice(0, limit !== undefined ? limit : products.length)
  const hasMoreProducts = limit !== undefined ? products.length > limit : false

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with title and see all link */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
          {hasMoreProducts && (
            <Link
              href="/products/new-arrivals"
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
            <ProductCard key={product.id} product={product } />
          ))}
        </div>

        {/* Mobile See All Button - only show if hasMoreProducts and on mobile */}
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
        )}
      </div>
    </section>
  )
}
 
