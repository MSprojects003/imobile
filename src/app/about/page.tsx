'use client';

import React, { useRef, useEffect, useState } from "react";
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
import { Award, Heart, Star, Store, Trophy, UsersIcon, ShoppingBag } from "lucide-react";
import OurBrands from "@/components/custom/OurBrands";
import Autoplay from "embla-carousel-autoplay";
import founder   from "@/pictures/profiles/founder.png";
import abdullah  from "@/pictures/profiles/abdullah.png";
import store1 from "../../pictures/background/store.webp";
import bgImage from "../../pictures/background/about-us.jpg";
import atheef from "@/pictures/profiles/Mohamed Atheef.jpg";

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  target: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
}> = ({ target, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span id={`counter-${target}`} className="font-bold text-2xl text-slate-900">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Placeholder team member data (replace with actual data)
const teamMembers = [
  {
    name: "Mohamed Firdous Jalaldeen",
    position: "Founder & CEO",
    description: "Over 25 years in the mobile phone industry, driving iMobile&apos;s vision and growth.",
    image:  founder,
  },
  {
    name: "Abdullah Firdous",
    position: "Head of Marketing",
    description: "Abdullah leads our marketing efforts with innovative campaigns and a passion for branding.",
    image: abdullah,
  },
  {
    name: "Mohamed Atheef",
    position: "Lead Developer",
    description: "Atheef builds cutting-edge solutions, ensuring our platform remains top-tier.",
    image: atheef,
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

      {/* Updated Achievements Section with Real Data */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pioneering mobile retail in Sri Lanka with groundbreaking milestones and nationwide reach.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sri Lanka&apos;s First Mobile Shop */}
            <Card className="bg-white shadow-lg border-l-4 border-l-red-700 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <Trophy className="h-12 w-12 text-red-700 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Sri Lanka&apos;s First</h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-700">
                    <AnimatedCounter target={1000} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Subscribers Mobile Shop in YouTube - Leading the industry since inception
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Wholesale Customers */}
            <Card className="bg-white shadow-lg border-l-4 border-l-red-700 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <Store className="h-12 w-12 text-red-700 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Wholesale Network</h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-700">
                    <AnimatedCounter target={100} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Partner Shops Islandwide - Strongest wholesale distribution network
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Base */}
            <Card className="bg-white shadow-lg border-l-4 border-l-red-700 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <UsersIcon className="h-12 w-12 text-red-700 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Satisfied Customers</h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-700">
                    <AnimatedCounter target={50000} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Happy Customers - Trusted by thousands across Sri Lanka
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Products Delivered */}
            <Card className="bg-white shadow-lg border-l-4 border-l-red-700 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-red-700 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Products Delivered</h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-700">
                    <AnimatedCounter target={250000} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mobile Devices & Accessories - Unmatched product delivery record
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Achievement Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <h4 className="text-md font-semibold text-gray-900">Years of Excellence</h4>
                </div>
                <div className="text-xl font-bold text-slate-900">
                  <AnimatedCounter target={25} suffix="+" />
                </div>
                <p className="text-xs text-gray-600">Industry Experience</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-8 w-8 text-yellow-400" />
                  <h4 className="text-md font-semibold text-gray-900">Branches</h4>
                </div>
                <div className="text-xl font-bold text-slate-900">
                  <AnimatedCounter target={5} />
                </div>
                <p className="text-xs text-gray-600">Across Colombo</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-8 w-8 text-red-500" />
                  <h4 className="text-md font-semibold text-gray-900">Customer Rating</h4>
                </div>
                <div className="text-xl font-bold text-slate-900">
                  <AnimatedCounter target={98} suffix="%" />
                </div>
                <p className="text-xs text-gray-600">Satisfaction Rate</p>
              </CardContent>
            </Card>
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