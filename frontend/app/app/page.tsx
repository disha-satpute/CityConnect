'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  AlertTriangle,
  ShoppingCart,
  Newspaper,
  Bot,
  LayoutDashboard,
  Globe,
} from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';

export default function Home() {
  const [userModalOpen, setUserModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 shadow-md bg-white">
        <div className="text-2xl font-bold text-blue-600">CityConnect</div>
        <ul className="flex gap-6 text-gray-700 font-medium flex-wrap">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/home">Home</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/report-issue">Report Issue</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/my-reports">My Reports</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/store">Eco Store</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/news">News</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link href="/tasks">AI Assistant</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
            <DialogTrigger asChild>
              <button onClick={() => setUserModalOpen(true)} className="hover:text-blue-600">
                <User className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>User Login / Signup</DialogTitle>
                <DialogDescription>
                  Access your CityConnect account or create a new one.
                </DialogDescription>
              </DialogHeader>

              <form className="flex flex-col gap-4 mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-all"
                >
                  Login
                </button>
                <p className="text-sm text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-blue-600 underline">Sign up</Link>
                </p>
              </form>
            </DialogContent>
          </Dialog>

          <Link href="/admin-login">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md">
              Admin
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center px-4 py-20"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Welcome to CityConnect 🌇
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Your digital gateway to smart city services. Report issues, stay informed, and connect with your community through our comprehensive civic platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-10">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
          <Link href="/report-issue"></Link>

            📝 Report Issue
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
          <Link href="/admin-login"></Link>
            🔐 Admin Login
          </Button>
          <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3">
            📊 Admin Dashboard
          </Button>
        </div>
      </motion.div>

      {/* Feature Highlights */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {[
          { icon: AlertTriangle, title: 'Smart Issue Reporting', desc: 'Report potholes, outages, and more with real-time updates.' },
          { icon: ShoppingCart, title: 'Eco Store', desc: 'Exchange EcoCoins for local, sustainable products.' },
          { icon: Newspaper, title: 'City News', desc: 'Stay updated with verified and important civic news.' },
          { icon: Bot, title: 'AI Support', desc: 'Ask anything—our chatbot is here to help you instantly.' },
          { icon: LayoutDashboard, title: 'Admin Dashboard', desc: 'Powerful tools for efficient issue resolution.' },
          { icon: Globe, title: 'One-stop Portal', desc: 'Unified access to all city services in one place.' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      {/* Timeline / Education Section */}
<section className="bg-gradient-to-r from-sky-100 to-blue-100 py-16 px-6">
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
    Platform Evolution Timeline 🚀
  </h2>
  <div className="relative max-w-4xl mx-auto before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-1 before:bg-blue-400">
    {[
      {
        year: '2023',
        title: 'Ideation & Research',
        desc: 'Studied citizen pain points, reviewed smart city models, and built the first mockups.',
      },
      {
        year: '2024',
        title: 'MVP Development',
        desc: 'Released first version with issue reporting, eco store, and news feed.',
      },
      {
        year: '2025',
        title: 'AI Integration & Dashboard',
        desc: 'Launched AI chatbot, automated categorization, and full admin dashboard with analytics.',
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`mb-12 flex flex-col sm:flex-row items-center ${
          index % 2 === 0 ? 'sm:flex-row-reverse' : ''
        }`}
      >
        <div className="sm:w-1/2 px-6">
          <h3 className="text-xl font-semibold text-blue-700">{item.year}</h3>
          <h4 className="text-lg font-bold mt-1">{item.title}</h4>
          <p className="text-gray-700 mt-2">{item.desc}</p>
        </div>
        <div className="relative w-5 h-5 bg-blue-500 rounded-full z-10 border-4 border-white shadow-md" />
        <div className="sm:w-1/2" />
      </motion.div>
    ))}
  </div>
</section>
{/* AI Assistant Features */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
      Meet Your Smart City Assistant 🤖
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
      Harnessing the power of AI to enhance civic services — from instant help to intelligent issue categorization.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: 'AI Chatbot',
          desc: '24/7 virtual assistant for citizen queries, report follow-ups, and guidance.',
          icon: '💬',
        },
        {
          title: 'Smart Categorization',
          desc: 'Automatically tags and routes issues to the right department using machine learning.',
          icon: '🧠',
        },
        {
          title: 'Predictive Analysis',
          desc: 'Forecasts civic trends and suggests improvements proactively to admins.',
          icon: '📊',
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl border border-blue-100 transition duration-300"
        >
          <div className="text-5xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
          <p className="text-gray-700 mt-2">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* EcoCoins & Rewards Section */}
<section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
      Earn EcoCoins – Get Rewarded for Civic Action 🌿
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
      Encourage citizens to participate through incentives and recognition.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: 'Report & Earn',
          desc: 'Earn EcoCoins by reporting local issues and contributing to community wellbeing.',
          icon: '📢',
        },
        {
          title: 'Eco Store',
          desc: 'Redeem EcoCoins for eco-friendly goods, services, or discounts in the store.',
          icon: '🛒',
        },
        {
          title: 'Leaderboard',
          desc: 'Compete with other citizens & see your name rise on the public leaderboard.',
          icon: '🏆',
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition duration-300"
        >
          <div className="text-5xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
          <p className="text-gray-700 mt-2">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


     {/* Footer */}
<footer className="bg-gray-900 text-gray-300 py-12 px-6 font-normal">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* CityConnect Info */}
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">CityConnect 🌆</h3>
      <p className="text-sm leading-relaxed">
        A unified civic engagement platform to empower citizens and transform cities through smart solutions.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h4 className="text-white text-lg font-semibold mb-4">Navigation</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="home/page.tsx" className="hover:text-white">Home</a></li>
        <li><a href="report-issue/page.tsx" className="hover:text-white">Report Issue</a></li>
        <li><a href="my-reports/page.tsx" className="hover:text-white">My Reports</a></li>
        <li><a href="store/page.tsx" className="hover:text-white">Eco Store</a></li>
      </ul>
    </div>

    {/* Features */}
    <div>
      <h4 className="text-white text-lg font-semibold mb-4">Features</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">EcoCoins</a></li>
        <li><a href="#" className="hover:text-white">AI Assistant</a></li>
        <li><a href="#" className="hover:text-white">Leaderboard</a></li>
        <li><a href="#" className="hover:text-white">Admin Dashboard</a></li>
      </ul>
    </div>

    {/* Socials */}
    <div>
      <h4 className="text-white text-lg font-semibold mb-4">Connect With Us</h4>
      <div className="flex gap-4 text-xl text-white">
        <a href="#" className="hover:text-blue-400">🌐</a>
        <a href="#" className="hover:text-blue-400">🐦</a>
        <a href="#" className="hover:text-blue-400">📘</a>
        <a href="#" className="hover:text-blue-400">📸</a>
      </div>
    </div>
  </div>

  <div className="text-center text-xs text-gray-500 mt-12 border-t border-gray-700 pt-6">
    © {new Date().getFullYear()} CityConnect. All rights reserved. Built with ❤️
  </div>
</footer>

    </div>
  );
}
