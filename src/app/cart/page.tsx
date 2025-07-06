"use client"

import CartSummary from "@/components/custom/CartSummary"
import { useState } from "react"


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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ])

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    phone: "",
    address: "",
  })

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleUpdateCustomerDetails = (details: CustomerDetails) => {
    setCustomerDetails(details)
  }

  const handleContinueShopping = () => {
    // Navigate to shop or previous page
    console.log("Continue shopping clicked")
  }

  const handlePlaceOrder = () => {
    // Process order
    console.log("Place order clicked", { cartItems, customerDetails })
  }

  return (
    <CartSummary
      items={cartItems}
      customerDetails={customerDetails}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onUpdateCustomerDetails={handleUpdateCustomerDetails}
      onContinueShopping={handleContinueShopping}
      onPlaceOrder={handlePlaceOrder}
       
    />
  )
}
