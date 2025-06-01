'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
  Search,
  User,
} from "lucide-react";

import logo from "../../pictures/logo.png";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Basic VisuallyHidden utility for accessibility title
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
};

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'categories'>('menu');

  const navItems = [
    { name: "Home", href: "/" },
    { name: "apple Silicone Case", href: "/apple-silicone-case" },
    { name: "Packing Materials", href: "/packing-materials" },
    { name: "Contact", href: "/contact" },
    { name: "Track", href: "/track" },
    { name: "blog", href: "/blog" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  const categories = [
    "Back Covers",
    "Tempered Glass",
    "Car Chargers",
    "Earphones",
    "Smart Watches",
    "Cable & Charger",
    "Car Holder",
    "Pendrive & SD Card",
    "Watch Accessories",
    "Selfie Stick",
    "Ring Light",
    "Tripods",
    "Back Stickers",
    "Speaker",
    "Airpods & Earbuds",
    "Power Bank",
    "Phone Pouch",
    "Tab Pouch",
    "Airpods Accessories",
    "Computer Accessories",
    "Gadgets",
  ];

  return (
    <div className="flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-blue-900 text-white flex items-center justify-between py-2 px-4 text-sm">
        {/* Hide social media icons on mobile */}
        <div className="hidden sm:flex space-x-3">
          <Link href="https://facebook.com">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="https://instagram.com">
            <Instagram className="h-4 w-4" />
          </Link>
         
          <Link href="https://youtube.com">
            <Youtube className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <span>Free Delivery for orders above Rs. 1999</span>
           
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-gray-50">
        {/* Left Section - Hamburger Menu (Mobile) and Search (Desktop) */}
        <div className="flex items-center md:w-1/3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                >
                  <Menu className="scale-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-sm flex flex-col px-4 pb-4 sheet-content-no-default-close">
                <SheetHeader className="flex flex-row items-center justify-between py-2">
                  {/* Logo in Sheet Header */}
                  <div>
                    <Image
                      src={logo}
                      alt="Perfect Deals Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                   {/* Accessible Title (Visually Hidden) */}
                   <SheetTitle>
                     <VisuallyHidden>Navigation Menu</VisuallyHidden>
                   </SheetTitle>
                  {/* Close Button */}
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <X className="h-5 w-5 text-gray-600" />
                    </Button>
                  </SheetClose>
                  {/* Hide the default close button that comes with SheetContent */}
                  <style jsx global>{`
                    [data-slot="sheet-content"] > button[data-radix-dialog-close]:not(:has(span.sr-only)) {
                      display: none !important;
                    }
                  `}</style>
                </SheetHeader>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <Button
                    variant={activeTab === 'menu' ? 'default' : 'outline'}
                    className={`flex-1 py-2 text-sm ${activeTab === 'menu' ? 'bg-blue-900 text-white' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('menu')}
                  >
                    Menu
                  </Button>
                  <Button
                    variant={activeTab === 'categories' ? 'default' : 'outline'}
                    className={`flex-1 py-2 text-sm ${activeTab === 'categories' ? 'bg-blue-900 text-white' : 'text-gray-700'}`}
                    onClick={() => setActiveTab('categories')}
                  >
                    Categories
                  </Button>
                </div>

                {/* Tab Content */}
                <div className="px-4 pt-2 pb-4 space-y-1 overflow-y-auto flex-grow">
                  {activeTab === 'menu' ? (
                    <>
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-900/10 hover:text-blue-700 rounded-md text-base font-medium"
                          >
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <SheetClose asChild key={category}>
                          <Link
                            href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-900/10 hover:text-blue-700"
                          >
                            {category}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  )}
                </div>

                {/* My Account Section */}
                <div className="px-4 pt-4 border-t border-gray-200 mt-auto">
                  <p className="px-3 py-2 text-gray-700 font-medium text-sm">My Account</p>
                  <SheetClose asChild>
                    <Button
                      variant="default"
                      className="w-full mt-2 bg-blue-900 text-white hover:bg-blue-700 h-10 text-sm"
                    >
                      <User className="h-4 w-4 mr-2" /> Log in
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:block w-full">
            <div className="relative w-full max-w-xs">
              <Input
                placeholder="Search our store"
                className="w-full pr-10  rounded-none focus:border-none border-2  h-10 text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Center Section - Logo */}
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="block">
            <Image
              src={logo}
              alt="Perfect Deals Logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        {/* Right Section - Search (Mobile), Cart, and Profile */}
        <div className="flex items-center justify-end md:w-1/3 space-x-4">
         <Button
  variant="ghost"
  size="icon"
  onClick={() => setIsSearchOpen(!isSearchOpen)}
  className="md:hidden   text-grey-600 hover:text-blue-700"
>
  <Search  className="scale-150"/>
</Button>

          <Link href="/cart" className="relative">
            <ShoppingCart className=" sm:scale-125  text-gray-900 hover:text-blue-700" />
            <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link href="/profile" className="hidden md:block">
            <User className="h-5 w-5 text-gray-600 hover:text-blue-700" />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (Top to Bottom Transform) */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 animate-slide-down">
          <div className="relative">
            <Input
              placeholder="Search our store"
              className="w-full pr-10 border-gray-300 focus:border-blue-900 focus:ring-blue-900 h-10 text-sm"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-10"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            {/* All Categories - Aligned Left */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center border-none shadow-none bg-transparent hover:bg-transparent space-x-2 h-10">
                  <Menu className="h-8 w-8 text-red-700 font-bold" />
                  <span className="text-sm">All Categories</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem className="font-semibold text-blue-900 text-sm">
                  Shop by Category
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link
                      href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-900/10 hover:text-blue-700"
                    >
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Centered Navigation Links */}
            <div className="flex items-center justify-center flex-1 space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-700 hover:bg-blue-900/10 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}