import React from 'react';
import { Star, BadgeCheck, PackageSearch } from 'lucide-react';

interface Review {
  id: number;
  customer: string;
  rating: number;
  verified: boolean;
  date: string;
  title: string;
  description: string;
  role?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    customer: 'Mandeera',
    rating: 4,
    verified: true,
    date: '2025-01-17',
    title: 'Hello',
    description: 'Im the admin',
    role: 'admin',
  },
];

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

function ProductReviews() {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight text-left">Product Reviews</h2>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-start justify-center py-12 border border-gray-200 rounded-md bg-white w-full">
          <PackageSearch className="w-12 h-12 text-gray-300 mb-2" />
          <p className="text-lg font-semibold text-gray-700 mb-1">No Records Found</p>
          <p className="text-gray-500 text-sm">There are no reviews for this product yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-lg bg-white p-5 shadow-sm w-full"
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-800 font-bold text-xl">
                {getInitial(review.customer)}
              </div>
              {/* Review Content */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                  <div className="flex items-center gap-2 mb-1 sm:mb-0">
                    <span className="font-semibold text-base text-gray-900">{review.customer}</span>
                    <span className="flex items-center gap-0.5 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          fill={i < review.rating ? '#facc15' : 'none'}
                        />
                      ))}
                    </span>
                    {review.verified && (
                      <span className="ml-2 px-2 py-0.5 border border-green-500 text-green-600 text-xs rounded font-medium flex items-center gap-1 bg-green-50">
                        <BadgeCheck className="w-4 h-4" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">{review.date}</span>
                </div>
                <div className="mt-1 text-left">
                  <div className="font-semibold text-lg text-gray-800">{review.title}</div>
                  <div className="text-gray-600 text-sm mt-0.5">{review.description}</div>
                  {review.role && (
                    <div className="text-xs text-gray-400 mt-1">I&apos;m the {review.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
