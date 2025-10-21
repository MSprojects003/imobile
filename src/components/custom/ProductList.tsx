"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"

import Image from "next/image"
import noProducts from "@/pictures/background/no_products.png"

// Define the Product interface to match database structure
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

interface ProductListProps {
  products: Product[]
  category?: string | null
  brand?: string | null
  title?: string
  hideTitle?: boolean
  hideSort?: boolean
}

export default function ProductList({ products, category, brand, title, hideTitle = false, hideSort = false }: ProductListProps) {
  const [sortOption, setSortOption] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8 // 4 rows of 2 on mobile, 2 rows of 4 on desktop
  const maxVisiblePages = 5 // Maximum page buttons to show

  // Filter products by category and brand if provided
  let filteredProducts = products
  
  if (category) {
    const normalizedCategory = category.replace(/-/g, ' ').toLowerCase();
    filteredProducts = filteredProducts.filter(
      p => (p.category || '').replace(/-/g, ' ').toLowerCase() === normalizedCategory
    );
  }
  
  if (brand) {
    const normalizedBrand = brand.replace(/-/g, ' ').toLowerCase();
    filteredProducts = filteredProducts.filter(
      p => (p.brand || '').replace(/-/g, ' ').toLowerCase() === normalizedBrand
    );
  }

  // Handle sorting
  const sortedProducts = [...filteredProducts]
  if (sortOption === "price-low-high") {
    sortedProducts.sort((a, b) => (a.discounted_price || a.price) - (b.discounted_price || b.price))
  } else if (sortOption === "price-high-low") {
    sortedProducts.sort((a, b) => (b.discounted_price || b.price) - (a.discounted_price || b.price))
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  const pageRange = Math.floor(maxVisiblePages / 2)
  const startPage = Math.max(1, currentPage - pageRange)
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top on page change
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Title and Filter Row */}
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
          {title || "Products"}
        </h1>
        {!hideSort && (
          <Select onValueChange={setSortOption} defaultValue="all">
            <SelectTrigger className="w-[180px] bg-white border-gray-300 text-gray-700 hover:bg-gray-100">
              <SelectValue placeholder="Filter & Sort" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-lg shadow-xl">
              {[
                { value: "all", label: "All Products" },
                { value: "price-low-high", label: "Price: Low to High" },
                { value: "price-high-low", label: "Price: High to Low" },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-gray-700 hover:bg-gray-100">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentProducts.map((product, index) => (
              <ProductCard 
                key={index} 
                product={{
                  id: product.id,
                  brand: product.brand,
                  name: product.name,
                  frontImage: product.image,
                  backImage: product.back_image || product.image,
                  price: product.price,
                  discountPrice: product.discounted_price || undefined,
                  discountAdded: product.discount_added,
                  quantity: product.quantity
                }}
                hideTitle={hideTitle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
           <Image src={noProducts} alt="no products found" width={150} height={150} className="w-36 h-36 md:w-48 md:h-48 mb-6" />
            <p className="text-2xl font-medium text-gray-700 mb-2">No Products Found</p>
            <p className="text-gray-500 text-base">Sorry, we couldn&apos;t find any products matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6 sm:mt-8">
          <PaginationContent className="flex justify-center lg:justify-end gap-1 sm:gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              />
            </PaginationItem>
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className={`text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-md border border-gray-300 ${
                    page === currentPage
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}