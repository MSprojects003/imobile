import BusinessLogicCarousel from "@/components/custom/BusinessLogicCarousel";
import { FeaturedCategories } from "@/components/custom/FeaturedCategories";
import { HomeBanner } from "@/components/custom/HomeBanner";
import NewProducts from "@/components/custom/NewProduct";
import OurBrands from "@/components/custom/OurBrands";

export default function Home() {
  return (
    <div className="bg-gray-50  ">
      <HomeBanner />
      <BusinessLogicCarousel />
      <NewProducts limit={4} />
      <FeaturedCategories />
      <OurBrands />
      
    </div>
  );
}
