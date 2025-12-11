'use client';

import ProductCard from './ProductCard';
import { productData } from '@/data/products';
import Link from 'next/link';

export default function NewArrivals() {
  // New Arrivals - typically products with high IDs (newer products) or high ratings
  // For now, we'll use products with high ratings and recent additions
  const newArrivals = Object.values(productData)
    .filter((product) => 
      (product.rating && product.rating > 4.0) || // Good ratings indicate new quality products
      product.reviews && product.reviews < 100 // Fewer reviews might indicate newer products
    )
    .slice(0, 10);

  if (newArrivals.length === 0) {
    return null;
  }

  return (
    <section className="py-4 md:py-5 lg:py-6 bg-white">
      <div className="container mx-auto px-2 md:px-3 max-w-[1400px]">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">New Arrivals</h2>
          <Link 
            href="/categories" 
            className="text-[#16a34a] hover:text-[#15803d] font-semibold text-sm md:text-base transition-colors whitespace-nowrap hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-full h-full flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

