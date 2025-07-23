// app/api/news/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data (replace this with real API when you get a key)
  const mockNews = [
    {
      title: "Potholes Flood Streets in North City",
      description: "Residents urge the municipality to repair critical roads as monsoon worsens the problem.",
      url: "https://zeenews.india.com/",
      urlToImage: "https://via.placeholder.com/600x300.png?text=City+News+1",
    },
    {
      title: "Waste Management Drive Launched",
      description: "Mayor announces new recycling initiative in 12 city wards.",
      url: "https://kashmirobserver.net/2025/07/22/carry-independent-verification-of-rural-waste-management-infra-cs/",
      urlToImage: "https://via.placeholder.com/600x300.png?text=City+News+2",
    },
    {
      title: "Water Shortage in Sector 14",
      description: "Civic authority promises tanker supply amid public outcry.",
      url: "https://indianexpress.com/article/india/mumbai-rains-live-updates-imd-alert-weather-news-10139232/",
      urlToImage: "https://via.placeholder.com/600x300.png?text=City+News+3",
    },
  ];

  return NextResponse.json(mockNews);
}
