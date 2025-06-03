
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

// Dummy data for banner images
const bannerImages = [
  {
    imageUrl: 'https://picsum.photos/1200/400?random=1',
    href: '/banner-offer-1',
  },
  {
    imageUrl: 'https://picsum.photos/1200/400?random=2',
    href: '/banner-offer-2',
  },
  {
    imageUrl: 'https://picsum.photos/1200/400?random=3',
    href: '/banner-offer-3',
  },
  {
    imageUrl: 'https://picsum.photos/1200/400?random=4',
    href: '/banner-offer-4',
  },
];

export function HomeBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Auto-play every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full mt-0 pt-0" // Removed top margin and padding
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
          {bannerImages.map((banner, index) => (
            <CarouselItem key={index}>
              <Link href={banner.href} className="block w-full">
                <div className="relative w-full h-48 sm:h-64 md:h-96">
                  <Image
                    src={banner.imageUrl}
                    alt={`Banner ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0} // Prioritize the first image for faster loading
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious
          className={`absolute top-1/2 -translate-y-1/2 bg-blue-900 shadow-sm shadow-black   text-white rounded-full border-none p-6 transition-all duration-300 ease-in-out ${
            isHovered ? 'left-[5%] opacity-100 ' : 'left[0%] opacity-0'
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft   />
        </CarouselPrevious>

        {/* Next Button */}
        <CarouselNext
          className={`absolute top-1/2 -translate-y-1/2 bg-blue-900 shadow-sm shadow-black text-white rounded-full border-none  p-6 transition-all duration-300 ease-in-out ${
            isHovered ? 'right-[5%] opacity-100' : 'right-[0%] opacity-0'
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight   />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
