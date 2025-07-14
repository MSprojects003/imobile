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

  // useQuery must be called inside the component
  const { data: banners, isLoading, isError } = useQuery({
    queryKey: ["hero"],
    queryFn: getAllBanners,
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && banners && banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Auto-play every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, banners]);

  if (isLoading) return <div>Loading banners...</div>;
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
              <Link href={banner.link_url || "#"} className="block w-full">
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
          className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 shadow-sm shadow-black text-white rounded-full border-none p-6 transition-all duration-300 ease-in-out ${
            isHovered ? 'left-[5%] opacity-100' : 'left-[-10%] opacity-0'
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft />
        </CarouselPrevious>

        {/* Next Button */}
        <CarouselNext
          className={`absolute top-1/2 -translate-y-1/2 bg-slate-900 shadow-sm shadow-black text-white rounded-full border-none p-6 transition-all duration-300 ease-in-out ${
            isHovered ? 'right-[5%] opacity-100' : 'right-[-10%] opacity-0'
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight />
        </CarouselNext>
      </Carousel>
    </div>
  );
}