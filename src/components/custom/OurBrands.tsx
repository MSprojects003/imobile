"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image, { StaticImageData } from "next/image"
import amazonLogo from "../../pictures/brands/amazon.png"
import huwavei from "../../pictures/brands/huawei.jpeg"
import marshell from "../../pictures/brands/Marshall-Logo.png"
import bose from "../../pictures/brands/bose.png"
import sony from "../../pictures/brands/sony.png"
import apple from "../../pictures/brands/apple.png"

interface Brand {
  id: string
  name: string
  logo: string | StaticImageData
  href: string
}

const brands: Brand[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: amazonLogo,
    href: "/brands/amazon",
  },
  {
    id: "sony",
    name: "sony",
    logo: sony,
    href: "/brands/sony",
  },
  {
    id: "marshall",
    name: "Marshall",
    logo: marshell,
    href: "/brands/marshall",
  },
  {
    id: "huawei",
    name: "Huawei",
    logo: huwavei,
    href: "/brands/huawei",
  },
  {
    id: "bose",
    name: "Bose",
    logo: bose,
    href: "/brands/bose",
  },
  {
    id: "apple",
    name: "Apple",
logo: apple,
    href: "/brands/apple",
  },
]

export default function OurBrands() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Header with title and navigation buttons */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Our Brands</h2>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static translate-y-0 bg-white border shadow-sm hover:bg-gray-50 h-10 w-10" />
              <CarouselNext className="static translate-y-0 bg-white border shadow-sm hover:bg-gray-50 h-10 w-10" />
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {brands.map((brand) => (
              <CarouselItem
                key={brand.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link href={brand.href} className="block group">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                    <CardContent className="flex items-center justify-center p-8 min-h-[120px] h-[100px]">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={`${brand.name} logo`}
                        width={150}
                        height={60}
                        className="object-contain filter grayscale-0 group-hover:grayscale transition-all  duration-200"
                      />
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
