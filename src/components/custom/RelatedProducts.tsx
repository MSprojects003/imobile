import { useQuery } from '@tanstack/react-query';
import { getRelatedProducts } from '@/lib/db/products';
import ProductList from './ProductList';
import { Sparkles, PackageX } from 'lucide-react';

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

  const hasProducts = products && products.length > 0;

  return (
    <div>
      {isLoading ? (
        <div>Loading related products...</div>
      ) : isError || !products || products.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <PackageX className="w-10 h-10 mb-2" />
          <span className="text-base font-medium">No related products found for this category or brand.</span>
        </div>
      ) : (
        <ProductList products={products} title="Related Products" hideSort={true} />
      )}
    </div>
  );
};

export default RelatedProducts;