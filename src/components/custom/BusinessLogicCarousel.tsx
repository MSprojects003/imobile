'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Truck, Briefcase, Monitor } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

interface BusinessLogicItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const businessLogicItems: BusinessLogicItem[] = [
  {
    icon: Apple,
    title: "Authorized Reseller",
    description: "Apple Products in Sri Lanka",
  },
  {
    icon: Truck,
    title: "We Do Delivery",
    description: "Delivery Within 7 Days",
  },
  {
    icon: Briefcase,
    title: "Secure Payment",
    description: "We Ensure Secure Payment",
  },
  {
    icon: Monitor,
    title: "Genuine Products",
    description: "We Sell Only 100% Genuine Products",
  },
];

export default function BusinessLogicCarousel() {
  return (
    <div className="py-8 px-4 lg:px-8 bg-white">
      {/* Desktop View with Marquee */}
      <div className="hidden lg:block overflow-hidden">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap">
            <div className="inline-flex justify-around items-center w-full">
              {businessLogicItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 mx-8 flex-shrink-0">
                  <item.icon className="h-10 w-10 text-gray-800" />
                  <div className="flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {businessLogicItems.map((item, index) => (
                <div key={`duplicate-${index}`} className="flex items-center space-x-4 p-4 mx-8 flex-shrink-0">
                  <item.icon className="h-10 w-10 text-gray-800" />
                  <div className="flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden max-w-sm mx-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {businessLogicItems.map((item, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="p-1">
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col justify-center items-center space-x-0 space-y-2 p-4">
                      <item.icon className="h-10 w-10 text-gray-800" />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}