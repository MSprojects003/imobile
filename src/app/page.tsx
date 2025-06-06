import BusinessLogicCarousel from "@/components/custom/BusinessLogicCarousel";
import { HomeBanner } from "@/components/custom/HomeBanner";
import ProductCard from "@/components/custom/ProductCard";
 

 


export default function Home() {

  const mockProduct = {
    brand: "MockBrand",
    name: "Mock Product Name",
    // Using potential direct image links from Unsplash page URLs
    // For production, consider using the official Unsplash API for stable image URLs
    frontImage: "https://picsum.photos/1200/400?random=1", 
    backImage: "https://picsum.photos/1200/400?random=2",   
    price: 99.99,
    // discountPrice: 79.99, // Optional: Uncomment to test discount
  };

  return (
 <>
 <HomeBanner />
 <BusinessLogicCarousel />
  <ProductCard product={mockProduct} />
 </>
  );
}
