'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllBanners } from '@/lib/db/banner';

export function HomeBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: banners, isLoading, isError } = useQuery({
    queryKey: ['hero'],
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
        {/* Skeleton placeholder */}
        <div className="w-full h-full bg-gray-400 opacity-50"></div>
      </div>
    );
  }

  if (isError || !banners || banners.length === 0) return <div>No banners found.</div>;

  return (
    <div
      className="relative w-full mt-0 pt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={(api) => {
          api?.scrollTo(currentIndex);
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id || index}>
              <Link href={banner.link_url || '#'} className="block w-full">
                <div className="relative w-full h-[250px] sm:h-[250px] md:h-[461px]">
                  <Image
                    src={banner.image_url}
                    alt={banner.title || `Banner ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious
          className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 shadow-sm shadow-black text-white rounded-full border-none p-6 ${
            isHovered && !isMobileView() ? 'left-[5%] opacity-100' : 'left-0 opacity-100'
          } ${isMobileView() ? 'block' : 'hidden md:block'}`}
          aria-label="Previous Slide"
        >
          <ChevronLeft />
        </CarouselPrevious>

        {/* Next Button */}
        <CarouselNext
          className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 shadow-sm shadow-black text-white rounded-full border-none p-6 ${
            isHovered && !isMobileView() ? 'right-[5%] opacity-100' : 'right-0 opacity-100'
          } ${isMobileView() ? 'block' : 'hidden md:block'}`}
          aria-label="Next Slide"
        >
          <ChevronRight />
        </CarouselNext>
      </Carousel>
    </div>
  );
}

// Helper function to detect mobile view
function isMobileView() {
  return window.innerWidth < 768; // Adjust breakpoint as needed
}