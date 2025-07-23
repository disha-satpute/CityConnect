'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-blue-700 mb-10">
          Live City News Updates 🗞️
        </h1>

        {loading && (
          <div className="flex justify-center mt-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center">
            <AlertTriangle className="w-6 h-6 inline-block mr-2" />
            Failed to load news. Please check your API key or internet.
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2">
            {news.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 shadow-lg rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Read Full Article →
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
