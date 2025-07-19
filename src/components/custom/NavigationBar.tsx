'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  X,
  Facebook,
  Instagram,
   
  Search,
  User,
  Percent,
  UserCog,
  Badge,
} from "lucide-react";

import logo from "../../pictures/logo.png"; // Adjust path if needed

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthUser } from "@/lib/db/user";
import { useRouter } from "next/navigation";
import SearchProductsBox from "@/components/custom/SearchProductsBox";
import { getCartCountByUserId } from "@/lib/db/cart";
 

// Basic VisuallyHidden utility for accessibility title
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <span className="sr-only">{children}</span>;
};

interface DesktopNavContentProps {
  navItems: { name: string; href: string; requiresAuth?: boolean }[];
  categories: string[];
  user: unknown | null;
  handleCategoryClick: (category: string) => void;
}

const DesktopNavContent: React.FC<DesktopNavContentProps> = ({
  navItems,
  categories,
  user,
  handleCategoryClick,
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="flex items-center h-14">
      <DropdownMenu onOpenChange={(open) => setIsCategoriesOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center border-none font-normal px-10 outline-none shadow-none bg-transparent hover:bg-transparent space-x-2 h-10 focus-visible:outline-none focus-visible:ring-0"
          >
            {isCategoriesOpen ? (
              <X className="scale-200 transition-transform duration-200" />
            ) : (
              <Menu className="scale-200 transition-transform duration-200" />
            )}
            <span className="text-lg">All Categories</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 ml-4 pb-3">
          <DropdownMenuItem className="font-semibold text-slate-900 text-sm px-6 py-3">
            Shop by Category
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem key={category} asChild>
              <button
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="block w-full text-left px-6 py-2.5 text-sm text-gray-700 hover:bg-slate-900/10 hover:text-slate-700"
              >
                {category}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center justify-center flex-1">
        {navItems.map((item) => (
          <TooltipProvider key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                {item.requiresAuth && !user ? (
                  <span className="text-gray-400 cursor-not-allowed px-3 py-2 text-md font-normal">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-900 hover:text-gray-700 px-3 py-2 transition-all rounded-none hover:border-b-2 hover:font-medium border-black bg-transparent text-md font-normal"
                  >
                    {item.name}
                  </Link>
                )}
              </TooltipTrigger>
              {item.requiresAuth && !user && (
                <TooltipContent>
                  <p>Please sign in to {item.name.toLowerCase()}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="flex items-center space-x-2 text-red-600 font-medium ml-auto">
        <Percent className="h-5 w-5" />
        <span>No Special Offers Available</span>
      </div>
    </div>
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
  
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  const queryClient = useQueryClient();

  // Fetch cart count for the user
  const { data: cartCount, isLoading: cartCountLoading, isError: cartCountError } = useQuery({
    queryKey: ["cart-count", user?.id],
    queryFn: () => (user ? getCartCountByUserId(user.id) : Promise.resolve(0)),
    enabled: !!user,
  });

  const router = useRouter();

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
    { name: "New Arrivals", href: "/new_arrivals" },
    { name: "Offers", href: "/offers" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Track Order", href: "/track", requiresAuth: true },
  ];

  const categories = [
    "Back Covers",
    "Tempered Glass",
    "Car Charger",
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

  const handleCategoryClick = (category: string) => {
    const formatted = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    router.push(`/products/${formatted}`);
  };

  const handleDisabledClick = () => {
    router.push("/login");
  };

  return (
    <div className={isDesktop ? "flex flex-col mb-[-70px]" : "flex flex-col"}>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white flex items-center justify-between py-2 px-4 text-sm">
        <div className="hidden sm:flex space-x-3">
          <Link href="https://www.facebook.com/share/1QZjUvowjH/?mibextid=wwXIfr">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="https://www.instagram.com/data__cellular?igsh=bDB1d3J1bG0ydWp1&utm_source=qr">
            <Instagram className="h-4 w-4" />
          </Link>
           
        </div>
        <div className="flex items-center space-x-2">
          <span>Cash on  Delivery</span>
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
                  ? 'transform 500ms ease-in-out, box-shadow 500ms ease-in-out'
                  : 'none',
              }
            : {}
        }
      >
        <div className="flex items-center w-1/3">
          <div className="xl:hidden">
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
                        ? 'border-b-2 border-slate-900 text-black bg-transparent rounded-none'
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
                        ? 'border-b-2 border-slate-900 text-black bg-transparent rounded-none'
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
                          {item.requiresAuth && !user ? (
                            <div 
                              onClick={handleDisabledClick}
                              className="block px-3 py-2 text-gray-400 cursor-pointer hover:text-gray-600"
                            >
                              {item.name}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block px-3 py-2 text-gray-700 hover:bg-slate-900/10 hover:text-slate-700 rounded-md font-medium"
                            >
                              {item.name}
                            </Link>
                          )}
                        </SheetClose>
                      ))}
                    </>
                  ) : (
                    <>
                      {categories.map((category) => (
                        <SheetClose asChild key={category}>
                          <button
                            type="button"
                            onClick={() => handleCategoryClick(category)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-900/10 hover:text-slate-700"
                          >
                            {category}
                          </button>
                        </SheetClose>
                      ))}
                    </>
                  )}
                </div>

                <div className="px-4 pt-4 border-t border-gray-200 mt-auto">
                  <div className="px-3 py-2 flex items-center gap-4 text-gray-900 font-medium text-sm">
                    <div className="relative">
                      <UserCog />
                      {user && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 text-white bg-slate-800 rounded-full p-0.5" />
                      )}
                    </div>
                    <span>My Account</span>
                    {user && (
                      <span className="text-sm text-gray-500">({user.email})</span>
                    )}
                  </div>

                  <SheetClose asChild>
                    {user ? (
                      <Link href="/cart" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-slate-900/10 hover:text-slate-700 rounded-md mt-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Cart</span>
                        <span className="bg-slate-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCountLoading ? '' : cartCountError ? 0 : cartCount}
                        </span>
                      </Link>
                    ) : (
                      <div 
                        onClick={handleDisabledClick}
                        className="flex items-center gap-2 px-3 py-2 text-gray-400 cursor-pointer hover:text-gray-600 mt-2"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Cart</span>
                        <span className="bg-gray-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          0
                        </span>
                      </div>
                    )}
                  </SheetClose>

                  <SheetClose asChild>
                    <Button
                      variant="default"
                      className="w-full mt-2 bg-slate-900 text-white hover:bg-slate-700 h-10 text-sm"
                    >
                      <Link href="/login">
                        <User className="h-4 w-4 mr-2" /> {user ? "View Profile" : "Log in"}
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden xl:block w-full">
            <SearchProductsBox placeholder="Search our store" />
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="block">
            <Image src={logo} alt="Perfect Deals Logo" width={170} height={170} />
          </Link>
        </div>

        <div className="flex items-center justify-end w-1/3 space-x-2 xl:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="xl:hidden text-gray-600 hover:text-slate-700"
          >
            <Search className="scale-150" />
          </Button>

          {user ? (
            <Link href="/cart" className="relative">
              <ShoppingCart className="scale-125 text-gray-900 hover:text-blue-700" />
              <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                {cartCountLoading ? '' : cartCountError ? 0 : cartCount}
              </span>
            </Link>
          ) : (
            <>
              {/* Mobile view - Link to login */}
              <Link 
                href="/login"
                className="xl:hidden relative cursor-pointer"
              >
                <ShoppingCart className="scale-125 text-gray-400" />
                <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Desktop view - Tooltip */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="hidden xl:block relative cursor-not-allowed">
                      <ShoppingCart className="scale-125 text-gray-400" />
                      <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                        0
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Please sign in to access cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={user ? "/" : "/login"} className="hidden xl:block relative">
                  <User className="scale-125 text-gray-900 hover:text-blue-900" />
                  {user && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 text-white bg-blue-800 rounded-full p-0.5" />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user ? user.email : "Sign in to your account"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 py-3 animate-slide-down">
          <div className="relative">
            <SearchProductsBox placeholder="Search our store" />
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
            className={`hidden xl:block border-b flex items-center border-gray-200 border-t h-18 bg-white w-full relative transition-opacity duration-300 ${
              isStickyDesktopNav ? 'invisible opacity-0' : 'visible opacity-100'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8" style={{ width: '100%' }}>
              <DesktopNavContent navItems={navItems} categories={categories} user={user} handleCategoryClick={handleCategoryClick} />
            </div>
          </div>

          <nav
            className={`hidden xl:block border-b flex items-center border-gray-200 border-t h-18 bg-white transition-transform duration-300 transition-opacity duration-300 w-full ${
              isStickyDesktopNav ? 'fixed top-0 z-40 shadow-md' : 'relative'
            }`}
            style={{
              transform: isStickyDesktopNav ? 'translateY(0)' : 'translateY(-100%)',
              opacity: isStickyDesktopNav ? 1 : 0,
              pointerEvents: isStickyDesktopNav ? 'auto' : 'none',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8" style={{ width: '100%' }}>
              <DesktopNavContent navItems={navItems} categories={categories} user={user} handleCategoryClick={handleCategoryClick} />
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