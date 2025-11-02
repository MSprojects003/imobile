"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function WhatsApp() {
   
  const message = encodeURIComponent("Hello, I have a Discussion from imobile ")
  const whatsappUrl = `https://wa.me/imobile?text=${message}`

  return (
    <Button
      asChild
      className="fixed bottom-12 right-6 rounded-full p-2 bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform transform scale-150 z-50"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-6 w-6" />
      </a>
    </Button>
  )
}