"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, X, PackageX } from "lucide-react" // Added PackageX icon
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { getAuthUser, UserDetialsByID } from "@/lib/db/user"
import { getCartByUserId, deleteCartItemById, deleteCartItemsByIds } from "@/lib/db/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useForm } from "react-hook-form"
import { createOrderWithItems } from "@/lib/db/orders"
import { toast } from "sonner"
 

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  products?: {
    // Added products property to match the usage in the component
    name: string
    image: string
    price: number
    discounted_price?: number
    quantity?: number // Added quantity to the product interface
    id?: string // Added id to the product interface
  }
  colors?: string | string[]
  models?: string | string[]
}

interface CustomerDetails {
  phone: string
  address: string
}

interface CartSummaryProps {
  customerDetails?: CustomerDetails
  onUpdateQuantity?: (id: string, quantity: number) => void
  onPlaceOrder?: () => void
}

export default function CartSummary({
  customerDetails = { phone: "", address: "" },
  onUpdateQuantity,
  onPlaceOrder,
}: CartSummaryProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setLocalCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    onUpdateQuantity?.(id, newQuantity)
  }

  // Helper to format phone number for react-phone-input-2
  function formatPhoneNumber(phone: string | undefined): string {
    if (!phone) return ""
    // If already starts with '+', return as is
    if (phone.startsWith("+")) return phone
    // If starts with '94' and is 11 digits, add '+'
    if (phone.length === 11 && phone.startsWith("94")) return "+" + phone
    // Otherwise, return as is
    return phone
  }

  const queryClient = useQueryClient()
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  })
  

  const { data: cart = [], isLoading: cartLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", user?.id],
    queryFn: () => (user ? getCartByUserId(user.id) : Promise.resolve([])),
    enabled: !!user,
  })

  // Local cart state for optimistic UI updates
  const [localCart, setLocalCart] = useState<CartItem[]>([])

  // Sync localCart with fetched cart data
  useEffect(() => {
    if (JSON.stringify(cart) !== JSON.stringify(localCart)) {
      setLocalCart(cart)
    }
  }, [cart])

  const { data: customer, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => (user ? UserDetialsByID(user.id) : Promise.resolve(null)), // Changed to null for no user details
    enabled: !!user,
  })

  

  const deleteCartMutation = useMutation({
    mutationFn: (id: string) => deleteCartItemById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] })
    },
  })

  // Mutation for clearing all cart items
  const clearAllMutation = useMutation({
    mutationFn: (ids: string[]) => deleteCartItemsByIds(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] })
    },
  })

  // Determine shipping fee based on city (case-insensitive, includes 'Colombo')
  let shippingCharges = 400;
  if (customer && typeof customer.city === 'string' && customer.city.toLowerCase().includes('colombo')) {
    shippingCharges = 250;
  }
  const subtotal = localCart.reduce(
    (sum: number, item: CartItem) =>
      sum + (
        item.products && Number(item.products.discounted_price) > 0 && Number(item.products.discounted_price) < Number(item.products.price)
          ? Number(item.products.discounted_price) * item.quantity
          : (item.products?.price || 0) * item.quantity
      ),
    0,
  )
  const totalAmount = subtotal + shippingCharges

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  // Helper to check for stock issues
  const hasStockError = localCart.some(
    (item) =>
      (item.products && item.quantity > (item.products.quantity ?? 0)) ||
      (item.products && (item.products.quantity ?? 0) === 0)
  );

  const { handleSubmit } = useForm();

  // Mutation for placing an order
  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user");
      return createOrderWithItems({
        user_id: user.id,
        total_amount: totalAmount,
        items: localCart
          .filter((item): item is CartItem & { products: { id: string } } => !!item.products && typeof item.products.id === 'string')
          .map(item => ({
            product_id: item.products!.id,
            quantity: item.quantity,
            price:
              item.products && Number(item.products.discounted_price) > 0 && Number(item.products.discounted_price) < Number(item.products.price)
                ? Number(item.products.discounted_price)
                : (item.products?.price || 0),
            colors: Array.isArray(item.colors) ? item.colors : item.colors ? [item.colors] : [],
            models: Array.isArray(item.models) ? item.models : item.models ? [item.models] : [],
          })),
      });
    },
    onSuccess: (data) => {
      console.log("Order placed:", data);
      toast.success("Your order has been placed successfully. Please check your Orders track ID.");
      // Clear all cart items after successful order
      const ids = localCart.map((item) => item.id);
      if (ids.length > 0) clearAllMutation.mutate(ids);
      if (onPlaceOrder) onPlaceOrder();
    },
    onError: (error) => {
      console.error("Order placement failed:", error);
    },
  });

  // Place order handler for react-hook-form
  const handlePlaceOrder = () => {
    placeOrderMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-white p-4 md:p-8">
      <div className="max-w-full w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">My Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Cart - Left */}
          <div className="flex-1 min-w-0">
            <Card className="bg-white shadow-lg w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">My cart</CardTitle>
                  {localCart.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2 px-4 py-2 text-sm font-medium"
                      disabled={clearAllMutation.isPending}
                      onClick={() => {
                        const ids = localCart.map((item: CartItem) => item.id)
                        clearAllMutation.mutate(ids)
                      }}
                    >
                      {clearAllMutation.isPending ? "Clearing..." : "Clear All"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Conditional rendering for empty cart */}
                {!cartLoading && localCart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <PackageX className="w-16 h-16 mb-4" />
                    <p className="text-lg font-semibold text-center">No available products in this cart now!</p>
                    <Link href="/">
                      <Button variant="link" className="mt-4 text-blue-600 hover:text-blue-800">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Skeleton Loader */}
                    {cartLoading ? (
                      <>
                        {/* Desktop Skeleton */}
                        <div className="hidden md:block">
                          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                            <div className="col-span-1">Item</div>
                            <div className="col-span-5">Name</div>
                            <div className="col-span-2">Price</div>
                            <div className="col-span-2">Qty</div>
                            <div className="col-span-2">Total</div>
                          </div>
                          {[...Array(3)].map((_, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center animate-pulse"
                            >
                              <div className="col-span-1">
                                <div className="w-14 h-14 bg-gray-200 rounded" />
                              </div>
                              <div className="col-span-5">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                              </div>
                              <div className="col-span-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                              </div>
                              <div className="col-span-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                              </div>
                              <div className="col-span-2 flex items-center justify-between">
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-8 w-8 bg-gray-100 rounded-full" />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Mobile Skeleton */}
                        <div className="md:hidden space-y-4">
                          {[...Array(2)].map((_, idx) => (
                            <Card key={idx} className="border border-gray-200 w-full animate-pulse">
                              <CardContent className="p-4">
                                <div className="flex gap-3">
                                  <div className="w-14 h-14 bg-gray-200 rounded flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                      <div className="h-8 w-8 bg-gray-100 rounded-full" />
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                                    <div className="flex items-center justify-between mt-3">
                                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop Table View (only on lg and up) */}
                        <div className="hidden lg:block">
                          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                            <div className="col-span-1">Item</div>
                            <div className="col-span-5">Name</div>
                            <div className="col-span-2">Price</div>
                            <div className="col-span-2">Qty</div>
                            <div className="col-span-2">Total</div>
                          </div>
                          {localCart.map((item: CartItem) => (
                            <div
                              key={item.id}
                              className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center"
                            >
                              <div className="col-span-1">
                                <Image
                                  src={item.products?.image || "/placeholder.svg"}
                                  alt={item.products?.name || "Product"}
                                  width={60}
                                  height={60}
                                  className="rounded object-cover"
                                />
                              </div>
                              <div className="col-span-5">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-sm font-medium text-gray-800 cursor-pointer max-w-[160px] truncate inline-block">
                                        {item.products?.name}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>{item.products?.name}</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                {/* Colors and Models */}
                                {(item.colors || item.models) && (
                                  <div className="text-xs text-gray-400 mt-1 space-y-0.5">
                                    {item.colors && (
                                      <div>
                                        Color:{" "}
                                        {Array.isArray(item.colors) ? item.colors.join(", ") : String(item.colors)}
                                      </div>
                                    )}
                                    {item.models && (
                                      <div>
                                        Model:{" "}
                                        {Array.isArray(item.models) ? item.models.join(", ") : String(item.models)}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="col-span-2">
                                {item.products &&
                                  Number(item.products.discounted_price) > 0 &&
                                  Number(item.products.discounted_price) < Number(item.products.price) ? (
                                  <div className="flex flex-col items-start">
                                    <span className="font-semibold text-red-600">
                                      {formatCurrency(Number(item.products.discounted_price))}
                                    </span>
                                    <span className="text-gray-600 line-through text-xs select-none cursor-not-allowed">
                                      {formatCurrency(Number(item.products.price))}
                                    </span>
                                  </div>
                                ) : (
                                  <p className="font-semibold text-slate-900">
                                    {formatCurrency(Number(item.products?.price) || 0)}
                                  </p>
                                )}
                              </div>
                              <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 bg-transparent"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 bg-transparent"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                    disabled={item.products && item.quantity >= (item.products.quantity ?? 0)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="col-span-2 flex items-center justify-between">
                                <p className="font-semibold text-red-600">
                                  {formatCurrency(
                                    item.products && Number(item.products.discounted_price) > 0 && Number(item.products.discounted_price) < Number(item.products.price)
                                      ? Number(item.products.discounted_price) * item.quantity
                                      : (item.products?.price || 0) * item.quantity
                                  )}
                                </p>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteCartMutation.mutate(item.id)}
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="col-span-12 mt-2">
                                {item.products && item.products.quantity === 0 ? (
                                  <div className="text-red-600 text-sm font-medium flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    No stock available now. Remove this product from the cart to continue ordering.
                                  </div>
                                ) : item.products && item.quantity > (item.products?.quantity ?? 0) ? (
                                  <div className="text-orange-600 text-sm font-medium flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    Can&apos;t order this product with this quantity. Available stock is {item.products?.quantity ?? 0}. Please decrease the ordering quantity.
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Mobile & Tablet Card View (block for <lg) */}
                        <div className="block lg:hidden space-y-4">
                          {localCart.map((item: CartItem) => (
                            <Card key={item.id} className="border border-gray-200 w-full p-4 md:p-6">
                              <CardContent className="flex gap-4 md:gap-6">
                                <Image
                                  src={item.products?.image || "/placeholder.svg"}
                                  alt={item.products?.name || "Product"}
                                  width={80}
                                  height={80}
                                  className="rounded object-cover flex-shrink-0 w-16 h-16 md:w-20 md:h-20"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span className="text-base md:text-lg font-medium text-gray-800 pr-2 cursor-pointer max-w-[120px] md:max-w-[180px] truncate inline-block">
                                            {item.products?.name}
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent>{item.products?.name}</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => deleteCartMutation.mutate(item.id)}
                                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 flex-shrink-0"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  {/* Colors and Models */}
                                  {(item.colors || item.models) && (
                                    <div className="text-xs text-gray-400 mt-1 space-y-0.5">
                                      {item.colors && (
                                        <div>
                                          Color: {Array.isArray(item.colors) ? item.colors.join(", ") : String(item.colors)}
                                        </div>
                                      )}
                                      {item.models && (
                                        <div>
                                          Model: {Array.isArray(item.models) ? item.models.join(", ") : String(item.models)}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  <p className="text-base md:text-lg font-semibold mt-1">
                                    {item.products &&
                                    Number(item.products.discounted_price) > 0 &&
                                    Number(item.products.discounted_price) < Number(item.products.price) ? (
                                      <>
                                        <span className="font-semibold text-red-600">
                                          {formatCurrency(Number(item.products.discounted_price))}
                                        </span>
                                        <br />
                                        <span className="text-gray-600 line-through text-xs select-none cursor-not-allowed">
                                          {formatCurrency(Number(item.products.price))}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-slate-900">
                                        {formatCurrency(Number(item.products?.price) || 0)}
                                      </span>
                                    )}
                                  </p>
                                  <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8 bg-transparent"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label="Decrease quantity"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="w-8 text-center text-base md:text-lg font-medium">{item.quantity}</span>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8 bg-transparent"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                        disabled={item.products && item.quantity >= (item.products.quantity ?? 0)}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="font-semibold text-red-600 text-base md:text-lg">
                                      {formatCurrency(
                                        item.products && Number(item.products.discounted_price) > 0 && Number(item.products.discounted_price) < Number(item.products.price)
                                          ? Number(item.products.discounted_price) * item.quantity
                                          : (item.products?.price || 0) * item.quantity
                                      )}
                                    </p>
                                  </div>
                                  {/* Stock/quantity error messages */}
                                  <div className="mt-2">
                                    {item.products && item.products.quantity === 0 ? (
                                      <div className="text-red-600 text-sm font-medium flex items-center gap-2">
                                        <X className="w-4 h-4" />
                                        No stock available now. Remove this product from the cart to continue ordering.
                                      </div>
                                    ) : item.products && item.quantity > (item.products?.quantity ?? 0) ? (
                                      <div className="text-orange-600 text-sm font-medium flex items-center gap-2">
                                        <X className="w-4 h-4" />
                                        Can&apos;t order this product with this quantity. Available stock is {item.products?.quantity ?? 0}. Please decrease the ordering quantity.
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Summary Section - Only show if cart is not empty and not loading */}
                    {!cartLoading && localCart.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200 relative">
                        <div className="flex  ">
                          <div className="w-full  ">
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                              
                              <span>Sub Total</span>
                              <span className="font-semibold">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                              <span>Shipping Charges</span>
                              <span className="font-semibold">{formatCurrency(shippingCharges)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold mt-2">
                              <span>Total Amount</span>
                              <span className="text-red-600">{formatCurrency(totalAmount)}</span>
                            </div>
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                          <Link href="/" className="w-full sm:w-auto">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <span>CONTINUE SHOPPING</span>
                            </Button>
                          </Link>
                          <Button
                            type="button"
                            onClick={handleSubmit(handlePlaceOrder)}
                            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white"
                            disabled={hasStockError || placeOrderMutation.isPending}
                          >
                            {placeOrderMutation.isPending ? "Placing..." : "PLACE ORDER"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Customer Details - Right (responsive for mobile/tablet) */}
          <div className="w-full lg:w-80">
            <Card className="bg-white shadow-lg w-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  {userLoading ? (
                    <div className="h-10 bg-gray-200 rounded mt-1 animate-pulse" />
                  ) : isClient ? (
                    <PhoneInput
                      country="lk"
                      countryCodeEditable={false}
                      value={formatPhoneNumber(customer?.phone_number)}
                      inputClass="w-full max-w-[230px] border-blue-200 focus:border-blue-900 focus:ring-blue-900"
                      placeholder="Enter phone number"
                      inputProps={{
                        name: "phone",
                        readOnly: true,
                        disabled: true,
                      }}
                    />
                  ) : (
                    <div className="h-10 bg-gray-100 rounded" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  {userLoading ? (
                    <div className="h-10 bg-gray-200 rounded mt-1 animate-pulse" />
                  ) : (
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      value={customer?.address || ""}
                      readOnly
                      disabled
                      className="mt-1 bg-gray-100 cursor-not-allowed"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  {userLoading ? (
                    <div className="h-10 bg-gray-200 rounded mt-1 animate-pulse" />
                  ) : (
                    <Input
                      id="city"
                      placeholder="City"
                      value={customer?.city || ""}
                      readOnly
                      disabled
                      className="mt-1 bg-gray-100 cursor-not-allowed"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
