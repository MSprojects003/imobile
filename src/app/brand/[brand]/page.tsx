'use client';
import ProductList from '@/components/custom/ProductList'
import React from 'react'
import { getAuthUser } from '@/lib/db/user';
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

  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  const { data: allproducts } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => (user ? getAllProductList() : Promise.resolve(null)),
    enabled: !!user,
  });

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList 
        products={allproducts || []} 
        brand={normalizedBrand} 
        title={`${displayBrand} Products`} 
      />
    </div>
  )
}