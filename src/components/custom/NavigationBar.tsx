 
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
import { useState, useEffect, useRef } from "react";
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
  Percent,
} from "lucide-react";

import logo from "../../pictures/logo.png";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Basic VisuallyHidden utility for accessibility title
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <span className="sr-only">{children}</span>;
};

interface DesktopNavContentProps {
  navItems: { name: string; href: string }[];
  categories: string[];
}

const DesktopNavContent: React.FC<DesktopNavContentProps> = ({
  navItems,
  categories,
}) => {
  return (
    <>
      <div className="flex items-center h-14">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center border-none font-normal px-10 out-of-range:outline-none shadow-none bg-transparent hover:bg-transparent space-x-2 h-10 focus-visible:outline-none focus-visible:ring-0"
            >
              <Menu className="     scale-200" />
              <span className="text-lg  ">All Categories</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuItem className="font-semibold text-blue-900 text-sm">
              Shop by Category
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem key={category} asChild>
                <Link
                  href={`/category/${category
                    .toLowerCase()
                    .replace(/ & /g, '-')
                    .replace(/ /g, '-')}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-900/10 hover:text-blue-700"
                >
                  {category}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

     

        <div className="flex items-center  justify-center flex-1  ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-900   hover:text-gray-700 px-3 py-2  transition-all   rounded-none hover:border-b-2 hover:font-medium border-black bg-transparent text-md font-normal"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-red-600 font-medium ml-auto">
          <Percent className="h-5 w-5" />
          <span>Special up to 60% Off all item</span>
        </div>
      </div>
    </>
  );
};

export function NavigationBar() {
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'categories'>('menu');
  const [isStickyDesktopNav, setIsStickyDesktopNav] = useState(false);
  const [isStickyMobileNav, setIsStickyMobileNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const mainNavRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 990);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 990);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast = window.scrollY > 100;
      if (isDesktop) {
        setIsStickyDesktopNav(scrolledPast);
        setIsStickyMobileNav(false);
      } else {
        setIsStickyMobileNav(scrolledPast);
        setIsStickyDesktopNav(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "New Arrivals", href: "/apple-silicone-case" },
    { name: "Offers", href: "/packing-materials" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/track" },
    { name: "Track Order", href: "/blog" },
    
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
    <div className={isDesktop? "flex flex-col mb-[-70px]" : "flex flex-col "}>
      {/* Top Announcement Bar */}
      <div className="bg-blue-900 text-white flex items-center justify-between py-2 px-4 text-sm">
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
      <div
        ref={mainNavRef}
        className={`flex items-center justify-between py-3 px-6 border-b border-gray-200 bg-white transition-all duration-200 ease-in-out w-full ${
          isStickyMobileNav && !isDesktop
            ? 'fixed top-0 left-0 right-0 z-50 shadow-md'
            : 'relative'
        }`}
        style={
          !isDesktop
            ? {
                transform: isStickyMobileNav ? 'translateY(0)' : 'translateY(0)',
                top: isStickyMobileNav ? '0' : 'auto',
                transition: isStickyMobileNav
                  ? 'transform 500ms ease-in-out  , box-shadow 500ms ease-in-out'
                  : 'none',
              }
            : {}
        }
      >
        <div className="flex items-center md:w-1/3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="scale-200" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:max-w-sm flex flex-col px-4 pb-4 sheet-content-no-default-close"
              >
                <SheetHeader className="flex flex-row items-center justify-between py-2">
                  <div>
                    <Image src={logo} alt="Perfect Deals Logo" width={100} height={100} />
                  </div>
                  <SheetTitle>
                    <VisuallyHidden>Navigation Menu</VisuallyHidden>
                  </SheetTitle>
                  <style jsx global>{`
                    [data-slot="sheet-content"] > button[data-radix-dialog-close]:not(:has(span.sr-only)) {
                      display: none !important;
                    }
                  `}</style>
                </SheetHeader>

                <div className="flex border-b border-gray-200">
                  <Button
                    variant={activeTab === 'menu' ? 'default' : 'outline'}
                    className={`flex-1 py-2 text-sm ${
                      activeTab === 'menu'
                        ? 'border-b-2 border-blue-900 text-black bg-transparent rounded-none'
                        : 'text-gray-700 border-none shadow-none'
                    }`}
                    onClick={() => setActiveTab('menu')}
                  >
                    Menu
                  </Button>
                  <Button
                    variant={activeTab === 'categories' ? 'default' : 'outline'}
                    className={`flex-1 py-2 text-sm ${
                      activeTab === 'categories'
                        ? 'border-b-2 border-blue-900 text-black bg-transparent rounded-none'
                        : 'text-gray-700 border-none shadow-none'
                    }`}
                    onClick={() => setActiveTab('categories')}
                  >
                    Categories
                  </Button>
                </div>

                <div className="px-4 pt-2 pb-4 space-y-1 overflow-y-auto flex-grow">
                  {activeTab === 'menu' ? (
                    <>
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-900/10 hover:text-blue-700 rounded-md font-medium"
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
                            href={`/category/${category
                              .toLowerCase()
                              .replace(/ & /g, '-')
                              .replace(/ /g, '-')}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-900/10 hover:text-blue-700"
                          >
                            {category}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  )}
                </div>

                <div className="px-4 pt-4 border-t border-gray-200 mt-auto">
                  <p className="px-3 py-2 text-gray-900 font-medium text-sm">My Account</p>
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
                className="w-full pr-10 rounded-none focus:border-none  border-gray-900 focus-visible:outline-none  shadow-none border-1 text-lg h-12 font-normal text-gray-900"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 sm:scale-100 text-gray-900" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="block">
            <Image src={logo} alt="Perfect Deals Logo" width={170} height={170} />
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-grey-600 hover:text-blue-700"
          >
            <Search className="scale-150" />
          </Button>

          <Link href="/cart" className="relative">
            <ShoppingCart className="sm:scale-125 text-gray-900 hover:text-blue-700" />
            <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link href="/profile" className="hidden md:block">
            <User className="sm:scale-125 text-gray-900 hover:text-blue-900" />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
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
      {isDesktop && (
        <>
          <div
            ref={desktopNavRef}
            className={`hidden md:block  border-b lg:flex lg:items-center border-gray-200 border-t h-18 bg-white w-full relative transition-opacity duration-300 ${
              isStickyDesktopNav ? 'invisible opacity-0' : 'visible opacity-100'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8" style={{width:'100%'}}>
              <DesktopNavContent navItems={navItems} categories={categories} />
            </div>
          </div>

          <nav
            className={`hidden md:block border-b lg:flex lg:items-center  border-gray-200 border-t h-18 bg-white transition-transform duration-300 transition-opacity duration-300 w-full ${
              isStickyDesktopNav ? 'fixed top-0 z-40 shadow-md' : 'relative'
            }`}
            style={{
              transform: isStickyDesktopNav ? 'translateY(0)' : 'translateY(-100%)',
              opacity: isStickyDesktopNav ? 1 : 0,
              pointerEvents: isStickyDesktopNav ? 'auto' : 'none',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8" style={{width:'100%'}}>
              <DesktopNavContent navItems={navItems} categories={categories} />
            </div>
          </nav>
        </>
      )}

      {/* Placeholder for Sticky Navigation */}
      {(isStickyDesktopNav && isDesktop && desktopNavRef.current) ||
      (isStickyMobileNav && !isDesktop && mainNavRef.current) ? (
        <div
          style={{
            height: isDesktop
              ? `${desktopNavRef.current?.offsetHeight}px`
              : `${mainNavRef.current?.offsetHeight}px`,
            transition: 'height 200ms ease-in-out',
          }}
        ></div>
      ) : null}
    </div>
  );
}
 