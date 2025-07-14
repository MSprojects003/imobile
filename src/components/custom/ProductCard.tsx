"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Wallet } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    brand: string
    name: string
    frontImage: string | StaticImageData
    backImage: string | StaticImageData
    price: number
    discountPrice?: number
    discountAdded?: boolean
    quantity?: number
  }
  hideTitle?: boolean
}

export default function ProductCard({ product, hideTitle = false }: ProductCardProps) {
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
      {discountPercentage !== null && product.discountAdded && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full z-10 shadow-sm hidden sm:block">
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
        {!hideTitle && (
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight truncate">
            {truncatedName}
          </h3>
        )}
        <div className="pt-1">
          {typeof product.quantity === 'number' && (
            <div className={`text-xs font-semibold ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
          )}
          {product.discountPrice && product.discountAdded ? (
            <>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-lg font-bold text-gray-900">Rs.{product.discountPrice.toFixed(2)}</span>
                <span className="text-xs sm:text-sm text-red-500 font-semibold">-{discountPercentage}%</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] sm:text-xs text-green-700 font-medium whitespace-nowrap mt-1">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4" /> Cash on Delivery
              </span>
            </>
          ) : (
            <>
              <span className="text-base sm:text-lg font-bold text-gray-900">Rs.{product.price.toFixed(2)}</span>
              <span className="flex items-center gap-1 text-[10px] sm:text-xs text-green-700 font-medium whitespace-nowrap mt-1">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4" /> Cash on Delivery
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}