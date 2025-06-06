'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    brand: string;
    name: string;
    frontImage: string;
    backImage: string;
    price: number;
    discountPrice?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to truncate product name
  const truncateName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  };

  const maxLength = 50; // Adjust the desired max length for product name
  const truncatedName = truncateName(product.name, maxLength);

  // Calculate discount percentage
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <div
      className="group relative w-64 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercentage !== null && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{discountPercentage}%
        </div>
      )}

      {/* Product Images */}
      <div className="relative w-full h-64">
        <Image
          src={product.frontImage}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <Image
          src={product.backImage}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{truncatedName}</h3>

        {/* Price Info */}
        <div className="flex justify-center items-center">
          {product.discountPrice ? (
            <div className="flex items-baseline">
              <p className="text-xl font-bold text-blue-600 mr-2">Rs.{product.discountPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500 line-through">Rs.{product.price.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-xl font-bold text-gray-800">Rs.{product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
