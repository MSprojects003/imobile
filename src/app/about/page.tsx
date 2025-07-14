"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Award, Heart, Star, Users } from "lucide-react"
import founder from "../../pictures/profiles/founder.jpg"
import bgImage from "../../pictures/background/contact.jpeg" // Import your background image
import OurBrands from "@/components/custom/OurBrands"
import store from "../../pictures/background/WhatsApp Image 2025-07-14 at 13.02.15_472a455d.jpg"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white">
      {/* Hero Section with Background Image */}
      <section className="py-16 md:py-24 bg-cover bg-center relative">
        {/* Background Image with Next.js Image component */}
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
              About DataCellular
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Welcome to DataCellular, your trusted destination for premium products and exceptional shopping experiences. We&apos;re committed to delivering quality, innovation, and unparalleled customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src={store}
                alt="Store image"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full max-w-lg"
              />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-gray-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2020, DataCellular was born with a mission to bring high-quality, innovative products to customers worldwide. From our humble beginnings, we&apos;ve grown into a trusted e-commerce platform, serving thousands of satisfied customers with our curated selection.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team is dedicated to providing a seamless shopping experience, blending cutting-edge technology with exceptional service. We prioritize sustainability, quality, and positive impact in the communities we serve.
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

      {/* Founder Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Meet Our Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The visionary behind DataCellular, driving innovation and excellence.
            </p>
          </div>
          <Card className="max-w-3xl mx-auto bg-white shadow-lg">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
              <Image
                src={founder}
                alt="Founder"
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
              <div className="text-center md:text-left space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Mohamed Khaliq</h3>
                <p className="text-gray-500 italic">Founder & CEO</p>
                <p className="text-gray-600 leading-relaxed">
                  Mohamed Khaliq is a passionate entrepreneur with over 10 years of experience in e-commerce and technology. Her vision for DataCellular was to create a platform that offers premium products while fostering a community of conscious consumers. Under her leadership, DataCellular has become a leader in innovative online retail.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Delivery Partner Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-8">
              <Image
                src="http://deliverypartner.lk/public/images/default/logo.png"
                alt="DeliveryPartner.lk Logo"
                width={220}
                height={220}
                className="rounded-lg object-contain bg-gray-100 p-2 border border-gray-200 shadow-sm mb-4"
              />
              <a
                href="https://deliverypartner.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-extrabold text-blue-700 hover:underline block text-center mb-2 tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                DeliveryPartner.lk
              </a>
              <p className="text-gray-600 text-left text-base mt-2 mb-4 w-full">
                We are proud to partner with DeliveryPartner.lk, a trusted logistics provider ensuring fast and secure delivery for all your orders. Delivery charges are affordable: just 250 Rupees within Colombo and 400 Rupees for outstation deliveries. Experience reliable service and real-time tracking with every shipment.
              </p>
              <div className="mt-2 w-full flex flex-col items-start gap-1">
                <div className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Fira Mono, monospace' }}>
                  In Colombo: <span className="text-green-700 font-bold">250 Rupees</span>
                </div>
                <div className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Fira Mono, monospace' }}>
                  Out of Colombo: <span className="text-red-700 font-bold">400 Rupees</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

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

      {/* Call to Action
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Become part of the DataCellular family. Shop with us and experience the difference of quality and care.
          </p>
          <Button className="bg-white text-slate-900 hover:bg-gray-100 px-6 py-3 text-base">
            Start Shopping
          </Button>
        </div>
      </section> */}

       <OurBrands />
    </div>
  )
}