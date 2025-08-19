'use client';

import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Award, Heart, Star, Users } from "lucide-react";
import OurBrands from "@/components/custom/OurBrands";
import Autoplay from "embla-carousel-autoplay";

import store1 from "../../pictures/background/store.webp";
import bgImage from "../../pictures/background/about-us.jpg";

// Placeholder team member data (replace with actual data)
const teamMembers = [
  {
    name: "Mohamed Firdous Jalaldeen",
    position: "Founder & CEO",
    description: "Over 25 years in the mobile phone industry, driving iMobile’s vision and growth.",
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    name: "Jane Smith",
    position: "Head of Marketing",
    description: "Jane leads our marketing efforts with innovative campaigns and a passion for branding.",
    image: "https://picsum.photos/200/200?random=2",
  },
  {
    name: "Alex Perera",
    position: "Lead Developer",
    description: "Alex builds cutting-edge solutions, ensuring our platform remains top-tier.",
    image: "https://picsum.photos/200/200?random=3",
  },
];

// Carousel component for the Our Story section with autoplay
const ImageCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for DOM element
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi | undefined>(undefined); // State for Embla API

  // Optional: Use useEffect to access Embla API if needed
  useEffect(() => {
    if (emblaApi) {
      console.log("Embla API initialized for ImageCarousel");
    }
  }, [emblaApi]);

  const images = [
    { src: store1, alt: "Store Image 1" },
    {
      src: "https://lh3.googleusercontent.com/p/AF1QipNF7S70TW5wmmVeh9ncFhjI08Id4BPO_H5DF3pY=s1360-w1360-h1020-rw",
      alt: "Store Image 2",
    },
    {
      src: "https://lh3.googleusercontent.com/p/AF1QipNsb4KbwrgpfFumPPNI2DtikVGwaD5gLtVNdfVK=s1360-w1360-h1020-rw",
      alt: "Store Image 3",
    },
    {
      src: "https://lh3.googleusercontent.com/p/AF1QipO2KYD9KolKibpWen88fnI2VTTk7qzsOMRE9aeM=s1360-w1360-h1020-rw",
      alt: "Store Image 4",
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Carousel
        ref={carouselRef}
        setApi={setEmblaApi} // Pass the setter function
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
      </Carousel>
    </div>
  );
};

export default function AboutPage() {
  const teamCarouselRef = useRef<HTMLDivElement>(null); // Ref for DOM element
  const [teamEmblaApi, setTeamEmblaApi] = React.useState<CarouselApi | undefined>(undefined); // State for Embla API

  // Optional: Use useEffect to access Embla API for team carousel if needed
  useEffect(() => {
    if (teamEmblaApi) {
      console.log("Embla API initialized for Team Carousel");
    }
  }, [teamEmblaApi]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white">
      {/* Hero Section with Background Image */}
      <section className="py-16 md:py-24 bg-cover bg-center relative">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bgImage}
            alt="About Us Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className="absolute inset-0 bg-slate-800 opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5DEB3]">
              About Imobile
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Welcome to Imobile, your trusted destination for premium products and exceptional shopping experiences. We&apos;re committed to delivering quality, innovation, and unparalleled customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <ImageCarousel />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-gray-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                iMobile is a leading importer and wholesaler of high-quality mobile phones and accessories in Sri Lanka. With five branches across Colombo, we are committed to providing the latest products at competitive prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our wide range includes premium accessories and cutting-edge gadgets, catering to the needs of both retailers and individual customers. At iMobile, we combine innovation, reliability, and exceptional service to stay ahead in the mobile industry.
              </p>
              <div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 text-base">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the dedicated professionals behind iMobile, driving innovation and excellence.
            </p>
          </div>
          <div className="relative w-full max-w-3xl mx-auto">
            <Carousel
              ref={teamCarouselRef}
              setApi={setTeamEmblaApi} // Pass the setter function
              className="w-full"
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[Autoplay({ delay: 3000 })]}
            >
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-white shadow-lg">
                      <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="rounded-none object-cover"
                        />
                        <div className="text-center md:text-left space-y-4">
                          <h3 className="text-2xl font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-gray-500 italic">{member.position}</p>
                          <p className="text-gray-600 leading-relaxed">{member.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
              <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Delivery Partner Section (Commented Out) */}
      {/* <section className="py-12" id="shipping">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-8">
              <Image
                src="https://koombiyodelivery.lk/assets/img/logo.png"
                alt="DeliveryPartner.lk Logo"
                width={220}
                height={220}
                className="rounded-lg object-contain bg-gray-100 p-2 border border-gray-200 shadow-sm mb-4"
              />
              <a
                href="https://koombiyodelivery.lk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-extrathin text-blue-700 hover:underline-none hover:text-slate-900 block text-center mb-2 tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Koombiyo Delivery
              </a>
              <p className="text-gray-600 text-left text-base mt-2 mb-4 w-full">
                We are proud to partner with Koombiyo Delivery, a trusted logistics provider ensuring fast and secure delivery for all your orders. Delivery charges are affordable: just 250 Rupees within Colombo and 400 Rupees for outstation deliveries. Experience reliable service and real-time tracking with every shipment.
              </p>
              <div className="mt-2 w-full flex flex-col items-start gap-1">
                <div className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Fira Mono, monospace' }}>
                  In Colombo: <span className="text-green-900 font-bold">250 Rupees</span>
                </div>
                <div className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Fira Mono, monospace' }}>
                  Out of Colombo: <span className="text-red-800 font-bold">400 Rupees</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section> */}

      {/* Acknowledgments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;re proud of the milestones we&apos;ve achieved and the recognition we&apos;ve earned.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Award className="h-12 w-12 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Best E-Commerce Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Awarded in 2024 for outstanding user experience and innovation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Star className="h-12 w-12 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">5-Star Customer Rating</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consistently rated 5 stars by our valued customers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="h-12 w-12 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Global Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Serving customers in over 50 countries worldwide.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Heart className="h-12 w-12 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Sustainability Commitment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Partnered with eco-friendly brands to promote sustainability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action (Commented Out) */}
      {/* <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Become part of the imobile family. Shop with us and experience the difference of quality and care.
          </p>
          <Button className="bg-white text-slate-900 hover:bg-gray-100 px-6 py-3 text-base">
            Start Shopping
          </Button>
        </div>
      </section> */}

      <OurBrands />
    </div>
  );
}