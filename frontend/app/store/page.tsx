"use client";

import { useState } from "react";
import { ShoppingCart, Filter, Leaf, Gift, Star, MapPin, MessageCircle, Award } from "lucide-react";

export default function EcoStore() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    "Lifestyle",
    "Transport",
    "Environment",
    "Technology",
  ];

  const products = [
    {
      name: "Reusable Water Bottle",
      description: "Eco-friendly stainless steel water bottle",
      category: "Lifestyle",
      price: 150,
      stock: 25,
      image: "/bottle.jpg",
    },
    {
      name: "Public Transit Pass",
      description: "Monthly public transportation pass",
      category: "Transport",
      price: 300,
      stock: 100,
      image: "/transit-pass.jpg",
    },
    {
      name: "Tree Planting Certificate",
      description: "Sponsor a tree in the city park",
      category: "Environment",
      price: 500,
      stock: 15,
      image: "/tree-cert.jpg",
    },
  ];

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Earn EcoCoins",
      description: "Report civic issues or participate in eco-activities to earn coins.",
    },
    {
      icon: <Gift className="w-6 h-6 text-blue-600" />,
      title: "Redeem Sustainable Goods",
      description: "Use EcoCoins to redeem useful, eco-friendly products from the store.",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Get Recognized",
      description: "Top contributors get highlighted on the leaderboard and earn rewards.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: "Live Issue Heatmap",
      description: "Visualize city issues by severity and location with real-time map updates.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
      title: "Multilingual Chatbot",
      description: "Get instant help in your preferred language using the AI Assistant.",
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Gamified Profiles",
      description: "Earn badges, climb leaderboards, and boost your civic profile.",
    },
  ];

  const filteredProducts = selectedCategory === "All Categories"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Navbar */}
      <div className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">CityConnect</h1>
        </div>
        <div className="flex gap-4 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/report-issue" className="hover:text-blue-600">Report Issue</a>
          <a href="/my-reports" className="hover:text-blue-600">My Reports</a>
          <a href="/store" className="text-blue-600 font-bold">Eco Store</a>
          <a href="/news" className="hover:text-blue-600">News</a>
          <a href="/ai-assistant" className="hover:text-blue-600">AI Assistant</a>
        </div>
        <button className="bg-purple-600 text-white px-4 py-1 rounded">Admin</button>
      </div>

      {/* Balance Section */}
      <div className="p-6">
        <div className="bg-green-100 p-4 rounded text-green-800 font-semibold mb-4 flex justify-between items-center">
          <div>
            <p>Your EcoCoins Balance</p>
            <h2 className="text-2xl font-bold">1,250 EC</h2>
          </div>
          <p className="text-green-600">Earned this month +350 EC</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 my-10">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 text-center border border-gray-100">
              <div className="mb-3 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-gray-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 font-semibold">{product.price} EC</span>
                <span className="text-xs text-gray-500">{product.stock} in stock</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1 w-full justify-center">
                <ShoppingCart size={16} /> Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
