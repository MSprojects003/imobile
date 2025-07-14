'use client';
import React from 'react';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import img1 from '../../pictures/products/nike-shoe-font.jpg';
import img2 from '../../pictures/products/nike-shoe-back.webp';
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '@/lib/db/user';
import { getAllordersByUserID } from '@/lib/db/orders';

// Define the Product interface
export interface Product {
  id: string;
  brand: string;
  name: string;
  frontImage: string | StaticImageData;
  backImage: string | StaticImageData;
  price: number;
  discountPrice?: number;
  sku: string;
  colors: { code: string; name: string; stock: number }[];
  models: string[];
  category: string;
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    brand: 'Brand A',
    name: 'Wireless Headphones',
    frontImage: img1,
    backImage: img2,
    price: 100,
    discountPrice: 80,
    sku: 'AS-111-Pro-1',
    colors: [
      { code: '#000000', name: 'Matte Black', stock: 1 },
      { code: '#FFFFFF', name: 'White', stock: 5 },
      { code: '#FF0000', name: 'Red', stock: 3 },
    ],
    models: ['Model A', 'Model B', 'Model C'],
    category: 'wireless-headphones',
  },
  {
    id: '2',
    brand: 'Brand B',
    name: 'Smartphone Charger',
    frontImage: '/images/charger-front.jpg',
    backImage: '/images/charger-back.jpg',
    price: 150,
    sku: 'AS-111-Pro-2',
    colors: [
      { code: '#000000', name: 'Matte Black', stock: 2 },
      { code: '#FFFFFF', name: 'White', stock: 6 },
      { code: '#FF0000', name: 'Red', stock: 4 },
      { code: '#00FF00', name: 'Green', stock: 3 },
      { code: '#0000FF', name: 'Blue', stock: 5 },
      { code: '#FFA500', name: 'Orange', stock: 2 },
      { code: '#800080', name: 'Purple', stock: 4 },
    ],
    models: ['Model X', 'Model Y', 'Model Z', 'Model W'],
    category: 'smartphone-charger',
  },
  {
    id: '11',
    brand: 'Nike',
    name: 'Air Max 270 React Running Shoes for Men',
    frontImage: img1,
    backImage: img2,
    price: 12999,
    discountPrice: 9999,
    sku: 'AS-111-Pro-9',
    colors: [],
    models: [],
    category: 'shoes',
  },
];

// Dummy order data
const orders = [
  {
    orderId: '#ORD123456',
    productId: '1',
    quantity: 2,
    status: 'Pending',
    orderPlacedDate: '2025-07-01 10:00 AM +0530',
  },
  {
    orderId: '#ORD123457',
    productId: '2',
    quantity: 1,
    status: 'Accepted',
    trackId: 'TRK789101',
    orderPlacedDate: '2025-07-02 11:30 AM +0530',
  },
  {
    orderId: '#ORD123458',
    productId: '11',
    quantity: 3,
    status: 'Accepted',
    orderPlacedDate: '2025-07-03 02:15 PM +0530',
  },
];

// Function to calculate estimated date (7 days after order placed)
const calculateEstimatedDate = (orderPlacedDate: string) => {
  const date = new Date(orderPlacedDate);
  date.setDate(date.getDate() + 7);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

function Orders() {
  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    retry: false,
  });

  const { data: orderss, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => (user ? getAllordersByUserID(user.id) : Promise.resolve(null)),
    enabled: !!user,
  });

  // Show loading state
  if (userLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Track My Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border-2 border-slate-800 p-4 mb-4 flex items-center shadow-sm animate-pulse">
              <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show message if no orders
  if (!orderss || orderss.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Track My Orders</h1>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tracking Orders Found!</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to track your orders here.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors duration-200">
              Continue Shopping
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Track My Orders</h1>
      {Array.isArray(orderss) ? orderss.map((order, index) => {
        // Calculate estimated date (7 days after order created)
        const orderDate = new Date(order.created_at);
        const estimatedDate = new Date(orderDate);
        estimatedDate.setDate(estimatedDate.getDate() + 7);
        const estimatedDateString = estimatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        // Format order date
        const orderDateString = orderDate.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div
            key={order.id}
            className="border-2 border-slate-800 p-4 mb-4 flex items-center shadow-sm"
            style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          >
            <img
              src={order.order_items[0]?.products?.image || '/placeholder-image.jpg'}
              alt={order.order_items[0]?.products?.name || 'Product'}
              className="w-20 h-20 object-cover mr-4"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">Order #{order.id.slice(-8).toUpperCase()}</p>
              <p className="text-xs text-gray-600">Total Items: {order.order_items.length}</p>
              <p className="text-sm mt-2 line-clamp-1 overflow-hidden text-ellipsis" title={order.order_items[0]?.products?.name}>
                {order.order_items[0]?.products?.name && order.order_items[0].products.name.length > 20 
                  ? `${order.order_items[0].products.name.substring(0, 20)}...` 
                  : order.order_items[0]?.products?.name || 'Unknown Product'}
              </p>
                             <p className="text-xs text-gray-600">Total Amount: LKR {order.total_amount.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Placed: {orderDateString}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${order.status ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.status ? 'Accepted' : 'Pending'}
              </p>
              {order.status && order.track_id !== "0" && (
                <>
                  <p className="text-xs text-gray-600">Track ID: {order.track_id}</p>
                  <p className="text-xs text-gray-600">Estimated Date: {estimatedDateString}</p>
                </>
              )}
              {!order.status && (
                <p className="text-xs text-gray-600">Estimated Date: {estimatedDateString}</p>
              )}
            </div>
          </div>
        );
      }) : null}
    </div>
  );
}

export default Orders;