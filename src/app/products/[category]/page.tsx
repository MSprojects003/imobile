'use client';
import ProductList from '@/components/custom/ProductList'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllProductList, Product } from '@/lib/db/products';

export default function Page({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = React.use(params);

  // Format the category name for display
  const displayCategory = resolvedParams.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  // Normalize category for filtering
  const normalizedCategory = resolvedParams.category.replace(/-/g, ' ').toLowerCase();

  // Debug: log category and normalized value
  console.log('Original category:', resolvedParams.category);
  console.log('Normalized category:', normalizedCategory);

  // Remove user dependency for fetching products
  const { data: allproducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProductList,
  });

  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    if (!allproducts) return [];
    // Always use 'earphones' as the category for filtering (or use normalizedCategory if you want dynamic)
    return allproducts.filter((product: Product) =>
      (product.category || '').replace(/-/g, ' ').toLowerCase() === 'earphones'
    );
  }, [allproducts]);

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <ProductList products={filteredProducts} category="earphones" title={displayCategory} />
    </div>
  );
}