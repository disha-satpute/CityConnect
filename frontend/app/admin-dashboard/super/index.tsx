'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    inProcess: 0,
    resolved: 0,
    totalDepartments: 0,
    totalAdmins: 0,
    totalOfficers: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from backend API
    fetch('http://localhost:5000/api/superadmin/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card title="Total Complaints" value={stats.totalComplaints} color="bg-blue-500" />
        <Card title="In Process" value={stats.inProcess} color="bg-yellow-500" />
        <Card title="Resolved" value={stats.resolved} color="bg-green-500" />
        <Card title="Departments" value={stats.totalDepartments} color="bg-purple-500" />
        <Card title="Admins" value={stats.totalAdmins} color="bg-pink-500" />
        <Card title="Officers" value={stats.totalOfficers} color="bg-indigo-500" />
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <LinkButton href="/admin-dashboard/super/departments" label="Manage Departments" />
        <LinkButton href="/admin-dashboard/super/admins" label="Manage Department Admins" />
        <LinkButton href="/admin-dashboard/super/complaints" label="View Complaints" />
        <LinkButton href="/admin-dashboard/super/profile" label="Profile & Settings" />
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/admin-login';
          }}
          className="bg-red-600 text-white py-3 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow`}>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <button className="bg-gray-800 text-white py-3 rounded hover:bg-gray-900 w-full">
        {label}
      </button>
    </Link>
  );
}
