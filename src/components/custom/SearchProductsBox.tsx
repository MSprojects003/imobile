import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProductList } from "@/lib/db/products";

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

// Interface for search results
interface SearchProduct {
  id: string
  brand: string
  name: string
  frontImage: string
  backImage: string
  price: number
  discountPrice?: number
  discountAdded?: boolean
  category: string
}

interface SearchProductsBoxProps {
  placeholder?: string;
  onSelectProduct?: (product: SearchProduct) => void;
}

export default function SearchProductsBox({
  placeholder = "Search products...",
  onSelectProduct,
}: SearchProductsBoxProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<SearchProduct[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch products from database
  const { data: databaseProducts, isLoading } = useQuery({
    queryKey: ['search-products'],
    queryFn: getAllProductList,
  });

  // Transform database products to search format - memoized to prevent infinite re-renders
  const products = useMemo(() => {
    if (!databaseProducts) return [];
    
    return databaseProducts.map((product: DatabaseProduct) => ({
      id: product.id,
      brand: product.brand,
      name: product.name,
      frontImage: product.image,
      backImage: product.back_image || product.image,
      price: product.price,
      discountPrice: product.discounted_price || undefined,
      discountAdded: product.discount_added,
      category: product.category,
    }));
  }, [databaseProducts]);

  // Search logic - memoized to prevent unnecessary recalculations
  const searchResults = useMemo(() => {
    if (query.trim() === "" || !products.length) {
      return [];
    }
    
    const q = query.toLowerCase();
    return products.filter((p) =>
      (p.name?.toLowerCase() || "").includes(q) ||
      (p.brand?.toLowerCase() || "").includes(q) ||
      (p.category?.toLowerCase() || "").includes(q)
    );
  }, [query, products]);

  // Update filtered results and dropdown visibility
  useEffect(() => {
    setFiltered(searchResults);
    setShowDropdown(searchResults.length > 0);
  }, [searchResults]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full max-w-lg">
      <input
        ref={inputRef}
        type="text"
        className="w-full border border-gray-900 px-4 py-2 pr-12 text-md focus:outline-none placeholder:text-gray-500"
        placeholder={isLoading ? "Loading products..." : placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && filtered.length > 0 && setShowDropdown(true)}
        style={{ borderRadius: 0 }}
        disabled={isLoading}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:inline">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </span>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          <div className="px-4 pt-3 pb-2 border-b text-xs font-semibold text-gray-500 tracking-widest">
            PRODUCTS
          </div>
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setShowDropdown(false);
                  setQuery("");
                  if (onSelectProduct) {
                    onSelectProduct(product);
                  } else {
                    router.push(`/product/${product.id}`);
                  }
                }}
              >
                <div className="w-12 h-12 flex-shrink-0 relative">
                  <Image
                    src={product.frontImage}
                    alt={product.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {product.discountPrice && product.discountAdded ? (
                      <>
                        <span className="line-through text-gray-400 mr-2">Rs {product.price.toLocaleString()}</span>
                        <span className="text-green-700 font-bold">Rs {product.discountPrice.toLocaleString()}</span>
                      </>
                    ) : (
                      <span>Rs {product.price.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <PackageSearch className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-base font-semibold text-gray-700 mb-1">No Products Found</p>
              <p className="text-gray-500 text-sm text-center">Sorry, we couldn&apos;t find any products matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 