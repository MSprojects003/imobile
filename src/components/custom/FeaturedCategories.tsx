"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import mobile from "../../pictures/mobiles.png"
import watch from "../../pictures/watch-cat.jpg"
import tablet from "../../pictures/tablet-cat.jpg"
import headphone from "../../pictures/headphone-cat.jpg"
import speaker from "../../pictures/speaker-cat.jpg"

const categories = [
  {
    title: "Innovative Smartphones",
    subtitle: "Infinite Possibilities",
    description: "Experience the Power of innovative smartphones",
    buttonText: "Explore Mobiles",
    image: mobile,
    alt: "Smartphones",
  },
  {
    title: "Audio Excellence Collection",
    subtitle: "Immerse Yourself in Sound",
    description: "Surround Yourself with Sound",
    buttonText: "All Headphones",
    image: headphone,
    alt: "Headphones",
  },
  {
    title: "Immersive Speaker Collection",
    subtitle: "Surround Yourself with Sound",
    description: "Stay Connected, Stay Active",
    buttonText: "Browse Speakers",
    image: speaker,
    alt: "Speakers",
  },
  {
    title: "Futuristic Smartwatches",
    subtitle: "Stay Connected, Stay Active",
    description: "Elevate Your Productivity",
    buttonText: "Explore Smart Watches",
    image: watch,
    alt: "Smartwatches",
  },
  {
    title: "Tablets",
    subtitle: "Elevate Your Productivity",
    description: "Explore our collection of Tablets that would boost your productivity.",
    buttonText: "Get a Tablet",
    image: tablet,
    alt: "Tablets",
  },
]

export function FeaturedCategories() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-left">Featured Categories</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* First three cards - equal width on large screens */}
        {categories.slice(0, 3).map((category, index) => {
          const formattedCategory = category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
          return (
            <Card key={index} className="relative overflow-hidden group cursor-pointer h-64 md:h-72">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <CardContent className="relative h-full flex flex-col justify-between p-6 text-white z-10">
                <div>
                  <p className="text-sm opacity-90 mb-1">{category.subtitle}</p>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-80">{category.description}</p>
                </div>

                <div className="flex justify-end">
                  <Link href={`/products/${formattedCategory}`}>
                    <Button variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white transition-colors">
                      {category.buttonText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom row - two cards with different widths */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Smartwatch card - 2/5 width on large screens */}
        <Card className="lg:col-span-2 relative overflow-hidden group cursor-pointer h-64 md:h-72">
          <div className="absolute inset-0">
            <Image
              src={categories[3].image || "/placeholder.svg"}
              alt={categories[3].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <CardContent className="relative h-full flex flex-col justify-between p-6 text-white z-10">
            <div>
              <p className="text-sm opacity-90 mb-1">{categories[3].subtitle}</p>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{categories[3].title}</h3>
              <p className="text-sm opacity-80">{categories[3].description}</p>
            </div>

            <div className="flex justify-end">
              <Link href={`/products/${categories[3].title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                <Button variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white transition-colors">
                  {categories[3].buttonText}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Tablet card - 3/5 width on large screens */}
        <Card className="lg:col-span-3 relative overflow-hidden group cursor-pointer h-64 md:h-72">
          <div className="absolute inset-0">
            <Image
              src={categories[4].image || "/placeholder.svg"}
              alt={categories[4].alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <CardContent className="relative h-full flex flex-col justify-between p-6 text-white z-10">
            <div>
              <p className="text-sm opacity-90 mb-1">{categories[4].subtitle}</p>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{categories[4].title}</h3>
              <p className="text-sm opacity-80">{categories[4].description}</p>
            </div>

            <div className="flex justify-end">
              <Link href={`/products/${categories[4].title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                <Button variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white transition-colors">
                  {categories[4].buttonText}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}