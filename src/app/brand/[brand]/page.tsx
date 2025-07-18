'use client';
import ProductList from '@/components/custom/ProductList'
import React from 'react'
import { Product } from '@/lib/db/products';
import { useQuery } from '@tanstack/react-query';
import { getAllProductList } from '@/lib/db/products';

export default function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const resolvedParams = React.use(params);
  
  // Format the brand name for display
  const displayBrand = resolvedParams.brand
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())

  // Normalize brand for filtering
  const normalizedBrand = resolvedParams.brand.replace(/-/g, ' ').toLowerCase();

  // Remove user dependency for fetching products
  const { data: allproducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProductList,
  });

  // Filter products by brand
  const filteredProducts = React.useMemo(() => {
    if (!allproducts) return [];
    // Always use normalizedBrand for filtering
    return allproducts.filter((product: Product) =>
      (product.brand || '').replace(/-/g, ' ').toLowerCase() === normalizedBrand
    );
  }, [allproducts, normalizedBrand]);

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList products={filteredProducts} brand={normalizedBrand} title={`${displayBrand} Products`} />
    </div>
  )
}