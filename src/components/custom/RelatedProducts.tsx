import { useQuery } from '@tanstack/react-query';
import { getRelatedProducts } from '@/lib/db/products';
import ProductList from './ProductList';
import { PackageX } from 'lucide-react';

interface RelatedProductsProps {
  category: string;
  brand: string;
  excludeProductId?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, brand, excludeProductId }) => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['related-products', category, brand, excludeProductId],
    queryFn: () => getRelatedProducts(category, brand, excludeProductId, 4),
  });

  if (isLoading) {
    return <div>Loading related products...</div>;
  }

  if (isError || !products || products.length === 0) {
  return (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <PackageX className="w-10 h-10 mb-2" />
        <span className="text-base font-semibold text-gray-700">
          No related products available.
        </span>
        </div>
    );
  }

  return (
        <ProductList products={products} title="Related Products" hideSort={true} />
  );
};

export default RelatedProducts;