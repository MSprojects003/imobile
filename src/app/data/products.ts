import { StaticImageData } from "next/image"
import img2 from "../../pictures/products/nike-shoe-back.webp"
import img1 from "../../pictures/products/nike-shoe-font.jpg"
// Define the Product interface
export interface Product {
  id: string
  brand: string
  name: string
  frontImage: string | StaticImageData
  backImage: string | StaticImageData
  price: number
  discountPrice?: number
  sku: string
  colors: { code: string; name: string; stock: number }[]
  models: string[]
  category: string
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    brand: "Brand A",
    name: "Wireless Headphones",
    frontImage: img1,
    backImage: img2,
    price: 100,
    discountPrice: 80,
    sku: "AS-111-Pro-1",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 1 },
      { code: "#FFFFFF", name: "White", stock: 5 },
      { code: "#FF0000", name: "Red", stock: 3 },
    ],
    models: ["Model A", "Model B", "Model C"],
    category: "wireless-headphones",
  },
  {
    id: "2",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-2",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
      { code: "#00FF00", name: "Green", stock: 3 },
      { code: "#0000FF", name: "Blue", stock: 5 },
      { code: "#FFA500", name: "Orange", stock: 2 },
      { code: "#800080", name: "Purple", stock: 4 },
    ],
    models: ["Model X", "Model Y", "Model Z", "Model W"],
    category: "smartphone-charger",
  },
  {
    id: "3",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-3",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
    ],
    models: ["Model X", "Model Y"],
    category: "smartphone-charger",
  },
  {
    id: "4",
    brand: "Brand A",
    name: "Wireless Headphones",
    frontImage: "/images/headphones-front.jpg",
    backImage: "/images/headphones-back.jpg",
    price: 100,
    discountPrice: 80,
    sku: "AS-111-Pro-4",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 1 },
      { code: "#FFFFFF", name: "White", stock: 5 },
      { code: "#FF0000", name: "Red", stock: 3 },
      { code: "#00FF00", name: "Green", stock: 4 },
    ],
    models: ["Model A", "Model B", "Model C"],
    category: "wireless-headphones",
  },
  {
    id: "5",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-5",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
      { code: "#00FF00", name: "Green", stock: 3 },
    ],
    models: ["Model X", "Model Y"],
    category: "smartphone-charger",
  },
  {
    id: "6",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-6",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
    ],
    models: ["Model X", "Model Y"],
    category: "smartphone-charger",
  },
  {
    id: "7",
    brand: "Brand A",
    name: "Wireless Headphones",
    frontImage: "/images/headphones-front.jpg",
    backImage: "/images/headphones-back.jpg",
    price: 100,
    discountPrice: 80,
    sku: "AS-111-Pro-7",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 1 },
      { code: "#FFFFFF", name: "White", stock: 5 },
      { code: "#FF0000", name: "Red", stock: 3 },
      { code: "#00FF00", name: "Green", stock: 4 },
    ],
    models: ["Model A", "Model B", "Model C"],
    category: "wireless-headphones",
  },
  {
    id: "8",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-8",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
      { code: "#00FF00", name: "Green", stock: 3 },
      { code: "#0000FF", name: "Blue", stock: 5 },
    ],
    models: ["Model X", "Model Y", "Model Z"],
    category: "earphones",
  },
  {
    id: "9",
    brand: "Brand B",
    name: "Smartphone Charger",
    frontImage: "/images/charger-front.jpg",
    backImage: "/images/charger-back.jpg",
    price: 150,
    sku: "AS-111-Pro-9",
    colors: [
      { code: "#000000", name: "Matte Black", stock: 2 },
      { code: "#FFFFFF", name: "White", stock: 6 },
      { code: "#FF0000", name: "Red", stock: 4 },
    ],
    models: ["Model X", "Model Y"],
    category: "smartphone-charger",
  },
   {
    id: "11",
    brand: "Nike",
    name: "Air Max 270 React Running Shoes for Men",
    frontImage: img1,
    backImage: img2,
    price: 12999,
    discountPrice: 9999,
    sku: "AS-111-Pro-9",
     colors: [
      
    ],
     models: [] ,
    category: "shoes",
  },
]