"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image, { StaticImageData } from "next/image"
import akg from "../../pictures/brands/akg.png"
import anker from "../../pictures/brands/anker.png"
import remax from "../../pictures/brands/remax.png"
import jccom from "../../pictures/brands/jccom.png"
import joyroom from "../../pictures/brands/joyrrom.png"
import denmen from "../../pictures/brands/denmen.png"
import jbl from "../../pictures/brands/jbl.png"
import belkin from "../../pictures/brands/belkin.png"
import kingston from "../../pictures/brands/kingston.png"
import kaiyue from "../../pictures/brands/kaiue.png"
import mtb from "../../pictures/brands/mtb.png"
import basues from "../../pictures/brands/basues.png"
import spigen from "../../pictures/brands/spigen.png"
 
 

interface Brand {
  id: string
  name: string
  logo: string | StaticImageData
  href: string
}

const brands: Brand[] = [
  {
    id: "akg",
    name: "akg",
    logo: akg,
    href: "/brand/akg",
  },
  {
    id: "denmen",
    name: "denmen",
    logo: denmen,
    href: "/brand/denmen",
  },
  {
    id: "anker",
    name: "anker",
    logo: anker,
    href: "/brand/anker",
  },
  {
    id: "jbl",
    name: "jbl",
    logo: jbl,
    href: "/brand/jbl",
  },
  {
    id: "belkin",
    name: "belkin",
    logo: belkin,
    href: "/brand/belkin",
  },
  {
    id: "basues",
    name: "basues",
logo: basues,
    href: "/brand/baseus",
  },
   {
    id: "jccom",
    name: "jccom",
logo: jccom,
    href: "/brand/jccom",
  },
   {
    id: "joyroom",
    name: "joyroom",
logo: joyroom,
    href: "/brand/joyroom",
  },
   {
    id: "kingston",
    name: "kingston",
logo: kingston,
    href: "/brand/kingston",
  },
   {
    id: "mtb",
    name: "mtb",
logo: mtb,
    href: "/brand/mtb",
  },
   {
    id: "remax",
    name: "remax",
logo: remax,
    href: "/brand/remax",
  },
   {
    id: "spigen",
    name: "spigen",
logo: spigen,
    href: "/brand/spigen",
  }, {
    id: "kaiyue",
    name: "kaiyue",
logo: kaiyue,
    href: "/brand/kaiyue",
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
