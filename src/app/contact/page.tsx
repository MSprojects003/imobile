"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Image from "next/image"
 
import { useState, useRef } from "react"
 

// Import the background image correctly
import bgImage from "../../pictures/background/contact.jpeg"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "7d037a13-6feb-4687-918c-5627f3ffb6a9")
    formData.append("subject", "New Contact Form Submission from imobile")
    formData.append("to", "Milhaaninternational352@gmail.com")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })

      console.log("Response Status:", response.status)
      const result = await response.json()
      console.log("Response Body:", result)

      if (response.ok && result.success === true) {
        toast.success("Message sent successfully!")
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        toast.error(`Failed to send message: ${result.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Submission Error:", error)
      toast.error("An error occurred while sending the message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header with Free Delivery */}
     

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-cover bg-center relative">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bgImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className="absolute inset-0 bg-slate-800 opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5DEB3]">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to assist you! Whether you have questions, feedback, or need support, reach out to us and we&apos;ll respond promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="full name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="phone number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        className="mt-1 h-32"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3"
                      disabled={isSubmitting}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
 
            {/* Map */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82677.57942935391!2d79.7081001433594!3d6.938006199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25922fc4ba89f%3A0xbed257c544a4827e!2siMobile.lk!5e1!3m2!1sen!2slk!4v1753471060886!5m2!1sen!2slk"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Contact Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Reach out to us through your preferred method. We&apos;re always here to help.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Phone className="h-10 w-10 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">(+94) 76 613 8363</p>
                <p className="text-gray-600">Mon-Sun, 24 Hrs</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <Mail className="h-10 w-10 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">support@imobiles.lk</p>
                <p className="text-gray-600">24/7 Support</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <MapPin className="h-10 w-10 text-slate-900 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">Unique Complex, </p>
                <p className="text-gray-600">200 1/1 Main St, Colombo 00100 </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
      
    </div>
  )
}