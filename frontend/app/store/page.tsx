// app/store/page.tsx

'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import Image from 'next/image';

const storeItems = [
  {
    id: 1,
    name: 'Eco Water Bottle',
    description: 'Made from 100% recycled plastic. Eco-friendly & reusable.',
    image: '/images/water-bottle.jpg',
    coins: 120,
  },
  {
    id: 2,
    name: 'Organic Tote Bag',
    description: 'Made from sustainable cotton. Durable and washable.',
    image: '/images/tote-bag.jpg',
    coins: 90,
  },
  {
    id: 3,
    name: 'Plantable Notebook',
    description: 'Notebook with seeds embedded in pages. Grow after use!',
    image: '/images/notebook.jpg',
    coins: 150,
  },
];

export default function StorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-600 mb-12"
      >
        Eco Store – Redeem Your EcoCoins
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="hover:scale-[1.02] transition-transform duration-300 border shadow-md rounded-2xl bg-white">
              <CardContent className="p-4 space-y-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={250}
                  className="rounded-xl object-cover w-full h-48"
                />
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Leaf className="text-green-600 w-5 h-5" /> {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-md font-medium text-green-700">
                    {item.coins} EcoCoins
                  </span>
                  <button className="bg-green-600 text-white px-4 py-1 text-sm rounded-full hover:bg-green-700 flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4" /> Redeem
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
