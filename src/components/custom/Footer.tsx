import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

export function   Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 border-t border-slate-800">
      {/* Trust Badges Section */}
     {/*} <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Truck className="h-5 w-5 text-blue-400" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Clock className="h-5 w-5 text-orange-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>*/}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-6 md:gap-8">
          {/* Brand Section - Takes 2 columns */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EliteShop
              </span>
            </Link>
            <p className="text-slate-300 leading-relaxed">
              Premium e-commerce platform delivering exceptional products worldwide. Experience luxury shopping with
              unmatched quality and service excellence.
            </p>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-blue-600">
                    <Facebook size={18} />
                  </div>
                </Link>
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-pink-600">
                    <Instagram size={18} />
                  </div>
                </Link>
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-sky-500">
                    <Twitter size={18} />
                  </div>
                </Link>
                <Link href="#" className="group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-blue-700">
                    <Linkedin size={18} />
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
          <div className="space-y-6">
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
                <Link href="/products/brands" className="text-slate-300 transition-colors hover:text-white">
                  Premium Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help/contact" className="text-slate-300 transition-colors hover:text-white">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-slate-300 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="text-slate-300 transition-colors hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-slate-300 transition-colors hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/help/track-order" className="text-slate-300 transition-colors hover:text-white">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-300 transition-colors hover:text-white">
                  About EliteShop
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-300 transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-slate-300 transition-colors hover:text-white">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 transition-colors hover:text-white">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-slate-300 transition-colors hover:text-white">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
            <p className="text-slate-300">Join our VIP list for exclusive deals and early access to new collections.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500"
              />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Subscribe Now
              </Button>
            </div>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              Join 50,000+ subscribers
            </Badge>
          </div>
        </div>

        {/* Mobile Layout - 2 columns per row */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {/* Brand Section - Full width on mobile */}
          <div className="col-span-2 space-y-4 text-center">
            <Link href="/" className="flex items-center justify-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EliteShop
              </span>
            </Link>
            <div className="flex justify-center space-x-3">
              <Link href="#" className="group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-blue-600">
                  <Facebook size={16} />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-pink-600">
                  <Instagram size={16} />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-sky-500">
                  <Twitter size={16} />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-red-600">
                  <Youtube size={16} />
                </div>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-2">Shop</h3>
            <ul className="space-y-2 text-sm">
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
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help/contact" className="text-slate-300 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-slate-300 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="text-slate-300 transition-colors hover:text-white">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-slate-300 transition-colors hover:text-white">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-2">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-300 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-300 transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-slate-300 transition-colors hover:text-white">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-2">Newsletter</h3>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 text-sm"
              />
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Subscribe
              </Button>
            </div>
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
              <div className="text-slate-400">123 Commerce Plaza, NY 10001</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <Phone size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="font-medium">Call Us</div>
              <div className="text-slate-400">+1 (555) 123-4567</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <Mail size={16} className="text-slate-300" />
            </div>
            <div>
              <div className="font-medium">Email Support</div>
              <div className="text-slate-400">hello@eliteshop.com</div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-slate-400 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>&copy; {new Date().getFullYear()} EliteShop.</span>
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
