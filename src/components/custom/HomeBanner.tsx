"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllBanners } from "@/lib/db/banner";

export function HomeBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: banners, isLoading, isError } = useQuery({
    queryKey: ["hero"],
    queryFn: getAllBanners,
  });

  useEffect(() => {
    if (!isHovered && banners && banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, banners]);

  if (isLoading) {
    return (
      <div className="relative w-full mt-0 pt-0 h-[250px] sm:h-[250px] md:h-[461px] bg-gray-300 animate-pulse">
        <div className="w-full h-full bg-gray-400 opacity-50"></div>
      </div>
    );
  }

  if (isError || !banners || banners.length === 0) return <div>No banners found.</div>;

  const showNavButtons = banners.length > 1;

  return (
    <div
      className="relative w-full mt-0 pt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={(api) => {
          api?.scrollTo(currentIndex);
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => {
            const isMobile = isMobileView();
            const imageUrl = isMobile
              ? banner.mobile_image || banner.image_url // Use desktop image if mobile_image_url is null/undefined
              : banner.image_url;

            return (
              <CarouselItem key={banner.id || index}>
                <Link href={banner.link_url || "#"} className="block w-full">
                  <div
                    className={`relative w-full ${
                      isMobile ? "h-[250px] sm:h-[250px]" : "h-[250px] sm:h-[250px] md:h-[461px]"
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={banner.title || `Banner ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Previous Button */}
        {showNavButtons && (
          <CarouselPrevious
            className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 text-center shadow-sm shadow-black text-white rounded-full border-none p-6 ${
              isHovered && !isMobileView() ? "left-[15%] opacity-100" : "left-0 opacity-0"
            } ${isMobileView() ? "block" : "hidden md:block"}`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="text-center" />
          </CarouselPrevious>
        )}

        {/* Next Button */}
        {showNavButtons && (
          <CarouselNext
            className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 shadow-sm shadow-black text-white rounded-full border-none p-6 ${
              isHovered && !isMobileView() ? "right-[15%] opacity-100" : "right-0 opacity-0"
            } ${isMobileView() ? "block" : "hidden md:block"}`}
            aria-label="Next Slide"
          >
            <ChevronRight className="text-center" />
          </CarouselNext>
        )}
      </Carousel>
    </div>
  );
}

// Helper function to detect mobile view
function isMobileView() {
  return window.innerWidth < 768; // Adjust breakpoint as needed
}