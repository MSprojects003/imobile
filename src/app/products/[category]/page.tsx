'use client';
import ProductList from '@/components/custom/ProductList'
import React from 'react'
import { getAuthUser } from '@/lib/db/user';
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

  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  const { data: allproducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProductList,
    enabled: !!user,
  });

  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    if (!allproducts) return [];
    // Normalize category for comparison
    const normalizedCategory = resolvedParams.category.replace(/-/g, ' ').toLowerCase();
    return allproducts.filter((product: Product) =>
      (product.category || '').replace(/-/g, ' ').toLowerCase() === normalizedCategory
    );
  }, [allproducts, resolvedParams.category]);

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debug info: show category and normalized value */}
      <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
        <div><strong>Original category:</strong> {resolvedParams.category}</div>
        <div><strong>Normalized category:</strong> {normalizedCategory}</div>
      </div>
      <ProductList products={filteredProducts} category={normalizedCategory} title={displayCategory} />
    </div>
  );
}