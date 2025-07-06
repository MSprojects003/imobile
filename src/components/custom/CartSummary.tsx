"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerDetails {
  phone: string
  address: string
}

interface CartSummaryProps {
  items?: CartItem[]
  customerDetails?: CustomerDetails
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
  onUpdateCustomerDetails?: (details: CustomerDetails) => void
  onContinueShopping?: () => void
  onPlaceOrder?: () => void
}

const defaultItems: CartItem[] = [
  {
    id: "1",
    name: "City Sightseeing Sharjah: 24 hours valid Ticket For Adult",
    price: 11870.0,
    quantity: 2,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "New Mechanical Watch For Men with Skeleton Dial Party Wear",
    price: 23740.0,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Air Conditioner Cleaning of three-bedroom Apartment",
    price: 23740.0,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function CartSummary({
  items = defaultItems,
  customerDetails = { phone: "", address: "" },
  onUpdateQuantity,
  onRemoveItem,
  onUpdateCustomerDetails,
  onContinueShopping,
  onPlaceOrder,
}: CartSummaryProps) {
  const [localCustomerDetails, setLocalCustomerDetails] = useState<CustomerDetails>(customerDetails)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    onUpdateQuantity?.(id, newQuantity)
  }

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    const updatedDetails = { ...localCustomerDetails, [field]: value }
    setLocalCustomerDetails(updatedDetails)
    onUpdateCustomerDetails?.(updatedDetails)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCharges = 0
  const totalAmount = subtotal + shippingCharges

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">My Shopping Cart</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Cart - Left */}
          <div className="flex-1">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">My cart</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                    <div className="col-span-1">Item</div>
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-2">Total</div>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                      <div className="col-span-1">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="col-span-5">
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <button className="text-xs text-blue-500 hover:underline mt-1">Update</button>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <button className="text-xs text-blue-500 hover:underline mt-1">Update</button>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <p className="font-semibold text-red-600">{formatCurrency(item.price * item.quantity)}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem?.(item.id)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-medium text-gray-800 pr-2">{item.name}</h3>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onRemoveItem?.(item.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm font-semibold mt-1">{formatCurrency(item.price)}</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="font-semibold text-red-600">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">
                        Sub Total: <span className="font-semibold">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Shipping Charges: <span className="font-semibold">{formatCurrency(shippingCharges)}</span>
                      </div>
                      <div className="text-lg font-bold">
                        Total Amount: <span className="text-red-600">{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={onContinueShopping}
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    CONTINUE SHOPPING
                  </Button>
                  <Button onClick={onPlaceOrder} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white">
                    PLACE ORDER
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Details - Right */}
          <div className="md:w-80">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={localCustomerDetails.phone}
                    onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={localCustomerDetails.address}
                    onChange={(e) => handleCustomerDetailsChange("address", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}