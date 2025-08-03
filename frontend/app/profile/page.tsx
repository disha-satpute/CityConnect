'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Back to Home */}
      <Link href="/" className="inline-block mb-4 text-blue-600 hover:underline text-sm">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">👤 My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Profile Info Card */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button className="border px-3 py-1 rounded text-sm text-blue-600 border-blue-600 hover:bg-blue-50">
              Edit Profile
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
              {user.name?.[0] || 'U'}
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">Citizen since 2023</p>
              <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full mt-1 inline-block">
                Gold Contributor
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
            <div>
              <p className="text-gray-500">Full Name</p>
              <div className="border px-3 py-2 rounded">{user.name}</div>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <div className="border px-3 py-2 rounded">{user.email}</div>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <div className="border px-3 py-2 rounded">{user.mobile}</div>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <div className="border px-3 py-2 rounded">{user.address}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-blue-600 text-xl font-bold">12</p>
              <p className="text-sm text-gray-600">Reports Submitted</p>
            </div>
            <div>
              <p className="text-green-600 text-xl font-bold">9</p>
              <p className="text-sm text-gray-600">Issues Resolved</p>
            </div>
            <div>
              <p className="text-indigo-600 text-xl font-bold">1250</p>
              <p className="text-sm text-gray-600">EcoCoins Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-4 text-sm">
          <li className="flex justify-between items-center border-b pb-2">
            <div>
              <p>📄 Reported pothole on Main Street</p>
              <p className="text-gray-500">2024-01-15</p>
            </div>
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs">
              Pending
            </span>
          </li>
          <li className="flex justify-between items-center border-b pb-2">
            <div>
              <p>📄 Earned 50 EcoCoins for community participation</p>
              <p className="text-gray-500">2024-01-12</p>
            </div>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
              Completed
            </span>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p>📄 Streetlight issue resolved</p>
              <p className="text-gray-500">2024-01-10</p>
            </div>
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs">
              Resolved
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
