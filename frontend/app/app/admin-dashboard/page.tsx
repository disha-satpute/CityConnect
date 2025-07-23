"use client";
import { useState } from "react";
import {
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  Settings,
  Users,
  AlertTriangle,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const NavButton = ({ icon: Icon, label, tab }: any) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition ${
        activeTab === tab
          ? "bg-blue-600 text-white"
          : "hover:bg-blue-100 text-gray-700"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-blue-700 mb-6">Admin Panel</h2>
        <NavButton icon={BarChart3} label="Overview" tab="overview" />
        <NavButton icon={FileText} label="Reports" tab="reports" />
        <NavButton icon={CheckCircle} label="Verified" tab="verified" />
        <NavButton icon={Clock} label="Pending" tab="pending" />
        <NavButton icon={AlertTriangle} label="Urgent" tab="urgent" />
        <NavButton icon={Users} label="Users" tab="users" />
        <NavButton icon={Eye} label="Activity" tab="activity" />
        <div className="mt-auto pt-4 border-t">
          <NavButton icon={Settings} label="Settings" tab="settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 capitalize">
          {activeTab}
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Total Issues</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">154</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Resolved</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">89</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">Pending</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">65</p>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="mt-10">
          <p className="text-gray-500">
            Content for the <strong>{activeTab}</strong> tab will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
