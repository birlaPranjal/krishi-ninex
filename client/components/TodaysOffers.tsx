'use client';

import ProductCard from './ProductCard';
import { productData } from '@/data/products';
import Link from 'next/link';

export default function TodaysOffers() {
  // Today's Offers - products with high discounts or special offers
  const todaysOffers = Object.values(productData)
    .filter((product) => 
      product.discountPercent > 40 || // High discount
      product.isBestSeller // Best sellers are often on offer
    )
    .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
    .slice(0, 10);

  if (todaysOffers.length === 0) {
    return null;
  }

  return (
    <section className="py-4 md:py-5 lg:py-6 bg-white">
      <div className="container mx-auto px-2 md:px-3 max-w-[1400px]">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Today&apos;s Offers</h2>
          <Link 
            href="/categories" 
            className="text-[#16a34a] hover:text-[#15803d] font-semibold text-sm md:text-base transition-colors whitespace-nowrap hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3">
          {todaysOffers.map((product) => (
            <div key={product.id} className="w-full h-full flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

