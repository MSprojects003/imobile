"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import Image from "next/image"
import { FaTiktok } from "react-icons/fa"
import logo from "../../pictures/whitelogo.png"



export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={logo}// Replace with the actual path to your logo image
                alt="DataCellular Logo"
                width={150}
                height={50}
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-slate-300 leading-relaxed">
              Premium e-commerce platform delivering exceptional products worldwide. Experience luxury shopping with unmatched quality and service excellence.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Link href="https://web.facebook.com/iMobileuniqueplaza/?_rdc=1&_rdr#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-blue-600">
                    <Facebook size={18} />
                  </div>
                </Link>
                <Link href="https://www.instagram.com/_abdul_laah_/" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-pink-600">
                    <Instagram size={18} />
                  </div>
                </Link>
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-sky-500">
                    <Twitter size={18} />
                  </div>
                </Link>
                <Link href="https://www.tiktok.com/@imobile.lk_" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-pink-900">
                    <FaTiktok size={18} />
                  </div>
                </Link>
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-red-600">
                    <Youtube size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products/new-arrivals" className="text-slate-300 transition-colors hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/best-sellers" className="text-slate-300 transition-colors hover:text-white">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="text-slate-300 transition-colors hover:text-white">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/products/categories" className="text-slate-300 transition-colors hover:text-white">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/#brands" className="text-slate-300 transition-colors hover:text-white">
                  Premium Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-slate-300 transition-colors hover:text-white">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-slate-300 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/about/#shipping" className="text-slate-300 transition-colors hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-slate-300 transition-colors hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-slate-300 transition-colors hover:text-white">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products/mobiles" className="text-slate-300 transition-colors hover:text-white">
                  Mobiles
                </Link>
              </li>
              <li>
                <Link href="/products/laptops" className="text-slate-300 transition-colors hover:text-white">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-slate-300 transition-colors hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products/wearables" className="text-slate-300 transition-colors hover:text-white">
                  Wearables
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered by */}
          <div className="space-y-2 flex flex-col items-center justify-center lg:col-span-1">
            <Link href="https://amss.vercel.app/" className="flex justify-center">
              <Image
                src="https://amss.vercel.app/assets/logo2-DtFAk1Wv.png"
                alt="Developer Logo"
                width={96}
                height={96}
                className="h-16 w-auto rounded-none"
              />
            </Link>
            <h3 className="text-lg font-semibold text-white mt-2 text-center">Powered by</h3>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 gap-4 rounded-lg bg-slate-800/30 p-6 sm:grid-cols-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <MapPin size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="font-medium">Visit Our Store</div>
              <div className="text-slate-400">Unique Complex, 200 1/1 Main St, Colombo</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <Phone size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="font-medium">Call Us</div>
              <div className="text-slate-400">(+94) 76 613 8363</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <Mail size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="font-medium">Email Support</div>
              <div className="text-slate-400">support@imobiles.lk</div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-slate-400 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} .imobile.</span>
            <span>Crafted with excellence.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="transition-colors hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}