"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Wifi, WifiOff, Info, Clock } from "lucide-react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthUser } from "@/lib/db/user";
import { getProductById } from "@/lib/db/products";
import { getCartByUserId } from "@/lib/db/cart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { updateOrInsertCartBYArgumants } from "@/lib/db/update-or-insert-cart-by-arguments";
import RelatedProducts from './RelatedProducts';

// Interface for database product
interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  brand: string;
  models: string[];
  colors: string[];
  image: string;
  back_image: string | null;
  discount: number | null;
  created_at: string | null;
  updated_at: string | null;
  is_deleted: boolean;
  discount_added: boolean;
  discounted_price: number | null;
}

// Interface for component product
interface Product {
  id: string;
  brand: string;
  name: string;
  frontImage: string;
  backImage: string;
  price: number;
  discountPrice?: number;
  discountAdded?: boolean;
  sku: string;
  colors: { code: string; name: string; stock: number }[];
  models: string[];
  category: string;
  description?: string;
  quantity: number;
}

// Query function to fetch cart data


// Add this mapping at the top (after imports or before the component)
const colorNameToCss: Record<string, string> = {
  "Mint": "#98ff98",
  "Apricot": "#fbceb1",
  "Royal blue": "royalblue",
  "Yellow": "yellow",
  "Lilac": "#c8a2c8",
  "Light Pink": "#ffb6c1",
  "Lavender": "#e6e6fa",
  "Midnight Blue": "#191970",
  "White": "white",
  "Antique White": "#faebd7",
  "Stone": "#d2b48c",
  "Pink": "pink",
  "Orange": "orange",
  "Red": "red",
  "Dark Grey": "#a9a9a9",
  "Blue": "blue",
  "Turquoise": "turquoise",
  "Black": "black",
  "Pink Sand": "#f4cccc",
  "Navy Blue": "navy",
  "Ice Blue": "#99ffff",
  "Coffee": "#6f4e37",
  "Pebble": "#b0a990",
  "Azure": "azure",
  "Camellia": "#f6745f",
  "Mist Blue": "#646d7e",
  "Flamingo": "#fc8eac",
  "Lavender Grey": "#c4c3d0",
  "Gold": "gold",
  "Peach": "peachpuff",
  "Chinese Red": "#aa381e",
  "Green": "green",
  "Brown": "brown",
  "Purple": "purple",
  "Olive": "olive",
  "Cobalt": "#0047ab",
  "Rose Red": "#c21e56",
  "Shiny Pink": "#ff69b4",
  "Shiny Purple": "#a020f0",
  "Flash": "#f9d923",
  "Maroon Grape": "#6e0b14",
  "Shiny Blue": "#00bfff",
  "Army Green": "#4b5320",
  "Cosmos": "#ffd8d9",
  "Spearmint": "#aee9d1",
  "Dragon Fruit": "#fc6c85",
  "Papaya": "#ffefd5",
  "Canary Yellow": "#ffef00",
  "Mellow": "#f8de7e",
  "Watermelon Pink": "#fc6c85",
  "Cornflower": "cornflowerblue",
  "Atrovirens": "#355e3b",
  "Pine green": "#01796f",
  "Black Currant": "#2e003e",
  "Plum": "plum",
  "Sky blue": "skyblue",
  "Pomegranate": "#f34723",
  "Cactus": "#587246",
  "Grapefruit": "#fd5956",
  "Sierra Blue": "#4f666a",
  "Forest Blue": "#154360",
  "Neon Yellow": "#fff700",
  "Blue Horizon": "#4a6fa5",
  "New peach": "#ffe5b4",
  "New blue": "#1e90ff",
  "Deep navy": "#000080",
  "deep purple": "#673ab7",
  "clay": "#b66a50",
  "pistachio": "#93c572",
  "lilac purple": "#b39eb5",
  "grey pink": "#c4aead",
  "Titanium Gery": "#878681",
  "Dark Brown": "#654321",
  "Desert gold": "#edc9af"
};

export default function ViewProduct() {
  const params = useParams();
  const productId = params.id as string;
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  // Fetch product data
  const { data: databaseProduct, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  // Fetch cart data
  const { data: cart } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => (user ? getCartByUserId(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  // Mutation for adding cart item
  const addCartItemMutation = useMutation({
    mutationFn: ({
      userId,
      productId,
      quantity,
      colors,
      models,
    }: {
      userId: string;
      productId: string;
      quantity: number;
      colors: string[];
      models: string[];
    }) => updateOrInsertCartBYArgumants(productId,userId, colors, models,  quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("Product added to cart successfully");
    },
    onError: (error) => {
      toast.error("Failed to add product to cart");
      console.error("Add to cart error:", error);
    },
  });

  // Transform database product to component format
  const transformProduct = (dbProduct: DatabaseProduct): Product => {
    return {
      id: dbProduct.id,
      brand: dbProduct.brand,
      name: dbProduct.name,
      frontImage: dbProduct.image,
      backImage: dbProduct.back_image || dbProduct.image,
      price: dbProduct.price,
      discountPrice: dbProduct.discounted_price || undefined,
      discountAdded: dbProduct.discount_added,
      sku: `SKU-${dbProduct.id.slice(0, 8)}`,
      colors: dbProduct.colors.map((color, index) => ({
        code: color,
        name: `Color ${index + 1}`,
        stock: Math.floor(Math.random() * 10) + 1, // Random stock for demo
      })),
      models: dbProduct.models,
      category: dbProduct.category,
      description: dbProduct.description,
      quantity: dbProduct.quantity,
    };
  };

  const product = databaseProduct ? transformProduct(databaseProduct) : null;

  // Set main image when product loads
  useEffect(() => {
    if (product && !mainImage) {
      setMainImage(product.frontImage);
    }
  }, [product, mainImage]);

  // Log cart data when it updates
  useEffect(() => {
    if (user && cart && cart.length > 0) {
      console.log("Session Cart Data for User:", user.id, cart);
    }
  }, [user, cart]);

  // Handle color selection (multi-select)
  const handleColorChange = (colorCode: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorCode) ? prev.filter((c) => c !== colorCode) : [...prev, colorCode]
    );
  };

  // Handle model selection (multi-select)
  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  // Handle thumbnail image click
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.quantity || 1)) {
      setQuantity(value);
    }
  };

  // Add to Cart function
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add to cart.");
      return;
    }
    if (selectedColors.length === 0 || selectedModels.length === 0) {
      toast.error("Please select at least one color and one model before adding to cart.");
      return;
    }
    try {
      // Log cart details before adding
      const cartData = {
        productId,
        userId: user.id,
        quantity,
        colors: selectedColors,
        models: selectedModels,
      };
      console.log("Add to Cart:", cartData);

      // Add cart item using mutation
      addCartItemMutation.mutate(cartData);
    } catch (err) {
      toast.error("Failed to add product to cart");
      console.error("Add to cart error:", err);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="animate-pulse">
              <div className="w-full h-80 sm:h-96 bg-gray-200 rounded-xl"></div>
              <div className="flex gap-3 mt-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Network Error</h3>
          <p className="text-sm text-gray-600 text-center max-w-md mb-6">
            There seems to be an issue with your network connection. Please check your internet connection and try again.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white h-10"
          >
            <Wifi className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-sm text-gray-600 text-center max-w-md">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-80 sm:h-96 bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            {mainImage ? (
              <Image src={mainImage} alt={product.name} fill className="object-contain p-4" />
            ) : null}
          </div>
          {/* Thumbnail Images */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleThumbnailClick(product.frontImage)}
              className="relative w-20 h-20 bg-gray-50 Rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Image src={product.frontImage} alt={`${product.name} front`} fill className="object-cover" />
            </button>
            <button
              onClick={() => handleThumbnailClick(product.backImage)}
              className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Image src={product.backImage} alt={`${product.name} back`} fill className="object-cover" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 p-6 bg-white">
          <div className="space-y-4">
            {/* Product Title */}
            <div>
             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 capitalize break-words">
    {product.name}
  </h1>
              <p className="text-sm text-gray-500 mt-1 capitalize flex items-center gap-2">
                <span>
                  Brand: <span className="font-medium text-gray-700">{product.brand}</span>
                </span>
                <span className="mx-1">·</span>
                <span>
                  Category: <span className="font-medium text-gray-700">{product.category}</span>
                </span>
              </p>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                {product.discountPrice && product.discountAdded ? (
                  <>
                    <span className="text-2xl font-normal text-gray-900">
                      Rs. {product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">Rs. {product.price.toFixed(2)}</span>
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">Rs. {product.price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Available Quantity: <span className="font-medium">{product.quantity}</span>
              </p>
            </div>

            {/* Variants Section */}
            <div className="space-y-3 border-t py-2">
              <h3 className="text-sm font-semibold text-gray-500">Variants</h3>
              {/* Color Selector */}
              <div>
                {product.colors.length > 0 ? (
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        onClick={() => handleColorChange(color.code)}
                        className={`w-8 h-8 rounded border-2 transition-all duration-200 relative focus:outline-none flex items-center justify-center
                          ${selectedColors.includes(color.code)
                            ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                            : "border-gray-200 hover:border-gray-400"}
                        `}
                        style={{
                          backgroundColor: colorNameToCss[color.code] || color.code,
                        }}
                        title={color.code}
                      >
                        {/* Show checkmark if selected */}
                        {selectedColors.includes(color.code) && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        {/* Show color name as tooltip/label for accessibility */}
                        <span className="sr-only">{color.code}</span>
                        {color.stock <= 1 && (
                          <span className="text-xs text-white absolute -top-1 -right-1 bg-orange-500 rounded-full px-1.5 py-0.5">
                            Low
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Info className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <p className="text-sm text-gray-600">No colors available for this product</p>
                  </div>
                )}
              </div>
              {/* Model Selector */}
              <div>
                {product.models.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.models.map((model) => (
                      <button
                        key={model}
                        onClick={() => handleModelChange(model)}
                        className={`px-3 py-1.5 rounded-none border text-sm font-medium transition-all duration-200 ${
                          selectedModels.includes(model)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Info className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <p className="text-sm text-gray-600">No models available for this product</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-none">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none hover:bg-gray-50"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center">
                    <span className="text-base font-medium">{quantity}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none hover:bg-gray-50"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex-1">
                        <Button
                          className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleAddToCart}
                          disabled={!user}
                        >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {!user && <TooltipContent>Please sign in first</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping</h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Fast Delivery Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="w-full pt-8 mt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-base text-gray-700 leading-relaxed capitalize">{product.description}</p>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="w-full pt-8 mt-8 border-t border-gray-200">
        <RelatedProducts category={product.category} brand={product.brand} excludeProductId={product.id} />
      </div>
    </div>
  );
}