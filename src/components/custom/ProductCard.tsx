"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    brand: string
    name: string
    frontImage: string | StaticImageData
    backImage: string | StaticImageData
    price: number
    discountPrice?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const truncateName = (name: string, maxLength: number) => name.length > maxLength ? name.substring(0, maxLength) + "..." : name
  const maxLength = 45
  const truncatedName = truncateName(product.name, maxLength)
  const discountPercentage = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : null

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative w-full bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {discountPercentage !== null && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full z-10 shadow-sm">
          -{discountPercentage}%
        </div>
      )}
      <div className="relative w-full h-40 sm:h-48 lg:h-64 bg-gray-50">
        <Image
          src={product.frontImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={product.backImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight min-h-[2rem] sm:min-h-[2.5rem] flex items-start">
          {truncatedName}
        </h3>
        <div className="flex items-center justify-start gap-1 sm:gap-2 pt-1">
          {product.discountPrice ? (
            <>
              <span className="text-base sm:text-lg font-bold text-gray-900">Rs.{product.discountPrice.toFixed(2)}</span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">Rs.{product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-bold text-gray-900">Rs.{product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}