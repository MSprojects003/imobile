"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { sampleProducts, Product } from "@/app/data/products"
import { Info } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "@/lib/db/user"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ViewProduct() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [mainImage, setMainImage] = useState<string | StaticImageData>("")
  const [quantity, setQuantity] = useState(1)
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  // Fetch product details from app/data/products.ts
  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === productId) || null
    setProduct(foundProduct)
    setMainImage(foundProduct?.frontImage || "")
  }, [productId])

  // Handle color selection
  const handleColorChange = (colorCode: string) => {
    setSelectedColor(colorCode)
    console.log("Selected Color Code:", colorCode, "Selected Model:", selectedModel)
  }

  // Handle model selection
  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    console.log("Selected Color Code:", selectedColor, "Selected Model:", model)
  }

  // Handle thumbnail image click
  const handleThumbnailClick = (image: string | StaticImageData) => {
    setMainImage(image)
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId,
      quantity,
      selectedColor,
      selectedModel
    })
  }

  if (!product) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-4">
            <button onClick={() => handleThumbnailClick(product.frontImage)} className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image src={product.frontImage} alt={`${product.name} front`} fill className="object-cover" />
            </button>
            <button onClick={() => handleThumbnailClick(product.backImage)} className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image src={product.backImage} alt={`${product.name} back`} fill className="object-cover" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-4">
            <span className="text-2xl font-bold text-gray-900">Rs.{product.discountPrice?.toFixed(2) || product.price.toFixed(2)}</span>
            {product.discountPrice && (
              <span className="text-lg text-gray-500 line-through">Rs.{product.price.toFixed(2)}</span>
            )}
            {product.discountPrice && <span className="text-green-600 font-semibold">Sale</span>}
          </div>
          <p className="mt-2 text-sm text-gray-600">SKU: {product.sku}</p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Color:</p>
            {product.colors.length > 0 ? (
              <div className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => handleColorChange(color.code)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.code ? "border-black ring-2 ring-black" : "border-gray-300"
                    } hover:border-gray-500 transition-all duration-200`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  >
                    {color.stock <= 1 && <span className="text-xs text-white absolute -top-2 -right-2 bg-orange-500 rounded-full px-1">Low</span>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-700">No colors available for this product</p>
              </div>
            )}
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700">Models:</p>
            {product.models.length > 0 ? (
              <div className="flex gap-2 mt-2">
                {product.models.map((model) => (
                  <button
                    key={model}
                    onClick={() => handleModelChange(model)}
                    className={`px-3 py-1 rounded-md border border-gray-300 text-sm ${
                      selectedModel === model ? "bg-gray-200 font-medium" : "bg-white hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-700">No models available for this product</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-r-none"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">
                <span className="text-lg font-medium">{quantity}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-l-none"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="w-1/2 h-full flex">
                    <Button
                      className="w-full h-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={handleAddToCart}
                      disabled={!user}
                    >
                      <ShoppingBag />
                      Add to Cart
                    </Button>
                  </span>
                </TooltipTrigger>
                {!user && (
                  <TooltipContent>
                    <span>Please sign in first</span>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="mt-4 text-sm text-gray-600">Free Shipping above Rs 1999</p>
        </div>
      </div>
    </div>
  )
}