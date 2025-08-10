"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    departments: 0,
    complaints: 0,
    admins: 0,
  });

  useEffect(() => {
    // Fetch stats from backend
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/super/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Super Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Departments</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.departments}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Complaints</h2>
          <p className="text-4xl font-bold text-red-500">{stats.complaints}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold">Admins</h2>
          <p className="text-4xl font-bold text-green-600">{stats.admins}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => router.push("/super/manage-departments")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg shadow-lg text-lg font-semibold"
        >
          Manage Departments
        </button>
        <button
          onClick={() => router.push("/super/manage-complaints")}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg shadow-lg text-lg font-semibold"
        >
          Manage Complaints
        </button>
        <button
          onClick={() => router.push("/super/admins")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg shadow-lg text-lg font-semibold"
        >
          View Admins
        </button>
        <button
          onClick={() => router.push("/super/profile")}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-lg shadow-lg text-lg font-semibold"
        >
          My Profile
        </button>
      </div>
    </div>
  );
}
